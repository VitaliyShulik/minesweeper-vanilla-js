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
                 writable: false
             }});
            }
        }
    addNieghbors(table);

    return table
}

function setMine(maxMines, counterMines) {
    if (counterMines < maxMines && Math.random() > 0.75){
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
    } else if(!haveMine && amountNeighborsWithMine > 0){
        switch(amountNeighborsWithMine){
            case 1:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/1.png')";
                break;
            case 2:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/2.png')";
                break;        
            case 3:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/3.png')";
                break;
            case 4:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/4.png')";
                break; 
            case 5:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/5.png')";
                break;
            case 6:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/6.png')";
                break;        
            case 7:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/7.png')";
                break;
            case 8:
                colElement.style.backgroundSize = "contain";
                colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                colElement.style.backgroundImage = "url('./img/8.png')";
                break;
            default:
                break;   
        }

    } else {
        colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
}

let table = buildGameTable(10, 10, 16);


