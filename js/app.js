// class GameTable { 
//     constructor(row, col, minesCount){
//         this.row = row;
//         this.col = col;
//         this.minesCount = minesCount
//     }
// }

// const start = function startGame(){

// }

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
             
            const mine = setMine(maxMines, counterMines);
            counterMines = mine.counter;

            Object.assign(table, {[colId]: {
                 row: i,
                 col: n,
                 neighbors: setNeighbors(rows, cols, i, n),
                 haveMine: mine.isMine,
                 writable: false
             }});
            }
        }
        return table
}

let table = buildGameTable(10, 10, 10);

function setMine(maxMines, counterMines) {
    console.log(counterMines);
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
    const lastNeighbrY = rows - 1;
    const lastNeighbrX = cols - 1;
    if (i > 0 && n > 0 && i < lastNeighbrY && n < lastNeighbrX){
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
    } else if (i == 0 && n == 0 && i < lastNeighbrY && n < lastNeighbrX) {
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
    } else if (i == 0 && n > 0 && i < lastNeighbrY && n < lastNeighbrX) {
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
    } else if (i == 0 && n > 0 && i < lastNeighbrY && n == lastNeighbrX){
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
    } else if (i > 0 && n == 0 && i < lastNeighbrY && n < lastNeighbrX) {
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
    } else if (i > 0 && n == 0 && i == lastNeighbrY && n < lastNeighbrX) {
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
    } else if (i > 0 && n > 0 && i < lastNeighbrY && n == lastNeighbrX) {
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
    } else if (i > 0 && n > 0 && i == lastNeighbrY && n < lastNeighbrX) {
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
    } else if (i > 0 && n > 0 && i == lastNeighbrY && n == lastNeighbrX) {
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

console.log('CURRENT GAME TABLE', table);

function clickOnCol(event){
    let colId = event.target.id;
    let colElement = document.getElementById(colId);
    console.log(table[colId].haveMine);
    if (table[colId].haveMine == true){
        colElement.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        colElement.style.backgroundImage = "url('./img/bomb.svg')";
    } else {
        colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
}
