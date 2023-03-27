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
            + `?country=${this.user ? this.user.country : 'ES'}`
            + `&locale=${this.user ? this.user.country : 'ES'}`
            + `&limit=50`
            + '&offset=0';
        return this.get(url);
    }
    GetCategoryPlaylists(id) {
        const url = `https://api.spotify.com/v1/browse/categories/${id}/playlists`
            + `?country=${this.user ? this.user.country : 'ES'}`
            + '&limit=50'
            + '&offset=0';
        return this.get(url);
    }
    /**
     * Get data of playlist using ID from Spotify Web API;
     * @param {string} id - The ID of playlist;
     * @param {string} fields - Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist''s description and URI: fields=description,uri. A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: fields=tracks.items(added_at,added_by.id). Use multiple parentheses to drill down into nested objects, for example: fields=tracks.items(track(name,href,album(name,href))). Fields can be excluded by prefixing them with an exclamation mark, for example: fields=tracks.items(track(name,href,album(!name,href)))

    Example value:
    "items(track(name,href,album(name,href),preview_url))"
     */
    GetPlaylist(id, fields) {
        const url = `https://api.spotify.com/v1/playlists/${id}`
            + `?market=${this.user ? this.user.country : 'ES'}`
            + `${fields ? '&' + fields : ''}`
            + '&limits=100'
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
