import { table } from "./app.js";

const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');

let interval = 0;
let timeCounter = 0;

function setTime(seconds) {
    secondsElement.textContent = `0${seconds % 60}`.slice(-2);
    minutesElement.textContent = `0${Math.floor(seconds / 60) % 60}`.slice(-2);
    hoursElement.textContent = `0${Math.floor(seconds / 60 / 60)}`.slice(-2);
}

export function startTimer() {
    resetTimeCounter();
    clearInterval(interval);

    table.timeCounterIsStart = true;

    interval = setInterval(() => setTime(++timeCounter), 1000);
}

export function stopTimer() {
    clearInterval(interval);
    table.timeCounterIsStart = false;
}

export function resetTimeCounter() {
    setTime(timeCounter = 0);
}
