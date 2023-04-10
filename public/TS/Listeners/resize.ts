import { setNumberOfGridColumns } from "../helpers/setNumberOfColumns.js";

// const style = document.getElementsByClassName('workShelf')![0];

// const maxWidth = <HTMLElement>document.body;
// let gap = 24;
// let count: number;

// count = Math.round((maxWidth.offsetWidth - gap) / (220 + gap));
// count = count > 8 ? 8 : count;
// count = count < 2 ? 2 : count;
// gap = count < 3 ? 12 : 24;
// style.innerHTML = `
// :root {
// 	--column-count: ${count};
// 	--grid-gap: ${gap}px;
// }
// .displayNone__moreThen:nth-child(n + ${count + 1}){
// 	display: none;
// }`;

setNumberOfGridColumns();

function resize() {
	setNumberOfGridColumns();
}

export default resize;