"use strict";
import API from '../API.js';
//${userTracks[1].track.album.images[2].url}  //мелкая картинка альбома
//${userTracks[1].track.name}                 //имя трека
//${userTracks[1].track.artists[0].name}      //имя артиста
//${ msToTime(userTracks[1].track.duration_ms)} //время трека
async function funcUIList() {
    const userProfile = await API.UserProfile();
    const userSaveTracks = await API.UserSavedTracks();
    let userTracks = await userSaveTracks.items;
    //функция конвертации времени трека
    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        minutes = (minutes < 10) ? (0 + minutes) : minutes;
        seconds = (seconds < 10) ? (0 + seconds) : seconds;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    /////////
    //функция вышитывает время - сколько минут назад добавлет трек
    function minutesSince(startTime) {
        const now = Date.now();
        const start = Date.parse(startTime);
        const elapsedMilliseconds = now - start;
        const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        return elapsedMinutes;
    }
    console.log(minutesSince(userTracks[1].added_at));
    //////////
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
          <button class="trackPlayBtn" aria-label="" tabindex="-1" aria-expanded="false">
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
		  	GIVE ME Funcktion
	  	  </span>
  	  </div>
      <div class="trackLikeAndDuration">
        <button type="button" role="switch" aria-checked="true" aria-label="Add to Your Library" class="trackLikeBtn" data-testid="add-button" tabindex="-1">
          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="svgTrackLikeBtn">
            <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
          </svg>
        </button>
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
    return htmlString;
}
export default funcUIList;
