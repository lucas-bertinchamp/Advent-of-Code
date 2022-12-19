import * as fs from 'fs';

const array = fs.readFileSync('days/day14/input.txt', 'utf-8').split('\n');

const walls = array.map((line) => {
    return line.split('->').map((coords) => coords.split(',').map(Number));
});

//Codes coordinates to a string key
const code = (x, y) => `${x}.${y}`;

//Adds a wall between two couples of coordinates in a grid
const addWall = (grid, coord1, coord2) => {
    for (
        let column = Math.min(coord1[0], coord2[0]);
        column <= Math.min(coord1[0], coord2[0]) + Math.abs(coord1[0] - coord2[0]);
        column++
    ) {
        for (
            let line = Math.min(coord1[1], coord2[1]);
            line <= Math.min(coord1[1], coord2[1]) + Math.abs(coord1[1] - coord2[1]);
            line++
        ) {
            grid.set(code(line, column), '#');
        }
    }
    return grid;
};

//Creates a grid with walls placed according to the input
const generateGrid = () => {
    let grid = new Map();
    let minimum = walls[0][0][1];
    walls.map((wall) => {
        for (let n = 0; n < wall.length - 1; n++) {
            grid = addWall(grid, wall[n], wall[n + 1]);
            if (wall[n + 1][1] > minimum) {
                minimum = wall[n + 1][1];
            }
        }
    });
    return [grid, minimum];
};

//Moves a sand from coords1 to coords2
const moveSand = (grid, coords1, coords2) => {
    grid.delete(code(...coords1));
    grid.set(code(...coords2), 'o');
    return grid;
};

//Spawns a sand and makes it fall
const fallSand = (grid, limit, isPart2) => {
    let previousCoords = [0, 500];
    grid = moveSand(grid, [0, 0], [0, 500]);
    let newCoords = [];

    while (true) {
        newCoords = [];

        if (previousCoords[0] >= limit - 1) {
            if (!isPart2) {
                grid.delete(code(...previousCoords));
                return [grid, false];
            } else {
                grid = moveSand(grid, [0, 500], previousCoords);
                return [grid, true];
            }
        } else if (typeof grid.get(code(previousCoords[0] + 1, previousCoords[1])) === 'undefined') {
            newCoords = [previousCoords[0] + 1, previousCoords[1]];
        } else if (typeof grid.get(code(previousCoords[0] + 1, previousCoords[1] - 1)) === 'undefined') {
            newCoords = [previousCoords[0] + 1, previousCoords[1] - 1];
        } else if (typeof grid.get(code(previousCoords[0] + 1, previousCoords[1] + 1)) === 'undefined') {
            newCoords = [previousCoords[0] + 1, previousCoords[1] + 1];
        } else {
            grid = moveSand(grid, [0, 500], previousCoords);
            return [grid, true];
        }
        previousCoords = newCoords;
    }
};

//Gives the answer of part 1
const partOne = () => {
    let [grid, minimum] = generateGrid();
    let sendNext = true;
    let answer = 0;

    while (sendNext) {
        [grid, sendNext] = fallSand(grid, minimum + 1, false);
        answer++;
    }
    return answer - 1;
};

//Gives the answer of part 2
const partTwo = () => {
    let [grid, minimum] = generateGrid();
    let answer = 0;
    let start = code(0, 500);

    while (true) {
        if (grid.get(start) === 'o') {
            return answer;
        }
        grid = fallSand(grid, minimum + 2, true)[0];
        answer++;
    }
};

// Part 1

console.time('Time part 1 ');
let answer1 = partOne();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

// Part 2

console.time('Time part 2 ');
let answer2 = partTwo();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
