//VOLUME
export const volumeSlider = document.getElementById('volumeSlider') as HTMLInputElement;
if (Cookie.get('volume') != null) {
  //@ts-ignore
  volumeSlider.value = Cookie.get('volume');
}
const muteBtn = document.getElementsByClassName('volume-icon')[0] as SVGElement;
let muteConditon: boolean = false;
let timeBefore: string;
import { test } from "node:test";
import { playingAudio } from "./OnPlayFunc.js";
import Cookie from "./Cookies.js";
import { type } from "os";
muteBtn.addEventListener('click', () => {
  switch (muteConditon) {
    case false:
      timeBefore = volumeSlider.value;
      muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
      volumeSlider.value = '0';
      if (audio) {
        //@ts-ignore
        audio!.volume = volumeSlider.value / 100
      }
      muteConditon = true;
      break;
    case true: muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>'
      muteConditon = false;
      volumeSlider.value = timeBefore;
      if (audio) {
        //@ts-ignore
        audio!.volume = volumeSlider.value / 100
      }
      if (timeBefore === '0') {
        volumeSlider.value = '70';
        if (audio) {
          //@ts-ignore
          audio!.volume = volumeSlider.value / 100
        }
      }
      break;
  }
})

volumeSlider.addEventListener('input', () => {
  //@ts-ignore
  if (audio) {
    //@ts-ignore
    audio!.volume = volumeSlider.value / 100
  }
  if (volumeSlider.value as unknown as number > 30 && volumeSlider.value as unknown as number < 80) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" class= "volume-icon" aria-label="Средняя громкость" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>'
  } else if (volumeSlider.value as unknown as number > 80) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>'
  } else if (volumeSlider.value as unknown as number < 1) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>'
  } else if (volumeSlider.value as unknown as number > 0 && volumeSlider.value as unknown as number <= 30) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Низкая громкость" class="volume-icon" id= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>'
  }
  Cookie.set('volume', volumeSlider.value, 15)
})

//PLAY/PAUSE
let playBtn = document.getElementsByClassName('play-pauseBtn')[0] as HTMLButtonElement;
export let playBtnSVG = document.getElementsByClassName('play-pauseSVG')[0] as SVGElement;
export let pauseCondition: boolean = false;
playBtn.addEventListener('click', () => {
  if (currentAudio) {
    switch (pauseCondition) {
      case false: playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true"viewBox = "0 0 16 16" data - encore - id="icon" class="play-pauseSVG" ><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" ></path>< /svg>';
        pauseCondition = true;
        currentAudio?.pause()
        break;
      case true: playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        currentAudio?.play()
        pauseCondition = false;
        break;
    }
  } else {
    switch (pauseCondition) {
      case false: playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true"viewBox = "0 0 16 16" data - encore - id="icon" class="play-pauseSVG" ><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" ></path>< /svg>';
        pauseCondition = true;
        playingAudio?.pause()
        break;
      case true: playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
        playingAudio?.play()
        pauseCondition = false;
        break;
    }
  }
})

export function pauseConditionChange() {
  pauseCondition = false;
}

