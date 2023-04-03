export let playingAudio = null;
import { onPlay } from "./player.js";
import { playBtnSVG } from "./player.js";
export function findObjectByParam(array, value) {
    for (let i = 0; i < array.length; i += 1) {
        //@ts-ignore
        if (array[i].track.preview_url === value) {
            //@ts-ignore
            return i;
        }
    }
}
//@ts-ignore
export function OnPlayFunc(tracks) {
    playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
    if (playingAudio != null) {
        playingAudio.currentTime = 0;
        playingAudio.volume = 0;
        playingAudio.pause();
        playingAudio = null;
    }
    const target = event.target;
    if (target.className === "trackPlayBtn") {
        const url = target.getAttribute('href');
        if (url !== 'null') {
            /*
            якщо в об'єкті playlist.tracks є посилання на наступну сторінку з треками, то об'єкт tracks в середину буде мати не [] музики,
            а додаткові поля і поле items з масивот треків.
            Врахуй це при розробці.
            Nikita_Function(tracks,findObjectByParam(tracks, url));
            */
            //@ts-ignore
            playingAudio = onPlay(tracks, findObjectByParam(tracks, url));
            // playingAudio!.src = url;
            // playingAudio!.play();
        }
        else {
            console.log('Sorry track is not found');
        }
    }
}
;
