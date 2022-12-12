import * as fs from 'fs';
const array = fs.readFileSync('days/day04/input.txt', 'utf-8').trim().split('\n');

let answer1 = 0;
let answer2 = 0;

array.map((value) => {
    let line = value.split(',');
    let int1 = line[0].split('-').map(Number);
    let int2 = line[1].split('-').map(Number);

    //Part 1
    if (int1[0] <= int2[0] && int2[0] <= int1[1] && int1[0] <= int2[1] && int2[1] <= int1[1]) {
        answer1 = answer1 + 1;
    } else if (int2[0] <= int1[0] && int1[0] <= int2[1] && int2[0] <= int1[1] && int1[1] <= int2[1]) {
        answer1 = answer1 + 1;
    }

    //Part 2
    if ((int1[0] <= int2[0] && int2[0] <= int1[1]) || (int1[0] <= int2[1] && int2[1] <= int1[1])) {
        answer2 = answer2 + 1;
    } else if ((int2[0] <= int1[0] && int1[0] <= int2[1]) || (int2[0] <= int1[1] && int1[1] <= int2[1])) {
        answer2 = answer2 + 1;
    }
});

console.log('Part 1 : ' + answer1);
console.log('Part 2 : ' + answer2);
