
function preparePlaylists(listOfPlaylists: object[]){
	let count: any = [];
	let playlists = [...listOfPlaylists];
	playlists = playlists.filter((el: any) => {
		if(el.owner.display_name === 'Spotify'){
			if(el.name.includes('Daily')){
				const number = el.name.match(/\d/g) ? el.name.match(/\d/g)[0] : undefined;
				const random = Math.round(Math.random() * 101);
				if(number && !count[number - 1] || random > 50){
					count[number - 1] = el;
					return false;
				}
			}
			if(el.name.includes('Daily Mix')){
				return false;
			}
			return true;
		}
		return false;
	});

	if(count.length !== 0){
	playlists = [...count, ...playlists];
	}
	return playlists;
}

export default preparePlaylists;