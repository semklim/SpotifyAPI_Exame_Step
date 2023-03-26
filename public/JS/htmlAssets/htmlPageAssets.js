class Assets {
    static genPlaylistCards(list) {
        let html = '';
        list.forEach((el) => {
            if (el === null)
                return undefined;
            const { name, href, description, images, id } = el;
            const img = images[0].url ? images[0].url : '';
            html += `
					<div class="shelf__content__playlist" id = "${id}">
						<div class="playlist__imgBox">
							<div class="imgBox__img">
								<img aria-hidden="false" draggable="false" loading="lazy" src="${img}" alt="">
								<div class="imgBox__PlayButton">
									<button class="playBtn" aria-label="Play ${name}">
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
		`;
        });
        return html;
    }
    static getTracks(list) {
        let html = '';
        list.forEach((el, i) => {
            const { album: { images }, name, artists, duration_ms, preview_url } = el.track;
            html += `
			<div class="tracksBoxMain" href="${preview_url}">
				<div class="tracksGrid">
					<div class="trackNO">
						<div class="trackNO__box">
							<span class="numberTrackNO">
								${i}
							</span>
							<button class="trackPlayBtn" aria-label="" tabindex="-1" aria-expanded="false">
								<svg role="img" height="24" width="24" aria-hidden="true" class="svgTrackPlayBtn" viewBox="0 0 24 24" data-encore-id="icon">
									<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
								</svg>
							</button>
						</div>
					</div>
					<div class="trackPreview">
						<img aria-hidden="false" draggable="false" loading="eager" src="${images[2].url}" alt="" class="trackPreview__img" width="40" height="40">
						<div class="trackPreview__name">
							<a draggable="false" class="trackPreview__name__link" data-testid="internal-track-link" href="" tabindex="-1">
								<div dir="auto" class="trackPreview__name__link trackPreview__name__txt" data-encore-id="type" aria-expanded="false">
									${name}
								</div>
							</a>
						<span class="trackPreview__description" data-encore-id="type">
							<a draggable="true" dir="auto" href="" tabindex="-1">
								${artists[0].name}
							</a>, 
							<a draggable="true" dir="auto" href="" tabindex="-1">
								Khrystyna Soloviy
							</a>
						</span>
					</div>
					</div>
					<div class="trackNameBox">
						<span data-encore-id="type" class="Type__TypeElement-sc-goli3j-0 bNyYSN">
							<a draggable="true" class="standalone-ellipsis-one-line" dir="auto" href="/" tabindex="-1">
							${name}
							</a>
						</span>
					</div>
					<div class="trackLikeAndDuration">
						<button type="button" role="switch" aria-checked="true" aria-label="Add to Your Library" class="trackLikeBtn" data-testid="add-button" tabindex="-1">
							<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="svgTrackLikeBtn">
								<path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
							</svg>
						</button>
						<div class="trackDurationTxt" data-encore-id="type">
							${(function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
            })(duration_ms)}
						</div>
					</div>
				</div>
			</div>
			`;
        });
        return html;
    }
    static playlistByGenres(genres, obj) {
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
					${this.genPlaylistCards(obj)}
				</div>
			</section>	
			</div>
		</div>
		`;
        return html;
    }
    static genGenres(obj) {
        const picColor = (function* () {
            const colors = [
                'rgb(225, 51, 0)',
                'rgb(115, 88, 255)',
                'rgb(30, 50, 100)',
                'rgb(232, 17, 91)',
                'rgb(20, 138, 8)',
                'rgb(188, 89, 0)',
                'rgb(233, 20, 41)',
                'rgb(225, 17, 140)',
                'rgb(141, 103, 171)',
                'rgb(216, 64, 0)',
                'rgb(119, 119, 119)',
                'rgb(220, 20, 140)',
                'rgb(83, 122, 161)',
                'rgb(81, 121, 161)',
                'rgb(186, 93, 7)',
                'rgb(230, 30, 50)',
                'rgb(176, 40, 151)',
                'rgb(125, 75, 50)',
                'rgb(80, 55, 80)',
                'rgb(228, 29, 99)',
                'rgb(175, 40, 150)',
                'rgb(165, 103, 82)',
                'rgb(71, 125, 149)',
                'rgb(176, 98, 57)',
                'rgb(13, 114, 237)',
                'rgb(13, 115, 236)',
                'rgb(140, 25, 50)',
                'rgb(235, 30, 50)',
                'rgb(39, 133, 106)',
                'rgb(5, 105, 82)',
                'rgb(255, 0, 144)'
            ];
            while (true) {
                for (let i = 0; i < colors.length; i++) {
                    yield colors[i];
                }
            }
        })();
        const { categories: { items } } = obj;
        let genres = '';
        items.forEach((el) => {
            const urlImg = el.icons[0].url;
            genres += `
				<div class="genres" id="${el.id}" style="background-color:${picColor.next().value}">
					<div class="genres__box">
						<span class="nameOfGenres">${el.name}</span>
						<img aria-hidden="false" draggable="false" loading="lazy" src="${urlImg}" class="imgOfGenres" alt="">
					</div>
				</div>`;
        });
        const searchBox = `
			  <div class="wrapper">
				  <div class="searchTrack">
					  <input maxlength="800" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="What do you want to listen to?" type="text" name="" id="" class="searchbox">
				  </div>
			  </div>`;
        const box = `
			<div class="requestBox">
				<h2 class="nameOfList">Browse all</h2>
				<div class="collectionGenres">
					${genres}
				</div>
			</div>`;
        return { searchBox, box };
    }
    static tracksByPlaylist(obj) {
        const tracks = obj.tracks.items;
        const html = `
		<div class="favorite-tracks-box">
		<div class="presentation-favorite-tracks">
		  <div class="favorite-tracks__play-list"></div>
		  <div class="favorite-tracks__info">
			<h3 class="favorite-tracks__track-or-playList">Плейлист</h3>
			<h1 class="favorite-tracks__track__name-play-list">${obj.name}</h1>
			<h3 class="favorite-tracks__info">${obj.description}<br> ${obj.followers.total} likes | ${tracks.length} songs</h3>
		  </div>
		</div>
		<div class="play-favorite-track-box">
		  <div class="play-favorite-track">
			<button class="play-favorite-track__button">
			  <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="play-favorite-track__button--img" fill="black">
				<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
				</path>
			  </svg>
			</button>
		  </div>
		  <div class="favorite-tracks-contents">
			<div class="favorite-tracks-contents-lists">
			  <div class="favorite-tracks-contents-title">
				<p class="favorite-tracks__title-name favorite-tracks--one-size"># &nbsp; Название</p>
				<p class="favorite-tracks__title-albom favorite-tracks--two-size">Альбом</p>
				<p class="favorite-tracks__title-date-push favorite-tracks--tree-size">дата добавления</p>
				<button class="favorite-tracks__title-icon favorite-tracks--four-size">
				  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
					<path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="#b3b3b3"></path>
					<path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" fill="#b3b3b3"></path></svg>
				</button>
			  </div>
			  <div class="favorite-tracks__decor-line"></div>
			</div>
			<!-- start -->
			${Assets.getTracks(tracks)}
			<!-- end -->
		  </div>
		</div>
	  </div>
		`;
        return html;
    }
}
export default Assets;