//CHOSEN SONG ON PLAY
//@ts-ignore
export let currentAudio;
let audioCurrTime = document.getElementsByClassName('songOnPlayCurrTime')[0] as HTMLSpanElement;
let audioFullDuration = document.getElementsByClassName('songOnEndCurrTime')[0] as HTMLSpanElement;
let albumCover = document.getElementsByClassName('albumCover')[0] as HTMLDivElement;
let artist = document.getElementsByClassName('artist')[0] as HTMLDivElement;
let songName = document.getElementsByClassName('songName')[0] as HTMLDivElement;
let audio: string | HTMLAudioElement | null;
let audioIsPlaying = false;
let testTracks: any[];
let testI: number;
export function onPlay(tracks: any[], i: number) {
  currentAudio = null;
  testTracks = tracks;
  testI = i;
  if (audioIsPlaying === true) {
    if (tracks[i].track) {
      audio = null;
      audio = new Audio(tracks[i].track.preview_url!);
      audio.addEventListener('canplaythrough', function () {
        //@ts-ignore
        audio!.volume = volumeSlider.value / 100
        //@ts-ignore
        audio!.play();
      });
      artist.textContent = tracks[i].track.artists[0].name
      songName.textContent = tracks[i].track.name;
      albumCover.style.backgroundImage = `url("${tracks[i].track.album.images[0].url}")`;
    } else {
      audio = null;
      audio = new Audio(tracks[i].preview_url!);
      audio.addEventListener('canplaythrough', function () {
        //@ts-ignore
        audio!.volume = volumeSlider.value / 100
        //@ts-ignore
        audio!.play();
      });
      artist.textContent = tracks[i].artists[0].name
      songName.textContent = tracks[i].name;
      let element = document.querySelector('.favorite-tracks__play-list') as HTMLDivElement;
      let album = element.style.backgroundImage;
      albumCover.style.backgroundImage = `${album}`;
    }
  } else if (audioIsPlaying === false) {
    audio = null;
    if (tracks[i].track) {
      audio = new Audio(tracks[i].track.preview_url!);
      audio.addEventListener('canplaythrough', function () {
        //@ts-ignore
        audio!.play();
      });
      artist.textContent = tracks[i].track.artists[0].name
      songName.textContent = tracks[i].track.name;
      albumCover.style.backgroundImage = `url("${tracks[i].track.album.images[0].url}")`;
    } else {
      audio = new Audio(tracks[i].preview_url!);
      audio.addEventListener('canplaythrough', function () {
        //@ts-ignore
        audio!.play();
      });
      artist.textContent = tracks[i].artists[0].name
      songName.textContent = tracks[i].name;
      let element = document.querySelector('.favorite-tracks__play-list') as HTMLDivElement;
      let album = element.style.backgroundImage;
      albumCover.style.backgroundImage = `${album}`;
    }
  }
  //@ts-ignore
  audio!.addEventListener('ended', () => {
    if (randomCondition === true) {
      i = getRandomInt(tracks.length)
    } else {
      if (repeatCondition === 1) {
        i = i + 1;
      } else if (repeatCondition === 2) {
        i = i + 0;
      } else if (repeatCondition === 3) {
        if (i > 0) {
          i = i - 1;
        } else if (i <= 0) {
          i = i - 0;
        }
      }
    }
    currentAudio = onPlay(tracks, i);
    return;
  })


  audioIsPlaying = true;
  return audio;
}

//NEXT/PREV SONG
let nextBtn = document.getElementsByClassName('nextTrackBtn')[0] as HTMLButtonElement;
let prevBtn = document.getElementsByClassName('prevTrackBtn')[0] as HTMLButtonElement;

nextBtn.addEventListener('click', () => {
  if (pauseCondition) {
    pauseConditionChange();
    playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
  }
  if (playingAudio) {
    //@ts-ignore
    if (testI + 1 < testTracks.length) {
      //@ts-ignore
      audio!.currentTime = audio!.duration - 0.100;
    }
  }
})

prevBtn.addEventListener('click', () => {
  //@ts-ignore
  if (pauseCondition) {
    pauseConditionChange();
    playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
  }
  if (playingAudio) {
    //@ts-ignore
    if (testI > 0) {
      testI = testI - 1;
    }
    //@ts-ignore
    audio.pause();
    audio = null;
    currentAudio! = null;
    currentAudio! = onPlay(testTracks, testI);
    return;
  }
})

//REPEAT MODE
let repeatCondition: number | string = Cookie.get('repeatCondition') || '1';

let repeatBtn = document.getElementsByClassName('repeatTrackSvg')[0] as SVGElement;

switch (repeatCondition) {
  case '1':
    break;
  case '2':
    repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>'
    repeatBtn.setAttribute("fill", "green");
    break;
  case '3':
    repeatBtn.setAttribute("fill", "green");
    repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path><path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>'
    break;
}

function repeat() {
  console.log('repet')
  switch (repeatCondition) {
    case 1:
      repeatBtn.setAttribute("fill", "green");
      repeatCondition = 2;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
    case 3:
      repeatBtn.setAttribute("fill", "#c9c9c9");
      repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>'
      repeatCondition = 1;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
    case 2:
      repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path><path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>'
      repeatCondition = 3;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
    case '1':
      repeatBtn.setAttribute("fill", "green");
      repeatCondition = 2;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
    case '2':
      repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path><path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>'
      repeatCondition = 3;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
    case '3':
      repeatBtn.setAttribute("fill", "#c9c9c9");
      repeatBtn!.innerHTML = '<path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>'
      repeatCondition = 1;
      Cookie.set('repeatCondition', repeatCondition.toString(), 15)
      break;
  }
}

repeatBtn.addEventListener('click', repeat);

//RANDOM MODE

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

let randomCondition: boolean = false;
let randomBtn = document.getElementsByClassName('randTrackBtnSvg')[0] as SVGElement;
function random() {
  switch (randomCondition) {
    case false:
      randomBtn.setAttribute("fill", "green");
      randomCondition = true;
      break;
    case true:
      randomBtn.setAttribute("fill", "#c9c9c9");
      randomCondition = false;
      break;
  }
}

randomBtn.addEventListener('click', random);

