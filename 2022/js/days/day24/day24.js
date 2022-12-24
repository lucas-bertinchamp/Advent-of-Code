import * as fs from 'fs';

const array = fs.readFileSync('days/day24/input.txt', 'utf-8').split('\n');

const code = (line, column) => {
    return `${line}.${column}`;
};

const parsing = (array) => {
    let grid = new Map();
    array.map((line, iLine) => {
        let columns = line.split('');
        columns.map((column, iColumn) => {
            if (column === '<' || column === '>' || column === '^' || column === 'v') {
                grid.set(code(iLine, iColumn), [column]);
            }
        });
    });
    return grid;
};

const updateGrid = (previousGrid) => {
    let newGrid = new Map();
    let blizzardPosition = [...previousGrid.keys()];
    blizzardPosition.map((position) => {
        let [line, column] = position.split('.').map(Number);
        let listBlizzard = previousGrid.get(position);
        listBlizzard.map((blizzard) => {
            let newLine, newColumn;
            switch (blizzard) {
                case '>':
                    newLine = line;
                    newColumn = column + 1;
                    break;
                case '<':
                    newLine = line;
                    newColumn = column - 1;
                    break;
                case 'v':
                    newLine = line + 1;
                    newColumn = column;
                    break;
                case '^':
                    newLine = line - 1;
                    newColumn = column;
                    break;
            }
            if (newLine == 0) {
                newLine = array.length - 2;
            } else if (newLine == array.length - 1) {
                newLine = 1;
            }

            if (newColumn == 0) {
                newColumn = array[0].length - 2;
            } else if (newColumn == array[0].length - 1) {
                newColumn = 1;
            }

            if (newGrid.get(code(newLine, newColumn)) === undefined) {
                newGrid.set(code(newLine, newColumn), [blizzard]);
            } else {
                newGrid.set(code(newLine, newColumn), newGrid.get(code(newLine, newColumn)).concat(blizzard));
            }
        });
    });
    return newGrid;
};

const print = (grid) => {
    let maxLine = array.length - 1;
    let maxColumn = array[0].length - 1;
    let blizzardPosition = [...grid.keys()];
    for (let line = 0; line <= maxLine; line++) {
        let lineString = '';
        for (let column = 0; column <= maxColumn; column++) {
            if (blizzardPosition.includes(code(line, column))) {
                if (grid.get(code(line, column)).length < 2) {
                    lineString += grid.get(code(line, column));
                } else {
                    lineString += grid.get(code(line, column)).length;
                }
            } else {
                if (
                    (line == 0 && column != 1) ||
                    (line == maxLine && column != maxColumn - 1) ||
                    column == 0 ||
                    column == maxColumn
                ) {
                    lineString += '#';
                } else {
                    lineString += '.';
                }
            }
        }
        console.log(lineString);
    }
};

let possibleMoves = (currentLine, currentColumn, grid) => {
    let wait = [currentLine, currentColumn];
    let up = [currentLine - 1, currentColumn];
    let right = [currentLine, currentColumn + 1];
    let down = [currentLine + 1, currentColumn];
    let left = [currentLine, currentColumn - 1];
    let possibleMoves = [wait, up, right, down, left];

    let possibleMovesFiltered = possibleMoves.filter((move) => {
        if (grid.get(code(...move)) === undefined) {
            if ((move[0] == 0 && move[1] == 1) || (move[0] == array.length - 1 && move[1] == array[0].length - 2)) {
                return true;
            } else if (move[0] <= 0 || move[0] >= array.length - 1 || move[1] <= 0 || move[1] >= array[0].length - 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    });

    return possibleMovesFiltered.map((move) => {
        return code(...move);
    });
};

let playListGame = (setGames, grid) => {
    let newListGame = new Set();
    Array.from(setGames).map((game) => {
        let [currentLine, currentColumn] = game.split('.').map(Number);
        let moves = possibleMoves(currentLine, currentColumn, grid);
        moves.map((move) => {
            newListGame.add(move);
        });
    });
    return newListGame;
};

let isFinish = (setGames, aim) => {
    let finish = false;
    Array.from(setGames).map((game) => {
        let [currentLine, currentColumn] = game.split('.').map(Number);
        let [aimLine, aimColumn] = aim.split('.').map(Number);
        if (currentLine == aimLine && currentColumn == aimColumn) {
            finish = true;
        }
    });
    return finish;
};

let allMoves = (currentPostition, grid, aim) => {
    let setGames = new Set([currentPostition]);
    let newListGame = playListGame(setGames, grid);
    let count = 0;
    while (!isFinish(newListGame, aim)) {
        count++;
        grid = updateGrid(grid);
        setGames = newListGame;
        newListGame = playListGame(setGames, grid);
    }
    return [grid, count];
};

const part1 = (array) => {
    let grid = parsing(array);
    let [g, count] = allMoves('0.1', grid, `${array.length - 1}.${array[0].length - 2}`);
    return count;
};

const part2 = (array) => {
    let grid = parsing(array);
    let [g2, first] = allMoves('0.1', grid, `${array.length - 1}.${array[0].length - 2}`);
    let [g3, second] = allMoves(`${array.length - 1}.${array[0].length - 2}`, g2, '0.1');
    let [g4, third] = allMoves('0.1', g3, `${array.length - 1}.${array[0].length - 2}`);
    return first + second + third;
};

console.time('Time part 1 ');
let answer1 = part1(array);
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

console.time('Time part 2 ');
let answer2 = part2(array);
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
