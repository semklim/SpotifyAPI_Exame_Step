"use strict";

import Auth from './Auth.js'
import API from './API.js'
import UI from './UI.js'


const APP = (function (API, UI) {
	const UserProfile = async () => {
		const user = await Auth.get(API.getUserProfile());
		UI.createAccount(user);
	}
	const PageSearch = async () => {
		const genres = await Auth.get(API.getGenres());
		UI.createGenres(genres);
		const input = document.querySelector('.searchbox')!;

		let query: string = '';
		input.addEventListener('input', async function SearchInput (e: any) {
			query += e.data;
			const url = `https://api.spotify.com/v1/search?q=${query}&type=playlist&market=ES&limit=50&offset=0`;
			const res = await Auth.get(url);
			console.log(res);
			
		})
	}
	return {
		UserProfile() {
			UserProfile();
		},
		PageSearch(){
			PageSearch();
		}
	};
})(API, UI);


const btn = document.querySelector('.login')!;
const likedTracks = document.querySelector('.likedTracks')!;
const init = document.querySelector('.init')!;
const list = document.querySelector('.accountList')!;
const search = document.querySelector('.searchBtn')!;
let switcher = false;
btn.addEventListener('click', async function loginBtn () {
	if (!switcher) {
		await Auth.login();
		likedTracks.removeAttribute('style');
		init.removeAttribute('style');
		list.removeAttribute('style');
		btn.textContent = "Logout";
		search.removeAttribute('style');
		switcher = true;
	}
	else {
		location.href = "https://accounts.spotify.com/en/logout";
		switcher = false;
	}
});

init.addEventListener('click', () => APP.UserProfile());

search.addEventListener('click', () => {
	APP.PageSearch();
});