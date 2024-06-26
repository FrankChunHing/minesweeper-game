
// Set this constant to true to debug the placement of bombs without
// having to click on all cells to reveal them.
const CHEAT_REVEAL_ALL = false;

const ROWS_COUNT = 10;
const COLS_COUNT = 10;
const BOMBS_COUNT = 13;
let CLEARED_COUNT = 0;
let FLAGGED_COUNT = 0;

var defeat = false;
var victory = false;

// Cell constructor
function Cell() {
  this.discovered = false;
  this.isBomb = false;
  this.hasBeenFlagged = false;
}

// Initialize cells
var cells = Array(ROWS_COUNT);
for (var row = 0; row < ROWS_COUNT; row++) {
  cells[row] = Array(COLS_COUNT);
  for (var col = 0; col < COLS_COUNT; col++) {
    cells[row][col] = new Cell();
  }
}

//
// TODO: Task 1 - add some bombs at fixed positions.
// cells[0][1].isBomb = true;
// cells[5][4].isBomb = true;
// cells[9][9].isBomb = true;
function genRandom(num) {
  return Math.floor(Math.random() * (num));
}

// Function to set bombs on the game grid
function setBomb(num) {
  for (let i = 0; i < num; i++) {
    
    let randomRow = genRandom(ROWS_COUNT);
    let randomCol = genRandom(COLS_COUNT);
    cells[randomRow][randomCol].isBomb = true; 
    console.log(cells[randomRow][randomCol].isBomb)
  }
}

setBomb(BOMBS_COUNT)
//
// TODO: Task 2 - Comment out the code of task 1. Instead of adding bombs in fixed places, add 10 of them in random places.
//                Add a BOMBS_COUNT constant so that you can easily change the amount of bombs placed. Put it next to the
//                other constants.
//


// Once the game has been initialized, we "render" it.
render();


//
// Game functions definitions
//

function discoverCell(row, col) {
  //
  // TODO: Task 5 - Reveal cells when clicked.
  // //
  // document.getElementById("playfield").addEventListener('click', function(event) {
  //   if (event.button === 0) {
  //     var clickedCell = event.target; // Get the element that was clicked
      
      // Add the "discovered" class to the clicked cell
      // clickedCell.classList.add('discovered');
      // console.log('Clicked cell:', row, col);
    // // }})

    if (row < 0 || row >= ROWS_COUNT || col < 0 || col >= COLS_COUNT) {
      return;
    }
    if (cells[row][col].discovered ) {
      return;
    } else if (cells[row][col].isBomb) {
      defeat = true;
      return
    }
    cells[row][col].discovered = true;
    CLEARED_COUNT += 1;
  //
  // TODO: Task 6 - Discover neighbor cells recursively, as long as there are no adjacent bombs to the current cell.
  //

    if (countAdjacentBombs(row, col) === 0) {
      discoverCell(row + 1, col); // down
      discoverCell(row - 1, col); // up
      discoverCell(row, col + 1); // right
      discoverCell(row, col - 1); // left
    }


  // function checkNoBomb(row, col){
    // if (row + 1 <= ROWS_COUNT) { 
    //   if (countAdjacentBombs[row + 1][col] === 0 && cells[row + 1][col].discovered === false){
    //     discoverCell(row + 1, col)
    // }  }
    // if (row - 1 >= 0) { 
    //   if (countAdjacentBombs[row - 1][col] === 0 && cells[row - 1][col].discovered === false){
    //     discoverCell(row - 1, col)
    //   }  }
    // if (col + 1 <= ROWS_COUNT) { 
    //   if (countAdjacentBombs[row][col + 1] === 0 && cells[row][col + 1].discovered === false){
    //     discoverCell(row, col + 1)
    // }  }
    // if (col - 1 >= 0) { 
    //   if (countAdjacentBombs[row][col - 1] === 0 && cells[row][col - 1].discovered === false){
    //     discoverCell(row, col - 1)
    //   }  }
  // }
  //
  // TODO: Task 8 - Implement defeat. If the player "discovers" a bomb (clicks on it without holding shift), set the variable defeat to true.
  //

}

