
function randomChoice(choices){
    return choices[Math.floor(Math.random() * choices.length)];
}

function range(n){
    return Array.from(Array(n).keys());
}

function makePuzzle(){
    while(true){
        try{
            const puzzle  = Array.from(Array(9).keys()).map(() => Array.from(Array(9).keys()));
            const rows = Array.from(Array(9).keys()).map(() => new Set([1,2,3,4,5,6,7,8,9]));
            const columns = Array.from(Array(9).keys()).map(() => new Set([1,2,3,4,5,6,7,8,9]));
            const squares = Array.from(Array(9).keys()).map(() => new Set([1,2,3,4,5,6,7,8,9]));
            Array.from(Array(9).keys()).forEach((i) => {
                Array.from(Array(9).keys()).forEach((j) => {
                    const row = rows[i];
                    const col = columns[j];
                    const square = squares[((Math.floor(i/3))*3) + Math.floor(j/3)];
                    const choices = [...row].filter(x => col.has(x)).filter(x => square.has(x));
                    const choice = randomChoice(choices);
                    if(!choice){
                        throw 'dead end';
                    }
                    puzzle[i][j] = choice;
                    row.delete(choice);
                    col.delete(choice);
                    square.delete(choice);
                });
            });
            return puzzle;
        }
        catch(e){
            continue;
        }
    }
}

export function printPuzzle(){
    var puzzle = makePuzzle();
    var board = pluck(puzzle, 80);
    var string = "";
    var sol = "";
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if(board[i][j] !== -1){
                string += board[i][j];
            }
            else{
                string += " ";
            }
            if(puzzle[i][j] !== -1){
                sol += puzzle[i][j];
            }
            else{
                sol += " ";
            }
        }
    }
    return {puzzle, board, string, sol};
}


//printPuzzle();

function canBeA(puzzle, i, j, c){
    const x = Math.floor(c/9);
    const y = c%9;
    const value = puzzle[x][y];
    if(puzzle[i][j] === value) return true;
    if(puzzle[i][j] > 0) return false;
    for(const m in Array.from(Array(9).keys())){
        const rowPeer = {x:m,y:j};
        const colPeer = {x:i,y:m};
        const sPeer = {
            x: (Math.floor(i/3)*3) + Math.floor(m/3),
            y: (Math.floor(j/3)*3) + (m%3),
        };
        if(!(rowPeer.x === x && rowPeer.y ===y)&& puzzle[rowPeer.x, rowPeer.y] === value) return false;
        if(!(colPeer.x === x && colPeer.y ===y)&& puzzle[colPeer.x, colPeer.y] === value) return false;
        if(!(sPeer.x === x && sPeer.y ===y)&& puzzle[sPeer.x, sPeer.y] === value) return false;

    }
    return true;
}

function isPeer(a,b){
    if(!a || !b) return false;
    const squareA = ((Math.floor(a.x/3))*3) + Math.floor(a.y/3);
    const squareB = ((Math.floor(b.x/3))*3) + Math.floor(b.y/3);
    return a.x === b.x || a.y === b.y || squareA === squareB;
}

function pluck(allCells, n = 0){
    const puzzle = JSON.parse(JSON.stringify(allCells));

    const cells = new Set(Array.from(Array(81).keys()));
    const cellsLeft = new Set(cells);
    while(cellsLeft.size && cells.size > n){
        const cell = randomChoice([...cells]);
        const x = Math.floor(cell/9);
        const y = cell%9;
        cellsLeft.delete(cell);
        let row = false;
        let column = false;
        let square = false;
        range(9).forEach((i) => {
            const rowPeer = {x:i, y};
            const columnPeer= {x, y:i};
            const squarePeer ={
                x: (Math.floor(Math.floor(cell/9)/3)*3) + Math.floor(i/3),
                y: ((Math.floor(cell/9)%3)*3) + (i%3),
            };
            if(rowPeer.x !== x){
                row = canBeA(puzzle,rowPeer.x, rowPeer.y,cell);
            }
            if(columnPeer.y !== y){
                column = canBeA(puzzle, columnPeer.x, columnPeer.y, cell);
            }
            if(squarePeer.x !== x && squarePeer.y !==y ){
                square = canBeA(puzzle, squarePeer.x, squarePeer.y,cell);
            }
        });
        if(row && column && square){
            continue;
        }
        else{
            puzzle[x][y] = -1;
            cells.delete(cell);
        }
    }
    return puzzle;
}

export function getCreationDate(){
    const date = new Date();
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

async function addPuzzle(){
    const {puzzle, board, string, sol} = printPuzzle();
    fetch("/api/SudokleQueries/addSudoku", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            puzzle: puzzle,
            solution: sol,
            creationDate: getCreationDate()
        })
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}
