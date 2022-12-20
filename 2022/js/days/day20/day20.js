import * as fs from 'fs';

const array = fs.readFileSync('days/day20/input.txt', 'utf-8').trim().split('\n').map(Number);
const n = array.length;
const index = Array.from({ length: n }, (v, i) => i);

const mix = (array, index) => {
    for (let i = 0; i < n; i++) {
        let indexOfValue = index[i];
        let valueToMove = array[indexOfValue];

        let newIndex = index[i] + (valueToMove % (n - 1));

        if (valueToMove > 0) {
            array.splice(indexOfValue, 1);
            if (newIndex >= n) {
                newIndex = newIndex - n + 1;
                array.splice(newIndex, 0, valueToMove);

                index = index.map((v) => {
                    if (v >= newIndex && v <= indexOfValue) {
                        return v + 1;
                    }
                    return v;
                });
            } else {
                array.splice(newIndex, 0, valueToMove);
                index = index.map((v) => {
                    if (v >= indexOfValue && v <= newIndex) {
                        return v - 1;
                    } else {
                        return v;
                    }
                });
            }
            index[i] = newIndex;
        } else if (valueToMove < 0) {
            array.splice(indexOfValue, 1);
            if (newIndex <= 0) {
                newIndex = n + newIndex - 1;
                array.splice(newIndex, 0, valueToMove);
                index = index.map((v, ind) => {
                    if (v <= newIndex && v >= indexOfValue) {
                        return v - 1;
                    }
                    return v;
                });
            } else {
                array.splice(newIndex, 0, valueToMove);
                index = index.map((v) => {
                    if (v >= newIndex && v <= indexOfValue) {
                        return v + 1;
                    }
                    return v;
                });
            }
            index[i] = newIndex;
        }
    }
    return [array, index];
};

const part1 = (array, index) => {
    [array, index] = mix(array, index);

    let indexOf0 = array.indexOf(0);

    return array[(indexOf0 + 1000) % n] + array[(indexOf0 + 2000) % n] + array[(indexOf0 + 3000) % n];
};

const part2 = (array, index) => {
    array = array.map((v) => v * 811589153);
    for (let i = 0; i < 10; i++) {
        [array, index] = mix(array, index);
    }
    let indexOf0 = array.indexOf(0);

    return array[(indexOf0 + 1000) % n] + array[(indexOf0 + 2000) % n] + array[(indexOf0 + 3000) % n];
};

// Part 1
console.time('Time part 1 ');
let answer1 = part1(JSON.parse(JSON.stringify(array)), JSON.parse(JSON.stringify(index)));
console.timeEnd('Time part 1 ');
console.log('Answer part 1: ' + answer1);

// Part 2
console.time('Time part 2 ');
let answer2 = part2(array, index);
console.timeEnd('Time part 2 ');
console.log('Answer part 2: ' + answer2);
