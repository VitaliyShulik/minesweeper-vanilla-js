import { 
    buildGameTable
} from "./gameBuilder.js";
import { removeGameTable } from "./gameState";
import { stopTimer, resetTimeCounter } from "./timer";

export var rows = 8;
export var cols = 8;
export var maxMines = 10;
export var table = buildGameTable(rows, cols, maxMines);

document.getElementById("restart").addEventListener("click", restartGame);


export function restartGame() {
    removeGameTable();
    table = buildGameTable(rows, cols, maxMines);
    stopTimer();
    resetTimeCounter();
}