//volume
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementsByClassName('volume-icon')[0];
let muteConditon = false;
let volume = volumeSlider.value;
let timeBefore;
muteBtn.addEventListener('click', () => {
    switch (muteConditon) {
        case false:
            timeBefore = volumeSlider.value;
            muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
            volumeSlider.value = '0';
            muteConditon = true;
            break;
        case true:
            muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>';
            muteConditon = false;
            volumeSlider.value = timeBefore;
            if (timeBefore === '0') {
                volumeSlider.value = '70';
            }
            break;
    }
});
volumeSlider.addEventListener('input', () => {
    if (volumeSlider.value > 30 && volumeSlider.value < 80) {
        muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" class= "volume-icon" aria-label="Средняя громкость" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>';
    }
    else if (volumeSlider.value > 80) {
        muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>';
    }
    else if (volumeSlider.value < 1) {
        muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
    }
    else if (volumeSlider.value > 0 && volumeSlider.value <= 30) {
        muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Низкая громкость" class="volume-icon" id= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>';
    }
});
//like
const likeWrap = document.getElementsByClassName('likeWrap')[0];
const like = document.getElementsByClassName('like')[0];
const path = document.getElementById('path');
let likeCondition = false;
// like.addEventListener('click', () => {
//   like.classList.add("shake");
//   setTimeout(function () {
//     like.classList.remove("shake");
//   }, 800);
//   switch (likeCondition) {
//     case false:
//       like.style.width = '19'
//       like.style.height = '17'
//       path.style.stroke = 'none';
//       like.style.fill = 'green';
//       likeCondition = true;
//       like.classList.remove('hover')
//       break;
//     case true:
//       like.style.width = '17'
//       like.style.height = '15'
//       path.style.stroke = 'lightgrey'
//       like.style.fill = 'none';
//       likeCondition = false;
//       like.classList.add('hover')
//       break;
//   }
// }
// )
//play/pause
const playBtn = document.getElementsByClassName('play-pauseBtn')[0];
const playBtnSVG = document.getElementsByClassName('play-pauseSVG')[0];
let pauseCondition = false;
playBtn.addEventListener('click', () => {
    switch (pauseCondition) {
        case false:
            playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
            pauseCondition = true;
            // audio.pause()
            break;
        case true:
            playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true"viewBox = "0 0 16 16" data - encore - id="icon" class="play-pauseSVG" ><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" ></path>< /svg>';
            // audio.play()
            pauseCondition = false;
            break;
    }
});
//chosen song
let audioCurrTime = document.getElementsByClassName('songOnPlayCurrTime')[0];
let audioFullDuration = document.getElementsByClassName('songOnEndCurrTime')[0];
let albumCover = document.getElementsByClassName('albumCover')[0];
let artist = document.getElementsByClassName('artist')[0];
let songName = document.getElementsByClassName('songName')[0];
let audio;
export function onPlay(tracks, track) {
    //@ts-ignore
    audio = new Audio(track.track.preview_url);
    //@ts-ignore
    console.log(track.track);
    audio.play();
    //@ts-ignore
    artist.textContent = track.track.artists[0].name;
    //@ts-ignore
    songName.textContent = track.track.name;
    //@ts-ignore
    albumCover.style.backgroundImage = `url("${track.track.album.images[0].url}")`;
    return audio;
}
