"use strict";
////
/////////TIME
//время трека
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = (minutes < 10) ? (0 + minutes) : minutes;
    seconds = (seconds < 10) ? (0 + seconds) : seconds;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
//функция выщитывает время - сколько минут,часов или дней назад добавлет трек
function minutesSince(startTime) {
    const now = Date.now();
    const start = Date.parse(startTime);
    const elapsedMilliseconds = now - start;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    if (elapsedMinutes < 59 || elapsedMinutes < 0) {
        return `${elapsedMinutes} минут назад`;
    }
    else if (elapsedMinutes < 23 * 60) {
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        return `${elapsedHours} часов назад`;
    }
    else {
        const elapsedDays = Math.floor(elapsedMinutes / (60 * 24));
        return `${elapsedDays} дней назад`;
    }
}
;
// console.log(minutesSince(userTracks[1].added_at));
////////////
///////Like/////
//добавление всем обьектам isLiked = true
function addIsLikedKey(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        arr[i].track.isLiked = true;
    }
    return arr;
}
//////
export { msToTime, minutesSince, addIsLikedKey };
