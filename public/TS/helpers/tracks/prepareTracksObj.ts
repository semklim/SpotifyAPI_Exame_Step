import Auth from "../../Auth.js";
import API from "../../API.js";


async function prepareTracksForAlbum (playlist: any) {
	let tracks = playlist.tracks.items;
	let isLiked: boolean[] = [];
	let idTracks: string[] = [];
	let buffer: any = [];
	
		if(Auth.accessToken){
			tracks.forEach((el: any) => {
				idTracks.push(el.id);
			});
			// making array(boolean[]) of liked tracks
			if(idTracks.length > 50 && idTracks.length <= 100){
				buffer = [idTracks.slice(0,50), idTracks.slice(50)];
				isLiked.push( 
					...(await API.CheckUserSavedTracks(buffer[0])), 
					...(await API.CheckUserSavedTracks(buffer[1]))
					);
				
			}else if(idTracks.length <= 50 && idTracks.length > 0){
				isLiked = await API.CheckUserSavedTracks(idTracks);
			}

			
			// adding info about liked track or not
			(tracks as Array<object>).map((el: any, i: number) => {
				el.isLiked = isLiked[i];
			});
		}
	
	return tracks;
}


async function prepareTracks(playlist: any) {
	let tracks = playlist.tracks.items;
	let isLiked: boolean[] = [];
	let idTracks: string[] = [];
	let buffer: any = [];
	
	tracks = tracks.filter((el: any) => el.track !== null);
	
	if (Auth.accessToken) {
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
	}
	return tracks;
}



export { prepareTracks, prepareTracksForAlbum };