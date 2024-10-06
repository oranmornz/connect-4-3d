// Initialise

console.log("Disconnect 4")

// 1 - copy in relative code from TTT as template
// 2 - rename any relevant re-usable variables
// 3 - considerations for grid:
    // - highlight column with mouse/pointer hover
    // - work out how to click on column and have 'token' drop to lowest empty cell
    // - when declaring 3D array, figure out best layout for dimensions (ie - which dimension represents X, Y, and Z)
    // - up/down arrow keys to move back/forward in dept/dimension
    // - left/right arrow keys to move selected column left/right
    // - space or enter for token drop?
// 4 - considerations for win conditions algorithm
    // - algorithm will likely work on the lines of:
        // - start at cell of last played 'token'
        // - check for four in-line tokens of same colour in surrounding grid in all directions, ie:
            // up/down/forward/back/diagonals
        // - Test 2D version of algorithm first before extrapolating

// - - Notes
    // - Use an 8x8 grid for added possibilities. 
    // - Explore the potential use of the Ableton Push 2 control surface as a game interface


// Global Init Variables & Functions

let subtitle
let resetButton = document.getElementById("restart")

let cells = document.getElementsByTagName("td")
let winningCells

let ticker
let bluesTurn
let colour

let win = false
let isStalemate = false

init()

function init() {
    console.log("init triggered")
    // resetButtonVisibility(false)
    resetButtonVisibility(true)
    initGrid()
    bluesTurn = true
    colour = "O"
    ticker = 0
    startTurn()
}

// Interface

resetButton.style.visibility = "hidden"

document.getElementById("restart").addEventListener("click", init)

function resetButtonVisibility(isVisible) {
    resetButton.style.visibility = isVisible ? "visible" : "hidden"
}

function updateSubtitle(subtitle) {
    document.getElementById("subtitle").innerHTML = subtitle
}

function highlightColumn() {}

// Turn Control

function turnTicker() {
    ticker++
    console.log("Turn: ticked")
}

function startTurn() {
    console.log("Turn begins")
    turnTicker()
    console.log("Turn ticks to: ", ticker)
    colour = bluesTurn ? "Blue" : "Red"
    subtitle = bluesTurn
        ? "It's blues turn!" 
        : "It's reds turn!"
    updateSubtitle(subtitle)
    console.log("Active player = ", colour)
}

function takeTurn() {
    console.log(colour, ": has taken turn")
    return colour
}

function endTurn() {
    bluesTurn = !bluesTurn
    console.log(colour, ": turn ends")
    startTurn()
}

// Grid Control

function initGrid() {
    let board = document.querySelectorAll("#playGrid td")
    board.forEach(cell => {
        cell.innerHTML = ""
    })
    enableCellClicks()
    resetButtonVisibility(false)
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "rgb(255, 255, 255)"
    }
    console.log("Grid initialised")
}

function enableCellClicks() {
    Array.from(cells).forEach(cell => {
        cell.onclick = cellClicked
    })
}

function disableCellClicks() {
    Array.from(cells).forEach(cell => {
        cell.onclick = null
    })
}

function dropToken(e) {
    let cell = e.target
    if (cell.innerHTML === "") {
        cell.innerHTML = takeTurn(bluesTurn)
    } 
    checkForWin()
}

// Win Conditions

function checkWinConditions() {}

function winConditions() {}

// Win Functions

function blueWins() {
    subtitle = "Blue wins!"
    updateSubtitle(subtitle)
    gameover()
    console.log("Blue wins!")
}

function redWins() {
    subtitle = "Red wins!"
    updateSubtitle(subtitle)
    gameover()
    console.log("red wins!")
}

function stalemate() {
    subtitle = "Stalemate!"
    updateSubtitle(subtitle)
    gameover()
    console.log("Stalemate!")
}

// End Game

function gameover() {
    // paintCells()
    disableCellClicks()
    resetButtonVisibility(true)
    
    console.log("Game over! ", subtitle)
}