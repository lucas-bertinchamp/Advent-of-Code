import * as fs from 'fs';

const array = fs.readFileSync('days/day01/input.txt', 'utf-8').trim().split('\n').map(Number);

const diff = array.map((v, i) => {
    if (i < array.length - 1) {
        return array[i + 1] - array[i];
    }
});

const answer = diff.reduce((acc, val) => (val >= 0 ? acc + 1 : acc), 0);

const sumThree = array.map((v, i) => {
    if (i < array.length - 2) {
        return array[i] + array[i + 1] + array[i + 2];
    }
});

const diffThree = sumThree.map((v, i) => {
    if (i < sumThree.length - 1) {
        return sumThree[i + 1] - sumThree[i];
    }
});

const answer2 = diffThree.reduce((acc, val) => (val > 0 ? acc + 1 : acc), 0);

console.log(answer);
console.log(answer2);
