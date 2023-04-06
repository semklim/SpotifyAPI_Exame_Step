"use strict";

//Interfase
interface AddKey {
  [key: string]: any;
}
////

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


///////Like/////

//добавление всем обьектам isLiked = true
function addIsLikedKey(arr: AddKey[]): AddKey[] {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].track.isLiked = true;
  }
  return arr;
}

//////
export { msToTime, minutesSince, addIsLikedKey }