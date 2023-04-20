
![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1920px-Spotify_logo_with_text.svg.png)

# Spotify Demo version

This project is a exam project that aims to help me and my command learn how to use the Spotify Web API, built entirely with HTML, CSS, and JavaScript. The application uses the Spotify Web API to retrieve data about artists, albums, and tracks, and presents it in a user-friendly way.

## Getting Started
1) Download and install [![nodejs](https://img.shields.io/badge/node.js-000?style=for-the-badge&logo=nodedotjs&logoColor=green)](https://nodejs.org/en/)


2) Clone the repository to your local machine:

```bash
git clone https://github.com/semklim/SpotifyAPI_Exame_Step.git
```

3) Navigate to the cloned directory:

```bash
cd SpotifyAPI_Exame_Step
```

4) Open the file ```KEYS.js```, in directory public/SPOTIFY_APP_KEYS/

    Set your ```clientId``` and ```clientSecret```.

    #### Where this keys I can get? 
    
    Visit this page [![spotify](https://img.shields.io/badge/Spotify_WEB_API-400073?style=for-the-badge&logo=spotify&logoColor=green)](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)

5) In terminal write command:

```bash
npm i
```

6) Finally, write command:

```bash
npm run server
``` 
And open in browser http://localhost:8888

_________OR_________

If you want to start desktop application write command:
```bash
npm run start
``` 
_________IF_________

If you want to build desktop application, write command:
```bash
npm run build
```
Your app will be in this directory:
/SpotifyAPI_Exame_Step/electron-build

## Features 
The application includes the following features:
- Authentication with the Spotify Web API using OAuth 2.0
- Getting recommendation
- Searching playlists, tracks and albums
- Selection of playlists by genre
- Display information about artists, albums, and tracks, including album covers, track lists, and release dates
- Play track previews by clicking on a track
- Save tracks as favorites
- View a list of favorite tracks

## License
This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

