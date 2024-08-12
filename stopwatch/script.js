let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('timeDisplay');
const progressBar = document.getElementById('progressBar');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-mode');
});

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.background = '#FF3B30'; // Red for stop
    lapBtn.disabled = false;
    resetBtn.disabled = true;
    running = true;
  } else {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.background = '#32CD32'; // Green for start
    lapBtn.disabled = true;
    resetBtn.disabled = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  startTime = null;
  updatedTime = null;
  difference = 0;
  timeDisplay.textContent = '00:00:00.00';
  startStopBtn.textContent = 'Start';
  startStopBtn.style.background = '#32CD32';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  laps = [];
  lapsContainer.innerHTML = '';
  progressBar.style.width = '0%';
}

function lap() {
  if (running) {
    laps.push(difference);
    displayLaps();
  }
}

function displayLaps() {
  lapsContainer.innerHTML = '';
  laps.forEach((lapTime, index) => {
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    const hours = Math.floor((lapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((lapTime % 1000) / 10);

    const displayHours = hours < 10 ? '0' + hours : hours;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    const displayMilliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    lapElement.textContent = `Lap ${index + 1}: ${displayHours}:${displayMinutes}:${displaySeconds}.${displayMilliseconds}`;
    lapsContainer.appendChild(lapElement);
  });
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  const displayHours = hours < 10 ? '0' + hours : hours;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
  const displayMilliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  timeDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}.${displayMilliseconds}`;

  // Update progress bar
  const progress = (difference % 60000) / 60000 * 100;
  progressBar.style.width = `${progress}%`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
