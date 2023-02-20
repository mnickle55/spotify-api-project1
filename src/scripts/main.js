import { getTopTracks } from "./getters.js";

let topTracksIDs = [];

const options = {
  method: 'GET', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'BQBEhArv26ZjHStnW8mzUM4YRjmIyWbj3iIGMItUKKJEEcPdoWGe8c42B_nWd0vhZNcYyM9R8gLB4ZOpB5trXdknKNvT0a7JC1tiZo0y_CouwLDzeKmEohZjuTqdwpqrtOJqmTBHajTBvzEnPjGl2KLAhC55DcZfa5O5tgau4AAa93LqMDCmUaganrcbtWTL0kaDeQP6l5a_dR8r6rGSWlPCuxi9dyA'
  }
}

async function getData(){
  const topTracks = await getTopTracks();
  show(topTracks);

}

function show(data){
  document.querySelector('p').innerText = data
}

getData();







