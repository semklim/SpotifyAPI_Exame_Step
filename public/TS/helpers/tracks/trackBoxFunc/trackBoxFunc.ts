"use strict";


//сразу все из блока чтоб перебрать и изменить
const boxTrackAll = document.querySelectorAll(`.tracksGrid`); //блок трека
const imgTrackAll = document.querySelectorAll(`.trackPreview__img`)
const trackNameAll = document.querySelectorAll(`.trackPreview__name__link`) //имя тека
// .trackPreview__description внутри тег а, у него нет класа(ашки не наследуют цвет родителя)   //имя исполнителя
const trackLikeBtnAll = document.querySelectorAll(`.trackLikeBtn`) // кнопка лайка
const trackLikeSvgAll = document.querySelectorAll(`.svgTrackLikeBtn`)  // лайк свг
const trackTimeAll = document.querySelectorAll(`.trackDurationTxt`) // время трека
/////////////////////////////////////////////////////////////////////////////////

//по 1 для кликеров
const boxTrack = document.querySelector(`.tracksGrid`); //блок трека
const imgTrack = document.querySelector(`.trackPreview__img`)
const trackName = document.querySelector(`.trackPreview__name__link`) //имя тека
// .trackPreview__description внутри тег а, у него нет класа(ашки не наследуют цвет родителя)   //имя исполнителя
const trackLikeBtn = document.querySelector(`.trackLikeBtn`) // кнопка лайка
const trackLikeSvg = document.querySelector(`.svgTrackLikeBtn`)  // лайк свг
const trackTime = document.querySelector(`.trackDurationTxt`) // время трека
/////////////////////////////////////////////////////////////////////////////


/////////TIME

//время трека
function msToTime(duration: number): string {
  let seconds: number = Math.floor((duration / 1000) % 60);
  let minutes: number = Math.floor((duration / (1000 * 60)) % 60);

  minutes = (minutes < 10) ? (0 + minutes) : minutes;
  seconds = (seconds < 10) ? (0 + seconds) : seconds;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

  //функция выщитывает время - сколько минут,часов или дней назад добавлет трек
  function minutesSince(startTime: string): number | string {
    const now: number = Date.now();
    const start: number = Date.parse(startTime);
    const elapsedMilliseconds: number = now - start;
    const elapsedMinutes: number = Math.floor(elapsedMilliseconds / (1000 * 60));
    
    if (elapsedMinutes < 59 || elapsedMinutes < 0) {
      return `${elapsedMinutes} минут назад`;
    } else if (elapsedMinutes < 23 * 60) {
      const elapsedHours: number = Math.floor(elapsedMinutes / 60);
      return `${elapsedHours} часов назад`;
    } else {
      const elapsedDays: number = Math.floor(elapsedMinutes / (60 * 24));
      return `${elapsedDays} дней назад`;
    }
  };
  // console.log(minutesSince(userTracks[1].added_at));
////////////

export { msToTime, minutesSince }