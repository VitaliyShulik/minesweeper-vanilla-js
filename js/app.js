function buildGameTable(rows, cols, maxMines) {
    let tableCols = {};
    let table = {counterMines:0, counterFlags:0, amountCols: rows * cols, timeCounterIsStart: false};
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
            let divCol = document.createElement("div");
            divCol.setAttribute("class", "col");
            divCol.addEventListener("click", clickOnCol);
            divCol.addEventListener("contextmenu", rightClickOnCol, false);
            let colId = "col-" + i + "-" + n;
            divCol.setAttribute("id", colId);
            divRow.appendChild(divCol);

            // adding col with properties to table object
            Object.assign(tableCols, {[colId]: {
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
    table.tableCols = tableCols;

    while (table.counterMines != maxMines) {
        setMine(maxMines, table);
    }
    addNieghbors(table);
    return table
}

function setMine(maxMines, table) {
    for (cols in table.tableCols){
        let colObject = table.tableCols[cols];
        if (table.counterMines < maxMines && Math.random() > 0.98 && !colObject.haveMine){
            table.counterMines++;
            colObject.haveMine = true;
        }
    } 
     
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

function addNieghbors(table) {
    for (const x in table.tableCols){
        let counterNierhbors = 0;
        let xNeighbors = table.tableCols[x].neighbors;
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
        Object.assign(table.tableCols[x], {amountNeighborsWithMine: counterNierhbors});
    }
 
}

function checkMine(row, col, table) {
    let neighbor = findNeigbor(row, col, table);
    return neighbor.haveMine;
}

function findNeigbor(row, col, table) {
    let neighbor = "";
    for (const k in table.tableCols){
        if (table.tableCols[k].row == row && table.tableCols[k].col == col){
            neighbor = table.tableCols[k];
        }
    }
    return neighbor;
    
}

function clickOnCol(event){
    if (!table.timeCounterIsStart){startTimer()}
    let colId = event.target.id;
    let colElement = document.getElementById(colId);
    let haveMine = table.tableCols[colId].haveMine;
    let amountNeighborsWithMine = table.tableCols[colId].amountNeighborsWithMine;
    if (haveMine){
        colElement.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        colElement.style.backgroundImage = "url('./img/bomb.svg')";
        table.tableCols[colId].isOpen = true;
        gameOver();      
    } else if(!haveMine && amountNeighborsWithMine > 0){
        getNumberToCol(amountNeighborsWithMine, colElement, colId);
        table.tableCols[colId].isOpen = true;
    } else {
        openEmptyCol(colElement, colId, table);
    }
    table.counterFlags = checkAndAddNumberCollsWithFlag();
    let counterFlagsSpan = document.getElementById("counter-flags");
    counterFlagsSpan.innerHTML = table.counterFlags;

    let amountOpenedCols = checkAmountOpenedCols();
    let amountCols = table.amountCols;
    let amountClosedCols = amountCols - amountOpenedCols;
    if (amountClosedCols == table.counterMines){
        won()
    }
}

function getNumberToCol(amountNeighborsWithMine, colElement, colId){
    let urlImg = "url('./img/" + amountNeighborsWithMine + ".png')"
    colElement.style.backgroundSize = "cover";
    colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    colElement.style.backgroundImage = urlImg;
    colElement.removeEventListener("contextmenu", rightClickOnCol, false);
}

function checkNeighborsWithNeighborsWithMine(table, colId) {
    let neighbors = table.tableCols[colId].neighbors;
    for (neighbor in neighbors){
        if (neighbors[neighbor] !== ""){
            let row = neighbors[neighbor].row;
            let col = neighbors[neighbor].col;
            workOnNeighbor(row, col, table);
        }     
    }
}

function workOnNeighbor(row, col, table) {
    let colId = "col-" + row + "-" + col;
    let colElement = document.getElementById(colId);
    let neighbor = findNeigbor(row, col, table);
    let amountNeighborsWithMine = neighbor.amountNeighborsWithMine;
    let isOpen = table.tableCols[colId].isOpen;
    if (amountNeighborsWithMine != 0){
        getNumberToCol(amountNeighborsWithMine, colElement);
        table.tableCols[colId].isOpen = true;
        table.tableCols[colId].haveFlag = false;
    } else if (amountNeighborsWithMine == 0 && !isOpen){
        openEmptyCol(colElement, colId, table);
    }
}
function openEmptyCol(colElement, colId, table){
    colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    table.tableCols[colId].isOpen = true;
    table.tableCols[colId].haveFlag = false;
    colElement.style.backgroundImage = '';
    colElement.removeEventListener("contextmenu", rightClickOnCol, false);
    checkNeighborsWithNeighborsWithMine(table, colId);
}


var table = buildGameTable(8, 8, 10);

function restartGame() {
    removeGameTable();
    table = buildGameTable(8, 8, 10);
    stopTimer();
    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
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
    for (x in table.tableCols){
        let colId = x;
        let haveMine = table.tableCols[x].haveMine;
        let isOpen = table.tableCols[x].isOpen;
        let colElement = document.getElementById(colId);
        colElement.removeEventListener("click", clickOnCol);
        colElement.removeEventListener("contextmenu", rightClickOnCol, false);
        if (haveMine && !isOpen){
            colElement.style.backgroundImage = "url('./img/bomb.svg')";
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
    }
    stopTimer();
}


function rightClickOnCol(e) {
    if (!table.timeCounterIsStart){startTimer()}
    e.preventDefault();
    let colId = event.target.id;
    let colElement = document.getElementById(colId);
    
    let haveFlag = table.tableCols[colId].haveFlag;
    if (!haveFlag && table.counterFlags < table.counterMines){
        colElement.removeEventListener("click", clickOnCol);
        colElement.style.backgroundSize = "cover";
        colElement.style.backgroundImage = "url('./img/flag.png')";
        table.tableCols[colId].haveFlag = true;
    } else if (haveFlag){
        colElement.addEventListener("click", clickOnCol);
        colElement.style.backgroundSize = "";
        colElement.style.backgroundImage = "";
        table.tableCols[colId].haveFlag = false;
    }
    table.counterFlags = checkAndAddNumberCollsWithFlag();
    let counterFlagsSpan = document.getElementById("counter-flags");
    counterFlagsSpan.innerHTML = table.counterFlags;
    if (checkColsWithFlagsAndMines()){
        won()
    }

}

function checkAndAddNumberCollsWithFlag() {
    let counterFlags = 0;
    for (cols in table.tableCols){
        if (table.tableCols[cols].haveFlag){
            counterFlags++;
        }
    }
    table.counterFlags = counterFlags;
    return table.counterFlags
}

function checkAmountOpenedCols() {
    let amountOpenedCols = 0;
    for (cols in table.tableCols){
        if (table.tableCols[cols].isOpen){
            amountOpenedCols++;
        }
    }
    return amountOpenedCols
}

function won() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    for (x in table.tableCols){
        let colId = x;
        let haveMine = table.tableCols[x].haveMine;
        let isOpen = table.tableCols[x].isOpen;
        let colElement = document.getElementById(colId);
        colElement.removeEventListener("click", clickOnCol);
        colElement.removeEventListener("contextmenu", rightClickOnCol, false);
        if (haveMine && !isOpen){
            colElement.style.backgroundImage = "url('./img/bomb.svg')";
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
    }
    stopTimer();
}

function checkColsWithFlagsAndMines(){
    let counterColsWithFlagAndMines = 0;
    for (cols in table.tableCols){
        if (table.tableCols[cols].haveFlag && table.tableCols[cols].haveMine){
            counterColsWithFlagAndMines++
        }
    }
    return counterColsWithFlagAndMines == table.counterMines
}

var interval; 

function startTimer(){
    let timeCounter = 1;
    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');
    secondsElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    hoursElement.innerHTML = "00";
    let seconds, minutes, hours = 0;
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