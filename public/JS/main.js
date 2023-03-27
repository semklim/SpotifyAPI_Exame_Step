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
    const genGenres = async () => {
        const genres = await API.Genres();
        UI.createGenres(genres);
        const collectionGenres = document.querySelector('.collectionGenres');
        collectionGenres?.addEventListener('click', async ({ target }) => {
            const className = target.className;
            if (className === 'genres') {
                const genresName = (target.querySelector('.nameOfGenres')).textContent;
                const id = target.getAttribute('id');
                const playlist = await API.GetCategoryPlaylists(id);
                console.log(playlist);
                UI.createGenresRes(genresName, playlist.playlists.items);
                const shelf__content = document.querySelector('.shelf__content');
                shelf__content.addEventListener('click', (e) => {
                    const target = e.target;
                    if (target.className === "shelf__content__playlist") {
                        APP.PageTracks(target.id);
                    }
                });
            }
        });
        APP.PageSearch();
    };
    const PageTracks = async (id) => {
        const playlist = await API.GetPlaylist(id);
        const tracks = playlist.tracks.next ? playlist.tracks : playlist.tracks.items;
        // logic of adding info about liked track or not
        let idTracks = [];
        tracks.forEach((el) => {
            idTracks.push(el.track.id);
        });
        const isLiked = await API.CheckUserSavedTracks(idTracks);
        tracks.map((el, i) => {
            el.track.isLiked = isLiked[i];
        });
        // end of logic
        UI.createTracks(playlist);
        const mainbox = document.querySelector('.favorite-tracks-contents');
        mainbox?.addEventListener('click', (e) => {
            const target = e.target;
            if (target.className === "trackPlayBtn") {
                const url = target.getAttribute('href');
                if (url) {
                    console.log(tracks);
                    /*
                    якщо в об'єкті playlist.tracks є посилання на наступну сторінку з треками, то об'єкт tracks в середину буде мати не [] музики,
                    а додаткові поля і поле items з масивот треків.
                    Врахуй це при розробці.
                    Nikita_Function(tracks);
                    */
                    const audio = new Audio(url);
                    audio.play();
                }
            }
        });
    };
    const PageSearch = async () => {
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
        },
        PageTracks(id) {
            PageTracks(id);
        },
        genGenres() {
            genGenres();
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
const nav_bar__search = document.querySelector('.nav-bar__serch-link');
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
function searchListener() {
    APP.genGenres();
}
nav_bar__search.addEventListener('click', searchListener);
API.UserSavedTracks().then(data => console.log("User Liked Tracks  ", data));
API.UserRecentlyPlayedTracks().then(data => console.log("User Recently Played Tracks  ", data));
///favorite-tracks
const favorite_track_button = document.querySelector(`.nav-bar-library-link-box`);
favorite_track_button.addEventListener(`click`, () => {
    UI.createFavTracks();
});
