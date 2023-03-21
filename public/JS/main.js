"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './search/search.js';
const APP = (function (API, UI) {
    const UserProfile = async () => {
        const user = await API.UserProfile();
        UI.createAccount(user);
    };
    const PageSearch = async () => {
        const genres = await API.Genres();
        UI.createGenres(genres);
        const collectionGenres = document.querySelector('.collectionGenres');
        collectionGenres?.addEventListener('click', async ({ target }) => {
            const className = target.className;
            if (className === 'genres') {
                const id = target.getAttribute('id');
                const playlist = await API.GetCategoryPlaylists(id);
                console.log(playlist.playlists.items);
                const playlistID = playlist.playlists.items[0].id;
                console.log(playlistID);
                const tracks = await API.GetPlaylist(playlistID);
                console.log(tracks);
            }
        });
        const searchBox = document.querySelector('.searchbox');
        const queryFormatter = new QueryFormatter();
        const SearchAPP = new Search(searchBox, queryFormatter, API);
        SearchAPP.input.addEventListener('input', async () => {
            const result = await SearchAPP.handleInput().then(() => {
                const res = SearchAPP.getResult();
                if (!res)
                    return undefined;
                return res;
            });
            console.log(result);
        });
    };
    return {
        UserProfile() {
            UserProfile();
        },
        PageSearch() {
            PageSearch();
        }
    };
})(API, UI);
async function loginBtn() {
    if (!switcher) {
        await Auth.login();
        API.user = await API.UserProfile();
        localStorage.setItem('accessToken', `${Auth.accessToken}`);
        localStorage.setItem('expires_in', `${Auth.expires_in}`);
        Cookie.set('accessToken', Auth.accessToken, 15);
        Cookie.set('refreshToken', Auth.refreshToken, 15);
        console.log(Auth.refreshToken);
        Cookie.get('refreshToken');
        Cookie.set('expires_in', Auth.expires_in.toUTCString(), 15);
        Cookie.set('userProfile', JSON.stringify(API.user), 15);
        btn.textContent = "Logout";
        switcher = true;
    }
    else {
        location.href = "https://accounts.spotify.com/en/logout";
        switcher = false;
    }
}
const btn = document.querySelector('.login');
const search = document.querySelector('.nav-bar__serch-link');
let switcher = false;
if ((Cookie.get('accessToken')) && !switcher) {
    Auth.accessToken = Cookie.get('accessToken');
    Auth.refreshToken = Cookie.get('refreshToken');
    Auth.expires_in = new Date(Cookie.get('expires_in'));
    API.user = JSON.parse(Cookie.get('userProfile'));
    btn.textContent = "Logout";
    btn.addEventListener('click', () => location.href = "https://accounts.spotify.com/en/logout");
}
else {
    btn.addEventListener('click', loginBtn);
}
search.addEventListener('click', () => {
    APP.PageSearch();
});
API.UserSavedTracks().then(data => console.log("User Liked Tracks  ", data));
API.UserRecentlyPlayedTracks().then(data => console.log("User Recently Played Tracks  ", data));
