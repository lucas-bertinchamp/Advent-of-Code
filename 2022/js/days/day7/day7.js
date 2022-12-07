import { time } from 'console';
import * as fs from 'fs';

console.time('Part 1 & 2 ');

const array = fs.readFileSync('days/day7/input.txt', 'utf-8').trim().split('\n');
const dirs = new Map();

const currentPath = [];

const cd = (pathElement) => {
    if (pathElement == '..') {
        currentPath.pop(currentPath.length - 1);
    } else {
        currentPath.push(pathElement);
    }
};

const analyseLine = (line) => {
    let linePart = line.split(' ');
    if (linePart[0] == '$') {
        if (linePart[1] == 'cd') {
            cd(linePart[2]);
            if (![...dirs.keys()].includes(currentPath.join(''))) {
                dirs.set(currentPath.join(''), 0);
            }
        }
    } else if (linePart[0] != 'dir') {
        for (let i = 0; i <= currentPath.length; i++) {
            let chemin = currentPath.slice(0, i).join('');
            dirs.set(chemin, dirs.get(chemin) + parseInt(linePart[0]));
        }
    }
};

array.map((value) => {
    analyseLine(value);
});

const sizes = [...dirs.values()];

const answer1 = sizes.reduce((acc, val) => {
    if (val < 100000) {
        return acc + val;
    } else return acc;
}, 0);

const freeSpace = 70000000 - sizes[0];
const possible = sizes.filter((val) => freeSpace + val >= 30000000);

const answer2 = Math.min(...possible);

console.timeEnd('Part 1 & 2 ');

console.log('Answer part 1 : ' + answer1);
console.log('Answer part 2 : ' + answer2);
