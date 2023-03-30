"use strict";

import { onPlay } from "./player.js"
import Auth from './Auth.js';
import API from './API.js';
import UI from './UI.js';
import Cookie from './Cookies.js';
import { Search, QueryFormatter } from './pagePartials/search/search.js';
import prepareTracks from './helpers/tracks/prepareTracksObj.js'
import mainHandler from "./mainHandler.js";


const APP = (function (API, UI) {
	const UserProfile = async () => {
		const user = await API.UserProfile();
		UI.createAccount(user);
	}

	const genGenres = async () => {
		const genres = await API.Genres();
		UI.createGenres(genres);

		const collectionGenres = document.querySelector('.collectionGenres');

		collectionGenres?.addEventListener('click', async ({ target }: Event) => {
			const className: string = (target as HTMLElement)!.className;

			if (className === 'genres') {
				const genresName = ((target as HTMLElement).querySelector('.nameOfGenres')!).textContent!;
				const id = (target as HTMLElement).getAttribute('id')!;
				const playlist = await API.GetCategoryPlaylists(id);
				console.log(playlist);
				UI.createGenresRes(genresName, playlist.playlists.items);

				const shelf__content = document.querySelector('.shelf__content')!;
				shelf__content.addEventListener('click', (e: Event) => {
					const target = (e.target as HTMLElement);
					if (target.className === "shelf__content__playlist") {
						APP.PageTracks(target.id)
					}
				});
			}
		});
		APP.PageSearch();
	}

	const PageTracks = async (id: string) => {
		const playlist = await API.GetPlaylist(id);
		
		const tracks = await prepareTracks(playlist, API);

		// end of logic
		UI.createTracks(playlist);
		//function that finds same url's
		//@ts-ignore
		function findObjectByParam(array: any[], value: string) {
			for (let i = 0; i < array.length; i += 1) {
				//@ts-ignore
				if (array[i].track.preview_url === value) {
					//@ts-ignore
					return array[i] as object;
				}
			}
		}
		const mainbox = document.querySelector('.favorite-tracks-contents');
		let playingAudio: HTMLAudioElement | null;
		mainbox?.addEventListener('click', (e: Event) => {
			if (playingAudio != null) {
				// playingAudio!.currentTime = 0
				// playingAudio!.volume = 0;
				playingAudio!.pause()
			}
			const target = (e.target as HTMLElement);
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
				}else{
					console.log('Sorry track is not found')
				}
			}
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
		UserProfile() {
			UserProfile();
		},
		PageSearch() {
			PageSearch();
		},
		PageTracks(id: string) {
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
const nav_bar__search = document.querySelector('.nav-bar__serch-link')!;
let switcher = false;
if ((Cookie.get('accessToken')) && !switcher) {
	Auth.accessToken = Cookie.get('accessToken');
	Auth.refreshToken = Cookie.get('refreshToken')!;
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.user = JSON.parse(Cookie.get('userProfile')!);
	btn.textContent = "Logout";
	btn.addEventListener('click', () => location.href = "https://accounts.spotify.com/en/logout");
} else {
	btn.addEventListener('click', loginBtn);
}

function searchListener() {
	APP.genGenres();
}
nav_bar__search.addEventListener('click', searchListener);


///favorite-tracks
const favorite_track_button = document.querySelector(`.nav-bar-library-link-box`)!
favorite_track_button.addEventListener(`click`, () => {
	UI.createFavTracks()
});


document.body.addEventListener('click', mainHandler);
