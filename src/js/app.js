import { 
    buildGameTable
} from "./gameBuilder.js";
import { removeGameTable } from "./gameState";
import { stopTimer, resetTimeCounter } from "./timer";

var rows = 8;
var cols = 8;
var maxMines = 10;
export var table = buildGameTable(rows, cols, maxMines);

document.getElementById("restart").addEventListener("click", restartGame);


function restartGame() {
    removeGameTable();
    table = buildGameTable(rows, cols, maxMines);
    stopTimer();
    resetTimeCounter();
}