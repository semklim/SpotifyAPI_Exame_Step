const like = document.querySelector('.like') as SVGElement;

like.addEventListener('click', () => {

})

let playing = false;

const playPauseButton = document.querySelector('.play-pause') as HTMLDivElement;

playPauseButton.addEventListener('click', function () {
    this.classList.toggle('playing');
});

const volumeSlider = document.getElementById('volumeSlider') as HTMLInputElement;

volumeSlider.addEventListener('input', () => {
  const volumeValue = volumeSlider.value;
  console.log(volumeValue);
});