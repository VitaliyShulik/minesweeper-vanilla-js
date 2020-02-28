import { 
    stopTimer
 } from "./timer.js";

import { 
    clickOnCell,
    rightClickOnCell,
    onTouchStart,
    onTouchEnd
 } from "./action.js";
import { 
    table
 } from "./app.js";

export function won() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    openAllCells();
    stopTimer();
}

export function gameOver() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    openAllCells();
    stopTimer();
}

export function openAllCells() {
    for (const cell in table.tableCells){
        let haveMine = table.tableCells[cell].haveMine;
        let isOpen = table.tableCells[cell].isOpen;
        let cellElement = document.getElementById(cell);
        cellElement.removeEventListener("click", clickOnCell);
        cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
        cellElement.removeEventListener('touchstart', onTouchStart,false);
        cellElement.removeEventListener('touchend', onTouchEnd,false);
        if (haveMine && !isOpen){
            cellElement.style.backgroundImage = "url('./src/img/bomb.svg')";
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
    }
}

export function removeGameTable() {
    let gameTable = document.getElementById('gameTable');
    let elementCounterFlags = document.getElementById('counter-flags');
    elementCounterFlags.innerHTML = 0;
    gameTable.innerHTML = "";
    gameTable.style.webkitFilter = "blur(.0em)";

}
