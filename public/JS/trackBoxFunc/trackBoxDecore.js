"use strict";
//сразу все из блока чтоб перебрать и изменить
const boxTrackAll = document.querySelectorAll(`.tracksGrid`); //блок трека
const imgTrackAll = document.querySelectorAll(`.trackPreview__img`);
const trackNameAll = document.querySelectorAll(`.trackPreview__name__link`); //имя тека
// .trackPreview__description внутри тег а, у него нет класа(ашки не наследуют цвет родителя)   //имя исполнителя
const trackLikeBtnAll = document.querySelectorAll(`.trackLikeBtn`); // кнопка лайка
const trackLikeSvgAll = document.querySelectorAll(`.svgTrackLikeBtn`); // лайк свг
const trackTimeAll = document.querySelectorAll(`.trackDurationTxt`); // время трека
/////////////////////////////////////////////////////////////////////////////////
//по 1 для кликеров
const boxTrack = document.querySelector(`.tracksGrid`); //блок трека
const imgTrack = document.querySelector(`.trackPreview__img`);
const trackName = document.querySelector(`.trackPreview__name__link`); //имя тека
// .trackPreview__description внутри тег а, у него нет класа(ашки не наследуют цвет родителя)   //имя исполнителя
const trackLikeBtn = document.querySelector(`.trackLikeBtn`); // кнопка лайка
const trackLikeSvg = document.querySelector(`.svgTrackLikeBtn`); // лайк свг
const trackTime = document.querySelector(`.trackDurationTxt`); // время трека
export {};
