"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './search/search.js';
// function setCookies (data?: object): void {
// 	let time = new Date();
// 	const now = time.getUTCDate();
// 	time.setUTCDate(now + 15);
// 	console.log(now);
// 	//@ts-ignore
// 	time = time.toGMTString();
// 	document.cookie = `accessToken=${Auth.accessToken}; expires=${time}`;
// 	document.cookie = `expires_in=${Auth.expires_in}; expires=${time}`;
// 	if(data) {
// 		Object.entries(data).forEach(([key, el]: [string, any]) => {
// 			//@ts-ignore
// 			document.cookie = `${key}=${JSON.stringify(el)}; expires=${time}`;
// 		})
// 	}
// }
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
        console.log(SearchAPP.getResult());
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
        API.user = await API.get(API.UserProfile());
        localStorage.setItem('accessToken', `${Auth.accessToken}`);
        localStorage.setItem('expires_in', `${Auth.expires_in}`);
        Cookie.set('accessToken', Auth.accessToken, 15);
        Cookie.set('expires_in', JSON.stringify(Auth.expires_in), 15);
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
if (Cookie.get('accessToken') && !switcher) {
    Auth.accessToken = Cookie.get('accessToken');
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
