import { startTimer } from "./timer.js";
import { 
    won,
    gameOver
 } from "./gameState.js";
import { findNeighbor } from "./gameBuilder.js";
import { table } from "./app.js";

//// Left click

export function clickOnCell(event){
    let cellId = event.target.id;
    let cellElement = document.getElementById(cellId);

    let haveMine = table.tableCells[cellId].haveMine;
    let amountNeighborsWithMine = table.tableCells[cellId].amountNeighborsWithMine;

    if (!table.timeCounterIsStart){startTimer()}

    if (haveMine){
        openCellWithMine(cellElement, cellId, table);
        gameOver();      
    } else if(!haveMine && amountNeighborsWithMine > 0){
        getNumberToCell(amountNeighborsWithMine, cellElement);
        table.tableCells[cellId].isOpen = true;
    } else {
        openEmptyCell(cellElement, cellId, table);
    }

    checkAndAddNumberCellsWithFlag();

    checkamountOpenedCells()
}

////

//// Right click

export function rightClickOnCell(e) {
    e.preventDefault();

    let cellId = event.target.id;
    let cellElement = document.getElementById(cellId);
    
    let haveFlag = table.tableCells[cellId].haveFlag;

    if (!table.timeCounterIsStart){startTimer()}

    if (!haveFlag && table.counterFlags < table.counterMines){
        getFlagToCell(cellElement, table, cellId);
    } else if (haveFlag){
        removeFlagFromCell(cellElement, table, cellId);
    }
    
    checkAndAddNumberCellsWithFlag();
    checkCellsWithFlagsAndMines()
}

////

//// Long touch action

var touchStartTimeStamp = 0;
var touchEndTimeStamp   = 0;

export function onTouchStart(e) {
    touchStartTimeStamp = e.timeStamp;
}

export function onTouchEnd(e) {
    touchEndTimeStamp = e.timeStamp;

    if (touchEndTimeStamp - touchStartTimeStamp > 500){
        rightClickOnCell(e);
    }
}

////

//// Actions checks

function openCellWithMine(cellElement, cellId, table){
    cellElement.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    cellElement.style.backgroundImage = "url('./src/img/bomb.svg')";
    table.tableCells[cellId].isOpen = true;
    
}

function getNumberToCell(amountNeighborsWithMine, cellElement){
    let urlImg = "url('./src/img/" + amountNeighborsWithMine + ".png')"
    cellElement.style.backgroundSize = "cover";
    cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    cellElement.style.backgroundImage = urlImg;
    cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
    cellElement.removeEventListener('touchstart', onTouchStart,false);
    cellElement.removeEventListener('touchend', onTouchEnd,false);
}

function openEmptyCell(cellElement, cellId, table){
    cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    table.tableCells[cellId].isOpen = true;
    table.tableCells[cellId].haveFlag = false;
    cellElement.style.backgroundImage = '';
    cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
    cellElement.removeEventListener('touchstart', onTouchStart,false);
    cellElement.removeEventListener('touchend', onTouchEnd,false);
    checkNeighborsWithNeighborsWithMine(table, cellId);
}

function checkNeighborsWithNeighborsWithMine(table, cellId) {
    let neighbors = table.tableCells[cellId].neighbors;
    for (const neighbor in neighbors){
        if (neighbors[neighbor] !== ""){
            let row = neighbors[neighbor].row;
            let col = neighbors[neighbor].col;
            workOnNeighbor(row, col, table);
        }     
    }
}

function workOnNeighbor(row, col, table) {
    let cellId = "cell-" + row + "-" + col;
    let cellElement = document.getElementById(cellId);
    let neighbor = findNeighbor(row, col, table);
    let amountNeighborsWithMine = neighbor.amountNeighborsWithMine;
    let isOpen = table.tableCells[cellId].isOpen;
    if (amountNeighborsWithMine != 0){
        getNumberToCell(amountNeighborsWithMine, cellElement);
        table.tableCells[cellId].isOpen = true;
        table.tableCells[cellId].haveFlag = false;
    } else if (amountNeighborsWithMine == 0 && !isOpen){
        openEmptyCell(cellElement, cellId, table);
    }
}

function checkAndAddNumberCellsWithFlag() {
    let counterFlags = 0;
    let counterFlagsSpan = document.getElementById("counter-flags");
    for (const cell in table.tableCells){
        if (table.tableCells[cell].haveFlag){
            counterFlags++;
        }
    }
    table.counterFlags = counterFlags;
    counterFlagsSpan.innerHTML = table.counterFlags;
}

function getFlagToCell(cellElement, table, cellId){
    cellElement.removeEventListener("click", clickOnCell);
    cellElement.style.backgroundSize = "cover";
    cellElement.style.backgroundImage = "url('./src/img/flag.png')";
    table.tableCells[cellId].haveFlag = true;
}

function removeFlagFromCell(cellElement, table, cellId){
    cellElement.addEventListener("click", clickOnCell);
    cellElement.style.backgroundSize = "";
    cellElement.style.backgroundImage = "";
    table.tableCells[cellId].haveFlag = false;
}


function checkamountOpenedCells() {
    let amountOpenedCells = 0;
    for (const cell in table.tableCells){
        if (table.tableCells[cell].isOpen){
            amountOpenedCells++;
        }
    }
    let amountCells = table.amountCells;
    let amountClosedCells = amountCells - amountOpenedCells;
    if (amountClosedCells == table.counterMines){
        won()
    }
}

function checkCellsWithFlagsAndMines(){
    let counterCellsWithFlagAndMines = 0;
    for (const cell in table.tableCells){
        if (table.tableCells[cell].haveFlag && table.tableCells[cell].haveMine){
            counterCellsWithFlagAndMines++
        }
    }
    if (counterCellsWithFlagAndMines == table.counterMines){
        won()
    }
}

////
