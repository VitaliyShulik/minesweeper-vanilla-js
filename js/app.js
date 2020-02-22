function buildGameTable(rows, cols, maxMines) {
    let table = {};
    let gameTableElement = document.getElementById("gameTable");
    
    let counterMines = 0;

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
            let colId = "col-" + i + "-" + n;
            divCol.setAttribute("id", colId);
            divRow.appendChild(divCol);
            
            // set or no set mine to col
            const mine = setMine(maxMines, counterMines);
            counterMines = mine.counter;

            // adding col with properties to table object
            Object.assign(table, {[colId]: {
                 row: i,
                 col: n,
                 neighbors: setNeighbors(rows, cols, i, n),
                 haveMine: mine.isMine,
                 isOpen: false,
                 writable: false
             }});
            }
        }
    addNieghbors(table);
    return table
}

function setMine(maxMines, counterMines) {
    if (counterMines < maxMines && Math.random() > 0.8){
        counterMines++;
        return {
            counter: counterMines++,
            isMine: true,
        }
    } else {
        return {
            counter: counterMines,
            isMine: false,
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
    for (const x in table){
        let counterNierhbors = 0;
        let xNeighbors = table[x].neighbors;
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
        Object.assign(table[x], {amountNeighborsWithMine: counterNierhbors});
    }
 
}

function checkMine(row, col, table) {
    let neighbor = findNeigbor(row, col, table);
    return neighbor.haveMine;
}

function findNeigbor(row, col, table) {
    let neighbor = "";
    for (const k in table){
        if (table[k].row == row && table[k].col == col){
            neighbor = table[k];
        }
    }
    return neighbor;
    
}

function clickOnCol(event){
    let colId = event.target.id;
    let colElement = document.getElementById(colId);
    let haveMine = table[colId].haveMine;
    let amountNeighborsWithMine = table[colId].amountNeighborsWithMine;
    if (haveMine){
        colElement.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        colElement.style.backgroundImage = "url('./img/bomb.svg')";
        table[colId].isOpen = true;
        gameOver();      
    } else if(!haveMine && amountNeighborsWithMine > 0){
        getNumberToCol(amountNeighborsWithMine, colElement);
        table[colId].isOpen = true;
    } else {
        openEmptyCol(colElement, colId, table);
    }
}

function getNumberToCol(amountNeighborsWithMine, colElement){
    let urlImg = "url('./img/" + amountNeighborsWithMine + ".png')"
    colElement.style.backgroundSize = "contain";
    colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    colElement.style.backgroundImage = urlImg;
}

function checkNeighborsWithNeighborsWithMine(table, colId) {
    let neighbors = table[colId].neighbors;
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
    let isOpen = table[colId].isOpen;
    if (amountNeighborsWithMine != 0){
        getNumberToCol(amountNeighborsWithMine, colElement);
        table[colId].isOpen = true;
    } else if (amountNeighborsWithMine == 0 && !isOpen){
        openEmptyCol(colElement, colId, table);
    }
}
function openEmptyCol(colElement, colId, table){
    colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    table[colId].isOpen = true;
    checkNeighborsWithNeighborsWithMine(table, colId);
}


var table = buildGameTable(10, 10, 16);

function restartGame() {
    removeGameTable();
    table = buildGameTable(10, 10, 16);
     
}

function removeGameTable() {
    let gameTable = document.getElementById('gameTable');
    gameTable.innerHTML = "";
    gameTable.style.webkitFilter = "blur(.0em)";

}

function gameOver() {
    let gameTable = document.getElementById('gameTable');
    gameTable.style.webkitFilter = "blur(.05em)";
    for (x in table){
        let colId = x;
        let haveMine = table[x].haveMine;
        let isOpen = table[x].isOpen;
        let colElement = document.getElementById(colId);
        colElement.removeEventListener("click", clickOnCol);
        if (haveMine && !isOpen){
            colElement.style.backgroundImage = "url('./img/bomb.svg')";
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        } else if (!isOpen){
            colElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
    }
}