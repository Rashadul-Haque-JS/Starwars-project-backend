const BASE_URL = 'https://swapi.dev/api'



async function fetchChar(API,page) {
  const response = await API.get(`${BASE_URL}/people/?page=${page}`);
  const data = response.data.results
  return data
    
}


async function fetchPlanets(API) {
  const response = await API.get(`${BASE_URL}/planets`);
  const data = response.data.results
  return data
    
}


async function fetchStarships(API) {
  const response = await API.get(`${BASE_URL}/starships`);
  const data = response.data.results
  return data
    
}

async function fetchVehicles(API) {
  const response = await API.get(`${BASE_URL}/vehicles`);
  const data = response.data.results
  return data
    
}

module.exports = { fetchChar, fetchPlanets, fetchStarships, fetchVehicles } 


