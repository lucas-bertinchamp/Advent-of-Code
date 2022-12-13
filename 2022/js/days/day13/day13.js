import * as fs from 'fs';
const array = fs.readFileSync('days/day13/input.txt', 'utf-8').split('\n');

let compareTab = (arrayLeft, arrayRight) => {
    for (let i = 0; i < arrayLeft.length; i++) {
        if (arrayRight[i] === 'undefined') {
            return false;
        }

        //If Left is a number
        if (typeof arrayLeft[i] === 'number') {
            console.log('couocu');
            if (typeof arrayRight[i] === 'number') {
                if (arrayLeft[i] < arrayRight[i]) {
                    return true;
                } else if (arrayLeft[i] > arrayRight[i]) {
                    return false;
                }
            } else if (typeof arrayRight[i] === 'undefined') {
                return false;
            } else {
                let aux = compareTab([arrayLeft[i]], arrayRight[i]);
                // aux can be undefined
                if (aux == true) {
                    return true;
                } else if (aux == false) {
                    return false;
                }
            }

            //If Left is an array
        } else {
            if (typeof arrayRight[i] === 'number') {
                let aux = compareTab(arrayLeft[i], [arrayRight[i]]);
                // aux can be undefined
                if (aux == true) {
                    return true;
                } else if (aux == false) {
                    return false;
                }
            } else if (typeof arrayRight[i] === 'undefined') {
                return false;
            } else {
                let aux = compareTab(arrayLeft[i], arrayRight[i]);
                // aux can be undefined
                if (aux == true) {
                    return true;
                } else if (aux == false) {
                    return false;
                }
            }
        }
    }
    if (arrayLeft.length < arrayRight.length) {
        return true;
    } else if (arrayRight.length < arrayLeft.length) {
        return false;
    }
};

//Part 1

console.time('Time part 1 ');

let answer1 = 0;

let firstTab = [];
let secondTab = [];

array.map((line, nLine) => {
    if (nLine % 3 == 0) {
        firstTab = JSON.parse(line);
    } else if (nLine % 3 == 1) {
        secondTab = JSON.parse(line);
    } else {
        let comparison = compareTab(firstTab, secondTab);
        if (comparison) {
            answer1 += (nLine + 1) / 3;
        }
    }
});

console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

//Part 2

console.time('Time part 2 ');

let lines = [[[2]], [[6]]];
array.map((line) => {
    if (line != '') {
        lines.push(JSON.parse(line));
    }
});

lines = lines.sort((a, b) => (compareTab(a, b) ? -1 : 1));

let index2 = 0;
let index6 = 0;

lines.map((value, i) => {
    if (JSON.stringify(value) == JSON.stringify([[2]])) {
        index2 = i;
    } else if (JSON.stringify(value) == JSON.stringify([[6]])) {
        index6 = i;
    }
});

console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + (index2 + 1) * (index6 + 1));
