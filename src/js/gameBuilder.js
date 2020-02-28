import { 
    clickOnCell,
    rightClickOnCell,
    onTouchStart,
    onTouchEnd
 } from "./action.js";

export function buildGameTable(rows, cols, maxMines) {
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
            divCell.addEventListener('touchstart', onTouchStart,false);
            divCell.addEventListener('touchend', onTouchEnd,false);
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
    for (const cell in table.tableCells){
        let cellObject = table.tableCells[cell];
        if (table.counterMines < maxMines && Math.random() > 0.98 && !cellObject.haveMine){
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
        Object.assign(table.tableCells[cell], {amountNeighborsWithMine: counterNierhborsWithMine});
    }
}

function checkMine(row, col, table) {
    let neighbor = findNeigbor(row, col, table);
    return neighbor.haveMine;
}

export function findNeigbor(row, col, table) {
    let neighbor = "";
    for (const cell in table.tableCells){
        if (table.tableCells[cell].row == row && table.tableCells[cell].col == col){
            neighbor = table.tableCells[cell];
        }
    }
    return neighbor;
}

