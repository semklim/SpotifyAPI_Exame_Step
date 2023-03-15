const API = (function () {
	function _getUserProfile() {
		return 'https://api.spotify.com/v1/me';
	}

	function _getUserSavedTracks() {
		return 'https://api.spotify.com/v1/me/tracks?limit=20&offset=0';
	}
	function _getUserRecentlyPlayedTracks() {
		return 'https://api.spotify.com/v1/me/player/recently-played?after=0';
	}

	function _getRecomm(genres) {
		const market = 'UA';
		genres = genres || 'dance/electronic,rock,chill';
		return 'https://api.spotify.com/v1/recommendations'
			+ `?limit=50`
			+ `&market=${market}`
			+ '&seed_artists=4NHQUGzhtTLFvgF5SZesLK'
			+ `&seed_genres= ${encodeURI(genres)}`
			+ 'seed_tracks=0c6xIDDpzE81m2q797ordA';
	}
	function _getGenres() {
		return 'https://api.spotify.com/v1/browse/categories'
			+ `?country=UA`
			+ '&locale=uk-UA'
			+ `&limit=50`
			+ '&offset=5';
	}

	return {
		getUserProfile() {
			return _getUserProfile();
		},
		getUserSavedTracks() {
			return _getUserSavedTracks();
		},
		getUserRecentlyPlayedTracks() {
			return _getUserRecentlyPlayedTracks();
		},
		getRecomm(genres) {
			return _getRecomm(genres);
		},
		getGenres() {
			return _getGenres();
		},
	}
})();

export default API;