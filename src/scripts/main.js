import { getTopTracks, 
        getRecommendations, 
        getTopArtists,
        getTopTracksAudioFeatures,
        getTrackAudioFeatures} from "./getters.js";


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
  document.getElementById('Track11').innerText = topTracks[10].name
  document.getElementById('Track12').innerText = topTracks[11].name

  sessionStorage.setItem('img1',topTracks[0].id)
  sessionStorage.setItem('img2',topTracks[1].id)
  sessionStorage.setItem('img3',topTracks[2].id)
  sessionStorage.setItem('img4',topTracks[3].id)
  sessionStorage.setItem('img5',topTracks[4].id)
  sessionStorage.setItem('img6',topTracks[5].id)
  sessionStorage.setItem('img7',topTracks[6].id)
  sessionStorage.setItem('img8',topTracks[7].id)
  sessionStorage.setItem('img9',topTracks[8].id)
  sessionStorage.setItem('img10',topTracks[9].id)
  sessionStorage.setItem('img11',topTracks[10].id)
  sessionStorage.setItem('img12',topTracks[11].id)

  document.getElementById('img1').src = topTracks[0].album.images[1].url
  document.getElementById('img2').src = topTracks[1].album.images[1].url
  document.getElementById('img3').src = topTracks[2].album.images[1].url
  document.getElementById('img4').src = topTracks[3].album.images[1].url
  document.getElementById('img5').src = topTracks[4].album.images[1].url
  document.getElementById('img6').src = topTracks[5].album.images[1].url
  document.getElementById('img7').src = topTracks[6].album.images[1].url
  document.getElementById('img8').src = topTracks[7].album.images[1].url
  document.getElementById('img9').src = topTracks[8].album.images[1].url
  document.getElementById('img10').src = topTracks[9].album.images[1].url
  document.getElementById('img11').src = topTracks[10].album.images[1].url
  document.getElementById('img12').src = topTracks[11].album.images[1].url

}

async function getTopTracksAudioFeaturesData(){
  const topTracksAudioFeatures = await getTopTracksAudioFeatures();
  const getAvgFeature = feat => Math.round(100*topTracksAudioFeatures.map(item => item[feat]).reduce((acc,curr) => acc+curr)/topTracksAudioFeatures.length)/100

  const getAvgTime = feat => {
    let time = Math.round(100*topTracksAudioFeatures.map(item => item[feat]).reduce((acc,curr) => acc+curr)/topTracksAudioFeatures.length)/100000

    const minutes = Math.floor(time / 60)
    const seconds = Math.round(time - minutes * 60)

    return `${minutes} minutes ${seconds} seconds`
    
  }

  let avgDanceability = getAvgFeature('danceability');
  let avgDuration = getAvgTime('duration_ms');
  let avgEnergy = getAvgFeature('energy');
  let avgInstrumentalness = getAvgFeature('instrumentalness');
  let avgSpeechiness = getAvgFeature('speechiness');
  let avgTempo = getAvgFeature('tempo');
  let avgValence = getAvgFeature('valence');
  let avgLoudness = getAvgFeature('loudness');
  let avgLiveness = getAvgFeature('liveness');

  document.getElementById('dance').innerText = avgDanceability;
  document.getElementById('duration').innerText = avgDuration;
  document.getElementById('energy').innerText = avgEnergy;
  document.getElementById('instrument').innerText = avgInstrumentalness;
  document.getElementById('speech').innerText = avgSpeechiness;
  document.getElementById('tempo').innerText = avgTempo;
  document.getElementById('valence').innerText = avgValence;
  document.getElementById('loudness').innerText = avgLoudness;
  document.getElementById('liveness').innerText = avgLiveness;

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
              data: Object.values(sorted),
              backgroundColor: chartBackgrounds,
              borderRadius: 10,
              barThickness: 30,
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
  }

  RenderChart()

}

let imgArray = document.querySelectorAll('img')

async function handleTrackClick (event) {
  if(document.getElementById(event.target.id).parentElement.className === 'sticky-hover'){
    document.getElementById(event.target.id).parentElement.className = 'normal-img'
  } else {
    document.getElementById(event.target.id).parentElement.className = 'sticky-hover'
  }  

  //if no tracks are selected anymore, render avg stats again

  let imgID = sessionStorage.getItem(event.target.id);


  const audioFeats = await getTrackAudioFeatures(imgID)

  const convertTime = ms => {
    let time = ms/1000

    const minutes = Math.floor(time / 60)
    const seconds = Math.round(time - minutes * 60)

    return `${minutes} minutes ${seconds} seconds`
    
  }

  let itemDanceability = audioFeats.danceability;
  let itemDuration = audioFeats.duration_ms
  let itemEnergy = audioFeats.energy
  let itemInstrumentalness = audioFeats.instrumentalness
  let itemSpeechiness = audioFeats.speechiness
  let itemTempo = audioFeats.tempo
  let itemValence = audioFeats.valence
  let itemLoudness = audioFeats.loudness
  let itemLiveness = audioFeats.liveness

  document.getElementById('dance').innerText = itemDanceability;
  document.getElementById('duration').innerText = convertTime(itemDuration);
  document.getElementById('energy').innerText = itemEnergy;
  document.getElementById('instrument').innerText = itemInstrumentalness;
  document.getElementById('speech').innerText = itemSpeechiness;
  document.getElementById('tempo').innerText = itemTempo;
  document.getElementById('valence').innerText = itemValence;
  document.getElementById('loudness').innerText = itemLoudness;
  document.getElementById('liveness').innerText = itemLiveness;

}

function handleMouseOut (event) {
  if(document.getElementById(event.target.id).parentElement.className === 'normal-img'){
    document.getElementById(event.target.id).parentElement.className = 'hover-zoomin'
  } 
}



imgArray.forEach(element => element.addEventListener("click",function(event){
  handleTrackClick(event)
}))

imgArray.forEach(element => element.addEventListener("mouseout",function(event){
  handleMouseOut(event)
}))




getTopTracksData();
getTopTracksAudioFeaturesData();
getGenres()








