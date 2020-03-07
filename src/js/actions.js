import { startTimer } from "./timer.js";
import { 
    won,
    gameOver
 } from "./gameState.js";
import { table } from "./app.js";

//// Left click

export function clickOnCell(event){

    if (!table.timeCounterIsStart){startTimer()}
    
    let cellId = event.target.id;
    let cellElement = document.getElementById(cellId);

    if (!table.firstClick) {
        firstClick(table, cellElement, cellId)
    } else {
        let haveMine = table.tableCells[cellId].haveMine;
        let amountNeighborsWithMine = table.tableCells[cellId].amountNeighborsWithMine;

        if (haveMine){
            openCellWithMine(cellElement, cellId, table);
            gameOver();      
        } else if(!haveMine && amountNeighborsWithMine > 0){
            getNumberToCell(amountNeighborsWithMine, cellElement);
            table.tableCells[cellId].isOpen = true;
        } else {
            openEmptyCell(cellElement, cellId, table);
        }
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

//// Actions methods

function firstClick(table, cellElement, cellId){
    cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    table.tableCells[cellId].isOpen = true;
    table.tableCells[cellId].firstClickOpen = true;
    table.tableCells[cellId].haveFlag = false;
    cellElement.style.backgroundImage = '';
    cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
    cellElement.removeEventListener('touchstart', onTouchStart,false);
    cellElement.removeEventListener('touchend', onTouchEnd,false);

    let neighbors = table.tableCells[cellId].neighbors;
    for (const neighbor in neighbors){
        if (neighbors[neighbor] !== ""){
            let row = neighbors[neighbor].row;
            let col = neighbors[neighbor].col;
            let neighborCellId = "cell-" + row + "-" + col;
            table.tableCells[neighborCellId].isOpen = true;
            table.tableCells[neighborCellId].firstClickOpen = true;
        }     
    }
    while (table.counterMines != table.maxMines) {
        setMine(table);
    }
    addNieghbors(table);

    checkNeighborsWithNeighborsWithMine(table, cellId);
    table.firstClick = true;
}

function setMine(table) {
    for (const cell in table.tableCells){
        let cellObject = table.tableCells[cell];
        if (table.counterMines < table.maxMines 
            && Math.random() > 0.98 
            && !cellObject.haveMine 
            && !cellObject.isOpen){
            table.counterMines++;
            cellObject.haveMine = true;
        }
    } 
     
}

function addNieghbors(table) {
    for (const cell in table.tableCells){
        let counterNierhborsWithMine = 0;
        let cellNeighbors = table.tableCells[cell].neighbors;
        for (const neighbor in cellNeighbors){
            let nowNeighbors = cellNeighbors[neighbor];
            let row = nowNeighbors.row;
            let col = nowNeighbors.col;
            let haveMine = checkMine(row, col, table);
            if (nowNeighbors == ""){
                continue;
            } else if (haveMine){
                counterNierhborsWithMine++;
            }
        
        }
        table.tableCells[cell].amountNeighborsWithMine = counterNierhborsWithMine;
    }
}

function checkMine(row, col, table) {
    let neighbor = findNeighbor(row, col, table);
    return neighbor.haveMine;
}

function findNeighbor(row, col, table) {
    let neighbor = "";
    for (const cell in table.tableCells){
        if (table.tableCells[cell].row == row && table.tableCells[cell].col == col){
            neighbor = table.tableCells[cell];
        }
    }
    return neighbor;
}

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
    let firstClickOpen = table.tableCells[cellId].firstClickOpen;
    if (amountNeighborsWithMine != 0){
        getNumberToCell(amountNeighborsWithMine, cellElement);
        table.tableCells[cellId].isOpen = true;
        table.tableCells[cellId].haveFlag = false;
    } else if (amountNeighborsWithMine == 0 && !isOpen){
        openEmptyCell(cellElement, cellId, table);
    } else if (amountNeighborsWithMine == 0 && firstClickOpen){
        table.tableCells[cellId].firstClickOpen = false;
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
