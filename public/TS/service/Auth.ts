// @ts-ignore
import { clientId, clientSecret } from "../../SPOTIFY_APP_KEYS/KEYS.js"


const CLIENT_ID = clientId;
const CLIENT_SECRET = clientSecret;
const REDIRECT_URI = window.location.href.replace(/\/\w+.html$/, '/') + 'callback.html';
const SCOPES = [
	// Playlists
	'playlist-read-private',
	'playlist-modify-private',
	'playlist-modify-public',
	// Library
	'user-library-modify',
	'user-library-read',
	// Follow
	'user-follow-modify',
	'user-follow-read',
	// Users
	'user-read-email',
	'user-read-private',
	// Listening History
	'user-read-playback-position',
	'user-top-read',
	'user-read-recently-played',
	// Spotify Connect
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
];

type Credentials = {
	access_token: string; 
	expires_in: number;
	token_type: string;
}

/**
 * The SpotifyAuth class provides methods for authenticating a user and making API requests to the Spotify Web API.
 */
class SpotifyAuth {
	/**
	 * The client ID for your Spotify application.
	 * @type {string}
	 * @private
	 */
	private readonly clientId: string;
  
		/**
	 * The client ID for your Spotify application.
	 * @type {string}
	 * @private
	 */
		private readonly clientSecret: string;

	/**
	 * The redirect URI for your Spotify application.
	 * @type {string}
	 * @private
	 */
	private readonly redirectUri: string;
  
	/**
	 * The access token for the authenticated user.
	 * @type {string | null}
	 */
	accessToken: string | null = null;

	/**
   * The refresh token for the authenticated user.
   * @type {string | null}
   * @private
   */
	refreshToken: string | null = null;

	/**
	 * The expires_in for the authenticated user.
	 * @type {Date | null}
	 */
	expires_in: Date | null = null;

		/**
	 * The authorization scopes for your Spotify application.
	 * @type {string[]}
	 * @private
	 */
	private readonly scopes: string[];
  
	/**
	 * Creates a new SpotifyAuth instance.
	 * @param {string} clientId - The client ID for your Spotify application.
	 * @param {string} clientSecret - The redirect URI for your Spotify application.
	 * @param {string} redirectUri - The redirect URI for your Spotify application.
	 * @param {string} scopes - The authorization scopes for your Spotify application.
	 */
	constructor(clientId: string, redirectUri: string, clientSecret: string, scopes: string[]) {
	  this.clientId = clientId;
	  this.clientSecret = clientSecret;
	  this.redirectUri = redirectUri;
	  this.scopes = scopes;
	}
	/**
	 * Authorization Client Credentials Flow.
	 * @returns {Promise<object>} - The access token and expiration time.
	 */
	 getToken (): Promise<Credentials> {
		const urlAuth = 'https://accounts.spotify.com/api/token';
		const configAuth = {
			method: 'POST',
			headers: {
			'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
			'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'grant_type=client_credentials'
		}
		const token = fetch(urlAuth, configAuth)
						.then((data) => data.json())
						.then((accessObject) => accessObject);
		return token;
	}
  
	/**
	 * Authenticates the user with the Spotify Web API.
	 * @returns {Promise<string>} - A Promise that resolves with the code for the authenticated user.
	 */
	async login(): Promise<string> {
	  const url = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&show_dialog=true&scope=${encodeURIComponent(this.scopes.join(' '))}&response_type=code`;
  
	  // Open a new popup window for the user to log in.
	  const popup = window.open(url, 'Spotify Login','width=600,height=600')!;
  
	  // Listen for the "message" event from the popup window.
	  return new Promise<string>((resolve, reject) => {
		window.addEventListener('message', async (event) => {
		  if (event.origin !== window.location.origin) {
			return;
		  }
		  const access = JSON.parse(event.data);

		if (access.type === 'SpotifyCode') {
			// Exchange the authorization code for an access token and refresh token.
			const { access_token, refresh_token, expires_in } = await this.exchangeAuthorizationCode(access.SpotifyCode);
  
			// Store the access token, refresh token, and expiration time.
			this.accessToken = access_token;
			this.refreshToken = refresh_token;
			this.expires_in = new Date(Date.now() + (expires_in * 1000));
			resolve(this.accessToken);
		  } else {
			// Reject the Promise if an error occurs.
			reject(access);
		  }
  
		  // Close the popup window.
		  popup.close();
		},{once: true});/* Thats need for situation when user try login, logout, and another login. 
						   Without it will be error, 400. Not valid code */
	  });
	}

 /**
   * Exchanges an authorization code for an access token and refresh token.
   * @param {string} code - The authorization code to exchange.
   * @returns {Promise<Object>} - A Promise that resolves with the access token, refresh token, and expiration time.
   * @private
   */
 private async exchangeAuthorizationCode(code: string): Promise<{ access_token: string, refresh_token: string, expires_in: number }> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}`,
    });

    if (!response.ok) {
      const { error, error_description } = await response.json();
      throw new Error(`${error}: ${error_description}`);
    }

    const { access_token, refresh_token, expires_in } = await response.json();
    return { access_token, refresh_token, expires_in };
  }

  	/**
   * Uses the refresh token to get a new access token.
   * @returns {Promise<Object>} - A Promise that resolves when the access token has been refreshed.
   */
  
	async refreshAccessToken(): Promise<Object> {

		const response = await fetch('https://accounts.spotify.com/api/token', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
		  },
		  body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`,
		});
	
		if (!response.ok) {
		  const { error, error_description } = await response.json();
		  throw new Error(`${error}: ${error_description}`);
		}
	
		const access = await response.json();
		const { access_token, expires_in } = access;
		this.accessToken = access_token;
		this.expires_in = new Date(Date.now() + (expires_in * 1000));
		return access;
	  }

	isSettingAppKeys (): boolean{
		 
		if( this.clientId === 'Your CLIENT_ID' ||
			this.clientSecret === 'Your CLIENT_SECRET'){
				return false;
		}else{
				return true;
		}
	}
	}
	
	/**
 * A module that provides methods for authenticating a user, refresh access token and making API requests to the Spotify Web API.
 * @async
 * @method  login - Authenticates the user with the Spotify Web API.
 * @method  exchangeAuthorizationCode - Exchanges an authorization code for an access token and refresh token.
 * @method  refreshAccessToken - Uses the refresh token to get a new access token.
 */
export default new SpotifyAuth(CLIENT_ID!, REDIRECT_URI, CLIENT_SECRET!, SCOPES);
