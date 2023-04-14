import randomColor from "../../helpers/picColor.js";
import { minutesSince, msToTime } from "../../helpers/tracks/trackBoxFunc/trackBoxFunc.js";


	
	function getTracksForAlbum(list: object[]){
		let html = '';
		list.forEach((el: any, i: number) => {

			if(!el){
				return undefined;
			}
			let {name, artists, duration_ms, preview_url, id, isLiked } = el;

			if( name === '' || duration_ms === 0) {
				return undefined;
			}
			
			const classLike = isLiked ? 'like' : 'like hover';
			const style = isLiked ? 'style="width: 19px; height: 17px; fill: green;"' : '';
			const pathStyle = isLiked ? 'style="stroke: none;"' : 'style="stroke: lightgrey;"';
			html += `
			<div class="tracksBoxMain">
				<div class="tracksGrid">
					<div class="trackNO">
						<div class="trackNO__box">
							<span class="numberTrackNO">
								${i+1}
							</span>
							<button class="trackPlayBtn" href="${preview_url}" data-type="album" tabindex="-1" aria-expanded="false">
								<svg role="img" height="24" width="24" aria-hidden="true" class="svgTrackPlayBtn" viewBox="0 0 24 24" data-encore-id="icon">
									<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
								</svg>
							</button>
						</div>
					</div>
					<div class="trackPreview">
						<div class="trackPreview__name">
							<a draggable="false" class="trackPreview__name__link" data-testid="internal-track-link" href="" tabindex="-1">
								<div dir="auto" class="trackPreview__name__link trackPreview__name__txt" data-encore-id="type" aria-expanded="false">
									${name}
								</div>
							</a>
						<span class="trackPreview__description" data-encore-id="type">
							<a draggable="true" dir="auto" href="" tabindex="-1">
								${artists[0].name}
							</a>
						</span>
					</div>
					</div>
					<div class="trackNameBox">
						<span data-encore-id="type" class="Type__TypeElement-sc-goli3j-0 bNyYSN">
						</span>
					</div>
					<div class="trackDate">
						<span class="trackDate__txt">

						</span>
					</div>
					<div class="trackLikeAndDuration">
						<div class="trackLikeBtn" tabindex="-1">
							<svg role="img" height="16" width="17" aria-hidden="true" data-like-id="${id}" data-like-condition="${isLiked}"viewBox="0 0 16 16" data-encore-id="icon" class="${classLike}" ${style}>
								<path id="path" stroke="lightgrey" stroke-width="2" stroke-opacity="0.7" d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z" ${pathStyle}>
								</path>
							</svg>
						</div>
						<div class="trackDurationTxt" data-encore-id="type">
							${	msToTime(duration_ms)}
						</div>
					</div>
				</div>
			</div>
			`
		});
		return html;
	}


	function getTracks(list: object[]){
		let html = '';
		list.forEach((el: any, i: number) => {
			if(!el || !el.track) return undefined;
			const added_at = el.added_at;
			const {album:{ images }, name, artists, duration_ms, preview_url, id, isLiked } = el.track;

			if(images.length === 0 || name === '' || duration_ms === 0) return undefined;
			
			const classLike = isLiked ? 'like' : 'like hover';
			const style = isLiked ? 'style="width: 19px; height: 17px; fill: green;"' : '';
			const pathStyle = isLiked ? 'style="stroke: none;"' : 'style="stroke: lightgrey;"';
			html += `
			<div class="tracksBoxMain">
				<div class="tracksGrid">
					<div class="trackNO">
						<div class="trackNO__box">
							<span class="numberTrackNO">
								${i+1}
							</span>
							<button class="trackPlayBtn" href="${preview_url}" aria-label="" tabindex="-1" aria-expanded="false">
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
					<div class="trackDate">
						<span class="trackDate__txt">
							${minutesSince(added_at)}
						</span>
					</div>
					<div class="trackLikeAndDuration">
						<div class="trackLikeBtn" tabindex="-1">
							<svg role="img" height="16" width="17" aria-hidden="true" data-like-id="${id}" data-like-condition="${isLiked}"viewBox="0 0 16 16" data-encore-id="icon" class="${classLike}" ${style}>
								<path id="path" stroke="lightgrey" stroke-width="2" stroke-opacity="0.7" d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z" ${pathStyle}>
								</path>
							</svg>
						</div>
						<div class="trackDurationTxt" data-encore-id="type">
							${	msToTime(duration_ms)}
						</div>
					</div>
				</div>
			</div>
			`
		});
		return html;
	}
	
	
	function buildTracksByPlaylist(obj: any){
		const type = obj.type;
		const tracks = obj.tracks.items;
		const color = randomColor();
		let name = obj.name;
		let description = obj.description;
		let images = obj.images[0].url;
		let id = obj.id;
		let followers;
		let subtypeOfType;
		if(type === 'album'){
			const date = obj.release_date.slice(0, 4);
			const name = obj.artists[0].name;
			description = `${date} • ${name}`;
			subtypeOfType = obj.album_type.charAt(0).toUpperCase() + obj.album_type.slice(1);
			followers = '';
		}else{
			followers = '<br> ' + new Intl.NumberFormat('en-UA').format(obj.followers.total) + ' likes';
		}
		const html = `
		<div class="favorite-tracks-box">
		<div class="presentation-favorite-tracks" style="background-color: ${color};">
		  <div class="favorite-tracks__play-list" style="background-image: url(${images});"></div>
		  <div class="favorite-tracks__info">
			<h3 class="favorite-tracks__track-or-playList">${subtypeOfType ? subtypeOfType : 'Playlist'}</h3>
			<h1 class="favorite-tracks__track__name-play-list">${name}</h1>
			<h3 class="favorite-tracks__info">${description + followers} • ${tracks.length} songs</h3>
		  </div>
		</div>
		<div class="play-favorite-track-box"  style="background-color: ${color};">
		  <div class="play-favorite-track">
			<button class="play-favorite-track__button" data-type="${type}" data-playlist-id="${id}">
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
			${type !== 'album' ? getTracks(tracks) : getTracksForAlbum(tracks)}
			<!-- end -->
		  </div>
		</div>
	  </div>
		`
		return html;
	}

export default buildTracksByPlaylist; 