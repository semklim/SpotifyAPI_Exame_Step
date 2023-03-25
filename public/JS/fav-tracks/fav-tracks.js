"use strict";
import API from '../API.js';
async function funcUI() {
    const userProfile = await API.UserProfile();
    const userSaveTracks = await API.UserSavedTracks();
    return `<div class="favorite-tracks-box">
        <div class="presentation-favorite-tracks">
          <div class="favorite-tracks__play-list"></div>
          <div class="favorite-tracks__info">
            <h3 class="favorite-tracks__track-or-playList">Плейлист</h3>
            <h1 class="favorite-tracks__track__name-play-list">Любимые треки</h1>
            <h3 class="favorite-tracks__info">${userProfile.display_name} · ${userSaveTracks.total} трэка</h3>
          </div>
        </div>
        <div class="play-favorite-track-box">
          <div class="play-favorite-track">
            <button class="play-favorite-track__button">
              <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="play-favorite-track__button--img" fill="black">
                <path 
                  d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                </path>
              </svg>
            </button>
          </div>
          <div class="favorite-tracks-contents">
            <div class="favorite-tracks-contents-lists">
              <div class="favorite-tracks-contents-title">
                <p class="favorite-tracks__title-name favorite-tracks--one-size"># &nbsp Название</p>
                <p class="favorite-tracks__title-albom favorite-tracks--two-size">Альбом</p>
                <p class="favorite-tracks__title-date-push favorite-tracks--tree-size">дата добавления</p>
                <button class="favorite-tracks__title-icon favorite-tracks--four-size">
                  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="#b3b3b3"></path>
                    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" fill="#b3b3b3"></path></svg>
                </button>
              </div>
              <div class="favorite-tracks__decor-line"></div>
            </div>
          </div>
        </div>
      </div>`;
}
export default funcUI;
