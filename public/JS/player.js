"use strict";
const like = document.querySelector('.like');
like.addEventListener('click', () => {
});
let playing = false;
const playPauseButton = document.querySelector('.play-pause');
playPauseButton.addEventListener('click', function () {
    this.classList.toggle('playing');
});
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value;
});
