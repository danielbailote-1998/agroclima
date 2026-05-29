<script setup>
import { computed } from 'vue'

const props = defineProps({
  previsaoDia: { type: Object, default: null },
  observacao:  { type: Object, default: null },
})

const tempValida = (v) => v != null && v !== -99.0 && v !== -99
const descVento = { 1: 'Fraco', 2: 'Moderado', 3: 'Forte', 4: 'Muito forte' }

const temperatura = computed(() => {
  if (props.observacao && tempValida(props.observacao.temperatura))
    return props.observacao.temperatura + ' °C'
  if (props.previsaoDia)
    return `${props.previsaoDia.tMin}° / ${props.previsaoDia.tMax}°C`
  return '—'
})

const tempLabel = computed(() => {
  const tMax = props.previsaoDia?.tMax ?? props.observacao?.temperatura
  if (tMax == null) return null
  const t = parseFloat(tMax)
  if (t > 35) return { texto: 'Stress térmico possível',  classe: 'lbl-danger'  }
  if (t > 28) return { texto: 'Calor — vigiar rega',      classe: 'lbl-warning' }
  if (t < 5)  return { texto: 'Risco de geada',           classe: 'lbl-danger'  }
  return              { texto: 'Ideal para crescimento',  classe: 'lbl-success' }
})

const precipitacao = computed(() => {
  if (props.previsaoDia) return props.previsaoDia.precipitaProb + ' %'
  return '—'
})

const precipLabel = computed(() => {
  const p = parseFloat(props.previsaoDia?.precipitaProb ?? -1)
  if (p < 0)   return null
  if (p >= 70) return { texto: 'Possível rega natural',       classe: 'lbl-primary' }
  if (p >= 40) return { texto: 'Precipitação incerta',        classe: 'lbl-warning' }
  return              { texto: 'Sem chuva — verificar rega',  classe: 'lbl-danger'  }
})

const vento = computed(() => {
  if (props.observacao && tempValida(props.observacao.intensidadeVentoKM))
    return props.observacao.intensidadeVentoKM + ' km/h'
  if (props.previsaoDia)
    return descVento[props.previsaoDia.classWindSpeed] ?? '—'
  return '—'
})

const ventoLabel = computed(() => {
  const classe = props.previsaoDia?.classWindSpeed
  const kmh    = props.observacao?.intensidadeVentoKM
  const forte  = classe >= 3 || (tempValida(kmh) && kmh > 40)
  if (forte) return { texto: 'Evitar pulverizações', classe: 'lbl-danger'  }
  return           { texto: 'Condições normais',     classe: 'lbl-success' }
})

const humidade = computed(() => {
  if (props.observacao && tempValida(props.observacao.humidade))
    return props.observacao.humidade + ' %'
  return '—'
})

const humidadeLabel = computed(() => {
  const h = parseFloat(props.observacao?.humidade ?? -1)
  if (h < 0)   return null
  if (h > 85)  return { texto: 'Risco de fungos',       classe: 'lbl-danger'  }
  if (h > 65)  return { texto: 'Boa retenção hídrica',  classe: 'lbl-primary' }
  return              { texto: 'Humidade baixa',         classe: 'lbl-warning' }
})

const semDados = computed(() => !props.previsaoDia && !props.observacao)
</script>

<template>
  <div class="row g-2 g-md-3 mb-1">
    <!-- Temperatura -->
    <div class="col-6 col-md-3">
      <div class="icard">
        <div class="icard-icon">🌡️</div>
        <div class="icard-label">Temperatura</div>
        <div class="icard-value">{{ temperatura }}</div>
        <div v-if="!semDados && tempLabel" :class="['icard-sub', tempLabel.classe]">{{ tempLabel.texto }}</div>
        <div v-else-if="semDados" class="icard-sub lbl-muted">Selecione um distrito</div>
      </div>
    </div>

    <!-- Precipitação -->
    <div class="col-6 col-md-3">
      <div class="icard">
        <div class="icard-icon">🌧️</div>
        <div class="icard-label">Prob. Precipitação</div>
        <div class="icard-value">{{ precipitacao }}</div>
        <div v-if="!semDados && precipLabel" :class="['icard-sub', precipLabel.classe]">{{ precipLabel.texto }}</div>
        <div v-else-if="semDados" class="icard-sub lbl-muted">Selecione um distrito</div>
      </div>
    </div>

    <!-- Vento -->
    <div class="col-6 col-md-3">
      <div class="icard">
        <div class="icard-icon">💨</div>
        <div class="icard-label">Intensidade do Vento</div>
        <div class="icard-value">{{ vento }}</div>
        <div v-if="!semDados" :class="['icard-sub', ventoLabel.classe]">{{ ventoLabel.texto }}</div>
        <div v-else-if="semDados" class="icard-sub lbl-muted">Selecione um distrito</div>
      </div>
    </div>

    <!-- Humidade -->
    <div class="col-6 col-md-3">
      <div class="icard">
        <div class="icard-icon">💧</div>
        <div class="icard-label">Humidade do Ar</div>
        <div class="icard-value">{{ humidade }}</div>
        <div v-if="!semDados && humidadeLabel" :class="['icard-sub', humidadeLabel.classe]">{{ humidadeLabel.texto }}</div>
        <div v-else-if="semDados" class="icard-sub lbl-muted">Selecione um distrito</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icard {
  background: #fff;
  border-radius: 10px;
  padding: 0.75rem 0.65rem 0.6rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
.icard-icon  { font-size: 1.4rem; line-height: 1; margin-bottom: 3px; }
.icard-label { font-size: 0.65rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
.icard-value { font-size: 1.1rem; font-weight: 700; color: #111; line-height: 1.2; }
.icard-sub   { font-size: 0.67rem; margin-top: 3px; font-weight: 500; }

.lbl-danger  { color: #dc2626; }
.lbl-warning { color: #d97706; }
.lbl-success { color: #16a34a; }
.lbl-primary { color: #2563eb; }
.lbl-muted   { color: #9ca3af; }
</style>