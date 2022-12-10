import * as fs from 'fs';

console.time('Total time ');

const array = fs.readFileSync('days/day10/input.txt', 'utf-8').trim().split('\n');

const register = [1];
let screen = '';

const draw = (cycle) => {
    let position = (cycle - 1) % 40;
    let value = register[register.length - 1];
    if (position == value || position == value - 1 || position == value + 1) {
        screen += '#';
    } else {
        screen += '.';
    }
};

const power = (cycle) => {
    let value = register[cycle - 1];
    return value * cycle;
};

array.map((line) => {
    let command = line.split(' ');
    let cycle = register.length;
    if (command[0] == 'noop') {
        draw(cycle);
        register.push(register[register.length - 1]);
    } else {
        draw(cycle);
        register.push(register[register.length - 1]);
        draw(cycle + 1);
        register.push(register[register.length - 1] + parseInt(command[1]));
    }
});

let answer1 = 0;
for (let i = 20; i <= 220; i = i + 40) {
    answer1 += power(i);
}

console.log('Answer part 1 : ' + answer1);
console.log('Answer part 2 :');

for (let i = 0; i <= 240; i = i + 40) {
    let slice = screen.slice(i, i + 40);
    console.log(slice);
}

console.timeEnd('Total time ');
