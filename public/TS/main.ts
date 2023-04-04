"use strict";

import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import prepareTracks from './helpers/tracks/prepareTracksObj.js'
import mainHandler from "./mainHandler.js";
import { OnPlayFunc } from "./OnPlayFunc.js";

const APP = (function (API, UI) {

	const getToken = async () => {
		// @ts-ignore
		const { access_token, expires_in } = await Auth.getToken();
				API.accessToken = access_token;
				API.expires_in = new Date(Date.now() + (expires_in * 1000));
	}

	const UserProfile = async () => {
		const user = await API.UserProfile();
		UI.createAccount(user);
	}

	const genGenres = async () => {
		const genres = await API.Genres();
		UI.createGenres(genres);
	}
	const playlistsByGenre = async (genreName: string, genreID: string) => {
		const list = await API.GetCategoryPlaylists(genreID);
		if(list.status === '404'){
			const delEL = document.getElementById(`${genreID}`)!;
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
	}
	const PageTracks = async (id: string) => {
		const playlist = await API.GetPlaylist(id);
			const tracks = await prepareTracks(playlist, API);

		// end of logic
		UI.createTracks(playlist);
	
		const mainbox = document.querySelector('.favorite-tracks-contents');
		mainbox?.addEventListener('click', (e: Event) => {
			OnPlayFunc(tracks)
		});

	}

	const PageSearch = async () => {

		const searchBox = document.querySelector('.searchbox') as HTMLInputElement;
		const queryFormatter = new QueryFormatter();
		const SearchAPP = new Search(searchBox, queryFormatter, API);
		SearchAPP.input.addEventListener('input', async () => {
			const result = await SearchAPP.handleInput().then(() => {
				const res = SearchAPP.getResult();
				if (!res) return undefined;
				return res;
			});
			console.log(result);

		})
	}
	return {
		getToken() {
			getToken();
		},
		UserProfile() {
			UserProfile();
		},
		PageSearch() {
			PageSearch();
		},
		async PageTracks(id: string) {
			await PageTracks(id);
		},
		async genGenres() {
			await genGenres();
		},
		async playlistsByGenre(genreName: string, genreID: string) {
			await playlistsByGenre(genreName, genreID);
		}
	};
})(API, UI);

	APP.getToken();

async function loginBtn() {
	if (btn.getAttribute('data-isLoggedIn') === 'false') {
		await Auth.login();
		API.accessToken = Auth.accessToken;
		API.expires_in = Auth.expires_in;
		API.user = await API.UserProfile();
		Cookie.set('accessToken', Auth.accessToken!, 15);
		Cookie.set('refreshToken', Auth.refreshToken!, 15);
		Cookie.set('expires_in', Auth.expires_in!.toUTCString(), 15);
		Cookie.set('userProfile', JSON.stringify(API.user!), 15);

		btn.setAttribute('data-isLoggedIn', 'true');
		btn.textContent = "Logout";
	}
	else {
		const url = 'https://accounts.spotify.com/en/logout'
		const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')!;
		spotifyLogoutWindow.close();
		Auth.accessToken = null;
		Auth.refreshToken = null;
		API.user = null;
		API.accessToken = null;
		API.expires_in = null;
		btn.setAttribute('data-isLoggedIn', 'false');
		btn.textContent = "Login";
		Cookie.clearAllCookie();
		localStorage.clear();
		location.reload();
	}
}



const btn = document.querySelector('.login')!;
if ((Cookie.get('accessToken'))) {
	Auth.accessToken = Cookie.get('accessToken');
	Auth.refreshToken = Cookie.get('refreshToken')!;
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.user = JSON.parse(Cookie.get('userProfile')!);
	btn.textContent = "Logout";
	btn.setAttribute('data-isLoggedIn', 'true');
	btn.addEventListener('click', loginBtn);
} else {
	btn.addEventListener('click', loginBtn);
}


//////////////
const ifPrevNull = async function (obj: any, token: string) {
	const modifiedTracks = await Promise.all(obj.map(async (el: any) => {
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
}

///favorite-tracks
const favorite_track_button = document.querySelector(`.nav-bar-library-link-box`)!
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