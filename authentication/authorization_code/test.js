import fetch from 'node-fetch'


let myPlaylists = fetch('https://api.spotify.com/v1/users/mack.spotify1/playlists', {
  method: 'GET', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
  }
})
  .then((response) => {
      console.log(response.json().then(
          (data) => { console.log(data) }
      ));
  });

export {myPlaylists}