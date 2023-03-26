import Assets from "./htmlAssets/htmlPageAssets.js";
class UserInterface {
    constructor() {
        this.logo = document.querySelector('.logo>img');
        this.accountLink = document.querySelector('.accountLink');
        this.accountInfo = document.querySelector('.account>ul');
    }
    createAccount({ display_name, email, external_urls: { spotify }, images }) {
        this.logo.setAttribute('src', images[0].url);
        this.accountLink.setAttribute('href', spotify);
        this.accountInfo.innerHTML += `
		<li>${display_name}</li>
		<li>${email}</li>
	  `;
    }
    createGenres(obj) {
        const { box, searchBox } = Assets.genGenres(obj);
        const btn__history = document.querySelector('.btn-controls-contents');
        if (btn__history.nextElementSibling.className !== 'wrapper') {
            btn__history.insertAdjacentHTML("afterend", searchBox);
        }
        const root__top_bar = document.querySelector('.root__top-bar');
        const requestBox = document.querySelector('.requestBox');
        if (root__top_bar.nextElementSibling === null) {
            (document.querySelector('.main-content')).innerHTML += box;
        }
        else if (requestBox) {
            requestBox.innerHTML = box;
        }
    }
    createGenresRes(genresName, playlists) {
        const html = Assets.playlistByGenres(genresName, playlists);
        const requestBox = document.querySelector('.requestBox');
        requestBox.innerHTML = html;
        const contentSize = document.querySelector('.shelf__content');
        const shelf__content__playlist = document.querySelector('.shelf__content__playlist');
        let gap = 24;
        let count = Math.round((contentSize.offsetWidth - gap) / (shelf__content__playlist.offsetWidth < 180 ? 180 : shelf__content__playlist.offsetWidth + gap));
        gap = count < 3 ? 12 : 24;
        contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`);
        function setNumberOfGridColumns() {
            if (shelf__content__playlist.offsetWidth < 180) {
                if ((count -= 1) < 3) {
                    gap = 12;
                }
                count = count < 2 ? 2 : count;
                contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`);
            }
            const rise = (180 + gap) * (count + 1);
            if (rise < contentSize.offsetWidth && rise < 1800) {
                if ((count += 1) > 3)
                    gap = 24;
                contentSize.setAttribute('style', `--column-count: ${count};  --grid-gap: ${gap}px;`);
            }
        }
        // prevents of stacking the same eventlistener
        if (!UserInterface.EventHandlers) {
            UserInterface.EventHandlers = new Map();
            UserInterface.EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
            window.addEventListener('resize', setNumberOfGridColumns);
        }
        else {
            window.removeEventListener('resize', UserInterface.EventHandlers.get('setNumberOfGridColumns'));
            UserInterface.EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
            window.addEventListener('resize', setNumberOfGridColumns);
        }
    }
}
const UI = new UserInterface();
export default UI;
