
![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1920px-Spotify_logo_with_text.svg.png)

# Spotify Demo version

This project is a exame project that aims to help me and my command learn how to use the Spotify Web API, built entirely with HTML, CSS, and JavaScript. The application uses the Spotify Web API to retrieve data about artists, albums, and tracks, and presents it in a user-friendly way.

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

4) In terminal write command:
```bash
npm i
```
5) Navigate to the file ```Auth.js``` 

Set your ```CLIENT_ID ``` and ```CLIENT_SECRET```

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
If you want to build desktop aplication, write command:
```bash
npm run build
```
Youre app will be in this directory:
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

