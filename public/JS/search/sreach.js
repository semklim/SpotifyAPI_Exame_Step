// import API from '../API.js';
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _QueryFormatter_reg;
// function formattingQuery(query:string) {
// 	const reg = new RegExp(/^\s+$|\s+/, 'g');
// 	return query.replace(reg, '');
// }
/**
 * Formats a given query string by removing whitespace
 * @class
 */
class QueryFormatter {
    constructor() {
        /**
         * Regular expression used to match whitespace characters
         * @type {RegExp}
         * @private
         */
        _QueryFormatter_reg.set(this, new RegExp(/^\s+$|\s+/, 'g'));
    }
    /**
     * Formats a given query string by removing whitespace
     * @param {string} query - The query string to be formatted
     * @returns {string} The formatted query string
     */
    format(query) {
        return query.replace(__classPrivateFieldGet(this, _QueryFormatter_reg, "f"), '');
    }
}
_QueryFormatter_reg = new WeakMap();
/**
 * Handles search functionality for a given search box element
 * @class
 */
class Search {
    /**
     * Creates a new instance of the Search class.
     *
     * @constructor
     * @param {HTMLInputElement} input - The search box element.
     * @param {QueryFormatter} queryFormatter - An instance of the QueryFormatter class used to format the search query.
     * @param {APIClient} apiClient - An instance of the APIClient interface used to send requests to the Spotify API.
     */
    constructor(input, queryFormatter, apiClient) {
        /**
         * The current search query.
         *
         * @private
         * @type {string}
         */
        this.query = '';
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
        if (this.query === '')
            return undefined;
        this.waitTime = setTimeout(async () => {
            const url = `https://api.spotify.com/v1/search?q=${this.query}&type=playlist&market=ES&limit=50&offset=0`;
            const search = await this.apiClient.get(url);
            console.log(search);
        }, 300);
    }
}
// const searchBox = document.querySelector('.searchbox') as HTMLInputElement;
// const queryFormatter = new QueryFormatter();
// const search = new Search(searchBox, queryFormatter, API);
/**
 * @typedef {Object} Search
 * @property {QueryFormatter} QueryFormatter - The QueryFormatter class
 * @property {Search} Search - The Search class
 */
/**
 * Module exports
 * @type {Search}
 * @module
 */
export { Search, QueryFormatter };
