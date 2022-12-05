import { count } from 'console';
import * as fs from 'fs';

const array = fs.readFileSync('days/day3/input.txt', 'utf-8').trim().split('\n');

//Part 1

console.time('Time of part 1');

let answer1 = 0;

array.map((val, index) => {
    let alreadySeen = [];
    let firstContent = val.slice(0, val.length / 2).split('');
    let secondContent = val.slice(val.length / 2, val.length).split('');

    secondContent.map((v, i) => {
        if (firstContent.includes(v) && !alreadySeen.includes(v)) {
            if (v == v.toLowerCase()) {
                answer1 += v.charCodeAt(0) - 96;
            } else {
                answer1 += v.charCodeAt(0) - 38;
            }
            alreadySeen.push(v);
        }
    });
});

console.timeEnd('Time of part 1');

//Part 2 : intersection of sets

console.time('Time of part 2');

let answer2 = 0;
let possible = new Set();

array.map((line, index) => {
    if (index % 3 == 0) {
        possible = new Set(line.split(''));
    } else {
        let letters = line.split('');
        possible = new Set([...possible].filter((x) => letters.includes(x)));
        if (index % 3 == 2) {
            let letter = [...possible][0];
            if (letter == letter.toLowerCase()) {
                answer2 += letter.charCodeAt(0) - 96;
            } else {
                answer2 += letter.charCodeAt(0) - 38;
            }
            possible = new Set();
        }
    }
});

console.timeEnd('Time of part 2');

console.log(`Part 1 : ${answer1}`);
console.log(`Part 2 : ${answer2}`);
