import * as fs from 'fs';

const move = fs.readFileSync('days/day17/input.txt', 'utf-8').trim();

//Functions to create the pieces
const createHLine = (height) => {
    const positions = new Set();
    for (let i = 2; i < 6; i++) {
        positions.add([i, height]);
    }
    return positions;
};

const createVLine = (height) => {
    const positions = new Set();
    for (let i = height; i < height + 4; i++) {
        positions.add([2, i]);
    }
    return positions;
};

const createCross = (height) => {
    const positions = new Set();
    for (let i = 2; i < 5; i++) {
        positions.add([i, height + 1]);
    }
    positions.add([3, height]);
    positions.add([3, height + 2]);
    return positions;
};

const createSquare = (height) => {
    const positions = new Set();
    positions.add([2, height]);
    positions.add([2, height + 1]);
    positions.add([3, height]);
    positions.add([3, height + 1]);
    return positions;
};

const createL = (height) => {
    const positions = new Set();
    positions.add([2, height]);
    positions.add([3, height]);
    positions.add([4, height]);
    positions.add([4, height + 1]);
    positions.add([4, height + 2]);
    return positions;
};

//Functions to move the pieces
const moveLeft = (piece) => {
    const newPositions = new Set();
    for (const [x, y] of piece) {
        newPositions.add([x - 1, y]);
    }
    return newPositions;
};

const moveRight = (piece) => {
    const newPositions = new Set();
    for (const [x, y] of piece) {
        newPositions.add([x + 1, y]);
    }
    return newPositions;
};

const moveDown = (piece) => {
    const newPositions = new Set();
    for (const [x, y] of piece) {
        newPositions.add([x, y - 1]);
    }
    return newPositions;
};

//Function which tells if a piece can be inserted
const isPossible = (piece) => {
    let boolean = true;
    [...piece].map((position) => {
        if (grid.has(JSON.stringify(position))) {
            boolean = false;
        } else if (position[0] < 0 || position[0] >= 7 || position[1] < 0) {
            boolean = false;
        }
    });
    return boolean;
};

//Function which gives the height of the grid after inserting a piece
const newHeight = (piece) => {
    let newHeight = 0;
    for (const [x, y] of piece) {
        if (y > newHeight) {
            newHeight = y;
        }
    }
    return newHeight + 4 > height ? newHeight + 4 : height;
};

//Function which handles the insertion of a piece with the falling
const insertPiece = (piece) => {
    let continueProcess = true;
    while (continueProcess) {
        if (move[currentMovement] === '<') {
            let newPiece = moveLeft(piece);
            if (isPossible(newPiece)) {
                piece = newPiece;
            }
        } else if (move[currentMovement] === '>') {
            let newPiece = moveRight(piece);
            if (isPossible(newPiece)) {
                piece = newPiece;
            }
        }
        currentMovement = (currentMovement + 1) % move.length;
        let newPiece = moveDown(piece);
        if (isPossible(newPiece)) {
            piece = newPiece;
        } else {
            grid = new Set([...grid, ...[...piece].map((position) => JSON.stringify(position))]);
            height = newHeight(piece);
            continueProcess = false;
        }
    }
    return piece;
};

//Function which inserts nbBlock pieces and actualize the height
const play = (nbBlock) => {
    let nbPiece = 0;
    while (nbPiece < nbBlock) {
        let piece = null;
        switch (nbPiece % 5) {
            case 0:
                piece = createHLine(height);
                insertPiece(piece);

                break;
            case 1:
                piece = createCross(height);
                insertPiece(piece);
                break;
            case 2:
                piece = createL(height);
                insertPiece(piece);
                break;
            case 3:
                piece = createVLine(height);
                insertPiece(piece);
                break;
            case 4:
                piece = createSquare(height);
                insertPiece(piece);
                break;
        }
        nbPiece += 1;
    }
};

//Function which returns the index of the first block of the cycle and the length of the cycle
const findCycle = () => {
    let alreadySeen = new Set();
    let begin = null;
    let timer = 100;

    for (let i = 0; i < cycles.length; i++) {
        if (alreadySeen.has(JSON.stringify([cycles[i][1], cycles[i][2]]))) {
            if (begin === null) {
                begin = cycles[i];
            } else {
                timer -= 1;
                if (timer === 0) {
                    for (let j = 0; j < cycles.length; j++) {
                        if (cycles[j][1] === begin[1] && cycles[j][2] === begin[2]) {
                            return [cycles[j][0], begin[0] - cycles[j][0]];
                        }
                    }
                }
            }
        } else {
            alreadySeen.add(JSON.stringify([cycles[i][1], cycles[i][2]]));
            begin = null;
            timer = 100;
        }
    }
};

//Function for part 2 which inserts horizontal pieces into the cycle tab to post-process it
const play2 = (nbBlock) => {
    let nbPiece = 0;

    while (nbPiece < nbBlock) {
        let piece = null;
        switch (nbPiece % 5) {
            case 0:
                piece = createHLine(height);
                piece = insertPiece(piece);
                cycles.push([nbPiece, [...piece][0][0], currentMovement]);
                break;
            case 1:
                piece = createCross(height);
                insertPiece(piece);

                break;
            case 2:
                piece = createL(height);
                insertPiece(piece);
                break;
            case 3:
                piece = createVLine(height);
                insertPiece(piece);
                break;
            case 4:
                piece = createSquare(height);
                insertPiece(piece);
                break;
        }

        nbPiece += 1;
    }
};

//Function for part 2 which inserts nbBlock pieces and consider the cycle
const play3 = (nbBlock, beginCycle, lenCycle) => {
    let n = nbBlock;
    let nbPiece = 0;
    let heightBegin = 0;
    let diffHeight = 0;

    while (nbPiece < n) {
        let piece = null;
        switch (nbPiece % 5) {
            case 0:
                piece = createHLine(height);
                insertPiece(piece);
                break;
            case 1:
                piece = createCross(height);
                insertPiece(piece);

                break;
            case 2:
                piece = createL(height);
                insertPiece(piece);
                break;
            case 3:
                piece = createVLine(height);
                insertPiece(piece);
                break;
            case 4:
                piece = createSquare(height);
                insertPiece(piece);
                break;
        }

        nbPiece += 1;
        if (nbPiece === beginCycle) {
            heightBegin = height;
        }

        if (nbPiece === beginCycle + lenCycle) {
            diffHeight = height - heightBegin;
            let remain = (nbBlock - beginCycle - lenCycle) % lenCycle;
            answer2 += diffHeight * parseInt((nbBlock - beginCycle - lenCycle) / lenCycle);
            n = remain;
            nbPiece = 0;
        }
    }
};

//Part 1
console.time('Time part 1 ');

let height = 3;
let currentMovement = 0;
let grid = new Set();

play(2022);
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + (height - 3));

//Part 2
console.time('Time part 2 ');

//First we find the cycle
grid = new Set();
height = 3;
currentMovement = 0;
let cycles = [];
play2(5000);
let [beginCycle, lenCycle] = findCycle();

//Then we insert the pieces in consideration of the cycle
let answer2 = 0;
grid = new Set();
height = 3;
currentMovement = 0;
play3(1000000000000, beginCycle, lenCycle);

console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + (answer2 + height - 3));
