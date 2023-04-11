"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import prepareTracks from './helpers/tracks/prepareTracksObj.js';
import mainHandler from "./mainHandler.js";
import { OnPlayFunc } from "./OnPlayFunc.js";
import { addIsLikedKey } from './helpers/tracks/trackBoxFunc/trackBoxFunc.js';
import htmlRecomm from './pagePartials/groupOfPlaylist/groupOfPlaylist.js';
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
const APP = (function (API, UI) {
    let history = [];
    const getToken = async () => {
        if (Cookie.get('accessToken') === null) {
            const { access_token, expires_in } = await Auth.getToken();
            API.accessToken = access_token;
            API.expires_in = new Date(Date.now() + (expires_in * 1000));
        }
    };
    const initLogin = async () => {
        await Auth.login();
        API.accessToken = Auth.accessToken;
        API.expires_in = Auth.expires_in;
        API.user = await API.UserProfile();
        Cookie.set('accessToken', Auth.accessToken, 15);
        Cookie.set('refreshToken', Auth.refreshToken, 15);
        Cookie.set('expires_in', Auth.expires_in.toUTCString(), 15);
        Cookie.set('userProfile', JSON.stringify(API.user), 15);
        btn.setAttribute('data-isLoggedIn', 'true');
        btn.textContent = "Logout";
    };
    const initLogout = async () => {
        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
        spotifyLogoutWindow.close();
        Auth.accessToken = null;
        Auth.refreshToken = null;
        API.user = null;
        API.accessToken = null;
        API.expires_in = null;
        btn.setAttribute('data-isLoggedIn', 'false');
        btn.textContent = "Login";
        Cookie.clearAllCookie();
    };
    const UserProfile = async () => {
        const user = await API.UserProfile();
        UI.createAccount(user);
    };
    const genGenres = async () => {
        const genres = await API.Genres();
        UI.createGenres(genres);
    };
    const playlistsByGenre = async (genreName, genreID) => {
        const list = await API.GetCategoryPlaylists(genreID);
        if (list.status === '404') {
            const delEL = document.getElementById(`${genreID}`);
            delEL.style.backgroundColor = '#444';
            delEL.children[0].setAttribute('style', `
			width:100%;
			height: 100%;
			color: white;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			`);
            delEL.children[0].innerHTML = '<p>Sorry, this genre is not available</p>';
            return undefined;
        }
        UI.createGenresRes(genreName, list.playlists.items);
    };
    const tracksByPlaylist = async (id) => {
        const playlist = await API.GetPlaylist(id);
        const tracks = await prepareTracks(playlist, API);
        UI.createTracks(playlist);
        OnPlayFunc(tracks);
    };
    const PageSearch = async () => {
        const searchBox = document.querySelector('.searchbox');
        const queryFormatter = new QueryFormatter();
        const SearchAPP = new Search(searchBox, queryFormatter, API);
        SearchAPP.input.addEventListener('input', async () => {
            const requestBox = document.querySelector('.requestBox');
            const resultAlbumsObj = await SearchAPP.handleInput('album');
            const resultArtistsObj = await SearchAPP.handleInput('artist');
            const resultPlaylistsObj = await SearchAPP.handleInput('playlist');
            const resultTracksObj = await SearchAPP.handleInput('track');
            const albums = resultAlbumsObj;
            albums.message = 'Albums';
            const artists = resultArtistsObj;
            artists.message = 'Artists';
            const playlists = resultPlaylistsObj;
            playlists.message = 'Tracks';
            const tracks = resultTracksObj.tracks.items;
            if (searchBox.value === '') {
                requestBox.innerHTML = '';
            }
            else {
                requestBox.innerHTML = htmlRecomm([albums, playlists, artists], searchBox.value);
            }
            console.log(searchBox.value);
            console.log(albums);
            console.log(artists);
            // console.log(playlists)
            // console.log(tracks)
            // console.log(resultAlbumsObj);
            // console.log(resultArtistsObj);
            // console.log(resultPlaylistsObj);
            // console.log(resultTracksObj);
        });
    };
    const PageRecomm = async () => {
        const newReleases = await API.getNewReleases();
        const featured = await API.getFeaturedPlaylists();
        const recentlyPlayed = await API.UserRecentlyPlayedTracks();
        let topTracks = await API.getUserTopTracks();
        newReleases.message = 'New Releases';
        console.log('newReleases ', newReleases);
        console.log('featured ', featured);
        console.log('recentlyPlayed ', recentlyPlayed);
        console.log(topTracks);
        topTracks = topTracks.items.sort((el1, el2) => el1.popularity > el2.popularity ? -1 : 1);
        console.log('sorted ', topTracks);
        const query = 'daily';
        const type = 'playlist';
        const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=ES&limit=50&offset=0`;
        const result = await API.get(url);
        let count = [];
        result.playlists.items = result.playlists.items.filter((el) => {
            if (el.owner.display_name === 'Spotify') {
                if (el.name.includes('Daily')) {
                    const number = el.name.match(/\d/g) ? el.name.match(/\d/g)[0] : undefined;
                    if (number && !count[number - 1]) {
                        count[number - 1] = el;
                        return false;
                    }
                }
                if (el.name.includes('Daily Mix')) {
                    return false;
                }
                return true;
            }
            return false;
        });
        result.playlists.items = [...count, ...result.playlists.items];
        result.message = `Made For ${API.user.display_name}`;
        console.log('result ', result);
        console.log('count ', count);
        const html = htmlRecomm([featured, result, newReleases]);
        const requestBox = document.querySelector('.requestBox');
        if (history.length === 0) {
            history[0] = html;
        }
        else {
            history.push(html);
        }
        requestBox.innerHTML = html;
    };
    const setLike = async (idTrack, likeCondition) => {
        const url = `https://api.spotify.com/v1/me/tracks?ids=${idTrack}`;
        if (likeCondition) {
            await API.get(url, 'PUT');
        }
        else {
            await API.get(url, 'DELETE');
        }
    };
    return {
        history: history,
        initLogin() {
            initLogin();
        },
        initLogout() {
            initLogout();
        },
        getToken() {
            getToken();
        },
        UserProfile() {
            UserProfile();
        },
        async PageRecomm() {
            await PageRecomm();
        },
        PageSearch() {
            PageSearch();
        },
        async tracksByPlaylist(id) {
            await tracksByPlaylist(id);
        },
        async genGenres() {
            await genGenres();
        },
        async playlistsByGenre(genreName, genreID) {
            await playlistsByGenre(genreName, genreID);
        },
        async setLike(idTrack, likeCondition) {
            await setLike(idTrack, likeCondition);
        }
    };
})(API, UI);
function logicOfLoginBtn() {
    if (btn.getAttribute('data-isLoggedIn') === 'false') {
        APP.initLogin();
    }
    else {
        APP.initLogout();
    }
}
const btn = document.querySelector('.login');
if ((Cookie.get('accessToken'))) {
    Auth.refreshToken = Cookie.get('refreshToken');
    Auth.accessToken = Cookie.get('accessToken');
    Auth.expires_in = new Date(Cookie.get('expires_in'));
    API.accessToken = Auth.accessToken;
    API.expires_in = Auth.expires_in;
    API.user = JSON.parse(Cookie.get('userProfile'));
    btn.textContent = "Logout";
    btn.setAttribute('data-isLoggedIn', 'true');
}
else {
    Cookie.clearAllCookie();
    btn.addEventListener('click', logicOfLoginBtn);
    APP.getToken();
}
btn.addEventListener('click', logicOfLoginBtn);
setNumberOfGridColumns();
APP.PageRecomm().then(() => {
    document.body.addEventListener('click', mainHandler);
});
window.addEventListener('resize', setNumberOfGridColumns);
//////////////
const ifPrevNull = async function (obj, token) {
    const modifiedTracks = await Promise.all(obj.map(async (el) => {
        if (el.track.preview_url === null) {
            console.log(`Замена превью юрл: ${el.track.name}`);
            const trackName = el.track.name;
            const albumName = el.track.artists[0].name;
            const searchString = (`album:${albumName} track:${trackName}`).replace(/ /g, `%20`);
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchString}&type=track&limit=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            const previewUrl = data.tracks.items[0]?.preview_url || null;
            const modifiedTrack = { ...el, track: { ...el.track, preview_url: previewUrl } };
            console.log(`Обновленый трек:`, modifiedTrack);
            return modifiedTrack;
        }
        return el;
    }));
    return modifiedTracks;
};
///favorite-tracks
let userSaveTracks;
//@ts-ignore
export let favTracks;
const favorite_track = async () => {
    userSaveTracks = await API.UserSavedTracks();
    UI.createFavTracks(userSaveTracks);
    favTracks = addIsLikedKey(userSaveTracks.items);
    console.log(favTracks);
    // нікіта, это сразу масив с котором обьекты - tracks
    //на будущее,замена превью-юрл через поиск
    //@ts-ignore
    // const modifiedTracks = await ifPrevNull(tracks, API.accessToken);
    // console.log(modifiedTracks);
};
//////////////////////////////////
export function favTracksDeleter() {
    favTracks = null;
}
export { APP, favorite_track };
