import { OnPlayFunc } from "./OnPlayFunc.js";
import APP from "./main.js";

const requestBox = document.getElementsByClassName('requestBox')[0];
const history: Array<string> = [];
let historyIndex: number = 0;

function historyLogic() {
	history.push(requestBox.innerHTML);
	historyIndex = history.length - 1;
};

function keepChronology() {
	if (historyIndex !== (history.length - 1) && history.length !== 0) {
		history.length = historyIndex + 1;
	}
};

function likeStyle(target: HTMLElement, likeCondition: boolean) {
	const path = (target.firstElementChild! as SVGAElement);
	if (likeCondition) {
		target.style.width = '19'
		target.style.height = '17'
		path.style.stroke = 'none';
		target.style.fill = 'green';
		//   likeCondition = true;
		target.setAttribute('data-like-condition', 'true');
		target.classList.remove('hover');
	} else {
		target.style.width = '17'
		target.style.height = '15'
		path.style.stroke = 'lightgrey'
		target.style.fill = 'none';
		//   likeCondition = false;
		target.setAttribute('data-like-condition', 'false');
		target.classList.add('hover');
	}
}

async function mainHandler(e: Event) {
	const target = e!.target as HTMLElement;
	const className = [...target.classList];

	// HISTORY BLOCK START
	if (className.includes('btn-controls-contents__left')) {
		if (historyIndex - 1 >= 0) {
			historyIndex = historyIndex - 1;
			const html = history[historyIndex];
			requestBox.innerHTML = html;
		}
	}

	if (className.includes('trackPlayBtn')) {
		// OnPlayFunc();
	}

	if (className.includes('btn-controls-contents__right')) {
		if (historyIndex + 1 < history.length) {
			historyIndex = historyIndex + 1;
			const html = history[historyIndex];
			requestBox.innerHTML = html;
		}
	}
	// WORK OF LIKE
	if (className.includes('like')) {
		const id = target.getAttribute('data-like-id')!;
		const allLikes = document.querySelectorAll(`[data-like-id="${id}"]`);
		const likeCondition = (target.getAttribute('data-like-condition') === 'false');

		allLikes.forEach((el) => {
			el.classList.add("shake");

			setTimeout(function () { el.classList.remove("shake") }, 800);

			likeStyle((el as HTMLElement), likeCondition);
		});

		APP.setLike(id, likeCondition);
	}

	if (className.includes('nav-bar__serch-link')) {
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()

		await APP.genGenres();
		historyLogic();
		APP.PageSearch();
	}
	if (className.includes('genres')) {
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()

		const genreName = ((target as HTMLElement).querySelector('.nameOfGenres')!).textContent!;
		const id = (target as HTMLElement).getAttribute('id')!;

		await APP.playlistsByGenre(genreName, id);
		historyLogic();
	}

	if (className.includes('shelf__content__playlist')) {
		// copies a page when client make a step back, to keep a history of client actions
		keepChronology()

		await APP.PageTracks(target.id);
		historyLogic();
	}

	if(className.includes('trackPlayBtn')){
		OnPlayFunc();
	}
}

export default mainHandler;