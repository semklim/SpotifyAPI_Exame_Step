
async function prepareTracks(playlist: any, API: any) {
	let tracks = playlist.tracks.items;
	let isLiked: boolean[] = [];
	let idTracks: string[] = [];
	let buffer: any = [];
	
	tracks = tracks.filter((el: any) => el.track !== null);

	tracks.forEach((el: any) => {
			idTracks.push(el.track.id);
	});

	// making array(boolean[]) of liked tracks
	if(idTracks.length > 50 && idTracks.length <= 100){
		buffer = [idTracks.slice(0,50), idTracks.slice(50)];
		isLiked.push( 
			...(await API.CheckUserSavedTracks(buffer[0])), 
			...(await API.CheckUserSavedTracks(buffer[1]))
			);
		
	}else if(idTracks.length <= 50){
		isLiked = await API.CheckUserSavedTracks(idTracks);
	}

	// adding info about liked track or not
	(tracks as Array<object>).map((el: any, i: number) => {
		el.track.isLiked = isLiked[i];
	});	
	console.log(tracks);
	return tracks;
}

export default prepareTracks;