//${userTracks[1].track.album.images[2].url}  //мелкая картинка альбома
//${userTracks[1].track.name}                 //имя трека
//${userTracks[1].track.artists[0].name}      //имя артиста
//${ msToTime(userTracks[1].track.duration_ms)} //время трека

import { minutesSince, msToTime } from "../../helpers/tracks/trackBoxFunc/trackBoxFunc.js";


 function funcUIList(userSaveTracks:any) {
  let userTracks = userSaveTracks.items;
  
  let htmlString = "";
  //////////
  try {
    for (let i = 0; i < userTracks.length; i++) { // проходим циклом по каждому элементу массива userTracks
      if (userTracks.length === 0) {
        return;
      }
      htmlString += `<div class="tracksBoxMain">
    <div class="tracksGrid">
      <div class="trackNO">
        <div class="trackNO__box">
          <span class="numberTrackNO">
          ${String(i + 1)}
          </span>
          <button class="trackPlayBtn" href="${userTracks[i].track.preview_url}" aria-label="" tabindex="-1" aria-expanded="false">
            <svg role="img" height="24" width="24" aria-hidden="true" class="svgTrackPlayBtn" viewBox="0 0 24 24" data-encore-id="icon">
              <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="trackPreview">
        <img aria-hidden="false" draggable="false" loading="eager" src="${userTracks[i].track.album.images[2].url}" alt="img" class="trackPreview__img" width="40" height="40">
        <div class="trackPreview__name">
          <a draggable="false" class="trackPreview__name__link" data-testid="internal-track-link" href="" tabindex="-1">
            <div dir="auto" class="trackPreview__name__link trackPreview__name__txt" data-encore-id="type" aria-expanded="false">
             ${userTracks[i].track.name}
            </div>
          </a>
        <span class="trackPreview__description" data-encore-id="type">
          <a draggable="true" dir="auto" href="" tabindex="-1">
            ${userTracks[i].track.artists[0].name}
          </a> 
          <a draggable="true" dir="auto" href="" tabindex="-1">

          </a>
        </span>
      </div>
      </div>
      <div class="trackNameBox">
        <span data-encore-id="type" class="Type__TypeElement-sc-goli3j-0 bNyYSN">
          <a draggable="true" class="standalone-ellipsis-one-line" dir="auto" href="/" tabindex="-1">
          ${userTracks[i].track.album.name}
          </a>
        </span>
      </div>
	  <div class="trackDate">
	  	  <span class="trackDate__txt">
		  	${minutesSince(userTracks[i].added_at) }
	  	  </span>
  	  </div>
      <div class="trackLikeAndDuration">
        <div class="trackLikeBtn" tabindex="-1">
			<svg role="img" height="17" width="19" viewBox="0 0 16 16" data-like-condition="true" data-like-id="${userTracks[i].track.id}" class="like" style=" fill: green;">
				<path id="path" stroke="lightgrey" stroke-width="2" stroke-opacity="0.7" 
				d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z" style="stroke: none;">
				</path>
			</svg>
        </div>
        <div class="trackDurationTxt" data-encore-id="type">
          ${msToTime(userTracks[i].track.duration_ms)}
        </div>
      </div>
    </div>
  </div>`;
  }
  }
  catch (err) {
      return;
  }
return htmlString 
}
export default funcUIList;