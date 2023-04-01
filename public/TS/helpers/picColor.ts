export default function randomColor(): string {
	return 'hsl(' + 360 * Math.random() + ', 60%, 40%)';
}