type obj =  {
	contentSize: HTMLElement;
	shelf__content__playlist: HTMLElement;
	gap: number;
	}

/**

Sets the number of grid columns for a playlist shelf based on the content size and gap.
// @param {Object} params - An object containing the params for the function.
@param {HTMLElement} options.contentSize - The size of the content element.
@param {HTMLElement} options.shelf__content__playlist - The playlist element.
@param {number} options.gap - The gap size between playlist items.
*/
export function setNumberOfGridColumns({ contentSize, shelf__content__playlist, gap }:obj): void {
	const style: HTMLElement = document.querySelector('.workShelf')!;
	let playlistWidth: number = shelf__content__playlist.offsetWidth;
	
	if (playlistWidth < 180) {
		playlistWidth = 180;
	} else if (playlistWidth > 220) {
		playlistWidth = 220;
	}

	let count: number = Math.round((contentSize.offsetWidth - gap) / (playlistWidth + gap));
	
	if (count < 8) {
		gap = count < 3 ? 12 : 24;
		style.innerHTML = `
		:root { --column-count: ${count}; --grid-gap: ${gap}px; } 
		.displayNone__moreThen:nth-child(n + ${count + 1}) { display: none; }`
	}
}