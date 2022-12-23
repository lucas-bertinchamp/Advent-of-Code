import * as fs from 'fs';

const array = fs.readFileSync('days/day23/input.txt', 'utf-8').split('\n');

const code = (line, column) => `${line}.${column}`;

const parsing = (array) => {
    const elves = [];
    array.map((line, indexLine) => {
        let columns = line.split('');
        columns.map((column, indexColumn) => {
            if (column === '#') {
                elves.push(code(indexLine, indexColumn));
            }
        });
    });
    return elves;
};

const proposal = (elf, elvesMap, order) => {
    let line, column;
    [line, column] = elf.split('.').map(Number);
    let N = code(line - 1, column);
    let NW = code(line - 1, column - 1);
    let NE = code(line - 1, column + 1);
    let E = code(line, column + 1);
    let SE = code(line + 1, column + 1);
    let S = code(line + 1, column);
    let SW = code(line + 1, column - 1);
    let W = code(line, column - 1);
    let elvesPosition = elvesMap;
    if (
        elvesPosition.includes(N) ||
        elvesPosition.includes(NE) ||
        elvesPosition.includes(E) ||
        elvesPosition.includes(SE) ||
        elvesPosition.includes(S) ||
        elvesPosition.includes(SW) ||
        elvesPosition.includes(W) ||
        elvesPosition.includes(NW)
    ) {
        let moveProposal = undefined;
        order.map((facing) => {
            if (moveProposal === undefined) {
                switch (facing) {
                    case 'n':
                        if (!elvesPosition.includes(NW) && !elvesPosition.includes(N) && !elvesPosition.includes(NE)) {
                            moveProposal = N;
                        }
                        break;
                    case 's':
                        if (!elvesPosition.includes(SW) && !elvesPosition.includes(S) && !elvesPosition.includes(SE)) {
                            moveProposal = S;
                        }
                        break;
                    case 'w':
                        if (!elvesPosition.includes(NW) && !elvesPosition.includes(W) && !elvesPosition.includes(SW)) {
                            moveProposal = W;
                        }
                        break;
                    case 'e':
                        if (!elvesPosition.includes(NE) && !elvesPosition.includes(E) && !elvesPosition.includes(SE)) {
                            moveProposal = E;
                        }
                        break;
                }
            }
        });
        return [elvesMap, moveProposal];
    } else {
        return [elvesMap, undefined];
    }
};

const moveElf = (elvesMap, elf, position) => {
    elvesMap = elvesMap.filter((elfValue) => elfValue !== elf);
    elvesMap.push(position);
    return elvesMap;
};

const round = (elvesMap, order) => {
    let proposals = new Map();
    elvesMap.map((elf) => {
        let proposalMove;
        [elvesMap, proposalMove] = proposal(elf, elvesMap, order);
        if (proposalMove != undefined) {
            if (proposals.get(proposalMove) === undefined) {
                proposals.set(proposalMove, [elf]);
            } else {
                proposals.set(proposalMove, [elf, ...proposals.get(proposalMove)]);
            }
        }
    });
    [...proposals.keys()].map((position) => {
        if (proposals.get(position).length == 1) {
            elvesMap = moveElf(elvesMap, proposals.get(position)[0], position);
        }
    });
    return elvesMap;
};

const getMinMaxLine = (elvesMap) => {
    let minLine = 0;
    let maxLine = 0;
    elvesMap.map((position) => {
        let line = Number(position.split('.')[0]);
        if (line < minLine) {
            minLine = line;
        }
        if (line > maxLine) {
            maxLine = line;
        }
    });
    return [minLine, maxLine];
};

const getMinMaxColumn = (elvesMap) => {
    let minColumn = 0;
    let maxColumn = 0;
    elvesMap.map((position) => {
        let column = Number(position.split('.')[1]);
        if (column < minColumn) {
            minColumn = column;
        }
        if (column > maxColumn) {
            maxColumn = column;
        }
    });
    return [minColumn, maxColumn];
};

const print = (elvesMap) => {
    let [minLine, maxLine] = getMinMaxLine(elvesMap);
    let [minColumn, maxColumn] = getMinMaxColumn(elvesMap);
    let elvesPosition = [...elvesMap.keys()];
    for (let line = minLine; line <= maxLine; line++) {
        let lineString = '';
        for (let column = minColumn; column <= maxColumn; column++) {
            if (elvesPosition.includes(code(line, column))) {
                lineString += '#';
            } else {
                lineString += '.';
            }
        }
        console.log(lineString);
    }
};

const part1 = () => {
    let order = ['n', 's', 'w', 'e'];
    let elvesMap = parsing(array);
    for (let r = 1; r <= 10; r++) {
        elvesMap = round(elvesMap, order);
        let firstConsideration = order.splice(0, 1);
        order.push(...firstConsideration);
    }
    let [minLine, maxLine] = getMinMaxLine(elvesMap);
    let [minColumn, maxColumn] = getMinMaxColumn(elvesMap);
    let area = (maxLine - minLine + 1) * (maxColumn - minColumn + 1);
    return area - elvesMap.length;
};

const part2 = () => {
    let order = ['n', 's', 'w', 'e'];
    let elvesMap = parsing(array);

    let newElvesMap = round(elvesMap, order);

    let r = 1;

    while (elvesMap !== newElvesMap) {
        let firstConsideration = order.splice(0, 1);
        order.push(...firstConsideration);

        elvesMap = newElvesMap;
        newElvesMap = round(elvesMap, order);

        r++;
    }
    return r;
};

console.time('Time part 1 ');
let answer1 = part1();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

console.time('Time part 2 ');
let answer2 = part2();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
