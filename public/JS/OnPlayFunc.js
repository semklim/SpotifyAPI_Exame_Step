let playingAudio = null;
import { onPlay } from "./player.js";
export function findObjectByParam(array, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i].track.preview_url === value) {
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
            Nikita_Function(tracks,findObjectByParam(tracks, url));
            */
            //@ts-ignore
            playingAudio = onPlay(tracks, findObjectByParam(tracks, url));
        }
        else {
            console.log('Sorry track is not found');
        }
    }
}
;
