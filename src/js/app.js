import { 
    buildGameTable
} from "./gameBuilder.js";
import { removeGameTable } from "./gameState";
import { stopTimer, resetTimeCounter } from "./timer";

var level;
setLevel();

export var table = buildGameTable(level);

document.getElementById("restart").addEventListener("click", restartGame);


function restartGame() {
    setLevel();
    removeGameTable();
    table = buildGameTable(level);
    stopTimer();
    resetTimeCounter();
}

function setLevel() {
    level = document.getElementById('level').value;

    switch (level) {
    case "easyLevel":
        level = {
            rows: 8,
            cols: 8,
            maxMines:10
        }
        break;
    case "normalLevel":
        level = {
            rows: 10,
            cols: 10,
            maxMines: 14
        }
        break;
    case "hardLevel":
        level = {
            rows: 12,
            cols: 12,
            maxMines: 20
        }
        break;
    default:
        break;
    }

}