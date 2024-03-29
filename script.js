function Gameboard()
{
    const rows = 3;
    const columns = 3;

    const gameboard = [];

    for(let i = 0; i < rows; i++)
    {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) 
        {
            gameboard[i].push(Spot());
        }
    }

    const getBoard = () => gameboard.map((row) => row.map((cell) => cell.getValue()));

    const selectSpot = (row,column,player) =>
    {
        console.log('Spot value:', gameboard[row][column].getValue());
        if (gameboard[row][column].getValue() !== 0) {
            console.log('This spot is taken');
            return;
        }
        console.log('Success!')
        gameboard[row][column].addMarker(player);
    }

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    const clearBoard = () => {
        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                gameboard[i][j].addMarker(0); // Reset each spot to initial state (0)
            }
        }
    }

    

    return {getBoard, selectSpot, printBoard, clearBoard}
}

function Spot()
{
    let value = 0;

    const addMarker = (player) => {
        value = player;
        console.log(`Marker ${player} added to spot.`);
    };

    const getValue = () => value;

    return {addMarker, getValue};
}



function GameController(playerOne = "Player One", playerTwo = "Player Two")
{
    const gameboard = Gameboard();
    let gameEnded = false;

    const players = [
        {
            nick: playerOne,
            marker: "X",
            score: 0
        },
        {
            nick: playerTwo,
            marker: "O",
            score: 0
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if(activePlayer == players[0]) activePlayer = players[1];
        else activePlayer = players[0];
    };

    const getPlayerOneScore = () => players[0].score;
    const getPlayerTwoScore = () => players[1].score;

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().nick}'s turn.`);
    }

    let counter = 0;

    const playRound = (row,column) => {
        counter += 1;
        console.log(`Putting ${getActivePlayer().nick}'s marker on row ${row} and column ${column}`);
        gameboard.selectSpot(row,column,getActivePlayer().marker);

        gameboard.printBoard();

        checkState();
        if (gameEnded) {
            console.log("Game has already ended.");
            roundEnd();
            return;
        }
        switchPlayerTurn();
        printNewRound();
    }

    const checkState = () => {
        console.log(getActivePlayer().marker);
        function checkValue(value)
        {
            return value == getActivePlayer().marker;
        }
        
        if (gameboard.getBoard()[0].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[1].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[2].every(checkValue)) {
            console.log(`Game Winner1 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][0] && gameboard.getBoard()[1][0] === gameboard.getBoard()[2][0] && gameboard.getBoard()[0][0]!=0) {
            console.log(`Game Winner3 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][1] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][1] && gameboard.getBoard()[0][1]!=0) {
            console.log(`Game Winner4 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][2] && gameboard.getBoard()[1][2] === gameboard.getBoard()[2][2] && gameboard.getBoard()[0][2]!=0) {
            console.log(`Game Winner5 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][2] && gameboard.getBoard()[0][0]!=0) {
            console.log(`Game Winner6 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][0] && gameboard.getBoard()[0][2]!=0) {
            console.log(`Game Winner7 is ${getActivePlayer().nick}`);
            getActivePlayer().score += 1;
            gameEnded = true;
        }
        else if(counter >= 9)
        { 
            console.log("It's a tie!");
            gameEnded = true;
        }
    }

    const roundEnd = () =>
    {
        gameboard.clearBoard();
        counter = 0;
        gameEnded = false;
    }

    const gameRestart = () =>
    {
        gameboard.clearBoard();
        counter = 0;
        players[0].score = 0;
        players[1].score = 0;
        gameEnded = false;
        activePlayer = players[0];
    }

    return {playRound, getActivePlayer, getBoard: gameboard.getBoard, getPlayerOneScore, getPlayerTwoScore, gameRestart};
};


function DOM() {
    const game = GameController();
    const gameBoard = document.querySelector('.board');
    const scoreDivOne = document.querySelector('.player1-score');
    const scoreDivTwo= document.querySelector('.player2-score');
    const currentTurn = document.querySelector('.activePlayer-div');
    const restartButton = document.querySelector('.restart-button')

    const updateScreen = () => {
        gameBoard.textContent = "";

        const gameboard = game.getBoard();
        const activePlayer = game.getActivePlayer();

        currentTurn.textContent = `${activePlayer.nick}'s turn`;

        scoreDivOne.textContent = `${game.getPlayerOneScore()}`;
        scoreDivTwo.textContent = `${game.getPlayerTwoScore()}`;


        gameboard.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const xImage = document.createElement('img');
                xImage.setAttribute("src", "close.svg");
                const oImage = document.createElement('img');
                oImage.setAttribute("src", "ellipse-outline.svg");



                const cellButton = document.createElement("button");
                cellButton.class = "cell";
                cellButton.style.backgroundColor = 'white';
                cellButton.style.border = "10px solid black";

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;

                if (cell !== 0) {
                    if(cell == "X") cellButton.appendChild(xImage);
                    else if(cell == "O") cellButton.appendChild(oImage);
                };

                if(columnIndex == 2) cellButton.style.borderRight = "none";
                if(rowIndex == 2 || rowIndex == 0 || rowIndex == 1) cellButton.style.borderBottom = "none";
                if(rowIndex == 0) cellButton.style.borderTop = "none";
                if(columnIndex == 0 || columnIndex == 1 || columnIndex==2) cellButton.style.borderLeft = "none";
                

                gameBoard.appendChild(cellButton);
            })
        })
    }

    function restartHandler()
    {
        console.log('a');
        game.gameRestart();
        updateScreen();
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow || !selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    restartButton.addEventListener("click", restartHandler);
    gameBoard.addEventListener("click", clickHandlerBoard);

    // Initial render
    updateScreen();
}

DOM();
