import * as fs from 'fs';
const array = fs.readFileSync('days/day12/input.txt', 'utf-8').trim().split('\n');

const nbLine = array.length;
const nbColumn = array[0].length;

//Returns the neighbours of a cell according to the first part criteria
let giveNeighbours = (line, column) => {
    let listNeighbours = [];
    if (line + 1 < nbLine) {
        if (array[line + 1][column].charCodeAt(0) <= array[line][column].charCodeAt(0) + 1) {
            listNeighbours.push([line + 1, column]);
        }
    }
    if (line - 1 >= 0) {
        if (array[line - 1][column].charCodeAt(0) <= array[line][column].charCodeAt(0) + 1) {
            listNeighbours.push([line - 1, column]);
        }
    }
    if (column + 1 < nbColumn) {
        if (array[line][column + 1].charCodeAt(0) <= array[line][column].charCodeAt(0) + 1) {
            listNeighbours.push([line, column + 1]);
        }
    }
    if (column - 1 >= 0) {
        if (array[line][column - 1].charCodeAt(0) <= array[line][column].charCodeAt(0) + 1) {
            listNeighbours.push([line, column - 1]);
        }
    }
    return listNeighbours;
};

//Returns the shortest path between the start and the end cells
let givePath = (start, end) => {
    const frontier = [start];
    const comeFrom = new Map();

    while (frontier.length != 0) {
        let next = frontier.shift();

        if (next === end) {
            break;
        } else {
            let neighbours = giveNeighbours(...next);

            neighbours.map((n) => {
                if (![...comeFrom.keys()].includes(code(n))) {
                    comeFrom.set(code(n), code(next));
                    frontier.push(n);
                }
            });
        }
    }

    return comeFrom;
};

//Returns a coded string from the coordinates of a cell
let code = (coords) => {
    return `${coords[0]},${coords[1]}`;
};

//Returns the length of a path which link start and end
let lenPath = (start, end, path) => {
    let lenght = 0;
    let search = code(end);
    while (search != code(start)) {
        lenght++;
        search = path.get(search);
    }
    return lenght;
};

//Part 1

console.time('Time part 1 ');

let start1 = [];
let end1 = [];

//Find starting height
array.map((line, iLine) => {
    line.split('').map((letter, iColumn) => {
        if (letter == 'S') {
            start1 = [iLine, iColumn];
        } else if (letter == 'E') {
            end1 = [iLine, iColumn];
        }
    });
});

array[start1[0]] = array[start1[0]].replace('S', 'a');
array[end1[0]] = array[end1[0]].replace('E', 'z');

let path = givePath(start1, end1);
let answer1 = lenPath(start1, end1, path);

console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

//Part 2

console.time('Time part 2 ');

let start2 = end1;
let end2 = 'a';

//Returns the neighbours of a cell according to the second part criteria
let giveNeighbours2 = (line, column) => {
    let listNeighbours = [];
    if (line + 1 < nbLine) {
        if (array[line][column].charCodeAt(0) <= array[line + 1][column].charCodeAt(0) + 1) {
            listNeighbours.push([line + 1, column]);
        }
    }
    if (line - 1 >= 0) {
        if (array[line][column].charCodeAt(0) <= array[line - 1][column].charCodeAt(0) + 1) {
            listNeighbours.push([line - 1, column]);
        }
    }
    if (column + 1 < nbColumn) {
        if (array[line][column].charCodeAt(0) <= array[line][column + 1].charCodeAt(0) + 1) {
            listNeighbours.push([line, column + 1]);
        }
    }
    if (column - 1 >= 0) {
        if (array[line][column].charCodeAt(0) <= array[line][column - 1].charCodeAt(0) + 1) {
            listNeighbours.push([line, column - 1]);
        }
    }
    return listNeighbours;
};

//Returns the shortest path between the start cell and the first cell which height is equal to the letter in "end", and this cell.
let givePath2 = (start, end) => {
    const frontier = [start];
    const comeFrom = new Map();
    let firstEnd = 0;

    while (frontier.length != 0) {
        let next = frontier.shift();
        if (array[next[0]][next[1]] == end) {
            firstEnd = next;
            break;
        } else {
            let neighbours = giveNeighbours2(...next);
            neighbours.map((n) => {
                if (![...comeFrom.keys()].includes(code(n))) {
                    comeFrom.set(code(n), code(next));
                    frontier.push(n);
                }
            });
        }
    }

    return [firstEnd, comeFrom];
};

let endCell = [];
[endCell, path] = givePath2(start2, end2);

let lenghtPath = lenPath(start2, endCell, path);

console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + lenghtPath);
