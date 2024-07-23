const display = document.querySelector(".display");
const lapElement = document.querySelector(".laps");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  stop();
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  laps = [];
  document.querySelector(".laps").innerHTML = "";
  display.textContent = "00:00:00";
  lapElement.style.display = "none";
}

function lap() {
  if (isRunning) {
    const lapTime = elapsedTime;
    laps.push(lapTime);
    const lapItem = document.createElement("li");
    lapItem.className = "lap_item";
    lapItem.innerHTML = `<span class="number">${
      laps.length
    }</span><span class="time_stamp">${formatTime(lapTime)}</span>`;
    lapElement.appendChild(lapItem);
    lapElement.style.display = "block";
    lapElement.style.overflow = "auto";
  }
}

function formatTime(time) {
  const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function update() {
  const curretTime = Date.now();
  elapsedTime = curretTime - startTime;

  let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let second = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  min = String(min).padStart(2, "0");
  second = String(second).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

  display.textContent = `${min}:${second}:${milliseconds}`;
}