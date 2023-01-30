import { 
    clickOnCell,
    rightClickOnCell,
    onTouchStart,
    onTouchEnd
 } from "./actions.js";
import { removeGameTable } from "./gameState";

const fragment = document.createDocumentFragment();
const gameTableElement = document.getElementById("gameTable");

gameTableElement.addEventListener("click", clickOnCell);
gameTableElement.addEventListener("contextmenu", rightClickOnCell, false);
gameTableElement.addEventListener('touchstart', onTouchStart,false);
gameTableElement.addEventListener('touchend', onTouchEnd,false);

export function buildGameTable([rows, cols, maxMines]) {
    let tableCells = Object.create(null);
    let table = Object.create(null);
    let cellClass = 'cell-' + rows;

    Object.assign(table, {
        counterMines:0, 
        maxMines: maxMines, 
        counterFlags:0, 
        amountCells: rows * cols, 
        timeCounterIsStart: false, 
        firstClick: false,
        won: undefined
    });

    removeGameTable();

    document.getElementById("amount-mines").innerHTML = maxMines;    

    // create rows
    for (let i = 0; i < rows; i++) {
        let divRow = document.createElement("div"); 
        divRow.setAttribute("class", "row");
        let rowId = "row-" + i;
        divRow.setAttribute("id", rowId);

        fragment.appendChild(divRow);
        
        // create row's cols
        for (let n = 0; n < cols; n++) {
            let divCell = document.createElement("div");
            let cellId = "cell-" + i + "-" + n;

            divCell.setAttribute("class", cellClass);
            divCell.setAttribute("id", cellId);
            divRow.appendChild(divCell);

            // adding col with properties to table object
            Object.assign(tableCells, {[cellId]: Object.assign(Object.create(null), {
                row: i,
                col: n,
                neighbors: setNeighbors(rows, cols, i, n),
                amountNeighborsWithMine: 0,
                haveMine: false,
                isOpen: false,
                firstClickOpen: false,
                haveFlag: false,
                writable: false
            })});
        }
    }
    table.tableCells = tableCells;

    gameTableElement.appendChild(fragment);
    return table
}

function setNeighbors(rows, cols, i, n) {
    const out = Object.create(null);
    let num = 1;

    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = n - 1; y <= n + 1; y++ ) {
            if (x === i && y === n) continue;
            else if (x >= rows || x < 0) out['neighbor_' + num++] = '';
            else if (y >= cols || y < 0) out['neighbor_' + num++] = '';
            else out['neighbor_' + num++] = { row: x, col: y };
        }
    }
    return out;
}
