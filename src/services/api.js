const api_URL = "https://api.ipma.pt/open-data/"; 

//Lista de identificadores para as capitais distrito e ilhas
async function getGlobalIdLocal() {
    try{
    const response = await fetch(api_URL + "distrits-islands.json")
    if(!response.ok){
        throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    return data;

    }catch(error){
    console.error("API error:", error);
    return null
    }
}
//Lista de identificadores das estações meteorológicas
async function getStations() {
    try{
    const response = await fetch(api_URL + "observation/meteorology/stations/stations.json")
    if(!response.ok){
        throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    return data;

    }catch(error){
    console.error("API error:", error);
    return null
    }
}

//Observação Meteorológica de Estações, últimas 3 horas (formato GeoJSON)
async function getObservations() {
    try{
    const response = await fetch(api_URL + "observation/meteorology/stations/obs-surface.geojson")
    if(!response.ok){
        throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    return data;

    }catch(error){
    console.error("API error:", error);
    return null
    }
}
//Previsão Meteorológica Diária até 3 dias, informação agregada por dia
/*
0 - é dia equivalente ao hoje
1 - amanhã
2 - depois de amanhã
*/
async function getPrevisions(idDay) {
    try{
    const response = await fetch(
    `${api_URL}forecast/meteorology/cities/daily/hp-daily-forecast-day${idDay}.json`
)    ;
    if(!response.ok){
        throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    return data;

    }catch(error){
    console.error("API error:", error);
    return null
    }
}

//Avisos Meteorológicos até 3 dias
async function getWarnings() {
    try{
    const response = await fetch(api_URL + "forecast/warnings/warnings_www.json")
    if(!response.ok){
        throw new Error("Erro ao obter dados da API");
    }
    const data = await response.json();
    return data;

    }catch(error){
    console.error("API error:", error);
    return null
    }
}

export { getGlobalIdLocal, getStations, getObservations, getPrevisions, getWarnings };