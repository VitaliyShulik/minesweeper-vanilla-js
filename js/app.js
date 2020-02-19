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
             
            const mine = setMine(maxMines, counterMines)
            counterMines = mine.counter

            Object.assign(table, {[colId]: {
                 row: i,
                 col: n,
                 haveMine: mine.isMine,
                 writable: false
             }});
            }
        }
        return table
}

let table = buildGameTable(10, 10, 16);

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


console.log('CURRENT GAME TABLE', table);

function clickOnCol(event){
    let colId = event.target.id;
    let colElement = document.getElementById(colId);
    console.log(table[colId].haveMine);
    if (table[colId].haveMine == true){
        colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        colElement.style.backgroundImage = "url('./img/bomb.svg')";
    } else {
        colElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
}
