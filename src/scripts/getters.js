//get recommendations based on some of the audio feature stats / need to build query out to specify properties
//https://api.spotify.com/v1/recommendations

//import { access_token } from "../auth_code/auth.js";

let topTracksIDs = [];

let authToken = 'BQDoTPDggc3kTQTw7p1RX924zR8vGRxdSPVHXxwvG7mjOB1AfoeXGlcfuOckLyBs175gGZbU-41C18hAJNAlTNlWV_sleJsb7qFQF2v1KBQ9FTFOIaSQks7eICTFl02iNDdeGcG8BIP1-VLMVAko93XcGCzVMNNq_dfl60RHhiCqUwL8Tz-P2zqM0I-Q5TiOzdu2YGL7Y4DuwU1Qbe5snTa0YjTYgyw'

const options = {
  method: 'GET', 
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken
  }
}

export const getTopTracks = () => fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=12&offset=0',options)
  .then(response => response.json())
  .then(data => data.items)
  .catch(err => console.log(err))

export const getTrackPreview = (id) => fetch(`https://api.spotify.com/v1/tracks/${id}`,options)
  .then(response => response.json())
  .then(data => data.preview_url)
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


export const getTrackAudioFeatures = id => fetch(`https://api.spotify.com/v1/audio-features?ids=${id}`,options)
      .then(response => response.json())
      .then(data => data.audio_features[0])
      .catch(err => console.log(err))

export const getUser = () =>
fetch('https://api.spotify.com/v1/me',options)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err))





  

  




