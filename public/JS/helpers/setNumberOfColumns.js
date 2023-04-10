/**

Sets the number of grid columns for a playlist shelf based on the content size and gap.
*/
export function setNumberOfGridColumns() {
    const style = document.getElementsByClassName('workShelf')[0];
    const maxWidth = document.body;
    let gap = 24;
    let count;
    count = Math.round((maxWidth.offsetWidth - gap) / (220 + gap));
    count = count > 8 ? 8 : count;
    count = count < 2 ? 2 : count;
    gap = count < 3 ? 12 : 24;
    style.innerHTML = `
	:root {
		--column-count: ${count};
		--grid-gap: ${gap}px;
	}
	.displayNone__moreThen:nth-child(n + ${count + 1}){
		display: none;
	}`;
}
