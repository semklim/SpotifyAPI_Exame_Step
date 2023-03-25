import Assets from "./htmlAssets/htmlPageAssets.js";

  
  class UserInterface {
	private readonly logo: HTMLImageElement;
	private readonly accountLink: HTMLAnchorElement;
	private readonly accountInfo: HTMLElement;
  
	constructor() {
	  this.logo = document.querySelector('.logo>img')!;
	  this.accountLink = document.querySelector('.accountLink')!;
	  this.accountInfo = document.querySelector('.account>ul')!;
	}
  
	public createAccount({ display_name, email, external_urls: { spotify }, images }: any): void {
	  this.logo.setAttribute('src', images[0].url);
	  this.accountLink.setAttribute('href', spotify);
	  this.accountInfo.innerHTML += `
		<li>${display_name}</li>
		<li>${email}</li>
	  `;
	}
  
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

	public createGenresRes(genresName: string, playlists : object[]): void{
		const html = Assets.playlistByGenres(genresName, playlists);
		const requestBox = document.querySelector('.requestBox')!;
		requestBox.innerHTML = html;
	}
}

const UI = new UserInterface();

export default UI;