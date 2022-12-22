import * as fs from 'fs';

const array = fs.readFileSync('days/day22/input.txt', 'utf-8').split('\n');

let n = parseInt(array.length / 4);

const code = (x, y) => {
    return `${x}.${y}`;
};

const parsing = () => {
    array.map((line, indexLine) => {
        if (indexLine == array.length - 1) {
            let elements = line.split('R');
            elements.map((v, i) => {
                if (v.includes('L')) {
                    let elementSplit = v.split('L');
                    elementSplit.map((v2, i2) => {
                        move.push(parseInt(v2));
                        if (i2 != elementSplit.length - 1) move.push('L');
                    });
                } else {
                    move.push(parseInt(v));
                }
                if (i != elements.length - 1) move.push('R');
            });
        } else {
            line.split('').map((letter, indexColumn) => {
                if (letter == '#' || letter == '.') grid.set(`${indexLine}.${indexColumn}`, letter);
            });
        }
    });
};

const movePlayer = (distance, part2) => {
    let line = parseInt(currentPos.split('.')[0]);
    let column = parseInt(currentPos.split('.')[1]);
    for (let step = 0; step < distance; step++) {
        let line2, column2;
        switch (facing) {
            case 'r':
                column2 = column + 1;
                line2 = line;
                break;
            case 'l':
                column2 = column - 1;
                line2 = line;
                break;
            case 'u':
                line2 = line - 1;
                column2 = column;
                break;
            case 'd':
                line2 = line + 1;
                column2 = column;
                break;
        }
        if (grid.get(code(line2, column2)) === '.') {
            line = line2;
            column = column2;
        } else if (grid.get(code(line2, column2)) === undefined) {
            if (!part2) {
                [line2, column2] = wrap(line, column).split('.').map(Number);
                if (grid.get(code(line2, column2)) === '.') {
                    line = line2;
                    column = column2;
                }
            } else {
                let pos, f;
                [pos, f] = wrap2(line, column);
                [line2, column2] = pos.split('.').map(Number);
                if (grid.get(code(line2, column2)) === '.') {
                    line = line2;
                    column = column2;
                    facing = f;
                }
            }
        }
    }
    return code(line, column);
};

const wrap = (initialLine, initialColumn) => {
    switch (facing) {
        case 'r':
            return [...grid.keys()].filter((v, i) => parseInt(v.split('.')[0]) == initialLine)[0];
        case 'l':
            let line = [...grid.keys()].filter((v, i) => parseInt(v.split('.')[0]) == initialLine);
            return line[line.length - 1];
        case 'd':
            return [...grid.keys()].filter((v, i) => parseInt(v.split('.')[1]) == initialColumn)[0];
        case 'u':
            let column = [...grid.keys()].filter((v, i) => parseInt(v.split('.')[1]) == initialColumn);
            return column[column.length - 1];
    }
};

const wrap2 = (initialLine, initialColumn) => {
    switch (facing) {
        case 'r':
            if (0 <= initialLine && initialLine < n) {
                return [`${3 * n - 1 - initialLine}.${2 * n - 1}`, 'l'];
            } else if (n <= initialLine && initialLine < 2 * n) {
                return [`${n - 1}.${2 * n + initialLine - n}`, 'u'];
            } else if (2 * n <= initialLine && initialLine < 3 * n) {
                return [`${n - 1 - initialLine + 2 * n}.${3 * n - 1}`, 'l'];
            } else if (3 * n <= initialLine && initialLine < 4 * n) {
                return [`${3 * n - 1}.${initialLine - 3 * n + n}`, 'u'];
            }
        case 'l':
            if (0 <= initialLine && initialLine < n) {
                return [`${3 * n - 1 - initialLine}.${0}`, 'r'];
            } else if (n <= initialLine && initialLine < 2 * n) {
                return [`${2 * n}.${initialLine - n}`, 'd'];
            } else if (2 * n <= initialLine && initialLine < 3 * n) {
                return [`${n - 1 - initialLine + 2 * n}.${n}`, 'r'];
            } else if (3 * n <= initialLine && initialLine < 4 * n) {
                return [`${0}.${initialLine - 3 * n + n}`, 'd'];
            }
        case 'd':
            if (0 <= initialColumn && initialColumn < n) {
                return [`${0}.${initialColumn + 2 * n}`, 'd'];
            } else if (n <= initialColumn && initialColumn < 2 * n) {
                return [`${3 * n + initialColumn - n}.${n - 1}`, 'l'];
            } else if (2 * n <= initialColumn && initialColumn < 3 * n) {
                return [`${n + initialColumn - 2 * n}.${2 * n - 1}`, 'l'];
            }
        case 'u':
            if (0 <= initialColumn && initialColumn < n) {
                return [`${n + initialColumn}.${n}`, 'r'];
            } else if (n <= initialColumn && initialColumn < 2 * n) {
                return [`${3 * n + initialColumn - n}.${0}`, 'r'];
            } else if (2 * n <= initialColumn && initialColumn < 3 * n) {
                return [`${4 * n - 1}.${initialColumn - 2 * n}`, 'u'];
            }
    }
};

const facingPossibilities = ['r', 'd', 'l', 'u'];

const rotate = (facing, letter) => {
    switch (letter) {
        case 'R':
            return facingPossibilities[(facingPossibilities.indexOf(facing) + 1) % 4];
        case 'L':
            return facingPossibilities.indexOf(facing) - 1 < 0
                ? facingPossibilities[3]
                : facingPossibilities[facingPossibilities.indexOf(facing) - 1];
    }
};

const part1 = () => {
    move.map((v, i) => {
        if (i % 2 == 0) {
            currentPos = movePlayer(v, false);
        } else {
            facing = rotate(facing, v);
        }
    });
    let line, column;
    [line, column] = currentPos.split('.').map(Number);
    return 1000 * (line + 1) + 4 * (column + 1) + facingPossibilities.indexOf(facing);
};

const part2 = () => {
    move.map((v, i) => {
        if (i % 2 == 0) {
            currentPos = movePlayer(v, true);
        } else {
            facing = rotate(facing, v);
        }
    });
    let line, column;
    [line, column] = currentPos.split('.').map(Number);
    return 1000 * (line + 1) + 4 * (column + 1) + facingPossibilities.indexOf(facing);
};

const grid = new Map();
const move = [];

parsing();

let currentPos = [...grid.keys()][0];
let facing = 'r';

// Part 1

console.time('Time part 1 ');
let answer1 = part1();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

currentPos = [...grid.keys()][0];
facing = 'r';

// Part 2

console.time('Time part 2 ');
let answer2 = part2();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
