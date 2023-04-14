import Auth from "../../Auth.js";
import API from "../../API.js";
async function prepareTracksForAlbum(album) {
    let tracks = album.tracks.items;
    let isLiked = [];
    let idTracks = [];
    let buffer = [];
    if (Auth.accessToken) {
        tracks.forEach((el) => {
            idTracks.push(el.id);
        });
        // making array(boolean[]) of liked tracks
        if (idTracks.length > 50 && idTracks.length <= 100) {
            buffer = [idTracks.slice(0, 50), idTracks.slice(50)];
            isLiked.push(...(await API.CheckUserSavedTracks(buffer[0])), ...(await API.CheckUserSavedTracks(buffer[1])));
        }
        else if (idTracks.length <= 50 && idTracks.length > 0) {
            isLiked = await API.CheckUserSavedTracks(idTracks);
        }
        // adding info about liked track or not
        tracks.map((el, i) => {
            el.isLiked = isLiked[i];
        });
    }
    return tracks;
}
async function prepareTracks(playlist) {
    let tracks = playlist.tracks.items;
    let isLiked = [];
    let idTracks = [];
    let buffer = [];
    tracks = tracks.filter((el) => {
        if (el.track === null) {
            return false;
        }
        // if(el.track.preview_url === null){
        // 	return false;
        // }
        return true;
    });
    if (Auth.accessToken) {
        tracks.forEach((el) => {
            idTracks.push(el.track.id);
        });
        // making array(boolean[]) of liked tracks
        if (idTracks.length > 50 && idTracks.length <= 100) {
            buffer = [idTracks.slice(0, 50), idTracks.slice(50)];
            isLiked.push(...(await API.CheckUserSavedTracks(buffer[0])), ...(await API.CheckUserSavedTracks(buffer[1])));
        }
        else if (idTracks.length <= 50) {
            isLiked = await API.CheckUserSavedTracks(idTracks);
        }
        // adding info about liked track or not
        tracks.map((el, i) => {
            el.track.isLiked = isLiked[i];
        });
    }
    return tracks;
}
export { prepareTracks, prepareTracksForAlbum };
