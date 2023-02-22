let topTracksIDs = [];

let authToken = 'BQCYdhh8OBW-V5LBP31zDHBEZ9kbyxo0C6X3O9C_qzPMdmgwq78hTapyQ4VOCgDRnAHyzjkh2YqVvhLINNj9DCnFfwwE3hA1ibBc914PCGTRbsu5uBbPwIAjdNnHxoABb8jLfUM4C4UeghjW06fA3iD8l26ZrmxWcPlFFf536qKasKN9Apt5Wb4eaPo7rnr1R7ZWqcmpygzGSbttchcLAvwkp5Lzsy4'

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
      .then(data => data.tracks)
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