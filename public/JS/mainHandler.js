import { OnPlayFunc } from "./OnPlayFunc.js";
import { APP, favorite_track } from "./main.js";
const requestBox = document.getElementsByClassName('requestBox')[0];
const header = document.getElementsByClassName('header')[0];
const pauseInMinutes = 5;
let pausedTillDate = new Date(Date.now() + (pauseInMinutes * 60 * 1000));
let historyIndex = 1;
function historyLogic(index) {
    if (index) {
        APP.history[index] = requestBox.innerHTML;
    }
    else {
        if (APP.history[historyIndex - 1] !== requestBox.innerHTML &&
            APP.history[historyIndex] !== requestBox.innerHTML) {
            APP.history.push(requestBox.innerHTML);
            historyIndex = APP.history.length - 1;
        }
    }
}
;
function keepChronology() {
    if (historyIndex !== (APP.history.length - 1) && APP.history.length !== 0) {
        if (historyIndex === 0) {
            APP.history.length = 1;
            historyIndex = 1;
        }
        else {
            APP.history.length = historyIndex;
        }
    }
}
;
function likeStyle(target, likeCondition) {
    const path = target.firstElementChild;
    if (likeCondition) {
        target.style.width = '19';
        target.style.height = '17';
        path.style.stroke = 'none';
        target.style.fill = 'green';
        //   likeCondition = true;
        target.setAttribute('data-like-condition', 'true');
        target.classList.remove('hover');
    }
    else {
        target.style.width = '17';
        target.style.height = '16';
        path.style.stroke = 'lightgrey';
        target.style.fill = 'none';
        //   likeCondition = false;
        target.setAttribute('data-like-condition', 'false');
        target.classList.add('hover');
    }
}
async function mainHandler(e) {
    const target = e.target;
    const className = [...target.classList];
    // HISTORY BLOCK START
    if (className.includes('btn-controls-contents__left')) {
        if (historyIndex <= 0) {
            return undefined;
        }
        if (historyIndex - 1 >= 0) {
            historyIndex = historyIndex - 1;
        }
        if (APP.history.length === 1) {
            const html = APP.history[0];
            requestBox.innerHTML = html;
        }
        else {
            const html = APP.history[historyIndex];
            requestBox.innerHTML = html;
        }
    }
    if (className.includes('btn-controls-contents__right')) {
        if (historyIndex < APP.history.length - 1) {
            historyIndex = historyIndex + 1;
            const html = APP.history[historyIndex];
            requestBox.innerHTML = html;
        }
    }
    if (className.includes('nav-bar__main-page-link')) {
        if (pausedTillDate && pausedTillDate > new Date()) {
            keepChronology();
            requestBox.innerHTML = APP.history[0];
            historyLogic();
        }
        else {
            keepChronology();
            await APP.PageRecomm();
            pausedTillDate = new Date(Date.now() + (pauseInMinutes * 60 * 1000));
            historyLogic();
        }
    }
    // WORK OF LIKE
    if (className.includes('like')) {
        const id = target.getAttribute('data-like-id');
        const allLikes = document.querySelectorAll(`[data-like-id="${id}"]`);
        const likeCondition = (target.getAttribute('data-like-condition') === 'false');
        allLikes.forEach((el) => {
            el.classList.add("shake");
            setTimeout(function () { el.classList.remove("shake"); }, 800);
            likeStyle(el, likeCondition);
        });
        APP.setLike(id, likeCondition);
    }
    if (className.includes('nav-bar__serch-link')) {
        // copies a page when client make a step back, to keep a history of client actions
        keepChronology();
        await APP.buildSearchPage();
        historyLogic();
        APP.PageSearch();
    }
    if (className.includes('genres')) {
        // copies a page when client make a step back, to keep a history of client actions
        keepChronology();
        const genreName = (target.querySelector('.nameOfGenres')).textContent;
        const id = target.getAttribute('id');
        await APP.playlistsByGenre(genreName, id);
        historyLogic();
        header.querySelector('.wrapper').remove();
    }
    if (className.includes('shelf__content__playlist')) {
        // copies a page when client make a step back, to keep a history of client actions
        keepChronology();
        if (target.getAttribute('data-type') === 'album') {
            APP.tracksByAlbum(target.id);
        }
        else {
            await APP.tracksByPlaylist(target.id);
        }
        historyLogic();
    }
    if (className.includes('trackPlayBtn') || className.includes('play-favorite-track__button')) {
        OnPlayFunc();
    }
    if (className.includes('nav-bar-library-link-box')) {
        const searchBar = document.querySelector('.wrapper');
        keepChronology();
        await favorite_track();
        if (searchBar) {
            searchBar.remove();
        }
        historyLogic();
    }
    if (className.includes('showAll')) {
        const parent = target.closest('.shelf__control');
        const card = parent.nextElementSibling;
        if (card.getAttribute('data-is-visible') === 'true') {
            card.classList.toggle('displayNone__moreThen');
            card.setAttribute('data-is-visible', 'false');
            target.textContent = "Show all";
        }
        else {
            card.classList.toggle('displayNone__moreThen');
            card.setAttribute('data-is-visible', 'true');
            target.textContent = "Hide";
        }
    }
}
export default mainHandler;
