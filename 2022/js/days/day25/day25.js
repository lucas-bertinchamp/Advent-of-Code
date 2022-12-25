import * as fs from 'fs';

const array = fs.readFileSync('days/day25/input.txt', 'utf-8').split('\n');

const toDecimal = (number) => {
    let n = number.length;
    let numbers = number.split('');
    let decimals = numbers.map((letter, iLetter) => {
        let result = Math.pow(5, n - iLetter - 1);
        let offset = 0;
        switch (letter) {
            case '1':
                offset = 1;
                break;
            case '2':
                offset = 2;
                break;
            case '-':
                offset = -1;
                break;
            case '=':
                offset = -2;
                break;
        }
        return result * offset;
    });
    return decimals.reduce((acc, v) => acc + v, 0);
};

const toSnafu = (number) => {
    let conversion = [];
    while (number != 0) {
        let remainder = number % 5;
        if (remainder > 2) {
            if (remainder - 5 == -2) {
                conversion.unshift('=');
            } else if (remainder - 5 == -1) {
                conversion.unshift('-');
            } else {
                conversion.unshift(remainder - 5);
            }
            number += remainder;
        } else {
            conversion.unshift(remainder);
        }
        number = parseInt(number / 5);
    }
    return conversion.join('');
};

const part1 = () => {
    const result = array.map((v) => toDecimal(v)).reduce((acc, v) => acc + v, 0);
    return toSnafu(result);
};

console.time('Time part 1 ');
let answer1 = part1();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 ' + answer1);
