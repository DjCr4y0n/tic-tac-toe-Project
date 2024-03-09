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

    const getBoard = () => gameboard;

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

    return {getBoard, selectSpot, printBoard}
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

    const playRound = (row,column) => {
        console.log(`Putting ${getActivePlayer().nick}'s marker on row ${row} and column ${column}`);
        gameboard.selectSpot(row,column,getActivePlayer().marker);

        switchPlayerTurn();
        printNewRound();
    }

    return {playRound};
};

const game = GameController();


