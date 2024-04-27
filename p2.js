let timer;
let startTime;
let elapsedTime = 0;
let laps = [];

const timeDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function displayTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
}

function pauseTimer() {
  clearInterval(timer);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  displayTime(elapsedTime);
  laps = [];
  lapsList.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function lap() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  const li = document.createElement('li');
  li.textContent = laps.length + '. ' + timeDisplay.textContent;
  lapsList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lap);