export default function randomColor(): string {
	return 'hsl(' + 360 * Math.random() + ', 80%, 50%)';
}