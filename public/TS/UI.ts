import buildTracksByPlaylist from "./pagePartials/buildTracksByPlaylistOrAlbum/buildTracksByPlaylistOrAlbum.js";
import funcUI from "./pagePartials/fav-tracks/fav-tracks.js";
import  buildSearchPage  from "./pagePartials/searchPage/buildSearchPage.js";
import buildPageOfPlaylists from "./pagePartials/playlistsByRequest/getPlaylists.js";
/**

Represents the Assets of html pages class.
@class
@method playlistByGenres() 
@method genGenres()
*/  
  class UserInterface {
	/*
	The logo element.
	*/
	private readonly logo: HTMLImageElement;

	/**

	The account link element.
	*/
	private readonly accountLink: HTMLAnchorElement;

	/**

	The account info element.
	*/
	private readonly accountInfo: HTMLElement;

	/**

	The event handlers map.
	*/
	static EventHandlers: Map<string, any>;

	/**

	Creates an instance of UserInterface.
	*/
	constructor() {
	  this.logo = document.querySelector('.logo>img')!;
	  this.accountLink = document.querySelector('.accountLink')!;
	  this.accountInfo = document.querySelector('.account>ul')!;
	}

	/**
	Creates the account info section.
	@param {object} data - The user data object.
	*/
	public createAccount({ display_name, email, external_urls: { spotify }, images }: any): void {
	  this.logo.setAttribute('src', images[0].url);
	  this.accountLink.setAttribute('href', spotify);
	  this.accountInfo.innerHTML += `
		<li>${display_name}</li>
		<li>${email}</li>
	  `;
	}
	
	/**

	Creates the genres section.
	@param {object} obj - The genres data object.
	*/
	public renderSearchPage(obj: any): void {
		
		const {box, searchBox} = buildSearchPage(obj);

		const btn__history = document.querySelector('.btn-controls-contents')!;
		if(btn__history.nextElementSibling!.className !== 'wrapper'){
			btn__history.insertAdjacentHTML("afterend", searchBox);
		}

		const root__top_bar = document.querySelector('.root__top-bar')!;
		const requestBox = document.querySelector('.requestBox');
		if(root__top_bar.nextElementSibling === null){
			const mainContent = document.querySelector('.main-content')!;
			const requestBox = `<div class ="requestBox" id="searchPage">${box}</div>`;
			mainContent.innerHTML += requestBox;
		}else if(requestBox){
			requestBox.id = 'searchPage';
			requestBox.innerHTML = box;
		}
	}

	
	/**

	Creates the playlists section for a specific genre, and attaches event listener to window resize event.
	@param {string} genresName - The name of the selected genre

	@param {object[]} playlists - An array of objects representing the playlists of the genre
	*/
	public createGenresRes(genresName: string, playlists : object[]): void{
		const html = buildPageOfPlaylists(genresName, playlists);
		const requestBox = document.querySelector('.requestBox')!;
		requestBox.innerHTML = html;
	}

	public createTracks(playlist: any){
		const html = buildTracksByPlaylist(playlist);
		const requestBox = document.querySelector('.requestBox')!;
		requestBox.innerHTML = html;
	}

	public createFavTracks (obj:object) {	
		const root__top_bar = document.querySelector('.root__top-bar')!;
		const mainContent = document.querySelector(`.main-content`)!;
    const requestBox = document.querySelector('.requestBox');

    if(root__top_bar.nextElementSibling === null){
		const requestBox = document.createElement('div');
			requestBox.classList.add('requestBox');
			mainContent.appendChild(requestBox);
      (requestBox!).innerHTML += funcUI(obj)!;
    }else if(requestBox){
      requestBox.innerHTML = funcUI(obj)!;
    }
  }
}

const UI = new UserInterface();

/**
 * A module for handling the user interface of a music app.
 * @module UserInterface
 */
export default UI;