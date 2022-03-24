const BASE_URL = 'https://swapi.dev/api'

async function fetchChar(API,page=1) {
  const response = await API.get(`${BASE_URL}/people/?page=${page}`);
  const data = response.data.results
  console.log(data)
  return data
    
}


module.exports = {fetchChar}