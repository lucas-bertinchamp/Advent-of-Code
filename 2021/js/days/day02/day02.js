import * as fs from 'fs';

const array = fs.readFileSync('days/day02/input.txt', 'utf-8').trim().split('\n');

const firstPart = () => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    array.map((line) => {
        let command = line.split(' ');
        switch (command[0]) {
            case 'forward':
                horizontal += Number(command[1]);
                break;
            case 'up':
                depth -= Number(command[1]);
                break;
            case 'down':
                depth += Number(command[1]);
                break;
        }
    });
    return horizontal * depth;
};

const secondPart = () => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    array.map((line) => {
        let command = line.split(' ');
        switch (command[0]) {
            case 'forward':
                horizontal += Number(command[1]);
                depth += aim * Number(command[1]);
                break;
            case 'up':
                aim -= Number(command[1]);
                break;
            case 'down':
                aim += Number(command[1]);
                break;
        }
    });
    return horizontal * depth;
};

console.log('Answer part 1 : ' + firstPart());
console.log('Answer part 2 : ' + secondPart());
