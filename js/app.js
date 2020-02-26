////// Module game building

var table = buildGameTable(8, 8, 5);

function buildGameTable(rows, cols, maxMines) {
    let tableCells = {};
    let table = {counterMines:0, counterFlags:0, amountCells: rows * cols, timeCounterIsStart: false};
    let gameTableElement = document.getElementById("gameTable");
    document.getElementById("amount-mines").innerHTML = maxMines;
    

    // create rows
    for (let i = 0; i < rows; i++) {
        let divRow = document.createElement("div"); 
        divRow.setAttribute("class", "row");
        let rowId = "row-" + i;
        divRow.setAttribute("id", rowId);

  
        gameTableElement.appendChild(divRow);
        
        // create row's cols
        for (let n = 0; n < cols; n++) {
            let divCell = document.createElement("div");
            divCell.setAttribute("class", "cell");
            divCell.addEventListener("click", clickOnCell);
            divCell.addEventListener("contextmenu", rightClickOnCell, false);
            let cellId = "cell-" + i + "-" + n;
            divCell.setAttribute("id", cellId);
            divRow.appendChild(divCell);

            // adding col with properties to table object
            Object.assign(tableCells, {[cellId]: {
                 row: i,
                 col: n,
                 neighbors: setNeighbors(rows, cols, i, n),
                 haveMine: false,
                 isOpen: false,
                 haveFlag: false,
                 writable: false
             }});
            }
    }
    table.tableCells = tableCells;

    while (table.counterMines != maxMines) {
        setMine(maxMines, table);
    }
    addNieghbors(table);
    return table
}

function setNeighbors(rows, cols, i, n) {
    const lastNeighborY = rows - 1;
    const lastNeighborX = cols - 1;
    if (i > 0 && n > 0 && i < lastNeighborY && n < lastNeighborX){
        return {
            neighbor_1: {row: i - 1, col: n - 1},
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: {row: i - 1, col: n + 1},
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: {row: i + 1, col: n - 1},
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: {row: i + 1, col: n + 1}
            }
    } else if (i == 0 && n == 0 && i < lastNeighborY && n < lastNeighborX) {
        return {
            neighbor_1: "",
            neighbor_2: "",
            neighbor_3: "",
            neighbor_4: "",
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: "",
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: {row: i + 1, col: n + 1}
            }
    } else if (i == 0 && n > 0 && i < lastNeighborY && n < lastNeighborX) {
        return {
            neighbor_1: "",
            neighbor_2: "",
            neighbor_3: "",
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: {row: i + 1, col: n - 1},
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: {row: i + 1, col: n + 1}
            }
    } else if (i == 0 && n > 0 && i < lastNeighborY && n == lastNeighborX){
        return {
            neighbor_1: "",
            neighbor_2: "",
            neighbor_3: "",
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: "",        
            neighbor_6: {row: i + 1, col: n - 1},
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: ""
            } 
    } else if (i > 0 && n == 0 && i < lastNeighborY && n < lastNeighborX) {
        return {
            neighbor_1: "",
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: {row: i - 1, col: n + 1},
            neighbor_4: "",
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: "",
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: {row: i + 1, col: n + 1}
            }
    } else if (i > 0 && n == 0 && i == lastNeighborY && n < lastNeighborX) {
        return {
            neighbor_1: "",
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: {row: i - 1, col: n + 1},
            neighbor_4: "",
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: "",
            neighbor_7: "",
            neighbor_8: ""
            }
    } else if (i > 0 && n > 0 && i < lastNeighborY && n == lastNeighborX) {
        return {
            neighbor_1: {row: i - 1, col: n - 1},
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: "",
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: "",        
            neighbor_6: {row: i + 1, col: n - 1},
            neighbor_7: {row: i + 1, col: n},
            neighbor_8: ""
            }
    } else if (i > 0 && n > 0 && i == lastNeighborY && n < lastNeighborX) {
        return {
            neighbor_1: {row: i - 1, col: n - 1},
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: {row: i - 1, col: n + 1},
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: {row: i, col: n + 1},        
            neighbor_6: "",
            neighbor_7: "",
            neighbor_8: ""
            }
    } else if (i > 0 && n > 0 && i == lastNeighborY && n == lastNeighborX) {
        return {
            neighbor_1: {row: i - 1, col: n - 1},
            neighbor_2: {row: i - 1, col: n},
            neighbor_3: "",
            neighbor_4: {row: i, col: n - 1},
            neighbor_5: "",        
            neighbor_6: "",
            neighbor_7: "",
            neighbor_8: ""
            }
    }
}

function setMine(maxMines, table) {
    for (cell in table.tableCells){
        let cellObject = table.tableCells[cell];
        if (table.counterMines < maxMines && Math.random() > 0.98 && !cellObject.haveMine){
            table.counterMines++;
            cellObject.haveMine = true;
        }
    } 
     
}

function addNieghbors(table) {
    for (const x in table.tableCells){
        let counterNierhbors = 0;
        let xNeighbors = table.tableCells[x].neighbors;
        for (const k in xNeighbors){
            let nowNeighbors = xNeighbors[k];
            let row = nowNeighbors.row;
            let col = nowNeighbors.col;
            let haveMine = checkMine(row, col, table);
            if (nowNeighbors == ""){
                continue;
            } else if (haveMine){
                counterNierhbors++;
            }
        
        }
        Object.assign(table.tableCells[x], {amountNeighborsWithMine: counterNierhbors});
    }
 
}

function checkMine(row, col, table) {
    let neighbor = findNeigbor(row, col, table);
    return neighbor.haveMine;
}

