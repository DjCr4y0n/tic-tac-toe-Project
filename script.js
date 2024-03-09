function Gameboard()
{
    const rows = 3;
    const columns = 3;

    const getRows = () => rows;

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

    

    return {getBoard, selectSpot, printBoard, getRows}
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

        checkState();
        switchPlayerTurn();
        printNewRound();
    }

    const checkState = () => {
        function checkValue(value)
        {
            return value == getActivePlayer().marker;
        }
        
        if (gameboard.getBoard()[0].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[1].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[2].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0].every(checkValue)) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][0] && gameboard.getBoard()[1][0] === gameboard.getBoard()[2][0]) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0][1] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][1]) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][2] && gameboard.getBoard()[1][2] === gameboard.getBoard()[2][2]) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0][0] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][2]) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if (gameboard.getBoard()[0][2] === gameboard.getBoard()[1][1] && gameboard.getBoard()[1][1] === gameboard.getBoard()[2][0]) {
            console.log(`Game Winner is ${getActivePlayer().nick}`);
            return;
        }
        else if(counter >= 9)
        { 
            console.log("It's a tie!");
            return;
        }
    }

    return {playRound};
};

const game = GameController();


