let playingAudio = null;
import { onPlay } from "./player.js";
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
