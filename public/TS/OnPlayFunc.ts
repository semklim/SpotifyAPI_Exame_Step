export let playingAudio: HTMLAudioElement | null = null;
import { onPlay } from "./player.js";
import { playBtnSVG } from "./player.js";
import { pauseConditionChange } from "./player.js";
import { currentAudio } from "./player.js";
import { favTracks } from "./main.js";
import { favTracksDeleter } from "./main.js";

export function findObjectByParam(array: any[], value: string, anotherArray: any[]) {
    // favTracks =
    for (let i = 0; i < array.length; i += 1) {
        //@ts-ignore
        if (array[i].track.preview_url === value) {
            //@ts-ignore
            console.log(array)
            console.log(i)
            return i;
        } else if (anotherArray[i].track.preview_url === value) {
            return i;
        }
    }
}

let tracksObj: Array<object> | null = null;
//@ts-ignore
export function OnPlayFunc(tracks?) {
    if (tracks) {
        tracksObj = tracks;
        favTracksDeleter()
        // playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        // pauseConditionChange();
        // if (playingAudio != null) {
        //     playingAudio!.currentTime = 0
        //     playingAudio!.volume = 0;
        //     playingAudio!.pause()
        //     playingAudio = null
        // }
        // if (currentAudio) {
        //     currentAudio.pause();
        // }
        // const target = (event!.target as HTMLElement);
        // if (target.className === "trackPlayBtn") {
        //     const url = target.getAttribute('href');
        //     if (url !== 'null') {
        //         //@ts-ignore
        //         playingAudio = onPlay(tracks, findObjectByParam(tracks, url));
        //     } else {
        //         console.log('Sorry track is not found')
        //     }
        // }
    } else {
        let tracks = tracksObj;
        playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        pauseConditionChange();
        if (playingAudio != null) {
            playingAudio!.currentTime = 0
            playingAudio!.volume = 0;
            playingAudio!.pause()
            playingAudio = null
        }
        if (currentAudio) {
            currentAudio.pause();
        }
        const target = (event!.target as HTMLElement);
        if (target.className === "trackPlayBtn") {
            const url = target.getAttribute('href');
            console.log(url);
            console.log(tracks);
            if (favTracks) {
                tracks = favTracks
            }
            if (url !== 'null') {
                //@ts-ignore
                playingAudio = onPlay(tracks, findObjectByParam(tracks, url, favTracks));
            } else {
                console.log('Sorry track is not found')
            }
        }
    }
};