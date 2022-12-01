import * as fs from 'fs';

const array = fs.readFileSync('days/day1/input.txt', 'utf-8').trim().split('\n').map(Number);

const array2 = array.map((v, i) => {
    if (i < array.length - 1) {
        return array[i + 1] - array[i];
    }
});

const total = array2.reduce((acc, val) => (val >= 0 ? acc + 1 : acc));
const total2 = array2.reduce((acc, val) => (val < 0 ? acc + 1 : acc));

let t = 0;
for (let i = 0; i < 2000; i++) {
    if (array2[i] > 0) {
        t++;
    }
}

console.log(array.length);
console.log(array2.length);
console.log(array2);
console.log(total);
console.log(total2);
console.log(t);
