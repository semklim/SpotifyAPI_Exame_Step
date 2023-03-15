"use strict";
import Auth from './Auth.js'
import API from './API.js'
import UI from './UI.js'

const APP = (function (API, UI) {
	const UserProfile = async () => {
		await Auth.login().then((data) => data);
		const user = await Auth.get(API.getUserProfile());
		UI.createAccount(user);
		const savedTrack = await Auth.get(API.getUserSavedTracks());
		console.log('User Profile ', user);

		console.log(`Liked tracks`, savedTrack);

		const RecentlyPlayed = await Auth.get(API.getUserRecentlyPlayedTracks());
		console.log('Get Recently Played Tracks ', RecentlyPlayed);
	}

	return {
		init() {
			UserProfile();
		}
	}
})(API, UI);

const btn = document.querySelector('.login');

btn.addEventListener('click', () => APP.init());