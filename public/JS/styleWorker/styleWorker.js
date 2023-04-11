/**

Applies styling to a DOM element using the provided style options.
@param {Object} styleOptions - The style options object.
@param {number} styleOptions.count - The number of columns to display.
@param {number} styleOptions.gap - The gap size between columns in pixels.
*/
export function styleWorker({ count, gap }) {
    const style = document.getElementsByClassName('workShelf')[0];
    style.innerHTML = `
	:root {
		--column-count: ${count};
		--grid-gap: ${gap}px;
	}
	.displayNone__moreThen .shelf__content__playlist:nth-child(n + ${count + 1}){
		display: none;
	}`;
}
;
