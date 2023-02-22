//get recommendations based on some of the audio feature stats / need to build query out to specify properties
//https://api.spotify.com/v1/recommendations

//import { access_token } from "../auth_code/auth.js";

let topTracksIDs = [];

let authToken = 'BQDV3kYGVEbEb5wJ6fz0WXHQLeKzpMr9t4NcSH7MRSFW76UoeZ0iyL1NqkLndKOq1kAposUaMXp_VcyTXedvLggu9W5PtYWUJoBvuct6pjupW_4gVYJ0vUez0opxMs53-4zHCDk76G0HACd2QdaMt9-7QIxiVYJfm5gGL2W-gbKroKDBrz4k9cJtBjDiHBcW-K3Vwnvnw_5ow4d9O3k0jw-_WhdHnPw'

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

export const getSingleTrack = (id) => 
fetch(`https://api.spotify.com/v1/tracks/${id}`,options)
      .then(response => response.json())
      .then(data => data.album)
      .catch(err => console.log(err))

export const getArtist = (id) => 
fetch(`https://api.spotify.com/v1/artists/${id}`,options)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err))

export const getArtistGenresFromTrackID = (id) => 
fetch(`https://api.spotify.com/v1/tracks/${id}`,options)
      .then(response => response.json())
      .then(data => {
        const artistID = data.album.artists[0].id
        return fetch(`https://api.spotify.com/v1/artists/${artistID}`,options)
      })
      .then(response => response.json())
      .then(data => data.genres)





