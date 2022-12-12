import { Console, time } from 'console';
import * as fs from 'fs';

console.time('Time of part 1 and 2');

// Part 1
const array = fs.readFileSync('days/day05/input.txt', 'utf-8').split('\n');
let piles = new Array();
let piles2 = new Array();

for (let i = 0; i < 8; i++) {
    piles.push('');
}
piles.push('');

array.map((value, index) => {
    if (index < 8) {
        let ligne = value.split('');
        ligne.map((letter, i) => {
            if (i % 4 == 1 && letter != ' ') {
                piles[(i - 1) / 4] = letter + piles[(i - 1) / 4];
            }
        });
        if (index == 7) {
            piles2 = structuredClone(piles);
        }
    } else if (index >= 10) {
        let command = value.split(' ').map(Number);

        let toMove = piles[command[3] - 1].slice(
            piles[command[3] - 1].length - command[1],
            piles[command[3] - 1].length
        );

        let toMoveReversed = toMove.split('').reverse().join('');

        piles[command[3] - 1] = piles[command[3] - 1].slice(0, piles[command[3] - 1].length - command[1]);
        piles[command[5] - 1] = piles[command[5] - 1] + toMoveReversed;

        let toMove2 = piles2[command[3] - 1].slice(
            piles2[command[3] - 1].length - command[1],
            piles2[command[3] - 1].length
        );

        piles2[command[3] - 1] = piles2[command[3] - 1].slice(0, piles2[command[3] - 1].length - command[1]);
        piles2[command[5] - 1] = piles2[command[5] - 1] + toMove2;
    }
});

let giveAnswer = (tab) => {
    let answer = '';
    tab.map((val) => (answer += val[val.length - 1]));
    return answer;
};

console.timeEnd('Time of part 1 and 2');

console.log('Part 1 : ' + giveAnswer(piles));
console.log('Part 2 : ' + giveAnswer(piles2));
