const EventHandlers = new Map();
const contentSize = document.querySelector('.shelf__content');
const shelf__content__playlist = document.querySelector('.shelf__content__playlist');
let gap = 24;
let count = calculateDown(180);
gap = count < 3 ? 12 : 24;
contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`);
function calculateDown(min) {
    return Math.round((contentSize.offsetWidth - gap) / (shelf__content__playlist.offsetWidth < min ? min : shelf__content__playlist.offsetWidth + gap));
}
function calculateUp(max) {
    return Math.round((contentSize.offsetWidth - gap) / (shelf__content__playlist.offsetWidth < max ? max : shelf__content__playlist.offsetWidth + gap));
}
/**
 * Sets the number of grid columns based on the width of the shelf content playlist
 */
function setNumberOfGridColumns() {
    const rise = (180 + gap) * (count + 1);
    if (shelf__content__playlist.offsetWidth < 180) {
        count = calculateDown(180);
        count = count < 2 ? 2 : count;
        contentSize.setAttribute('style', `--column-count: ${count}; --grid-gap: ${gap}px;`);
    }
    if (rise < contentSize.offsetWidth && rise < 1800) {
        if (count > 3)
            gap = 24;
        count = calculateUp(220);
        contentSize.setAttribute('style', `--column-count: ${count};  --grid-gap: ${gap}px;`);
    }
}
// prevents of stacking the same eventlistener
if (EventHandlers.has('setNumberOfGridColumns')) {
    window.removeEventListener('resize', EventHandlers.get('setNumberOfGridColumns'));
    EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
    window.addEventListener('resize', setNumberOfGridColumns);
}
else {
    EventHandlers.set('setNumberOfGridColumns', setNumberOfGridColumns);
    window.addEventListener('resize', setNumberOfGridColumns);
}
export default setNumberOfGridColumns;
