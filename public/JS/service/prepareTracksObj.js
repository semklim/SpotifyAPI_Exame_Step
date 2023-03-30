async function prepareTracks(playlist, API) {
    const tracks = playlist.tracks.items;
    let isLiked = [];
    let idTracks = [];
    let buffer = [];
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
    console.log(tracks);
    return tracks;
}
export default prepareTracks;
