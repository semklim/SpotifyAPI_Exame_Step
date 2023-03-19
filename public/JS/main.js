"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import { Search, QueryFormatter } from './search/search.js';
const APP = (function (API, UI) {
    const UserProfile = async () => {
        const user = await API.get(API.UserProfile());
        UI.createAccount(user);
    };
    const PageSearch = async () => {
        const genres = await API.get(API.Genres());
        UI.createGenres(genres);
        const searchBox = document.querySelector('.searchbox');
        const queryFormatter = new QueryFormatter();
        const SearchAPP = new Search(searchBox, queryFormatter, API);
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
const btn = document.querySelector('.login');
const search = document.querySelector('.nav-bar__serch-link');
let switcher = false;
btn.addEventListener('click', async function loginBtn() {
    if (!switcher) {
        await Auth.login();
        btn.textContent = "Logout";
        switcher = true;
    }
    else {
        location.href = "https://accounts.spotify.com/en/logout";
        switcher = false;
    }
});
search.addEventListener('click', () => {
    APP.PageSearch();
});
