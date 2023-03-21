import Auth from "./Auth.js";
/**
 * A class that implements the APIClient interface and sends requests to the Spotify API.
 *
 * @class
 * @implements {APIClient}
 */
class SpotifyAPI {
    /**
     * Creates a new SpotifyAPI instance.
     */
    constructor() {
        /**
         * The access token for the authenticated user.
         * @type {string | null}
         * @private
         */
        this.accessToken = null;
        /**
         * The expires_in for the authenticated user.
         * @type {Date | null}
         * @private
         */
        this.expires_in = null;
        /**
         * The User data for get request.
         * @type {object | null}
         * @private
         */
        this.user = null;
        this.accessToken;
        this.expires_in;
        this.user;
    }
    UserProfile() {
        return this.get('https://api.spotify.com/v1/me');
    }
    UserSavedTracks() {
        return this.get('https://api.spotify.com/v1/me/tracks?limit=50&offset=0');
    }
    UserRecentlyPlayedTracks() {
        return this.get('https://api.spotify.com/v1/me/player/recently-played?after=0');
    }
    async Recomm(genres) {
        const market = this.user ? this.user.country : 'ES';
        genres = genres || 'dance/electronic,rock,chill';
        const url = 'https://api.spotify.com/v1/recommendations'
            + `?limit=50`
            + `&market=${market}`
            + '&seed_artists=4NHQUGzhtTLFvgF5SZesLK'
            + `&seed_genres= ${encodeURI(genres)}`
            + 'seed_tracks=0c6xIDDpzE81m2q797ordA';
        return this.get(url);
    }
    Genres() {
        const url = 'https://api.spotify.com/v1/browse/categories'
            + `?country=${this.user.country || 'ES'}`
            + `&locale=uk_${this.user.country || 'ES'}`
            + `&limit=50`
            + '&offset=0';
        return this.get(url);
    }
    /**
 * Makes an authenticated GET request to the Spotify Web API.
 * @param {string} url - The URL to make the request to Spotify Web API.
 * @returns {Promise<any>} - A Promise that resolves with the response data.
 */
    async get(url, methodReq) {
        if (!this.accessToken) {
            if (Auth.accessToken) {
                this.accessToken = Auth.accessToken;
                this.expires_in = Auth.expires_in;
            }
            else {
                throw new Error('You must be logged in to make this request.');
            }
        }
        if (this.expires_in && this.expires_in < new Date()) {
            // The access token has expired, so use the refresh token to get a new access token.
            const res = await Auth.refreshAccessToken();
            const { access_token, expires_in } = res;
            this.accessToken = access_token;
            this.expires_in = new Date(Date.now() + (expires_in * 1000));
        }
        const response = await fetch(url, {
            method: methodReq ? methodReq.toUpperCase() : 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });
        if (!response.ok) {
            const { error, error_description } = await response.json();
            throw new Error(`${error}: ${error_description}`);
        }
        return response.json();
    }
}
export default new SpotifyAPI();
