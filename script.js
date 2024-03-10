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
            marker: "X"
        },
        {
            nick: playerTwo,
            marker: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if(activePlayer == players[0]) activePlayer = players[1];
        else activePlayer = players[0];
    };

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
            gameEnd();
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
            gameEnded = true;
        }
        else if (gameboard.getBoard()[1].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[2].every(checkValue)) {
            console.log(`Game Winner1 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][0] && gameboard.getBoard()[1][0] === gameboard.getBoard()[2][0] && gameboard.getBoard()[0][0]!=0) {
            console.log(`Game Winner3 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][1] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][1] && gameboard.getBoard()[0][1]!=0) {
            console.log(`Game Winner4 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][2] && gameboard.getBoard()[1][2] === gameboard.getBoard()[2][2] && gameboard.getBoard()[0][2]!=0) {
            console.log(`Game Winner5 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][2] && gameboard.getBoard()[0][0]!=0) {
            console.log(`Game Winner6 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][0] && gameboard.getBoard()[0][2]!=0) {
            console.log(`Game Winner7 is ${getActivePlayer().nick}`);
            gameEnded = true;
        }
        else if(counter >= 9)
        { 
            console.log("It's a tie!");
            gameEnded = true;
        }
    }

    const gameEnd = () =>
    {
        gameboard.clearBoard();
        counter = 0;
    }

    return {playRound};
};

const game = GameController();

function DOM()
{
    
}


