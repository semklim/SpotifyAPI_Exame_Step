// import API from '../API.js';

interface APIClient {
	/**
	 * Sends a GET request to the specified URL and returns the response data as an object.
	 *
	 * @param {string} url - The URL to send the GET request to.
	 * @returns {Promise<object>} A promise that resolves with the response data.
	 */
	get(url: string): Promise<any>;
  }

// function formattingQuery(query:string) {
// 	const reg = new RegExp(/^\s+$|\s+/, 'g');
// 	return query.replace(reg, '');
// }

/**
 * Formats a given query string by removing whitespace
 * @class
 */
class QueryFormatter {
	/**
	 * Regular expression used to match whitespace characters
	 * @type {RegExp}
	 * @private
	 */
	#reg: RegExp = new RegExp(/^\s+$|\s+/, 'g');
  
	/**
	 * Formats a given query string by removing whitespace
	 * @param {string} query - The query string to be formatted
	 * @returns {string} The formatted query string
	 */
	format(query: string): string {
	  return query.replace(this.#reg, '');
	}
  }


/**
 * Handles search functionality for a given search box element
 * @class
 */
class Search {
	/**
	 * The search box element.
	 *
	 * @private
	 * @readonly
	 * @type {HTMLInputElement}
	 */
	private readonly input: HTMLInputElement;

	/**
	 * An instance of the QueryFormatter class used to format the search query.
	 *
	 * @private
	 * @readonly
	 * @type {QueryFormatter}
	 */
	private readonly queryFormatter: QueryFormatter;

	/**
	 * An instance of the APIClient interface used to send requests to the Spotify API.
	 *
	 * @private
	 * @readonly
	 * @type {APIClient}
	 */
	private readonly apiClient: APIClient;

	/**
	 * The current search query.
	 *
	 * @private
	 * @type {string}
	 */
	private query: string = '';

	/**
	 * The ID of the timeout set by setTimeout to delay the search request.
	 *
	 * @private
	 * @type {number}
	 */
	private waitTime: number;

	/**
	 * Creates a new instance of the Search class.
	 *
	 * @constructor
	 * @param {HTMLInputElement} input - The search input HTMLElement.
	 * @param {QueryFormatter} queryFormatter - An instance of the QueryFormatter class used to format the search query.
	 * @param {APIClient} apiClient - An instance of the APIClient interface used to send requests to the Spotify API.
	 */
	constructor(input: HTMLInputElement, queryFormatter: QueryFormatter, apiClient: APIClient) {
	  this.input = input;
	  this.queryFormatter = queryFormatter;
	  this.apiClient = apiClient;
	  this.query = '';
	  this.waitTime = 0;
	  this.input.addEventListener('input', this.handleInput.bind(this));
	}
  
	/**
	 * Event listener callback function for the input event on the search box element
	 */
	handleInput() {
	  clearTimeout(this.waitTime);
	  this.query += this.queryFormatter.format(this.input.value);
	  if (this.query === '') return undefined;
	  this.waitTime = setTimeout(async () => {
		const url = `https://api.spotify.com/v1/search?q=${this.query}&type=playlist&market=ES&limit=50&offset=0`;
		const search = await this.apiClient.get(url);
		console.log(search);
	  }, 300);
	}
  }
  
export {
	Search,
	QueryFormatter
}