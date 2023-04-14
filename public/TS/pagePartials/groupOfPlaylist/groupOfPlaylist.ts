type images = [
	{
		height: string | null;
		width: string | null;
		url: string | null;
	}
];
type artists = [
	{
	external_urls: {spotify: string};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}
]
type result = {
	name: string;
	description: string;
	images: images;
	href: string;
	type: string;
	id: string;
	release_date?: string;
	artists: artists;
	album: {
		images: [{
			height: string | null;
			width: string | null;
			url: string | null;
		}]
	}
}

const cardsOfPlaylists = (list: object[], listLength: number) => {
	let html = '';
	if(list.length <= 0) {return '<h1>sorry not possible</h1>'}
	// @ts-ignore
	let type = list[0].type;
	for (let j = 0; j < listLength; j++) {
		const el = (list[j] as result);
		let name = el.name;
		let href = el.href;
		let description = el.description;
		let images = el.images;
		let id = el.id;
		if(el === null) continue;
		if(type === 'album'){
			const date = el.release_date?.slice(0, 4);
			const name = el.artists[0].name;
			description = date + ' • ' + name;
		}

		let img:string | null = '';

		if(type === 'track' ) {
			if(!el.album.images.length) {continue}
			const name = el.artists[0].name;
			description = name;
			img = el.album.images[0].url ? el.album.images[0].url : '';
		} 
		else {
			if(!images.length){continue}
			img = images[0].url ? images[0].url : '';
		}

		if(type === 'artist'){	
			description = type.charAt(0).toUpperCase() + type.slice(1);
		}
		
		html += `<div class="shelf__content__playlist" id = "${id}" data-type="${type}">
					<div class="playlist__imgBox">
						<div class="imgBox__img">
							<img aria-hidden="false" draggable="false" loading="lazy" src="${img}" alt="">
							<div class="imgBox__PlayButton">
								<button class="play-favorite-track__button playBtn" data-playlist-id="${id}" data-type="${type}" aria-label="Play ${name}">
									<span class="playBtn__body">
										<span class="iconWrapper" aria-hidden="true">
											<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" class="SvgPlay"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
										</span>
									</span>
								</button>
							</div>
						</div>
						<div class="playlist__title">
							<h3 class="playlist__name" data-href="${href}">
								${name}
							</h3>
							<h5 class="playlist__description">
								${description}
							</h5>
						</div>
					</div>
				</div>`;
	}
	return html;
}

function genGroupOfPlaylistsCards(arrayOfPlaylists: object[]){
	const arrLength = arrayOfPlaylists.length;
	let html = '';

	for (let i = 0; i < arrLength; i++) {
		const list: any = arrayOfPlaylists[i];
		const listName = Object.keys(list);

		const objOfEL = listName[0] === 'message' ? list[listName[1]] : list[listName[0]];
		const href = objOfEL.href;
		const listLength = objOfEL.items.length;
		const nameColumn = list.message;
		html += `<section class="shelf" aria-label="">
					<div class="shelf__control">
						<div class="shelf__name">
							<h2 draggable="false" class="shelf__name__title">
								<span class="shelf__txt" data-href="${href}">
								${nameColumn}
								</span>
							</h2>
						</div>
						<div draggable="false" class="shelf__showAll" >
							<span class="showAll" data-href="${href}">Show all</span>
						</div>
					</div>
					<div class="displayNone__moreThen shelf__content">
					${cardsOfPlaylists(objOfEL.items, listLength)}
					</div>
				</section>`;
	}
	
	return html;
}

function htmlRecomm(arrayOfPlaylists: Array<object>, genres?: string): string{
	const requestBox = document.createElement('div');
	requestBox.classList.add('requestBox');
	let html: string = '';
	if(genres){
		html += `
		<div class="contentSpacing titleBox">
		<div class="titleBox__size">
			<div class="titleBox__content">
				<span class="title" draggable="false">
					<h1 class="title__genresName">${genres}</h1>
				</span>
			</div>
		</div>
		</div>
		`
	};

	html += `
	<div class="contentSpacing resultReq">
		<div class="resultReq__infinite-scroll-list">
			${genGroupOfPlaylistsCards(arrayOfPlaylists)}
		</div>
	</div>`;



	return html;
}

export default htmlRecomm;