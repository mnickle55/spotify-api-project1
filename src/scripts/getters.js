//import fetch from 'node-fetch'

//get recommendations based on some of the audio feature stats / need to build query out to specify properties
//https://api.spotify.com/v1/recommendations


let topTracksIDs = [];

const options = {
  method: 'GET', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'BQBEhArv26ZjHStnW8mzUM4YRjmIyWbj3iIGMItUKKJEEcPdoWGe8c42B_nWd0vhZNcYyM9R8gLB4ZOpB5trXdknKNvT0a7JC1tiZo0y_CouwLDzeKmEohZjuTqdwpqrtOJqmTBHajTBvzEnPjGl2KLAhC55DcZfa5O5tgau4AAa93LqMDCmUaganrcbtWTL0kaDeQP6l5a_dR8r6rGSWlPCuxi9dyA'
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
  

   







  

  




