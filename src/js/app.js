import { buildGameTable } from "./gameBuilder.js";
import { stopTimer, resetTimeCounter } from "./timer";

const restartElement = document.getElementById("restart");
const levelElement = document.getElementById('level');

export let table = {};

restartElement.addEventListener("click", restartGame);
levelElement.addEventListener("change", restartGame);

restartGame();

function restartGame() {
    table = buildGameTable(levelElement.value.split(',').map(item => +item));
    stopTimer();
    resetTimeCounter();
}
