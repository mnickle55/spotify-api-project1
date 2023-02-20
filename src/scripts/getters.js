//import fetch from 'node-fetch'

//get recommendations based on some of the audio feature stats / need to build query out to specify properties
//https://api.spotify.com/v1/recommendations

let topTracksIDs = [];

let authToken = 'BQDuCkJemfNOas3OGUyJCnH6xpY9YqHU54Dw0BcpMZH4hN61evlBkYDKv_vvIKhbQdOc25MX2gpTLbGPHPGa9C3bl5KMvvAs4X9lgjB8VJ1r539sn63dhue5AoJQ4P0i9y17aWB7B0JPxfgby0bbMuvluPOgcGGmmdNOIamI31gLCfdu-oDZQ5sA1La8jo6t3NOlw76SiCfp84peARuyot9RKqghfP0'

const options = {
  method: 'GET', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken
  }
}

export const getTopTracks = () => fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0',options)
  .then(response => response.json())
  .then(data => data.items)
  .catch(err => console.log(err))

export const getTopTracksAudioFeatures = () => fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0',options)
  .then(response => response.json())
  .then(data => 
    {data.items.forEach(track=>{
      topTracksIDs.push(track.id)
      })
      return Promise.all(topTracksIDs.map(id => 
        fetch("https://api.spotify.com/v1/audio-features/"+id , options)
          .then(response => response.json())
          .catch(err => console.log(err))
        ))
    })
    .then(data => {
      return data})
    .catch(err => console.log(err))

export const getTopArtists = () => fetch('https://api.spotify.com/v1/me/top/artists',options)
    .then(response => response.json())
    .then(data => data.items)
    .catch(err => console.log(err))

    // "https://api.spotify.com/v1/recommendations?limit=5&market=ES&seed_artists=0u18Cq5stIQLUoIaULzDmA&seed_genres=dance%20pop%2Cedm%2Cpop&seed_tracks=0c6xIDDpzE81m2q797ordA"
    // docs to see all parameters: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations

export const getRecommendations = (artistIDs,genres,trackIDs) => fetch(`https://api.spotify.com/v1/recommendations?limit=5&market=ES&seed_artists=${artistIDs}&seed_genres=${genres}&seed_tracks=${trackIDs}`,options)
      .then(response => response.json())
      .then(data => console.log(data.tracks))
      .catch(err => console.log(err))
  

   







  

  




