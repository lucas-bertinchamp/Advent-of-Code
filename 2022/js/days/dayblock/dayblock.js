import * as fs from 'fs';

const jsonFile = fs.readFileSync('days/dayblock/n-transactions.json', 'utf-8');

const transactions = JSON.parse(jsonFile).n_transactions;

let total = 0;
let count = 0;
transactions.map((transaction) => {
    if (transaction.x > 1514761200000 && transaction.x < 1546297200000) {
        total += transaction.y;
        count++;
    }
});

let average = total / count;
console.log(average);

const jsonFile2 = fs.readFileSync('days/dayblock/difficulty.json', 'utf-8');
const difficulties = JSON.parse(jsonFile2).difficulty;

let min = difficulties.reduce((acc, value) => {
    if (value.x > 1514761200000 && value.x < 1546297200000) {
        value.y < acc ? (acc = value.y) : acc;
    }
    return acc;
}, Infinity);

console.log(min);
