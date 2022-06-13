var tiles = document.querySelectorAll(".tile");
var turn = "";
var shown = document.querySelector("#shown");
var clearBoard = document.querySelector("#clearBoard");
var winner = false;
var toles = '';

function start () {
    turn = "X";
    shown.innerHTML = ("Turn: X");
    shown.style.color = "red";
    console.log("tiles: ", tiles);
    clearBoard.style.display = "none";
    clearBoard.classList.remove('won');
    winner = false;
    toles = '';
    /*var x = 0;
    var y = 0;*/
}

// for tile in tiles
//function is argument for forEach function
tiles.forEach(function (tile) {
    /*tile.position = [x % 3, Math.ceil(y + 1/3)];
    x = x + 1;
    y = y + 1/3;*/
    console.log("one tile at a time:", tile/*, "::: Position: ", tile.position*/);

    tile.onclick = function () {
        //if the tile doesn't have any symbol
        if (tile.innerHTML == "" && winner == false) {
            if (turn == "O") {
                tile.innerHTML = ("O");
                tile.classList.add('o');
                tile.style.color = "blue";
            } else {
                tile.innerHTML = ("X");
                tile.classList.add('x');
                tile.style.color = "red";
            }

            checkWinner(turn.toLowerCase());

            if (winner == false) {
                if (turn == "O") {
                    turn = "X";
                    shown.innerHTML = ("Turn: X");
                    shown.style.color = "red";
                } else {
                    turn = "O";
                    shown.innerHTML = ("Turn: O");
                    shown.style.color = "blue";
                }
            }
            
            //show up the clear board button only after a symbol has been placed
            clearBoard.style.display = "flex";
        
            console.log("Turn: ", shown, "::: Symbol:", turn);
        }


    }


});

//determines if there is a winner based on the position of all the symbols
/*function checkWinner(tiles) {
    
}*/

function checkWinner(player) {
    var sets = ['row1', 'row2', 'row3', 'col1', 'col2', 'col3', 'diag1', 'diag2'];

    sets.forEach(function (set) {
        var selector = "." + set + "." + player;
        console.log('selectors: ', "." + set + "." + player);
        toles = document.querySelectorAll(selector);
        console.log("count", toles.length);

        if (toles.length == 3) {
            winner = true;
            shown.innerHTML = (player.toUpperCase() + " Wins!");
            shown.classList.add('won');
        }
    });
}

//resets board and runs like the game just started
clearBoard.onclick = function () {
    tiles.forEach(function (tile) {
        tile.innerHTML = ("");
        if (tile.classList == 'x') {
            tile.classList.remove('x');
        } else {
            tile.classList.remove('o');
        }
    });

    start();
}

//sets all values for start of the game
start();