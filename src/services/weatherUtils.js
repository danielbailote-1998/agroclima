function filterWarningsByArea(warnings, idAreaAviso) {
    return warnings.filter(w =>
        w.idAreaAviso === idAreaAviso &&
        w.awarenessLevelID !== 'green'
    )
}

// Distância em km entre dois pontos (Haversine simplificado)
function distanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
              Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Encontra a observação da estação mais próxima de um distrito
function observacaoMaisProxima(observacoes, estacoes, latDistrito, lonDistrito) {
    let melhor = null;
    let menorDist = Infinity;

    for (const obs of observacoes.features) {
        const p = obs.properties;
        // ignora registos sem temperatura válida
        if (!p || p.temperatura == null || p.temperatura === -99.0) continue;

        // encontra coordenadas desta estação
        const estacao = estacoes.find(e => e.properties.idEstacao === p.idEstacao);
        if (!estacao) continue;

        const [lon, lat] = estacao.geometry.coordinates;
        const dist = distanciaKm(latDistrito, lonDistrito, lat, lon);
        if (dist < menorDist) {
            menorDist = dist;
            melhor = p;
        }
    }
    return melhor;
}

export { filterWarningsByArea, observacaoMaisProxima }