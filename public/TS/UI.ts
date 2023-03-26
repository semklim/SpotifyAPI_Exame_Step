/**

Represents the Assets of html pages class.
@class
@method playlistByGenres() 
@method genGenres()
*/
import Assets from "./htmlAssets/htmlPageAssets.js";
import funcUI from "./fav-tracks/fav-tracks.js";
  
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
	public createGenres(obj: any): void {
		
		const {box, searchBox} = Assets.genGenres(obj);

		const btn__history = document.querySelector('.btn-controls-contents')!;
		if(btn__history.nextElementSibling!.className !== 'wrapper'){
			btn__history.insertAdjacentHTML("afterend", searchBox);
		}

		const root__top_bar = document.querySelector('.root__top-bar')!;
		const requestBox = document.querySelector('.requestBox');
		if(root__top_bar.nextElementSibling === null){
			(document.querySelector('.main-content')!).innerHTML += box;
		}else if(requestBox){
			requestBox.innerHTML = box;
		}
	}

	/**

	Creates the playlists section for a specific genre, and attaches event listener to window resize event.
	@param {string} genresName - The name of the selected genre

	@param {object[]} playlists - An array of objects representing the playlists of the genre
	*/
	public createGenresRes(genresName: string, playlists : object[]): void{
		const html = Assets.playlistByGenres(genresName, playlists);
		const requestBox = document.querySelector('.requestBox')!;
		requestBox.innerHTML = html;

		const contentSize = <HTMLElement>document.querySelector('.shelf__content')!;
		const shelf__content__playlist = <HTMLElement>document.querySelector('.shelf__content__playlist')!;
		let gap = 24;
		let count = Math.round((contentSize.offsetWidth - gap) / (shelf__content__playlist.offsetWidth < 180 ? 180 : shelf__content__playlist.offsetWidth + gap));
		gap = count < 3 ? 12 : 24;
		contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`);

		/**
         * Sets the number of grid columns based on the width of the shelf content playlist
         */
		function setNumberOfGridColumns() { 
			if(shelf__content__playlist.offsetWidth < 180){
				if((count -= 1) < 3){
				 gap = 12;
				}
				count = count < 2 ? 2 : count;
				contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`)
			}
			const rise = (180 + gap) * (count + 1);
			if(rise < contentSize.offsetWidth && rise < 1800){
				if((count += 1) > 3) gap = 24;
				contentSize.setAttribute('style', `--column-count: ${count};  --grid-gap: ${gap}px;`)
			}
		}

		// prevents of stacking the same eventlistener
		if(!UserInterface.EventHandlers){
			UserInterface.EventHandlers = new Map();
			UserInterface.EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
			window.addEventListener('resize', setNumberOfGridColumns);
		} else{
			window.removeEventListener('resize', UserInterface.EventHandlers.get('setNumberOfGridColumns'));
			UserInterface.EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
			window.addEventListener('resize', setNumberOfGridColumns);
		}
	}

	public createTracks(playlist: any){
		const html = Assets.tracksByPlaylist(playlist);
		const requestBox = document.querySelector('.requestBox')!;
		requestBox.innerHTML = html;
	}

	public async createFavTracks (obj?:object): Promise<any> {
		const mainContent = document.querySelector(`.main-content`)!;
		const defaulbox = document.createElement("div");
		defaulbox.classList.add("requestBox");
		mainContent.appendChild(defaulbox);
		defaulbox.innerHTML = await funcUI();
	}
}

const UI = new UserInterface();

/**
 * A module for handling the user interface of a music app.
 * @module UserInterface
 */
export default UI;