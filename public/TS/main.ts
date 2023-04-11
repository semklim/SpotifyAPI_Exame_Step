"use strict";

import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import prepareTracks from './helpers/tracks/prepareTracksObj.js'
import mainHandler from "./mainHandler.js";
import { OnPlayFunc } from "./OnPlayFunc.js";
import { addIsLikedKey } from './helpers/tracks/trackBoxFunc/trackBoxFunc.js';
import htmlRecomm from './pagePartials/groupOfPlaylist/groupOfPlaylist.js';
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";

const APP = (function (API, UI) {
	let history: string[] = [];
	let isLoggedIn: boolean = false;
	const getToken = async () => {
		if (Cookie.get('accessToken') === null) {
			const { access_token, expires_in }: { access_token: string; expires_in: number } = await Auth.getToken();
			API.accessToken = access_token;
			API.expires_in = new Date(Date.now() + (expires_in * 1000));
		}
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

		isLoggedIn = true;
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
		isLoggedIn = false;
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
		const tracks = await prepareTracks(playlist, API);

		UI.createTracks(playlist);
		OnPlayFunc(tracks);
	}

	const PageSearch = async () => {
		const searchBox = document.querySelector('.searchbox') as HTMLInputElement;
		const queryFormatter = new QueryFormatter();
		const SearchAPP = new Search(searchBox, queryFormatter, API);
		SearchAPP.input.addEventListener('input', async () => {
			const requestBox = document.querySelector('.requestBox') as HTMLElement
			
			const resultAlbumsObj:any = await SearchAPP.handleInput('album');
			const resultArtistsObj:any = await SearchAPP.handleInput('artist');
			const resultPlaylistsObj:any = await SearchAPP.handleInput('playlist');
			const resultTracksObj:any = await SearchAPP.handleInput('track');

			const albums = resultAlbumsObj;
				albums.message = 'Albums';
			const artists = resultArtistsObj
				artists.message = 'Artists';
			const playlists = resultPlaylistsObj;
				playlists.message = 'Tracks';
			const tracks = resultTracksObj.tracks.items;

			if(searchBox.value === ''){
				requestBox.innerHTML = ''
			} else {

				requestBox.innerHTML = htmlRecomm([albums, playlists, artists], searchBox.value);
			}
			console.log(searchBox.value)

			console.log(albums)
			console.log(artists)
			// console.log(playlists)
			// console.log(tracks)

			// console.log(resultAlbumsObj);
			// console.log(resultArtistsObj);
			// console.log(resultPlaylistsObj);
			// console.log(resultTracksObj);

		})
	}

	const PageRecomm = async () => {
		let recentlyPlayed: any = null;
		let topTracks:any = null;
		let newReleases: any = null;
		if(isLoggedIn){
			recentlyPlayed = await API.UserRecentlyPlayedTracks();
			recentlyPlayed.message = "Recently Played";
			// topTracks = await API.getUserTopTracks();
		}
		newReleases = await API.getNewReleases();
		newReleases.message = 'New Releases';
		const featured = await API.getFeaturedPlaylists();


		console.log('newReleases ',newReleases );
		console.log('featured ',featured );
		console.log('recentlyPlayed ',recentlyPlayed);
		
		// console.log(topTracks);
		// topTracks = topTracks.items.sort((el1: any, el2: any) => el1.popularity > el2.popularity ? -1 : 1);
		// console.log('sorted ', topTracks);

		const query = 'daily';
		const type = 'playlist'
				const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=ES&limit=50&offset=0`;
				const result =  await API.get(url);
				let count: any = [];
				result.playlists.items = result.playlists.items.filter((el: any) => {
					if(el.owner.display_name === 'Spotify'){
						if(el.name.includes('Daily')){
							const number = el.name.match(/\d/g) ? el.name.match(/\d/g)[0] : undefined;
							if(number && !count[number - 1]){
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

				result.playlists.items = [...count, ...result.playlists.items];
				result.message = `Made For ${API.user ? API.user.display_name : ''}`;
		console.log('result ', result);
		console.log('count ', count);
		let arrRes = [featured, result, newReleases];
		if(isLoggedIn){
			arrRes = [recentlyPlayed, ...arrRes];
		}
		
			const html = htmlRecomm(arrRes);
		const requestBox = document.querySelector('.requestBox')!;
		if(history.length === 0){
			history[0] = html;
		}else{
			history.push(html);
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
		document.body.addEventListener('click', mainHandler);
	});
} else {
	Cookie.clearAllCookie();
	btn.addEventListener('click', logicOfLoginBtn);
	APP.getToken().then(() => {
		APP.PageRecomm().then(() => {
			document.body.addEventListener('click', mainHandler);
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
//////////////////////////////////
export function favTracksDeleter() {
	favTracks = null;
}

export { APP, favorite_track};