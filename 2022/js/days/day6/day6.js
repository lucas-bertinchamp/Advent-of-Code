import * as fs from 'fs';

console.time('Total time ');

const array = fs.readFileSync('days/day6/input.txt', 'utf-8');

let analyseSlice = (tab, n) => {
    let set = new Set([...tab]);
    if (set.size == n) {
        return true;
    } else return false;
};

let giveAnswer = (tab, n) => {
    let answer = 0;
    for (let i = 0; i < tab.length - n; i++) {
        let isCode = analyseSlice(tab.slice(i, i + n), n);
        if (isCode) {
            answer = i + n;
            break;
        }
    }
    return answer;
};

let answer1 = giveAnswer(array, 4);
let answer2 = giveAnswer(array, 14);

console.timeEnd('Total time ');

console.log('Part 1 : ' + answer1);
console.log('Part 2 : ' + answer2);
