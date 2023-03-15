"use strict";
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
const APP = (function (API, UI) {
    const UserProfile = async () => {
        const user = await Auth.get(API.getUserProfile());
        UI.createAccount(user);
        console.log('User Profile ', user);
        const RecentlyPlayed = await Auth.get(API.getUserRecentlyPlayedTracks());
        console.log('Get Recently Played Tracks ', RecentlyPlayed);
    };
    const getUserSavedTracks = async () => {
        const savedTrack = await Auth.get(API.getUserSavedTracks());
        console.log(`Liked tracks`, savedTrack);
    };
    return {
        init() {
            UserProfile();
        },
        getUserSavedTracks() {
            getUserSavedTracks();
        }
    };
})(API, UI);
const btn = document.querySelector('.login');
const likedTracks = document.querySelector('.likedTracks');
const init = document.querySelector('.init');
const list = document.querySelector('.accountList');
let switcher = false;
btn.addEventListener('click', async function loginBtn() {
    if (!switcher) {
        await Auth.login();
        likedTracks.removeAttribute('style');
        init.removeAttribute('style');
        list.removeAttribute('style');
        btn.textContent = "Logout";
        switcher = true;
    }
    else {
        location.href = "https://accounts.spotify.com/en/logout";
        switcher = false;
    }
});
likedTracks.addEventListener('click', () => {
    APP.getUserSavedTracks();
});
init.addEventListener('click', () => APP.init());
