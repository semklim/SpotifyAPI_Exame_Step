"use strict";
import { onPlay } from "./player.js";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import prepareTracks from './helpers/tracks/prepareTracksObj.js';
import mainHandler from "./mainHandler.js";
const APP = (function (API, UI) {
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
        UI.createGenresRes(genreName, list.playlists.items);
    };
    const PageTracks = async (id) => {
        const playlist = await API.GetPlaylist(id);
        const tracks = await prepareTracks(playlist, API);
        console.log(tracks);
        // end of logic
        UI.createTracks(playlist);
        //function that finds same url's
        //@ts-ignore
        function findObjectByParam(array, value) {
            for (let i = 0; i < array.length; i += 1) {
                //@ts-ignore
                if (array[i].track.preview_url === value) {
                    //@ts-ignore
                    return i;
                }
            }
        }
        const mainbox = document.querySelector('.favorite-tracks-contents');
        let playingAudio;
        mainbox?.addEventListener('click', (e) => {
            if (playingAudio != null) {
                // playingAudio!.currentTime = 0
                // playingAudio!.volume = 0;
                playingAudio.pause();
            }
            const target = e.target;
            if (target.className === "trackPlayBtn") {
                const url = target.getAttribute('href');
                if (url !== 'null') {
                    /*
                    якщо в об'єкті playlist.tracks є посилання на наступну сторінку з треками, то об'єкт tracks в середину буде мати не [] музики,
                    а додаткові поля і поле items з масивот треків.
                    Врахуй це при розробці.
                    Nikita_Function(tracks,findObjectByParam(tracks, url));
                    */
                    //@ts-ignore
                    playingAudio = onPlay(tracks, findObjectByParam(tracks, url));
                    // playingAudio!.src = url;
                    // playingAudio!.play();
                }
                else {
                    console.log('Sorry track is not found');
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
        async PageTracks(id) {
            await PageTracks(id);
        },
        async genGenres() {
            await genGenres();
        },
        async playlistsByGenre(genreName, genreID) {
            await playlistsByGenre(genreName, genreID);
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
const favorite_track_button = document.querySelector(`.nav-bar-library-link-box`);
favorite_track_button.addEventListener(`click`, async () => {
    const userSaveTracks = await API.UserSavedTracks();
    UI.createFavTracks(userSaveTracks);
    const tracks = userSaveTracks.items;
    console.log(tracks);
    //@ts-ignore
    const modifiedTracks = await ifPrevNull(tracks, API.accessToken);
    console.log(modifiedTracks);
    // нікіта, цце твій обєкт музики userSaveTracks
    // нікіта, это сразу масив с котором обьекты tracks
    // нікіта, это я перебераю массив и если превью нет он обращаеться в поиск, находит из поиска и заменяет превью значение у обькта modifiedTracks
    //иногда все равно возвращает null
});
//////////////////////////////////
document.body.addEventListener('click', mainHandler);
export default APP;
