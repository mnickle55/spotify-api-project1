import { getTopTracks, getRecommendations, getTopArtists,getTopTracksAudioFeatures} from "./getters.js";


async function getTopTracksData(){
  const topTracks = await getTopTracks();

  document.getElementById('Track1').innerText = topTracks[0].name
  document.getElementById('Track2').innerText = topTracks[1].name
  document.getElementById('Track3').innerText = topTracks[2].name
  document.getElementById('Track4').innerText = topTracks[3].name
  document.getElementById('Track5').innerText = topTracks[4].name
  document.getElementById('Track6').innerText = topTracks[5].name
  document.getElementById('Track7').innerText = topTracks[6].name
  document.getElementById('Track8').innerText = topTracks[7].name
  document.getElementById('Track9').innerText = topTracks[8].name
  document.getElementById('Track10').innerText = topTracks[9].name

}

async function getTopTracksAudioFeaturesData(){
  const topTracksAudioFeatures = await getTopTracksAudioFeatures();
  const getAvgFeature = feat => Math.round(100*topTracksAudioFeatures.map(item => item[feat]).reduce((acc,curr) => acc+curr)/topTracksAudioFeatures.length)/100

  let avgDanceability = getAvgFeature('danceability');
  let avgDuration = getAvgFeature('duration_ms');
  let avgEnergy = getAvgFeature('energy');
  let avgInstrumentalness = getAvgFeature('instrumentalness');
  let avgSpeechiness = getAvgFeature('speechiness');
  let avgTempo = getAvgFeature('tempo');
  let avgValence = getAvgFeature('valence');

  document.getElementById('dance').innerText = avgDanceability;
  document.getElementById('duration').innerText = avgDuration;
  document.getElementById('energy').innerText = avgEnergy;
  document.getElementById('instrument').innerText = avgInstrumentalness;
  document.getElementById('speech').innerText = avgSpeechiness;
  document.getElementById('tempo').innerText = avgTempo;
  document.getElementById('valence').innerText = avgValence;

}

async function getGenres(){
  let genres = [];
  let genreCounts = {};
  const topArtists = await getTopArtists();
  topArtists.forEach(item=>genres = genres.concat(item.genres))


  for (const item of genres) {
    genreCounts[item] = genreCounts[item] ? genreCounts[item] + 1 : 1;
  }

  let sorted = Object.entries(genreCounts)
    .sort(([,b],[,a]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  for (let key in sorted){
    if(sorted[key]<3){
      delete sorted[key]
    }
  }

  let chartBackgrounds = [];

  for(let i=0;i<10;i++){
    let rgb =[];
    for(let j = 0; j < 3; j++){
      rgb.push(Math.floor(Math.random() * 255));
    }
    let backgroundColor = 'rgb('+ rgb.join(',') +')';
    chartBackgrounds.push(backgroundColor)
  }

  async function RenderChart() {
    new Chart(
      document.getElementById('myChart'),
      {
        type: 'bar',
        data: {
          labels: Object.keys(sorted),
          datasets: [
            {
              label: 'Your Top Genres',
              data: Object.values(sorted),
              backgroundColor: chartBackgrounds

            }
          ]
        }
      }
    );
  }

  RenderChart()


}





getTopTracksData();
getTopTracksAudioFeaturesData();
getGenres()








