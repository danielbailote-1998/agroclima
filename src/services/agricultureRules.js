// Regras agronómicas por cultura
// Cada regra recebe { tMin, tMax, precipitaProb, classWindSpeed, predWindDir, avisos }
// e devolve um array de alertas: { tipo: 'danger'|'warning'|'info'|'success', icone, msg }

const culturas = {
  Milho: {
    label: 'Milho 🌽',
    regras: [
      ({ tMax }) => tMax > 35
        ? { tipo: 'danger',  icone: '🌡️', msg: `Temperatura máxima elevada (${tMax}°C) — risco de stress térmico na polinização.` }
        : null,
      ({ tMin }) => tMin < 10
        ? { tipo: 'warning', icone: '❄️', msg: `Temperatura mínima baixa (${tMin}°C) — pode inibir a germinação.` }
        : null,
      ({ precipitaProb }) => precipitaProb >= 70
        ? { tipo: 'info',    icone: '🌧️', msg: `Alta probabilidade de chuva (${precipitaProb}%) — adiar tratamentos fitossanitários.` }
        : null,
      ({ precipitaProb }) => precipitaProb < 20
        ? { tipo: 'warning', icone: '💧', msg: `Baixa probabilidade de chuva (${precipitaProb}%) — verificar necessidade de rega.` }
        : null,
      ({ classWindSpeed }) => classWindSpeed >= 3
        ? { tipo: 'warning', icone: '💨', msg: 'Vento forte — evitar pulverizações hoje.' }
        : null,
      ({ avisos }) => avisos.some(a => a.awarenessTypeName === 'Trovoada')
        ? { tipo: 'danger',  icone: '⛈️', msg: 'Trovoada prevista — suspender operações de campo.' }
        : null,
    ]
  },

  Tomate: {
    label: 'Tomate 🍅',
    regras: [
      ({ tMax }) => tMax > 35
        ? { tipo: 'danger',  icone: '🌡️', msg: `Calor excessivo (${tMax}°C) — risco de abortamento floral e queima de frutos.` }
        : null,
      ({ tMin }) => tMin < 12
        ? { tipo: 'warning', icone: '❄️', msg: `Noite fria (${tMin}°C) — risco de má frutificação.` }
        : null,
      ({ tMax, precipitaProb }) => tMax > 25 && precipitaProb >= 60
        ? { tipo: 'danger',  icone: '🍄', msg: `Calor com humidade elevada — alto risco de míldio e alternariose. Considerar fungicida.` }
        : null,
      ({ precipitaProb }) => precipitaProb >= 70
        ? { tipo: 'info',    icone: '🌧️', msg: `Chuva provável (${precipitaProb}%) — adiar pulverizações.` }
        : null,
      ({ precipitaProb }) => precipitaProb < 20
        ? { tipo: 'warning', icone: '💧', msg: 'Sem chuva prevista — garantir rega regular (1.5–2 L/planta/dia em produção).' }
        : null,
      ({ classWindSpeed }) => classWindSpeed >= 3
        ? { tipo: 'warning', icone: '💨', msg: 'Vento forte — risco de danos mecânicos. Verificar tutores.' }
        : null,
      ({ avisos }) => avisos.some(a => a.awarenessTypeName === 'Tempo Quente')
        ? { tipo: 'danger',  icone: '☀️', msg: 'Aviso de calor IPMA — ponderar rega de arrefecimento foliar.' }
        : null,
    ]
  },

  Oliveira: {
    label: 'Oliveira 🌿',
    regras: [
      ({ tMax }) => tMax > 38
        ? { tipo: 'danger',  icone: '🌡️', msg: `Temperatura muito elevada (${tMax}°C) — risco de queda de azeitona jovem.` }
        : null,
      ({ tMin }) => tMin < 0
        ? { tipo: 'danger',  icone: '🧊', msg: `Geada possível (${tMin}°C) — risco de danos nos rebentos novos.` }
        : null,
      ({ precipitaProb }) => precipitaProb >= 70
        ? { tipo: 'warning', icone: '🍄', msg: `Humidade elevada — risco de gafa e olho de pavão. Vigiar.` }
        : null,
      ({ precipitaProb }) => precipitaProb < 15
        ? { tipo: 'info',    icone: '💧', msg: 'Período seco — oliveira adulta tolera bem, mas jovens plantações necessitam rega.' }
        : null,
      ({ classWindSpeed }) => classWindSpeed >= 3
        ? { tipo: 'info',    icone: '💨', msg: 'Vento forte — período favorável para arejamento e redução de humidade na copa.' }
        : null,
      ({ avisos }) => avisos.some(a => a.awarenessTypeName === 'Tempo Quente')
        ? { tipo: 'warning', icone: '☀️', msg: 'Onda de calor — risco de stress hídrico em olival jovem ou regado.' }
        : null,
    ]
  },

  Trigo: {
    label: 'Trigo 🌾',
    regras: [
      ({ tMax }) => tMax > 30
        ? { tipo: 'warning', icone: '🌡️', msg: `Temperatura alta (${tMax}°C) — pode acelerar maturação e reduzir peso do grão.` }
        : null,
      ({ tMin }) => tMin < 0
        ? { tipo: 'danger',  icone: '🧊', msg: `Geada possível (${tMin}°C) — risco severo em fase de espigamento.` }
        : null,
      ({ precipitaProb, tMax }) => precipitaProb >= 60 && tMax > 18
        ? { tipo: 'danger',  icone: '🍄', msg: 'Condições favoráveis a fusariose e oídio — considerar tratamento preventivo.' }
        : null,
      ({ precipitaProb }) => precipitaProb >= 70
        ? { tipo: 'info',    icone: '🌧️', msg: `Chuva provável — adiar colheita se trigo estiver em maturação.` }
        : null,
      ({ classWindSpeed }) => classWindSpeed >= 3
        ? { tipo: 'warning', icone: '💨', msg: 'Vento forte — risco de acama. Verificar estado da cultura.' }
        : null,
      ({ avisos }) => avisos.some(a => a.awarenessTypeName === 'Trovoada')
        ? { tipo: 'danger',  icone: '⛈️', msg: 'Trovoada — suspender colheita mecanizada.' }
        : null,
    ]
  },

  Vinha: {
    label: 'Vinha 🍇',
    regras: [
      ({ tMax }) => tMax > 35
        ? { tipo: 'danger',  icone: '🌡️', msg: `Calor intenso (${tMax}°C) — risco de escaldão nos cachos.` }
        : null,
      ({ tMin }) => tMin < 0
        ? { tipo: 'danger',  icone: '🧊', msg: `Geada (${tMin}°C) — risco elevado de perda de abrolhamento ou cachos jovens.` }
        : null,
      ({ tMax, precipitaProb }) => tMax > 20 && precipitaProb >= 60
        ? { tipo: 'danger',  icone: '🍄', msg: 'Condições ideais para míldio e oídio — tratamento preventivo urgente.' }
        : null,
      ({ precipitaProb }) => precipitaProb >= 70
        ? { tipo: 'warning', icone: '🌧️', msg: `Chuva provável (${precipitaProb}%) — adiar tratamentos e vindima.` }
        : null,
      ({ classWindSpeed }) => classWindSpeed >= 3
        ? { tipo: 'warning', icone: '💨', msg: 'Vento forte — evitar pulverizações.' }
        : null,
      ({ avisos }) => avisos.some(a => a.awarenessTypeName === 'Trovoada')
        ? { tipo: 'danger',  icone: '⛈️', msg: 'Trovoada prevista — suspender operações na vinha.' }
        : null,
      ({ tMin, tMax }) => tMin >= 12 && tMax <= 28
        ? { tipo: 'success', icone: '✅', msg: 'Temperatura ideal para desenvolvimento vegetativo da vinha.' }
        : null,
    ]
  },
}

// Avalia todas as regras de uma cultura para um conjunto de dados meteorológicos
function avaliarCultura(nomeCultura, dadosMet) {
  const cultura = culturas[nomeCultura]
  if (!cultura) return []

  return cultura.regras
    .map(regra => regra(dadosMet))
    .filter(Boolean)
}

// Acrescenta alerta genérico positivo se não houver alertas negativos
function alertasFinais(nomeCultura, dadosMet) {
  const alertas = avaliarCultura(nomeCultura, dadosMet)
  const temProblema = alertas.some(a => a.tipo === 'danger' || a.tipo === 'warning')
  if (!temProblema && alertas.length === 0) {
    alertas.push({
      tipo: 'success',
      icone: '✅',
      msg: 'Condições gerais favoráveis para a cultura hoje.'
    })
  }
  return alertas
}

export { culturas, alertasFinais }