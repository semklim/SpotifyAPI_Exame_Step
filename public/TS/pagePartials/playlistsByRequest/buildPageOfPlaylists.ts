type result = {
	name: string;
	description: string;
	images: [{
		height: string | null;
		width: string | null;
		url: string | null;
	}];
	href: string;
	id?: string;
}

function buildPageOfPlaylists(genres: string, obj: object[]): string{
	const html = `
	<div class="contentSpacing titleBox">
	<div class="titleBox__size">
		<div class="titleBox__content">
			<span class="title" draggable="false">
				<h1 class="title__genresName">${genres}</h1>
			</span>
		</div>
	</div>
	</div>
	<div class="contentSpacing resultReq">
		<div class="resultReq__infinite-scroll-list">
		<section class="shelf" aria-label="All things ${genres}">
		<div class="shelf__control">
			<div class="shelf__name">
				<h2 draggable="false" class="shelf__name__title">
					<span class="shelf__txt">
						All Things ${genres}
					</span>
				</h2>
			</div>
		</div>
			<div class="shelf__content">
				${genPlaylistCards(obj)}
			</div>
		</section>	
		</div>
	</div>
	`
	return html;
}

function genPlaylistCards(list: object[]){
	let html = '';
	// @ts-ignore
	let type = list[0].type;
	list.forEach((el) => {
		if(el === null) return undefined;
		const {name, href, description, images, id} = el as result;
		const img = images[0].url ? images[0].url : '';
		html += `
				<div class="shelf__content__playlist" id = "${id}">
					<div class="playlist__imgBox">
						<div class="imgBox__img">
							<img aria-hidden="false" class="${type + 'Img'}" draggable="false" loading="lazy" src="${img}" alt="">
							<div class="imgBox__PlayButton">
								<button class="play-favorite-track__button playBtn" data-type="${type}" data-playlist-id="${id}" aria-label="Play ${name}">
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
				</div>
	`
	});
	
	return html;
}

export default buildPageOfPlaylists;