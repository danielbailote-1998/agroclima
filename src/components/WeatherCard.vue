<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { getGlobalIdLocal, getWarnings, getPrevisions, getObservations, getStations } from "@/services/api";
import { filterWarningsByArea, observacaoMaisProxima } from "@/services/weatherUtils";

const emit = defineEmits(['update:previsaoDia', 'update:avisos', 'update:distritoNome', 'update:observacao'])

// --- Dados base ---
const distritos   = ref([]);
const selectedId  = ref('');
const loading     = ref(false);

// --- Dados carregados ---
const avisos      = ref([]);
const previsao    = ref(null);
const observacao  = ref(null);
const diaPrevisao = ref(0);

// --- Tabelas de apoio ---
const descVento = { 1: 'Fraco', 2: 'Moderado', 3: 'Forte', 4: 'Muito forte' };

const iconesAviso = {
    'Trovoada':          '⛈️',
    'Agitação Marítima': '🌊',
    'Precipitação':      '🌧️',
    'Vento':             '💨',
    'Nevoeiro':          '🌫️',
    'Neve':              '❄️',
    'Tempo Frio':        '🥶',
    'Tempo Quente':      '🌡️',
};

const estilosAviso = {
    yellow: { alertClass: 'alert-warning',  badgeClass: 'bg-warning text-dark', label: 'Amarelo' },
    orange: { alertClass: 'alert-orange',   badgeClass: 'bg-orange',            label: 'Laranja' },
    red:    { alertClass: 'alert-danger',   badgeClass: 'bg-danger',            label: 'Vermelho' },
};

const diasLabel = ['Hoje', 'Amanhã', 'Depois'];

onMounted(async () => {
    const data = await getGlobalIdLocal();
    distritos.value = data?.data ?? [];
});

// --- Computadas ---
const distritoSelecionado = computed(() =>
    distritos.value.find(d => d.globalIdLocal == selectedId.value) ?? null
);

const previsaoDia = computed(() => {
    if (!previsao.value?.data) return null;
    return previsao.value.data.find(d => d.globalIdLocal == selectedId.value) ?? null;
});

const tempValida = (v) => v != null && v !== -99.0 && v !== -99;

// --- Emitir previsaoDia sempre que muda ---
watch(previsaoDia, (val) => emit('update:previsaoDia', val))

// --- Carrega tudo quando muda o distrito ---
async function carregarDados() {
    if (!selectedId.value || !distritoSelecionado.value) return;
    loading.value = true;

    const d = distritoSelecionado.value;

    const [todosAvisos, prev, obs, estacoes] = await Promise.all([
        getWarnings(),
        getPrevisions(diaPrevisao.value),
        getObservations(),
        getStations(),
    ]);

    avisos.value     = filterWarningsByArea(todosAvisos, d.idAreaAviso);
    previsao.value   = prev;
    observacao.value = observacaoMaisProxima(
        obs, estacoes,
        parseFloat(d.latitude),
        parseFloat(d.longitude)
    );

    // ✅ emits DENTRO da função, depois de tudo carregado
    emit('update:avisos',       avisos.value)
    emit('update:distritoNome', d.local)


// No fim de carregarDados(), antes de loading = false:
    emit('update:observacao', observacao.value)

    loading.value = false;
}

async function carregarPrevisao() {
    if (!selectedId.value) return;
    const prev = await getPrevisions(diaPrevisao.value);
    previsao.value = prev;
    // previsaoDia (computed) vai reagir e emitir pelo watch acima
}

watch(selectedId,  () => carregarDados());
watch(diaPrevisao, () => carregarPrevisao());
</script>


