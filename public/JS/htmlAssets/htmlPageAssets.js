class Assets {
    static genPlaylistCards(list) {
        let html = '';
        list.forEach((el) => {
            if (el === null)
                return undefined;
            const { name, href, description, images } = el;
            const img = images[0].url ? images[0].url : '';
            html += `
					<div class="shelf__content__playlist">
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
							All Things Pop
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
}
export default Assets;
