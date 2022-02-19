let musicPausePlay = document.querySelector(".musicSection__pausePlay");

musicPausePlay.onclick = function() {
    musicPausePlay.classList.toggle("musicSection__pausePlay__isPause");
}