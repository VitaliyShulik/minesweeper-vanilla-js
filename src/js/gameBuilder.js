import { 
    clickOnCell,
    rightClickOnCell,
    onTouchStart,
    onTouchEnd
 } from "./actions.js";

export function buildGameTable(level) {
    let rows = level.rows;
    let cols = level.cols;
    let maxMines = level.maxMines;
    let tableCells = {};
    let table = {
        counterMines:0, 
        maxMines: maxMines, 
        counterFlags:0, 
        amountCells: rows * cols, 
        timeCounterIsStart: false, 
        firstClick: false
    };
    let gameTableElement = document.getElementById("gameTable");
    document.getElementById("amount-mines").innerHTML = maxMines;

    let cellClass;
    switch (rows) {
        case 8:
            cellClass = "cell-8"
            break;
        case 10:
            cellClass = "cell-10"
            break;        
        case 12:
            cellClass = "cell-12"
            break;
        default:
            break;
    }
    

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
            divCell.setAttribute("class", cellClass);
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
                 amountNeighborsWithMine: 0,
                 haveMine: false,
                 isOpen: false,
                 firstClickOpen: false,
                 haveFlag: false,
                 writable: false
             }});
            }
    }
    table.tableCells = tableCells;

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



