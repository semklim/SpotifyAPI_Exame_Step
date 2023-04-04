import Auth from "./Auth.js";

/**
 * An interface that defines the methods required by an API client.
 *
 * @interface
 */
interface APIClient {
	/**
	 * Sends a GET request to the specified URL and returns the response data as an object.
	 *
	 * @param {string} url - The URL to send the GET request to.
	 * @returns {Promise<object>} A promise that resolves with the response data.
	 */
	get(url: string): Promise<any>;
  }

/**
  An interface representing a Spotify user object.
@interface
@property {string} country - The country of the user's account.
@property {string} display_name - The user's display name.
@property {string} email - The user's email address.
@property {object} explicit_content - A object containing information about the user's explicit content settings.
@property {object} external_urls - A object containing information about external URLs related to the user.
@property {object} followers - A object containing information about the user's followers.
@property {string} href - The Spotify web API endpoint for the user.
@property {string} id - The Spotify user ID for the user.
@property {Array<object>} images - An array of objects containing information about the user's profile images.
@property {string} product - The user's Spotify subscription level.
@property {string} type - The type of Spotify object, which is always set to "user".
@property {string} uri - The Spotify URI for the user.
*/
interface User{
country: string;
display_name: string;
email: string;
explicit_content: object;
external_urls: object;
followers: object;
href: string;
id: string;
images: Array<object>;
product: string;
type: string;
uri: string;
}

/**
 * A class that implements the APIClient interface and sends requests to the Spotify API.
 *
 * @class
 * @implements {APIClient}
 */
class SpotifyAPI implements APIClient {
	  
	/**
	 * The access token for the authenticated user.
	 * @type {string | null}
	 * @private
	 */
	accessToken: string | null = null;

	/**
	 * The expires_in for the authenticated user.
	 * @type {Date | null}
	 * @private
	 */
	expires_in: Date | null = null;

	/**
	 * The User data for get request.
	 * @type {object | null}
	 */
	public user: User | null = null;

	/**
	 * Creates a new SpotifyAPI instance.
	 */
	constructor() {
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

	async Recomm(genres: string) {
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
			// + `&locale=RU`
			+ `&limit=50`
			+ '&offset=0';
			return this.get(url);
	}

	GetCategoryPlaylists(id:string){
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
	GetPlaylist(id:string, fields?: string){
		const url = `https://api.spotify.com/v1/playlists/${id}`
		+ `?market=${this.user ? this.user.country : 'ES'}`
		+ `${fields ? '&' + fields : ''}`
		+ '&limits=50'
		+ '&offset=0';
		return this.get(url);
	}
	CheckUserSavedTracks (arr: string[]) {
		arr.length = 50;
		const tracks = arr.join(',');
		const url = 'https://api.spotify.com/v1/me/tracks/contains'
					+`?ids=${decodeURIComponent(tracks)}`;
		return this.get(url);
	}

	  /**
   * Makes an authenticated GET request to the Spotify Web API.
   * @param {string} url - The URL to make the request to Spotify Web API.
   * @returns {Promise<any>} - A Promise that resolves with the response data.
   */
	  async get(url: string, methodReq?: string): Promise<any> {

		interface access{
			access_token: string;
			token_type: string;
			scope?: string;
			expires_in: number;
			refresh_token?: string;
		}
		if (!this.accessToken) {
			if (Auth.accessToken){ 
			this.accessToken = Auth.accessToken;
			this.expires_in = Auth.expires_in;
			}else{
		  throw new Error('You must be logged in, to be able make this request.');
			}
		}
	
		if (this.expires_in && this.expires_in < new Date()) {
		  // The access token has expired, so use the refresh token to get a new access token.
			if(!Auth.refreshToken){
				const res = await Auth.getToken();
				const { access_token, expires_in } = res as access;
				this.accessToken = access_token;
				this.expires_in = new Date(Date.now() + (expires_in * 1000));
			}else{
				const res = await Auth.refreshAccessToken();
				const { access_token, expires_in } = res as access;
				this.accessToken = access_token;
				this.expires_in = new Date(Date.now() + (expires_in * 1000));
			}
		}
		try{
			const response = await fetch(url, {
			  method: methodReq ? methodReq.toUpperCase() : 'GET',
			  headers: {
				Authorization: `Bearer ${this.accessToken}`,
			  },
			});
			if (!response.ok) {
				const { error: { status, message } } = await response.json();
				throw new Error(`--> Status:${status}. ${message} <--`);
			  }
			  return response.json();
		}catch(err){
			console.error(err);
			const status = (err as Error).message.match(/\d+/g)!;
			return {status: status[0]};
		}
	  }
}
export default  new SpotifyAPI();