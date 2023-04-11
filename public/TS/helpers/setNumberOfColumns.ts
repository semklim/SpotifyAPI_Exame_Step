import { styleWorker } from "../styleWorker/styleWorker.js";

/**

Sets the number of grid columns for a playlist shelf based on the content size and gap.
*/
export function setNumberOfGridColumns(): void {
	const maxWidth = <HTMLElement>document.body;
	let gap = 24;
	let count: number;
	
	count = Math.round((maxWidth.offsetWidth - gap) / (220 + gap));
	count = count > 8 ? 8 : count;
	count = count < 2 ? 2 : count;
	gap = count < 3 ? 12 : 24;

	styleWorker({ count, gap });
}