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
	private accessToken: string | null = null;

	/**
	 * The expires_in for the authenticated user.
	 * @type {Date | null}
	 * @private
	 */
	private expires_in: Date | null = null;

	/**
	 * The User data for get request.
	 * @type {object | null}
	 * @private
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
		return 'https://api.spotify.com/v1/me';
	}

	UserSavedTracks() {
		return 'https://api.spotify.com/v1/me/tracks?limit=50&offset=0';
	}
	UserRecentlyPlayedTracks() {
		return 'https://api.spotify.com/v1/me/player/recently-played?after=0';
	}

	Recomm(genres: string) {
		const market = this.user!.country || 'ES';
		genres = genres || 'dance/electronic,rock,chill';
		return 'https://api.spotify.com/v1/recommendations'
			+ `?limit=50`
			+ `&market=${market}`
			+ '&seed_artists=4NHQUGzhtTLFvgF5SZesLK'
			+ `&seed_genres= ${encodeURI(genres)}`
			+ 'seed_tracks=0c6xIDDpzE81m2q797ordA';
	}
	Genres() {
		return 'https://api.spotify.com/v1/browse/categories'
			+ `?country=${this.user!.country || 'ES'}`
			+ `&locale=${this.user!.country || 'ES'}`
			+ `&limit=50`
			+ '&offset=0';
	}
	  /**
   * Makes an authenticated GET request to the Spotify Web API.
   * @param {string} url - The URL to make the request to Spotify Web API.
   * @returns {Promise<any>} - A Promise that resolves with the response data.
   */
	  async get(url: string): Promise<any> {

		interface access{
			access_token: string;
			token_type: string;
			scope: string;
			expires_in: number;
			refresh_token: string;
		}
		if (!this.accessToken) {
			if (Auth.accessToken){ 
			this.accessToken = Auth.accessToken;
			this.expires_in = Auth.expires_in;
			}else{
		  throw new Error('You must be logged in to make this request.');
			}
		}
	
		if (this.expires_in && this.expires_in < new Date()) {
		  // The access token has expired, so use the refresh token to get a new access token.
		  	const res = await Auth.refreshAccessToken();
			  const { access_token, expires_in } = res as access;
			  this.accessToken = access_token;
			  this.expires_in = new Date(Date.now() + (expires_in * 1000));
		}
	
		const response = await fetch(url, {
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
export default  new SpotifyAPI();