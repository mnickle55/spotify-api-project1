import { getTopTracks, 
        getRecommendations, 
        getTopArtists,
        getTopTracksAudioFeatures,
        getTrackAudioFeatures,
        getUser,
        getArtistGenresFromTrackID} from "./getters.js";

let audioObjs = []
var activeChart;
let sorted;
let imgArray = document.querySelectorAll('img')

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

  audioObjs = topTracks.map(track => new Audio(track.preview_url))
}

async function getTopArtistsAndStore(){
  const artists = await getTopArtists();
  artists.forEach((person,index) => sessionStorage.setItem(`TopArtist${index+1}`,person.id))
}

async function renderRecommendations(){
  let artists = [];
  let randomArtists = [];
  let tracks = [];
  let randomTracks =[];
  let genres = sessionStorage.getItem('genres')
  let genresArry = genres.split(',')
  let randomGenres;

  for (let i=1;i<=20;i++){
    if(sessionStorage.getItem(`TopArtist${i}`)){
      artists.push(sessionStorage.getItem(`TopArtist${i}`))
    }
  }
const shuffledArtists = artists.sort(() => 0.5 - Math.random());
randomArtists = shuffledArtists.slice(0, 1);

  for (let i=1;i<=12;i++){
    if(sessionStorage.getItem(`img${i}`)){
      tracks.push(sessionStorage.getItem(`img${i}`))
    }
  }

  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  randomTracks = shuffledTracks.slice(0, 2);

  const shuffledGenres = genresArry.sort(() => 0.5 - Math.random());
  randomGenres = shuffledGenres.slice(0, 2);

  const recommendations = await getRecommendations(randomArtists.join('%2C'),randomGenres.join('%2C').replaceAll(' ', '%20'),randomTracks.join('%2C'))

  document.getElementById('RecTrack1').innerText = recommendations[0].name
  document.getElementById('RecTrack2').innerText = recommendations[1].name
  document.getElementById('RecTrack3').innerText = recommendations[2].name
  document.getElementById('RecTrack4').innerText = recommendations[3].name
  document.getElementById('RecTrack5').innerText = recommendations[4].name

  document.getElementById('img13').src = recommendations[0].album.images[1].url
  document.getElementById('img14').src = recommendations[1].album.images[1].url
  document.getElementById('img15').src = recommendations[2].album.images[1].url
  document.getElementById('img16').src = recommendations[1].album.images[1].url
  document.getElementById('img17').src = recommendations[2].album.images[1].url

  sessionStorage.setItem('img13',recommendations[0].id)
  sessionStorage.setItem('img14',recommendations[1].id)
  sessionStorage.setItem('img15',recommendations[2].id)
  sessionStorage.setItem('img16',recommendations[3].id)
  sessionStorage.setItem('img17',recommendations[4].id)

  if(audioObjs[12]){
    for (let i=0;i<5;i++){
      audioObjs.splice(12+i,1,new Audio(recommendations[i].preview_url))
    }
  } else {
    recommendations.forEach(track => audioObjs.push(new Audio(track.preview_url)))
  }
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
  let avgTempo = Math.round(getAvgFeature('tempo'));
  let avgValence = getAvgFeature('valence');
  let avgLoudness = getAvgFeature('loudness');
  let avgLiveness = getAvgFeature('liveness');
  
  document.getElementById('audio-stats-title').innerText = 'Top Tracks Average Stats'
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

  if(!sessionStorage.getItem('genres')){
    sessionStorage.setItem('genres', genres)
  }

  for (const item of genres) {
    genreCounts[item] = genreCounts[item] ? genreCounts[item] + 1 : 1;
  }

  sorted = Object.entries(genreCounts)
    .sort(([,b],[,a]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  for (let key in sorted){
    if(sorted[key]<3){
      delete sorted[key]
    }
  }

  let chartBackgrounds = [];

  let chartThemeColors = ['rgb(209, 25, 145)','rgb(236, 152, 236)','rgb(234, 228, 240)','rgb(157, 197, 232)','rgb(71, 117, 208)','rgb(106, 226, 126)','rgb(243, 118, 222)']

  for(let i=0;i<10;i++){
    chartBackgrounds.push(chartThemeColors[Math.floor(Math.random()*chartThemeColors.length)])
  }

  async function RenderChart() {
    activeChart = new Chart(
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
              barThickness: 20,
            }
          ]
        },
        options: {
          scales: {
            x: {
              ticks: {color: 'white'},
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
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

async function getUserData(){
  const userData = await getUser();

  document.getElementById('user-img').src = userData.images[0].url
  document.getElementById('user-name').innerText = userData.display_name
  document.getElementById('user-email').innerText = userData.email
  document.getElementById('user-id').innerText = userData.id
  document.getElementById('user-url').innerText = userData.external_urls.spotify
  document.getElementById('link').href = userData.external_urls.spotify
}

async function handleTrackClick (event) {
  let skip = false;
  imgArray.forEach(item => {
    if(item.id !== event.target.id && item.id !== 'user-img'){
      item.parentElement.className = 'hover-zoomin';
    }
  })
  if(document.getElementById(event.target.id).parentElement.className === 'sticky-hover'){
    audioObjs.forEach(element => element.pause())
    document.getElementById(event.target.id).parentElement.className = 'normal-img'
    getTopTracksAudioFeaturesData()

    activeChart.data.labels =  Object.keys(sorted)
    activeChart.data.datasets[0].data = Object.values(sorted)
    activeChart.update()
    document.getElementById('chart-title').innerText = 'Top Genres'
    skip = true;

  } else if(event.target.id !== 'user-img' ) {
  document.getElementById(event.target.id).parentElement.className = 'sticky-hover'
  audioObjs.forEach(track => track.pause())

  audioObjs[Number(event.target.id.slice(3))-1].play();
  document.getElementById('chart-title').innerText = 'Song Genres'
  
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

  let itemDanceability = Math.round(audioFeats.danceability*100)/100;
  let itemDuration = audioFeats.duration_ms
  let itemEnergy = Math.round(audioFeats.energy*100)/100;
  let itemInstrumentalness = Math.round(audioFeats.instrumentalness*100)/100;
  let itemSpeechiness = Math.round(audioFeats.speechiness*100)/100;
  let itemTempo = Math.round(audioFeats.tempo);
  let itemValence = Math.round(audioFeats.valence*100)/100;
  let itemLoudness = Math.round(audioFeats.loudness*100)/100;
  let itemLiveness = Math.round(audioFeats.liveness*100)/100;

  document.getElementById('dance').innerText = itemDanceability;
  document.getElementById('duration').innerText = convertTime(itemDuration);
  document.getElementById('energy').innerText = itemEnergy;
  document.getElementById('instrument').innerText = itemInstrumentalness;
  document.getElementById('speech').innerText = itemSpeechiness;
  document.getElementById('tempo').innerText = itemTempo;
  document.getElementById('valence').innerText = itemValence;
  document.getElementById('loudness').innerText = itemLoudness;
  document.getElementById('liveness').innerText = itemLiveness;

  document.getElementById('audio-stats-title').innerText = event.target.parentElement.nextElementSibling.innerText

  if(skip===false){

    let trackGenres = await getArtistGenresFromTrackID(imgID)
    let vals = trackGenres.map(genre => 1)
  
    //use chart.js update method to update data
    activeChart.data.labels = trackGenres
    activeChart.data.datasets[0].data = vals
    activeChart.update()

  }


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

let refreshBtn = document.getElementById('refresh')
refreshBtn.addEventListener("click",function(event){


  
  audioObjs.forEach(element => element.pause())
  imgArray.forEach(item => {
    if(item.id !== event.target.id && item.id !== 'user-img'){
      item.parentElement.className = 'hover-zoomin';
    }
  })
  
  renderRecommendations();
  activeChart.data.labels =  Object.keys(sorted)
    activeChart.data.datasets[0].data = Object.values(sorted)
    activeChart.update()
    document.getElementById('chart-title').innerText = 'Top Genres'

})




getTopTracksData();
getTopTracksAudioFeaturesData();
getGenres();
getUserData();
getTopArtistsAndStore();
renderRecommendations();