function flagCell(row, col) {
  //
  // TODO: Task 7 - Implement flags. Flags allow the player to mark cells that they think contain a bomb.
  //                When clicking a cell and holding shift, function flagCell() will be called for you.
  //

  // if (FLAGGED_COUNT <= BOMBS_COUNT ){
  // cells[row][col].hasBeenFlagged = true;
  // FLAGGED_COUNT += 1;} 
  // if (cells[row][col].hasBeenFlagged === true){
  //   cells[row][col].hasBeenFlagged = false;
  //   FLAGGED_COUNT -= 1
  // }


  if (cells[row][col].hasBeenFlagged) {
    // If already flagged, unflag the cell
    cells[row][col].hasBeenFlagged = false;
    FLAGGED_COUNT -= 1;
  } else {
    // Flag the cell if it's not already flagged
    if (FLAGGED_COUNT <= BOMBS_COUNT ){
    cells[row][col].hasBeenFlagged = true;
    FLAGGED_COUNT += 1;
  }}
}

// This function is called once for each cell when rendering the game. The row and col of the current cell is
// passed to the functionn
function countAdjacentBombs(row, col) {
  //
  // TODO: Task 4 - Adjacent bombs are bombs in cells touching our cell (also diagonally). Implement this function
  //                so that it returns the count of adjacent cells with bombs in them. 
  //
  let result = 0;

  for (let i= -1; i< 2; i++){
    for (let j = -1; j< 2; j++){
      if (i === 0 && j === 0) continue;
      if (row + i < 0 || row + i >= ROWS_COUNT || col + j < 0 || col + j >= COLS_COUNT) continue;
      
      if ( cells[row + i][col + j].isBomb) {
        result += 1;
        
      }
    }
  }
  // console.log(result)
  return result;
}

function getBombsCount() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return BOMBS_COUNT;
}

function getClearedCells() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return CLEARED_COUNT;
}

function getTotalCellsToClear() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return (ROWS_COUNT * COLS_COUNT - CLEARED_COUNT - FLAGGED_COUNT);
}

function checkForVictory() {
  //
  // TODO: Task 10 - Implement victory. If the player has revealed as many cells as they must (every cell that isn't a
  //                 bomb), set variable victory to true.
  //
  if (getTotalCellsToClear() === 0){
    victory = true;
  }
  return ;
}

//
// Rendering functions
//
function getMessage() {
  if (victory == true) {
    return "Well done! 👏🏼<br><br>Refresh the page to start again.";
  } else if (defeat) {
    return "Boom! 💥<br><br>Refresh the page to try again.";
  }
  return "";
}

// "Render" the game. Update the content of the page to reflect any changes to the game state.
function render() {
  console.log("render")
  var playfield = document.getElementById("playfield");
  var html = "";
  for (var row = 0; row < ROWS_COUNT; row++) {
    html += '<div class="row">';
    for (var col = 0; col < COLS_COUNT; col++) {
      var cell = cells[row][col];
      var cellText = "";
      var cssClass = "";
      var textColor = "";
      if (cell.discovered || CHEAT_REVEAL_ALL || defeat) {
        cssClass = "discovered";
        if (cell.isBomb) {
          cellText = "💣";
        } else {
          var adjBombs = countAdjacentBombs(row, col);
          if (adjBombs > 0) {
            cellText = adjBombs.toString();
            if (adjBombs == 1) {
              textColor = "blue";
            } else if (adjBombs == 2) {
              textColor = "green";
            } else if (adjBombs == 3) {
              textColor = "red";
            } else if (adjBombs == 4) {
              textColor = "black";
            }
          }
        }
      } else {
        if (cell.hasBeenFlagged) {
          cellText = "🚩"
        }
      }
      html += `<div class="cell ${cssClass}" style="color:${textColor}" onclick="onCellClicked(${row}, ${col}, event)">${cellText}</div>`;
    }
    html += "</div>"
  }
  playfield.innerHTML = html;

  // Defeat screen
  var body = document.getElementsByTagName("body")[0];
  if (defeat) {
    body.classList.add("defeat")
  }

  // Victory screen
  if (victory) {
    body.classList.add("victory")
  }

  // Update stats
  document.getElementById("bombs-count").innerText = getBombsCount().toString();
  document.getElementById("cleared-cells-count").innerText = getClearedCells().toString();
  document.getElementById("total-cells-to-clear").innerText = getTotalCellsToClear().toString();

  // Update message
  document.getElementById("message").innerHTML = getMessage();
}

// This function gets called each time a cell is clicked. Arguments "row" and "col" will be set to the relevant
// values. Argument "event" is used to check if the shift key was held during the click.
function onCellClicked(row, col, event) {
  if (event.shiftKey) {
    flagCell(row, col);
  } else {
    discoverCell(row, col);
  }
  checkForVictory();
  render();
}
