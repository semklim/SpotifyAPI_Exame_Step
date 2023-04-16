export let playingAudio = null;
import { onPlay, playBtnSVG, pauseConditionChange, currentAudio, volumeSlider, } from "./player.js";
import { favTracks, favTracksDeleter, refreshFavorite_track, } from "./service/APP.js";
import API from "./service/API.js";
import { prepareTracks } from "./helpers/tracks/prepareTracksObj.js";
export function findObjectByParam(array, value, anotherArray) {
    if (array[0].track) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].track.preview_url === value) {
                return i;
            }
            else if (anotherArray) {
                if (anotherArray[i].track.preview_url === value) {
                    return i;
                }
            }
        }
    }
    else {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].preview_url === value) {
                return i;
            }
        }
    }
}
let tracksObj;
let playlistId;
let playlist;
export function OnPlayFunc(tracks) {
    if (tracks) {
        tracksObj = tracks;
        favTracksDeleter();
    }
    else {
        let tracks = tracksObj;
        playBtnSVG.innerHTML =
            '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        pauseConditionChange();
        if (playingAudio != null) {
            playingAudio.pause();
            playingAudio = null;
        }
        if (currentAudio) {
            currentAudio.pause();
        }
        const target = event.target;
        if (target.className.includes("play-favorite-track__button")) {
            const refreshPlaylist = async () => {
                playlistId = target.getAttribute("data-playlist-id");
                if (target.getAttribute("data-type") === "album") {
                    playlist = await API.getAlbum(playlistId);
                    // @ts-ignore
                    tracksObj = playlist.tracks.items;
                    tracks = tracksObj;
                    if (playingAudio === null) {
                        //@ts-ignore
                        playingAudio = onPlay(tracksObj, 0);
                    }
                    //@ts-ignore
                    playingAudio.volume = volumeSlider.value / 100;
                }
                else if (target.getAttribute("data-type") === "playlist") {
                    playlist = await API.GetPlaylist(playlistId);
                    tracksObj = await prepareTracks(playlist);
                    tracks = tracksObj;
                    if (playingAudio === null) {
                        //@ts-ignore
                        playingAudio = onPlay(tracksObj, 0);
                    }
                    //@ts-ignore
                    playingAudio.volume = volumeSlider.value / 100;
                }
                else if (target.getAttribute("data-type") === "fav-tracks") {
                    tracksObj = await refreshFavorite_track();
                    tracks = tracksObj;
                    if (playingAudio === null) {
                        //@ts-ignore
                        playingAudio = onPlay(tracksObj, 0);
                    }
                    //@ts-ignore
                    playingAudio.volume = volumeSlider.value / 100;
                }
            };
            refreshPlaylist();
            return;
        }
        if (target.className === "trackPlayBtn") {
            const url = target.getAttribute("href");
            if (favTracks) {
                tracks = favTracks;
            }
            if (url !== "null") {
                const index = findObjectByParam(tracks, url, favTracks);
                if (typeof index === "number") {
                    //@ts-ignore
                    playingAudio = onPlay(tracks, index);
                    //@ts-ignore
                    playingAudio.volume = volumeSlider.value / 100;
                }
                else {
                    const refreshPlaylist = async () => {
                        const playlistId = document
                            .querySelector(".play-favorite-track__button")
                            .getAttribute("data-playlist-id");
                        const playlist = await API.GetPlaylist(playlistId);
                        const tracksObj = await prepareTracks(playlist);
                        tracks = tracksObj;
                        // @ts-ignore
                        playingAudio = onPlay(tracks, findObjectByParam(tracks, url, favTracks));
                        //@ts-ignore
                        playingAudio.volume = volumeSlider.value / 100;
                    };
                    refreshPlaylist();
                }
            }
            else {
                console.log("Sorry track is not found");
            }
        }
    }
}
