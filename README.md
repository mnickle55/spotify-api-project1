# Spotify API Project

This project was forked from [this Spotify Web API Example](https://github.com/spotify/web-api-examples).

## Installation

This application runs on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.

Once installed, clone the repository, navigate to the /src folder, and install its dependencies running:

    $ npm install

### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. For the examples, we registered these Redirect URIs:

* http://localhost:8888 (needed for the implicit grant flow)
* http://localhost:8888/callback

Once you have created your app, replace the `client_id`, `redirect_uri` and `client_secret` in the `app.js` file with the values you get from the Spotify Developers Dashboard.

## Running the application
In order to run this application, navigate to the the auth_code folder, and run its `app.js` file. For instance, to run the script:

    $ cd auth_code
    $ node app

Then, open `http://localhost:8888` in a browser to begin.

Afting loggin in with your Spotify account, the temporary access token will be console logged to your IDE terminal. Paste this string to the `authToken` variable in the getters.js file. Then refresh the localhost:8888/homepage.html in your browser.
