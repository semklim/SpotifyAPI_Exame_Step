"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from '../Cookies.js';
import { Search, QueryFormatter } from '../pagePartials/search/search.js';
import { prepareTracks, prepareTracksForAlbum } from '../helpers/tracks/prepareTracksObj.js';
import mainHandler from "../Listeners/mainClickListener.js";
import { OnPlayFunc } from "../OnPlayFunc.js";
import { addIsLikedKey } from '../helpers/tracks/trackBoxFunc/trackBoxFunc.js';
import htmlRecomm from '../pagePartials/groupOfPlaylist/groupOfPlaylist.js';
import preparePlaylists from '../helpers/preparePlaylist.js';
import { giveMeLoginBox, giveMeUserBox } from '../pagePartials/login/loginBox.js';
const APP = (function (API, UI) {
    let history = [];
    let isLoggedIn = false;
    const getToken = async () => {
        const { access_token, expires_in } = await Auth.getToken();
        API.accessToken = access_token;
        API.expires_in = new Date(Date.now() + (expires_in * 1000));
    };
    const loginMainBox = document.querySelector('.header-content');
    const initLogin = async (btn) => {
        await Auth.login();
        API.accessToken = Auth.accessToken;
        API.expires_in = Auth.expires_in;
        API.user = await API.UserProfile();
        Cookie.set('accessToken', Auth.accessToken, 15);
        Cookie.set('refreshToken', Auth.refreshToken, 15);
        Cookie.set('expires_in', Auth.expires_in.toUTCString(), 15);
        Cookie.set('userProfile', JSON.stringify(API.user), 15);
        loginMainBox.innerHTML = giveMeUserBox();
        APP.isLoggedIn = true;
        APP.PageRecomm().then(() => {
            window.addEventListener('click', mainHandler);
        });
    };
    const initLogout = async (btn) => {
        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
        spotifyLogoutWindow.close();
        Auth.accessToken = null;
        Auth.refreshToken = null;
        API.user = null;
        API.accessToken = null;
        API.expires_in = null;
        loginMainBox.innerHTML = giveMeLoginBox();
        Cookie.clearAllCookie();
        APP.isLoggedIn = false;
        await APP.getToken();
        APP.PageRecomm().then(() => {
            window.addEventListener('click', mainHandler);
        });
    };
    const UserProfile = async () => {
        const user = await API.UserProfile();
        UI.createAccount(user);
    };
    const buildSearchPage = async () => {
        const genres = await API.Genres();
        UI.renderSearchPage(genres);
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
        const tracks = await prepareTracks(playlist);
        playlist.tracks.items = tracks;
        UI.createTracks(playlist);
        OnPlayFunc(tracks);
    };
    const tracksByAlbum = async (id) => {
        const album = await API.getAlbum(id);
        const tracks = await prepareTracksForAlbum(album);
        album.tracks.items = tracks;
        UI.createTracks(album);
        OnPlayFunc(tracks);
    };
    const PageSearch = async () => {
        const searchBox = document.querySelector('.searchbox');
        const queryFormatter = new QueryFormatter();
        const SearchAPP = new Search(searchBox, queryFormatter, API);
        SearchAPP.input.addEventListener('input', async () => {
            const requestBox = document.querySelector('.requestBox');
            // const resultAlbumsObj:any = await SearchAPP.handleInput('album,artist,playlist,track');
            const resultObj = await SearchAPP.handleInput('album,artist,playlist,track');
            const arrHtml = [
                { message: 'Albums' },
                { message: 'Artists' },
                { message: 'Playlists' },
                { message: 'Tracks' },
            ];
            for (let i = 0; i < arrHtml.length; i++) {
                const el = arrHtml[i];
                const name = el.message.toLowerCase();
                //@ts-ignore
                el[name] = resultObj[name];
            }
            if (searchBox.value === '') {
                requestBox.innerHTML = '';
            }
            else {
                requestBox.innerHTML = htmlRecomm(arrHtml, searchBox.value);
            }
            console.log(arrHtml);
        });
    };
    const PageRecomm = async () => {
        const requestBox = document.querySelector('.requestBox');
        const newReleases = await API.getNewReleases();
        const featured = await API.getFeaturedPlaylists();
        const query = APP.isLoggedIn ? 'daily' : 'Spotify';
        const type = 'playlist';
        const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=ES&limit=50&offset=0`;
        const result = await API.get(url);
        let arrRes = [featured, result, newReleases];
        result.playlists.items = preparePlaylists(result.playlists.items);
        newReleases.message = 'New Releases';
        result.message = `${API.user ? 'Made For ' + API.user.display_name : 'Spotify playlists'}`;
        const html = htmlRecomm(arrRes);
        requestBox.innerHTML = html;
        if (APP.history.length === 0) {
            APP.history[0] = requestBox.innerHTML;
        }
        else {
            APP.history.push(requestBox.innerHTML);
        }
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
        isLoggedIn: isLoggedIn,
        initLogin(btn) {
            initLogin(btn);
        },
        initLogout(btn) {
            initLogout(btn);
        },
        async getToken() {
            await getToken();
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
        async tracksByAlbum(id) {
            await tracksByAlbum(id);
        },
        async buildSearchPage() {
            await buildSearchPage();
        },
        async playlistsByGenre(genreName, genreID) {
            await playlistsByGenre(genreName, genreID);
        },
        async setLike(idTrack, likeCondition) {
            await setLike(idTrack, likeCondition);
        }
    };
})(API, UI);
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
const refreshFavorite_track = async () => {
    userSaveTracks = await API.UserSavedTracks();
    return addIsLikedKey(userSaveTracks.items);
};
//////////////////////////////////
export function favTracksDeleter() {
    favTracks = null;
}
export { APP, favorite_track, refreshFavorite_track };
