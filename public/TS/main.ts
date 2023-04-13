"use strict";

import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import { prepareTracks, prepareTracksForAlbum } from './helpers/tracks/prepareTracksObj.js'
import mainHandler from "./mainHandler.js";
import { OnPlayFunc } from "./OnPlayFunc.js";
import { addIsLikedKey } from './helpers/tracks/trackBoxFunc/trackBoxFunc.js';
import htmlRecomm from './pagePartials/groupOfPlaylist/groupOfPlaylist.js';
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
import { resolve } from 'path';

const APP = (function (API, UI) {
	let history: string[] = [];
	let isLoggedIn: boolean = false;
	const getToken = async () => {
			const { access_token, expires_in }: { access_token: string; expires_in: number } = await Auth.getToken();
			API.accessToken = access_token;
			API.expires_in = new Date(Date.now() + (expires_in * 1000));
	}

	const initLogin = async () => {
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

		APP.isLoggedIn = true;
		APP.PageRecomm().then(() => {
			window.addEventListener('click', mainHandler);
		});
	}

	const initLogout = async () => {
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
		APP.isLoggedIn = false;
		await APP.getToken();
		APP.PageRecomm().then(() => {
			window.addEventListener('click', mainHandler);
		});
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
		if (list.status === '404') {
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

	const tracksByPlaylist = async (id: string) => {
		const playlist = await API.GetPlaylist(id);
		const tracks = await prepareTracks(playlist);
		playlist.tracks.items = tracks;
		
		UI.createTracks(playlist);
		OnPlayFunc(tracks);
	}

	const tracksByAlbum = async (id:string) => {
		const album = await API.getAlbum(id);
		const tracks = await prepareTracksForAlbum(album);
		UI.createTracks(album);
		OnPlayFunc(tracks);
	}
	const PageSearch = async () => {
		const searchBox = document.querySelector('.searchbox') as HTMLInputElement;
		const queryFormatter = new QueryFormatter();
		const SearchAPP = new Search(searchBox, queryFormatter, API);
		SearchAPP.input.addEventListener('input', async () => {
			const requestBox = document.querySelector('.requestBox') as HTMLElement
			
			// const resultAlbumsObj:any = await SearchAPP.handleInput('album,artist,playlist,track');
			const resultObj:any = await SearchAPP.handleInput('album,artist,playlist,track');

			const arrHtml = [ 
				{message: 'Albums'},
				{message: 'Artists'},
				{message: 'Playlists'},
				{message: 'Tracks'},
			];

			for (let i = 0; i < arrHtml.length; i++) {
				const el = arrHtml[i];
				const name = el.message.toLowerCase();
				//@ts-ignore
				el[name] = resultObj[name]
			}

			if(searchBox.value === ''){
				requestBox.innerHTML = ''
			} else {
				requestBox.innerHTML = htmlRecomm(arrHtml as object[], searchBox.value);
			}
			console.log(searchBox.value)
		})
	}

	const PageRecomm = async () => {

		const newReleases = await API.getNewReleases();
		newReleases.message = 'New Releases';
		console.log(newReleases);
		const featured = await API.getFeaturedPlaylists();

		const query = APP.isLoggedIn ? 'daily' : 'Spotify';
		const type = 'playlist'
		const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=ES&limit=50&offset=0`;
		const result =  await API.get(url);
		let count: any = [];

		result.playlists.items = result.playlists.items.filter((el: any) => {
			if(el.owner.display_name === 'Spotify'){
				if(el.name.includes('Daily')){
					const number = el.name.match(/\d/g) ? el.name.match(/\d/g)[0] : undefined;
					const random = Math.round(Math.random() * 101);
					if(number && !count[number - 1] || random > 50){
						count[number - 1] = el;
						return false;
					}
				}
				if(el.name.includes('Daily Mix')){
					return false;
				}
				return true;
			}
			return false;
		});

		if(count.length !== 0){
		result.playlists.items = [...count, ...result.playlists.items];
		}
		result.message = `${API.user ? 'Made For ' + API.user.display_name : 'Spotify playlists'}`;

		let arrRes = [featured, result, newReleases];
	
		const html = htmlRecomm(arrRes);
		const requestBox = document.querySelector('.requestBox')!;
		if(APP.history.length === 0){
			APP.history[0] = html;
		}else{
			APP.history.push(html);
		}

		requestBox.innerHTML = html;
	}

	const setLike = async (idTrack: string, likeCondition: boolean) => {
		const url = `https://api.spotify.com/v1/me/tracks?ids=${idTrack}`;
		if (likeCondition) {
			await API.get(url, 'PUT');
		} else {
			await API.get(url, 'DELETE');
		}
	}

	return {
		history: history,
		isLoggedIn: isLoggedIn,

		initLogin() {
			initLogin();
		},

		initLogout() {
			initLogout();
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

		async tracksByPlaylist(id: string) {
			await tracksByPlaylist(id);
		},

		tracksByAlbum(id:string){
			tracksByAlbum(id);
		},

		async genGenres() {
			await genGenres();
		},

		async playlistsByGenre(genreName: string, genreID: string) {
			await playlistsByGenre(genreName, genreID);
		},

		async setLike(idTrack: string, likeCondition: boolean) {
			await setLike(idTrack, likeCondition);
		}
	};
})(API, UI);


function logicOfLoginBtn() {
	removeEventListener('click', mainHandler);
	APP.history.length = 0;
	if (btn.getAttribute('data-isLoggedIn') === 'false') {
		APP.initLogin();
	}
	else {
		APP.initLogout();
	}
}

const btn = document.querySelector('.login')!;

if ((Cookie.get('accessToken'))) {
	Auth.refreshToken = Cookie.get('refreshToken')!;
	Auth.accessToken = Cookie.get('accessToken');
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.accessToken = Auth.accessToken;
	API.expires_in = Auth.expires_in;
	API.user = JSON.parse(Cookie.get('userProfile')!);
	btn.textContent = "Logout";
	btn.setAttribute('data-isLoggedIn', 'true');
	APP.isLoggedIn = true;
	APP.PageRecomm().then(() => {
		window.addEventListener('click', mainHandler);
	});
} else {
	Cookie.clearAllCookie();
	APP.getToken().then(() => {
		APP.PageRecomm()
		.then(() => {
			window.addEventListener('click', mainHandler);
		});
	});
}

btn.addEventListener('click', logicOfLoginBtn);

setNumberOfGridColumns();
window.addEventListener('resize',setNumberOfGridColumns);

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

const refreshFavorite_track = async() => {
	userSaveTracks = await API.UserSavedTracks();
	return addIsLikedKey(userSaveTracks.items);
}

//////////////////////////////////
export function favTracksDeleter() {
	favTracks = null;
}

export { APP, favorite_track, refreshFavorite_track};