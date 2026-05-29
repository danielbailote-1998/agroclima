<script setup>
import { ref, computed } from 'vue'
import { culturas, alertasFinais } from '@/services/agricultureRules'

// Props recebidas do componente pai (IPMACard ou App.vue)
// previsaoDia: objeto com tMin, tMax, precipitaProb, classWindSpeed, predWindDir
// avisos: array de avisos activos do distrito
const props = defineProps({
  previsaoDia: { type: Object, default: null },
  avisos:      { type: Array,  default: () => [] },
  distrito:    { type: String, default: '' },
})

const culturaSelected = ref('')

const nomescultura = Object.keys(culturas)

const alertas = computed(() => {
  if (!culturaSelected.value || !props.previsaoDia) return []

  return alertasFinais(culturaSelected.value, {
    tMin:           parseFloat(props.previsaoDia.tMin),
    tMax:           parseFloat(props.previsaoDia.tMax),
    precipitaProb:  parseFloat(props.previsaoDia.precipitaProb),
    classWindSpeed: props.previsaoDia.classWindSpeed,
    predWindDir:    props.previsaoDia.predWindDir,
    avisos:         props.avisos,
  })
})

const classeAlerta = {
  danger:  'alert-danger',
  warning: 'alert-warning',
  info:    'alert-info',
  success: 'alert-success',
}
</script>

<template>
<div class="col-md-6 mb-3">
  <div class="card shadow-sm h-100 border-0">
    <div class="card-body p-3">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 class="mb-0 fw-bold">🌱 Cultura</h6>
          <small class="text-muted">
            {{ distrito ? `Monitorização para ${distrito}` : 'Monitorização agrícola' }}
          </small>
        </div>
        <select class="form-select form-select-sm w-auto" v-model="culturaSelected">
          <option value="" disabled>Selecionar...</option>
          <option v-for="nome in nomescultura" :key="nome" :value="nome">
            {{ culturas[nome].label }}
          </option>
        </select>
      </div>

      <hr class="my-2">

      <!-- Sem distrito/previsão -->
      <div v-if="!previsaoDia" class="text-center text-muted py-4 small">
        <div class="fs-3">🗺️</div>
        Selecione um distrito no card IPMA para ver os alertas agrícolas.
      </div>

      <!-- Sem cultura -->
      <div v-else-if="!culturaSelected" class="text-center text-muted py-4 small">
        <div class="fs-3">🌱</div>
        Selecione uma cultura para ver os alertas.
      </div>

      <!-- Alertas -->
      <template v-else>
        <div
          v-for="(alerta, i) in alertas"
          :key="i"
          class="alert py-2 px-3 mb-2 d-flex align-items-start gap-2"
          :class="classeAlerta[alerta.tipo]"
          role="alert"
        >
          <span>{{ alerta.icone }}</span>
          <span style="font-size:0.82rem;">{{ alerta.msg }}</span>
        </div>

        <p class="text-muted text-center mb-0 mt-2" style="font-size:0.65rem;">
          Alertas baseados na previsão IPMA · Não substituem aconselhamento técnico
        </p>
      </template>

    </div>
  </div>
</div>
</template>