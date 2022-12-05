import * as fs from 'fs';

const array = fs.readFileSync('days/day1/input.txt', 'utf-8').trim().split('\n').map(Number);

var cal = [];

array.reduce((acc, value) => {
    if (value == 0) {
        cal.push(acc);
        return 0;
    } else {
        return acc + value;
    }
}, 0);

//1 star
console.log('Part 1 : ' + Math.max(...cal));

//2 stars
cal = cal.sort((a, b) => b - a);
console.log('Part 2 : ' + (cal[0] + cal[1] + cal[2]));
