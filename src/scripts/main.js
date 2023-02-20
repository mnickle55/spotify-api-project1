import { getTopTracks, getRecommendations, getTopArtists,getTopTracksAudioFeatures } from "./getters.js";


async function getData(){
  const topTracks = await getTopTracks();
  show(topTracks);

}

function show(data){
  document.getElementById('Track1').innerText = data[0].name
  document.getElementById('Track2').innerText = data[1].name
  document.getElementById('Track3').innerText = data[2].name
  document.getElementById('Track4').innerText = data[3].name
  document.getElementById('Track5').innerText = data[4].name
  document.getElementById('Track6').innerText = data[5].name
  document.getElementById('Track7').innerText = data[6].name
  document.getElementById('Track8').innerText = data[7].name
  document.getElementById('Track9').innerText = data[8].name
  document.getElementById('Track10').innerText = data[9].name
}

getData();







