import { table } from "./app.js";

export var interval; 

export function startTimer(){
    let timeCounter = 1;
    let seconds, minutes, hours = 0;

    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');

    resetTimeCounter();

    table.timeCounterIsStart = true;

    interval = setInterval(() => {
        if (timeCounter < 60){
            seconds = timeCounter;
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            secondsElement.innerHTML = seconds;
        } else if (timeCounter >=60 && timeCounter < 3600){
            seconds = timeCounter % 60;
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            minutes = Math.floor(timeCounter / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            secondsElement.innerHTML = seconds;
            minutesElement.innerHTML = minutes;
        } else if (timeCounter >= 3600){
            seconds = timeCounter % 60;
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            minutes = Math.floor(timeCounter / 60 % 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            hours = Math.floor(timeCounter / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            secondsElement.innerHTML = seconds;
            minutesElement.innerHTML = minutes;
            hoursElement.innerHTML = hours;
        }
        timeCounter++
    }, 1000);
}

export function stopTimer() {
    clearInterval(interval);
    table.timeCounterIsStart = false;
}

export function resetTimeCounter() {
    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
}
