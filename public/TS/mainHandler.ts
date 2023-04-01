import API from "./API.js";
import UI from "./UI.js";
import APP from "./main.js";

const requestBox = document.getElementsByClassName('requestBox')[0];
const history: Array<string> = [];
let historyIndex: number = 0;

function historyLogic () {
	history.push(requestBox.innerHTML);
	historyIndex = history.length - 1;
};

function keepChronology() {
	if(historyIndex !== (history.length - 1)){
		history.push(requestBox.innerHTML);
	}
};

async function mainHandler( e: Event ) {
	const target = e!.target as HTMLElement;
	const className = [...target.classList];
		if(className.includes('btn-controls-contents__left')){
			if(historyIndex - 1 >= 0){
			historyIndex = historyIndex - 1;
			const html = history[historyIndex];
			requestBox.innerHTML = html;
			}
		}

		if(className.includes('btn-controls-contents__right')){
			if(historyIndex + 1 < history.length){
				historyIndex = historyIndex + 1;
				const html = history[historyIndex];
				requestBox.innerHTML = html;
			}
		}

		if(className.includes('like')){
			
			const likeCondition = target.getAttribute('data-likeCondition')!;
			const path = (target.firstElementChild! as SVGAElement);
			target.classList.add("shake");
			setTimeout(function () {
				target.classList.remove("shake");
			}, 800);
			if(likeCondition === 'true'){
				target.style.width = '17'
				target.style.height = '15'
				path.style.stroke = 'lightgrey'
				target.style.fill = 'none';
			  //   likeCondition = false;
				target.setAttribute('data-likeCondition', 'false');
				target.classList.add('hover');
			}else{
				  target.style.width = '19'
				  target.style.height = '17'
				  path.style.stroke = 'none';
				  target.style.fill = 'green';
				//   likeCondition = true;
				  target.setAttribute('data-likeCondition', 'true');
				  target.classList.remove('hover')
			}
		}

	if(className.includes('nav-bar__serch-link')){
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()
		
		await APP.genGenres();
		historyLogic();
		APP.PageSearch();
	}
	if(className.includes('genres')){
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()
		
		const genresName = ((target as HTMLElement).querySelector('.nameOfGenres')!).textContent!;
		const id = (target as HTMLElement).getAttribute('id')!;
		const playlist = await API.GetCategoryPlaylists(id);
		UI.createGenresRes(genresName, playlist.playlists.items);
		historyLogic();
		
	}

	if(className.includes('shelf__content__playlist')){
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()
		
		await APP.PageTracks(target.id);
		historyLogic();
	}
}

export default mainHandler;