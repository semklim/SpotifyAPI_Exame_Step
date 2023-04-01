import API from "./API.js";
import UI from "./UI.js";
import APP from "./main.js";
const requestBox = document.getElementsByClassName('requestBox')[0];
const history = [];
let historyIndex = 0;
async function mainHandler(e) {
    const target = e.target;
    const className = [...target.classList];
    if (className.includes('btn-controls-contents__left')) {
        if (historyIndex - 1 >= 0) {
            historyIndex = historyIndex - 1;
            const html = history[historyIndex];
            requestBox.innerHTML = html;
        }
    }
    if (className.includes('btn-controls-contents__right')) {
        if (historyIndex + 1 < history.length) {
            historyIndex = historyIndex + 1;
            const html = history[historyIndex];
            requestBox.innerHTML = html;
        }
    }
    if (className.includes('like')) {
        const likeCondition = target.getAttribute('data-likeCondition');
        const path = target.firstElementChild;
        target.classList.add("shake");
        setTimeout(function () {
            target.classList.remove("shake");
        }, 800);
        if (likeCondition === 'true') {
            target.style.width = '17';
            target.style.height = '15';
            path.style.stroke = 'lightgrey';
            target.style.fill = 'none';
            //   likeCondition = false;
            target.setAttribute('data-likeCondition', 'false');
            target.classList.add('hover');
        }
        else {
            target.style.width = '19';
            target.style.height = '17';
            path.style.stroke = 'none';
            target.style.fill = 'green';
            //   likeCondition = true;
            target.setAttribute('data-likeCondition', 'true');
            target.classList.remove('hover');
        }
    }
    if (className.includes('nav-bar__serch-link')) {
        if (historyIndex !== (history.length - 1)) {
            history.push(requestBox.innerHTML);
        }
        await APP.genGenres();
        history.push(requestBox.innerHTML);
        historyIndex = history.length - 1;
        APP.PageSearch();
    }
    if (className.includes('genres')) {
        if (historyIndex !== (history.length - 1)) {
            history.push(requestBox.innerHTML);
        }
        const genresName = (target.querySelector('.nameOfGenres')).textContent;
        const id = target.getAttribute('id');
        const playlist = await API.GetCategoryPlaylists(id);
        UI.createGenresRes(genresName, playlist.playlists.items);
        history.push(requestBox.innerHTML);
        historyIndex = history.length - 1;
        console.log(history.length, historyIndex);
    }
    if (className.includes('shelf__content__playlist')) {
        if (historyIndex !== (history.length - 1)) {
            history.push(requestBox.innerHTML);
        }
        await APP.PageTracks(target.id);
        history.push(requestBox.innerHTML);
        historyIndex = history.length - 1;
    }
}
export default mainHandler;
