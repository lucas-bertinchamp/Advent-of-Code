import * as fs from 'fs';

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

console.log('Part 1 : ' + giveAnswer(array, 4));
console.log('Part 2 : ' + giveAnswer(array, 14));