function findNeigbor(row, col, table) {
    let neighbor = "";
    for (const k in table.tableCells){
        if (table.tableCells[k].row == row && table.tableCells[k].col == col){
            neighbor = table.tableCells[k];
        }
    }
    return neighbor;
    
}

//////////

///////// Module Actions

// Left click

function clickOnCell(event){
    let cellId = event.target.id;
    let cellElement = document.getElementById(cellId);

    if (!table.timeCounterIsStart){startTimer()}

    let haveMine = table.tableCells[cellId].haveMine;
    let amountNeighborsWithMine = table.tableCells[cellId].amountNeighborsWithMine;
    
    if (haveMine){
        cellElement.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        cellElement.style.backgroundImage = "url('./img/bomb.svg')";
        table.tableCells[cellId].isOpen = true;
        gameOver();      
    } else if(!haveMine && amountNeighborsWithMine > 0){
        getNumberToCell(amountNeighborsWithMine, cellElement);
        table.tableCells[cellId].isOpen = true;
    } else {
        openEmptyCell(cellElement, cellId, table);
    }

    table.counterFlags = checkAndAddNumberCellsWithFlag();
    let counterFlagsSpan = document.getElementById("counter-flags");
    counterFlagsSpan.innerHTML = table.counterFlags;

    checkamountOpenedCells()
}

function getNumberToCell(amountNeighborsWithMine, cellElement){
    let urlImg = "url('./img/" + amountNeighborsWithMine + ".png')"
    cellElement.style.backgroundSize = "cover";
    cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    cellElement.style.backgroundImage = urlImg;
    cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
}

function openEmptyCell(cellElement, cellId, table){
    cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    table.tableCells[cellId].isOpen = true;
    table.tableCells[cellId].haveFlag = false;
    cellElement.style.backgroundImage = '';
    cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
    checkNeighborsWithNeighborsWithMine(table, cellId);
}

function checkNeighborsWithNeighborsWithMine(table, cellId) {
    let neighbors = table.tableCells[cellId].neighbors;
    for (neighbor in neighbors){
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
    let neighbor = findNeigbor(row, col, table);
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

function checkamountOpenedCells() {
    let amountOpenedCells = 0;
    for (cell in table.tableCells){
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

function restartGame() {
    removeGameTable();
    table = buildGameTable(8, 8, 5);
    stopTimer();
    resetTimeCounter();
}

function removeGameTable() {
    let gameTable = document.getElementById('gameTable');
    let elementCounterFlags = document.getElementById('counter-flags');
    elementCounterFlags.innerHTML = 0;
    gameTable.innerHTML = "";
    gameTable.style.webkitFilter = "blur(.0em)";

}

function gameOver() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    for (x in table.tableCells){
        let cellId = x;
        let haveMine = table.tableCells[x].haveMine;
        let isOpen = table.tableCells[x].isOpen;
        let cellElement = document.getElementById(cellId);
        cellElement.removeEventListener("click", clickOnCell);
        cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
        if (haveMine && !isOpen){
            cellElement.style.backgroundImage = "url('./img/bomb.svg')";
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
    }
    stopTimer();
}


function rightClickOnCell(e) {
    if (!table.timeCounterIsStart){startTimer()}
    e.preventDefault();
    let cellId = event.target.id;
    let cellElement = document.getElementById(cellId);
    
    let haveFlag = table.tableCells[cellId].haveFlag;
    if (!haveFlag && table.counterFlags < table.counterMines){
        cellElement.removeEventListener("click", clickOnCell);
        cellElement.style.backgroundSize = "cover";
        cellElement.style.backgroundImage = "url('./img/flag.png')";
        table.tableCells[cellId].haveFlag = true;
    } else if (haveFlag){
        cellElement.addEventListener("click", clickOnCell);
        cellElement.style.backgroundSize = "";
        cellElement.style.backgroundImage = "";
        table.tableCells[cellId].haveFlag = false;
    }
    
    table.counterFlags = checkAndAddNumberCellsWithFlag();
    let counterFlagsSpan = document.getElementById("counter-flags");
    counterFlagsSpan.innerHTML = table.counterFlags;
    checkCellsWithFlagsAndMines()
}

function checkAndAddNumberCellsWithFlag() {
    let counterFlags = 0;
    for (cell in table.tableCells){
        if (table.tableCells[cell].haveFlag){
            counterFlags++;
        }
    }
    table.counterFlags = counterFlags;
    return table.counterFlags
}



function won() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    for (x in table.tableCells){
        openAllCells(x)
    }
    stopTimer();
}

function openAllCells(x) {
    let cellId = x;
        let haveMine = table.tableCells[x].haveMine;
        let isOpen = table.tableCells[x].isOpen;
        let cellElement = document.getElementById(cellId);
        cellElement.removeEventListener("click", clickOnCell);
        cellElement.removeEventListener("contextmenu", rightClickOnCell, false);
        if (haveMine && !isOpen){
            cellElement.style.backgroundImage = "url('./img/bomb.svg')";
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            cellElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
}

function checkCellsWithFlagsAndMines(){
    let counterCellsWithFlagAndMines = 0;
    for (cell in table.tableCells){
        if (table.tableCells[cell].haveFlag && table.tableCells[cell].haveMine){
            counterCellsWithFlagAndMines++
        }
    }
    if (counterCellsWithFlagAndMines == table.counterMines){
        won()
    }
}

/////// Time counter module

var interval; 

function startTimer(){
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
            minutes = Math.floor(timeCounter % 60 / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            hours = Math.floor(timeCounter / 60);
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

function stopTimer() {
    clearInterval(interval);
    table.timeCounterIsStart = false;
}

function resetTimeCounter() {
    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
}

////////