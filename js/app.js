// class GameTable { 
//     constructor(row, col, minesCount){
//         this.row = row;
//         this.col = col;
//         this.minesCount = minesCount
//     }
// }

// const start = function startGame(){

// }

// let gameTableElement = document.getElementById("game-table");


// var content

function buildGameTable(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let divRow = document.createElement("div");
        divRow.setAttribute("class", "row");
        let rowId = "row-" + i;
        divRow.setAttribute("id", rowId);

        let gameTableElement = document.getElementById("gameTable");
        gameTableElement.appendChild(divRow);
        
         for (let n = 0; n < cols; n++) {
             let divCol = document.createElement("div");
             divCol.setAttribute("class", "col");
             let colId = "col-" + i + "-" + n;
             divCol.setAttribute("id", colId);

             divRow.appendChild(divCol);
        }
    }
}

buildGameTable(10, 10);