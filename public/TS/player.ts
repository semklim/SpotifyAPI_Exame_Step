//volume
const volumeSlider = document.getElementById('volumeSlider') as HTMLInputElement;
const muteBtn = document.getElementsByClassName('volume-icon')[0] as SVGElement;
let muteConditon: boolean = false;
let volume = volumeSlider.value as unknown as number;
let timeBefore: string;
import { playingAudio } from "./OnPlayFunc.js";
muteBtn.addEventListener('click', () => {
  switch (muteConditon) {
    case false:
      timeBefore = volumeSlider.value;
      muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>';
      volumeSlider.value = '0';
      muteConditon = true;
      break;
    case true: muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>'
      muteConditon = false;
      volumeSlider.value = timeBefore;
      if (timeBefore === '0') {
        volumeSlider.value = '70';
      }
      break;
  }
})

volumeSlider.addEventListener('input', () => {
  if (volumeSlider.value as unknown as number > 30 && volumeSlider.value as unknown as number < 80) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" class= "volume-icon" aria-label="Средняя громкость" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>'
  } else if (volumeSlider.value as unknown as number > 80) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Высокая громкость" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc"d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="#dddcdc" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>'
  } else if (volumeSlider.value as unknown as number < 1) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Без звука" class= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="#dddcdc" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>'
  } else if (volumeSlider.value as unknown as number > 0 && volumeSlider.value as unknown as number <= 30) {
    muteBtn.innerHTML = '<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Низкая громкость" class="volume-icon" id= "volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path fill="#dddcdc" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>'
  }
})

//play/pause
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

//CHOSEN SONG
//@ts-ignore
export let currentAudio;
let audioCurrTime = document.getElementsByClassName('songOnPlayCurrTime')[0] as HTMLSpanElement;
let audioFullDuration = document.getElementsByClassName('songOnEndCurrTime')[0] as HTMLSpanElement;
let albumCover = document.getElementsByClassName('albumCover')[0] as HTMLDivElement;
let artist = document.getElementsByClassName('artist')[0] as HTMLDivElement;
let songName = document.getElementsByClassName('songName')[0] as HTMLDivElement;
let audio: string | HTMLAudioElement | null;
let audioIsPlaying = false;
export function onPlay(tracks: any[], i: number) {
  currentAudio = null;
  if (audioIsPlaying === true) {
    audio = null;
    audio = new Audio(tracks[i].track.preview_url!);
    audio.addEventListener('canplaythrough', function() {
      //@ts-ignore
      audio!.play();
    });
    artist.textContent = tracks[i].track.artists[0].name
    songName.textContent = tracks[i].track.name;
    albumCover.style.backgroundImage = `url("${tracks[i].track.album.images[0].url}")`;
  } else if (audioIsPlaying === false) {
    audio = null;
    audio = new Audio(tracks[i].track.preview_url!);
    audio.addEventListener('canplaythrough', function() {
      //@ts-ignore
      audio!.play();
    });
    artist.textContent = tracks[i].track.artists[0].name
    songName.textContent = tracks[i].track.name;
    albumCover.style.backgroundImage = `url("${tracks[i].track.album.images[0].url}")`;
  }
  //@ts-ignore
  audio!.addEventListener('ended', () => {
    i = i + 1;
    currentAudio = onPlay(tracks, i);
  })

  nextBtn.addEventListener('click', () => {
    if (pauseCondition) {
      pauseConditionChange();
      playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
    }
    if (playingAudio) {
      //@ts-ignore
      audio.currentTime = 1000000000;
    }
  })

  prevBtn.addEventListener('click', () => {
    //@ts-ignore
    if (pauseCondition) {
      pauseConditionChange();
      playBtnSVG.innerHTML = '<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>';
    }
    //@ts-ignore
    i = i - 1;
    //@ts-ignore
    audio.pause();
    audio = null;
    currentAudio! = onPlay(tracks, i);
  })
  audioIsPlaying = true;
  return audio;
}

//NEXT/PREV SONG
let nextBtn = document.getElementsByClassName('nextTrackBtn')[0] as HTMLButtonElement;
let prevBtn = document.getElementsByClassName('prevTrackBtn')[0] as HTMLButtonElement;
