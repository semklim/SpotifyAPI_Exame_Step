export let playingAudio: HTMLAudioElement | null = null;
import { onPlay } from "./player.js";
import { playBtnSVG } from "./player.js";
import { pauseConditionChange } from "./player.js";
import { currentAudio } from "./player.js";
import { favTracks } from "./main.js";
import { favTracksDeleter } from "./main.js";
import API from "./API.js"
import { prepareTracks, prepareTracksForAlbum } from "./helpers/tracks/prepareTracksObj.js"
import { volumeSlider } from "./player.js";


export function findObjectByParam(array: any[], value: string, anotherArray: any[]) {
    console.log(array);
    //@ts-ignore
    if (array[0].track) {
        for (let i = 0; i < array.length; i += 1) {
            //@ts-ignore
            if (array[i].track.preview_url === value) {
                //@ts-ignore
                return i;
            } else if (anotherArray) {
                // @ts-ignore
                if (anotherArray[i].track.preview_url === value) {
                    return i;
                }
            }
        }
    } else {
        for (let i = 0; i < array.length; i += 1) {
            //@ts-ignore
            if (array[i].preview_url === value) {
                //@ts-ignore
                return i;
            }
        }
    }
}


let tracksObj: Array<object> | null
let playlistId: Array<object> | null | string;
let playlist: Array<object> | null
//@ts-ignore
export function OnPlayFunc(tracks?) {
    if (tracks) {
        tracksObj = tracks;
        favTracksDeleter()
    } else {
        let tracks = tracksObj!;
        playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        pauseConditionChange();
        if (playingAudio != null) {
            playingAudio!.pause()
            playingAudio = null
        }
        if (currentAudio) {
            currentAudio.pause();
        }
        const target = (event!.target as HTMLElement);
        if (target.className.includes("play-favorite-track__button")) {
            const refreshPlaylist = async () => {
                // @ts-ignore
                playlistId = target.getAttribute('data-playlist-id');
                playlist = await API.GetPlaylist(playlistId!);
                tracksObj = await prepareTracks(playlist);
                tracks = tracksObj!;
                if (playingAudio === null) {
                    //@ts-ignore
                    playingAudio = onPlay(tracksObj, 0);
                }
                //@ts-ignore
                playingAudio.volume = volumeSlider.value / 100
            };
            refreshPlaylist();
            return;
        }
        if (target.className === "trackPlayBtn") {
            const url = target.getAttribute('href')!;
            if (favTracks) {
                tracks = favTracks
            }
            if (url !== 'null') {
                const index = findObjectByParam(tracks, url, favTracks);
                if (typeof index === "number") {
                    //@ts-ignore
                    playingAudio = onPlay(tracks, index);
                    //@ts-ignore
                    playingAudio.volume = volumeSlider.value / 100
                } else {
                    const refreshPlaylist = async () => {
                        // @ts-ignore
                        const playlistId = target.getAttribute('data-playlist-id');
                        const playlist = await API.GetPlaylist(playlistId!);
                        const tracksObj = await prepareTracks(playlist);
                        tracks = tracksObj!;
                        // @ts-ignore
                        playingAudio = onPlay(tracks, findObjectByParam(tracks, url, favTracks)!);
                        //@ts-ignore
                        playingAudio.volume = volumeSlider.value / 100
                    };
                    refreshPlaylist();
                }
            } else {
                console.log('Sorry track is not found')
            }
        }
    }
};