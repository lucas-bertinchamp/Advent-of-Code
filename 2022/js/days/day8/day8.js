import * as fs from 'fs';

console.time('Total time ');

const array = fs.readFileSync('days/day8/input.txt', 'utf-8').trim().split('\n');

const n = array.length;

let answer1 = 0;

let isVisibleLeft = (x, y) => {
    let height = parseInt(array[x][y]);

    for (let j = 1; j <= y; j++) {
        if (height <= parseInt(array[x][y - j])) {
            return [false, j];
        }
    }
    return [true, y];
};

let isVisibleRight = (x, y) => {
    let height = parseInt(array[x][y]);

    for (let j = 1; j < n - y; j++) {
        if (height <= parseInt(array[x][y + j])) {
            return [false, j];
        }
    }
    return [true, n - y - 1];
};

let isVisibleTop = (x, y) => {
    let height = parseInt(array[x][y]);

    for (let i = 1; i <= x; i++) {
        if (height <= parseInt(array[x - i][y])) {
            return [false, i];
        }
    }
    return [true, x];
};

let isVisibleBottom = (x, y) => {
    let height = parseInt(array[x][y]);

    for (let i = 1; i < n - x; i++) {
        if (height <= parseInt(array[x + i][y])) {
            return [false, i];
        }
    }
    return [true, n - x - 1];
};

let isVisible = (x, y) => {
    let [isVisibleB, scoreB] = isVisibleBottom(x, y);
    let [isVisibleT, scoreT] = isVisibleTop(x, y);
    let [isVisibleL, scoreL] = isVisibleLeft(x, y);
    let [isVisibleR, scoreR] = isVisibleRight(x, y);
    return [isVisibleB || isVisibleL || isVisibleR || isVisibleT, scoreB * scoreL * scoreR * scoreT];
};

let answer2 = 0;

for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
        let [isTreeVisible, score] = isVisible(x, y);
        if (isTreeVisible) {
            answer1++;
        }
        if (score > answer2) {
            answer2 = score;
        }
    }
}

console.timeEnd('Total time ');

console.log('Answer part 1 : ' + answer1);
console.log('Answer part 2 : ' + answer2);
