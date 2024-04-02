//your JS code here. If required.
// script.js

document.addEventListener("DOMContentLoaded", function() {
  const meditationVideo = document.getElementById("meditationVideo");
  const meditationAudio = document.getElementById("meditationAudio");
  const sound1Button = document.getElementById("sound1");
  const sound2Button = document.getElementById("sound2");
  const timeButtons = document.querySelectorAll(".time-select button");
  const timeDisplay = document.querySelector(".time-display");
  const playPauseButton = document.getElementById("play-pause");
  
  let timer;
  let meditationTime = 600; // Default time in seconds (10 minutes)
  let isPlaying = false;

  function updateTimerDisplay() {
    const minutes = Math.floor(meditationTime / 60);
    const seconds = meditationTime % 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    timeDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
  }

  function playPauseMeditation() {
    if (isPlaying) {
      meditationVideo.pause();
      meditationAudio.pause();
      clearInterval(timer);
      playPauseButton.textContent = "Play";
    } else {
      meditationVideo.play();
      meditationAudio.play();
      timer = setInterval(() => {
        meditationTime--;
        updateTimerDisplay();
        if (meditationTime === 0) {
          clearInterval(timer);
          playPauseButton.textContent = "Play";
        }
      }, 1000);
      playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
  }

  function changeSound(event) {
    const sound = event.target.id === "sound1" ? "beach.mp3" : "rain.mp3";
    meditationAudio.src = `sounds/${sound}`;
  }

  function changeTime(event) {
    clearInterval(timer);
    meditationTime = parseInt(event.target.dataset.time);
    updateTimerDisplay();
  }

  function initialize() {
    updateTimerDisplay();
    sound1Button.addEventListener("click", changeSound);
    sound2Button.addEventListener("click", changeSound);
    timeButtons.forEach(button => {
      button.addEventListener("click", changeTime);
    });
    playPauseButton.addEventListener("click", playPauseMeditation);
  }

  initialize();
});
