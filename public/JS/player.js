"use strict";
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value;
});
const like = document.getElementsByClassName('like')[0];
const path = document.getElementById('path');
let likeCondition = false;
like.addEventListener('click', () => {
    switch (likeCondition) {
        case false:
            like.style.width = '19';
            like.style.height = '17';
            path.style.stroke = 'none';
            like.style.fill = 'green';
            likeCondition = true;
            like.classList.remove('hover');
            break;
        case true:
            like.style.width = '17';
            like.style.height = '15';
            path.style.stroke = 'lightgrey';
            like.style.fill = 'none';
            likeCondition = false;
            like.classList.add('hover');
            break;
    }
});
