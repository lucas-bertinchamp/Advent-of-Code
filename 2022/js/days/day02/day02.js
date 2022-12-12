import * as fs from 'fs';

const array = fs.readFileSync('days/day02/input.txt', 'utf-8').trim().split('\n');
let score1 = 0;
let score2 = 0;

array.map((value, index) => {
    let game = value.split(' ');
    let player1 = game[0].charCodeAt(0) - 'A'.charCodeAt(0);
    let player2 = game[1].charCodeAt(0) - 'X'.charCodeAt(0);

    score1 += player2 + 1;

    //Part 1
    if (!(player2 == 2 && player1 == 0)) {
        if (player2 == player1) {
            score1 += 3;
        } else if (player2 > player1) {
            score1 += 6;
        } else if (player2 == 0 && player1 == 2) {
            score1 += 6;
        }
    }

    //Part 2
    if (player2 == 0) {
        let point = player1 - 1;
        if (point == -1) {
            score2 += 3;
        } else {
            score2 += point + 1;
        }
    } else if (player2 == 1) {
        score2 += player1 + 1 + 3;
    } else {
        score2 += 6 + ((player1 + 1) % 3) + 1;
    }
});

console.log('Part 1 : ' + score1);
console.log('Part 2 : ' + score2);