<template>
<div class="col-md-6 mb-3">
  <div class="card shadow-sm h-100 border-0">
    <div class="card-body p-3">

      <!-- ── Header ── -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0 fw-bold">🌦️ IPMA</h6>
        <span class="badge bg-primary rounded-pill">Meteorologia</span>
      </div>

      <!-- ── Select distrito ── -->
      <div class="mb-3">
        <label class="form-label text-muted mb-1 small">📍 Distrito / Local</label>
        <select class="form-select form-select-sm" v-model="selectedId">
          <option value="" disabled>Selecionar distrito...</option>
          <option v-for="d in distritos" :key="d.globalIdLocal" :value="d.globalIdLocal">
            {{ d.local }}
          </option>
        </select>
      </div>

      <!-- ── Sem seleção ── -->
      <div v-if="!selectedId" class="text-center text-muted py-4 small">
        <div class="fs-3">📍</div>
        Selecione um distrito para ver a informação meteorológica.
      </div>

      <!-- ── A carregar ── -->
      <div v-else-if="loading" class="text-center text-muted py-4 small">
        <div class="spinner-border spinner-border-sm me-1" role="status"></div>
        A carregar...
      </div>

      <!-- ── Conteúdo ── -->
      <template v-else-if="distritoSelecionado">

        <!-- ═══ SECÇÃO: AGORA ═══ -->
        <div class="mb-3">
          <p class="small fw-semibold text-muted mb-2">🕐 Agora
            <span v-if="observacao" class="fw-normal text-secondary ms-1">
              — {{ observacao.localEstacao }}
            </span>
          </p>

          <div v-if="observacao" class="row g-2">
            <!-- Temperatura -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🌡️ Temperatura</div>
                <div class="fw-bold small">
                  {{ tempValida(observacao.temperatura) ? observacao.temperatura + ' °C' : '—' }}
                </div>
              </div>
            </div>
            <!-- Precipitação acumulada -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🌧️ Precipitação</div>
                <div class="fw-bold small">
                  {{ tempValida(observacao.precAcumulada) ? observacao.precAcumulada + ' mm' : '—' }}
                </div>
              </div>
            </div>
            <!-- Vento km/h -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">💨 Vento</div>
                <div class="fw-bold small">
                  {{ tempValida(observacao.intensidadeVentoKM) ? observacao.intensidadeVentoKM + ' km/h' : '—' }}
                </div>
              </div>
            </div>
            <!-- Direção vento -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🧭 Direção</div>
                <div class="fw-bold small">{{ observacao.descDirVento || '—' }}</div>
              </div>
            </div>
            <!-- Humidade -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">💧 Humidade</div>
                <div class="fw-bold small">
                  {{ tempValida(observacao.humidade) ? observacao.humidade + ' %' : '—' }}
                </div>
              </div>
            </div>
            <!-- Pressão -->
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">📊 Pressão</div>
                <div class="fw-bold small">
                  {{ tempValida(observacao.pressao) ? observacao.pressao + ' hPa' : '—' }}
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-muted small text-center py-2">
            Sem observações disponíveis para esta zona.
          </div>
        </div>

        <hr class="my-2">

        <!-- ═══ SECÇÃO: PREVISÃO ═══ -->
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <p class="small fw-semibold text-muted mb-0">📅 Previsão diária</p>
            <div class="btn-group btn-group-sm">
              <button
                v-for="(label, i) in diasLabel" :key="i"
                type="button"
                class="btn btn-sm py-0 px-2"
                :class="diaPrevisao === i ? 'btn-primary' : 'btn-outline-primary'"
                style="font-size:0.72rem;"
                @click="diaPrevisao = i"
              >{{ label }}</button>
            </div>
          </div>

          <div v-if="previsaoDia" class="row g-2">
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🌡️ Temperatura</div>
                <div class="fw-bold small">{{ previsaoDia.tMin }}°C / {{ previsaoDia.tMax }}°C</div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🌧️ Prob. Precipitação</div>
                <div class="fw-bold small">{{ previsaoDia.precipitaProb }} %</div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">💨 Vento</div>
                <div class="fw-bold small">
                  {{ descVento[previsaoDia.classWindSpeed] ?? '—' }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded border p-2 text-center bg-white">
                <div class="text-muted" style="font-size:0.68rem;">🧭 Direção</div>
                <div class="fw-bold small">{{ previsaoDia.predWindDir ?? '—' }}</div>
              </div>
            </div>
          </div>
          <div v-else class="text-muted small text-center py-2">
            Sem dados de previsão disponíveis.
          </div>
        </div>

        <hr class="my-2">

        <!-- ═══ SECÇÃO: AVISOS ═══ -->
        <div>
          <p class="small fw-semibold text-muted mb-2">⚠️ Avisos activos</p>

          <div v-if="avisos.length === 0" class="text-center text-muted py-2 small">
            <div>✅</div>
            Sem avisos activos para <strong>{{ distritoSelecionado.local }}</strong>.
          </div>

          <div
            v-for="aviso in avisos"
            :key="aviso.idAreaAviso + aviso.awarenessTypeName + aviso.startTime"
            class="alert d-flex align-items-start gap-2 py-2 px-3 mb-2"
            :class="estilosAviso[aviso.awarenessLevelID]?.alertClass"
            role="alert"
          >
            <span>{{ iconesAviso[aviso.awarenessTypeName] ?? '⚠️' }}</span>
            <div class="flex-grow-1">
              <div class="fw-semibold" style="font-size:0.8rem;">{{ aviso.awarenessTypeName }}</div>
              <div style="font-size:0.78rem;">{{ aviso.text }}</div>
              <div class="text-muted" style="font-size:0.68rem;">
                {{ new Date(aviso.startTime).toLocaleString('pt-PT', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) }}
                →
                {{ new Date(aviso.endTime).toLocaleString('pt-PT', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) }}
              </div>
            </div>
            <span class="badge ms-auto align-self-center"
              :class="estilosAviso[aviso.awarenessLevelID]?.badgeClass">
              {{ estilosAviso[aviso.awarenessLevelID]?.label ?? aviso.awarenessLevelID }}
            </span>
          </div>

          <p class="text-muted text-center mb-0 mt-1" style="font-size:0.65rem;">
            Avisos válidos para os próximos 3 dias · Fonte: IPMA
          </p>
        </div>

      </template>
    </div>
  </div>
</div>
</template>

<style scoped>
.alert-orange {
  background-color: #ffe0b2;
  border-left: 4px solid #f57c00;
  color: #4e2600;
}
.bg-orange {
  background-color: #f57c00 !important;
  color: #fff;
}
</style>