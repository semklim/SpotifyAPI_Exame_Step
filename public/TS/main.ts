"use strict";

import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './search/search.js';

const APP = (function (API, UI) {
	const UserProfile = async () => {
		const user = await API.get(API.UserProfile());
		UI.createAccount(user);
	}
	const PageSearch = async () => {
		const genres = await API.get(API.Genres());
		UI.createGenres(genres);
		const searchBox = document.querySelector('.searchbox') as HTMLInputElement;
		const queryFormatter = new QueryFormatter();
		const SearchAPP = new Search(searchBox, queryFormatter, API);
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

async function loginBtn () {
	if (!switcher) {
	   await Auth.login();
	   API.user = await API.get(API.UserProfile());
	   localStorage.setItem('accessToken', `${Auth.accessToken}`);
	   localStorage.setItem('expires_in', `${Auth.expires_in}`);
	   Cookie.set('accessToken', Auth.accessToken!, 15);
	   Cookie.set('refreshToken', Auth.refreshToken!, 15);
	   console.log(Auth.refreshToken);
	   Cookie.get('refreshToken');
	   Cookie.set('expires_in', Auth.expires_in!.toUTCString(), 15);
	   Cookie.set('userProfile', JSON.stringify(API.user!), 15);
	   
	   btn.textContent = "Logout";
	   switcher = true;
   }
   else {
	   location.href = "https://accounts.spotify.com/en/logout";
	   switcher = false;
   }
}

const btn = document.querySelector('.login')!;
const search = document.querySelector('.nav-bar__serch-link')!;
let switcher = false;
if((Cookie.get('accessToken')) && !switcher){
	Auth.accessToken = Cookie.get('accessToken');
	Auth.refreshToken = Cookie.get('refreshToken')!;	
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.user = JSON.parse(Cookie.get('userProfile')!);
	btn.textContent = "Logout";
		btn.addEventListener('click', () => location.href = "https://accounts.spotify.com/en/logout");
}else{
	btn.addEventListener('click', loginBtn);
}

search.addEventListener('click', () => {
	APP.PageSearch();
});



API.get(API.Recomm('dance/electronic,rock,chill')).then(data => console.log("Рекомендації ", data));
API.get(API.UserSavedTracks()).then(data => console.log("User Liked Tracks  ",data));
API.get(API.UserRecentlyPlayedTracks()).then(data => console.log("User Recently Played Tracks  ",data));