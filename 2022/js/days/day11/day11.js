import * as fs from 'fs';
const array = fs.readFileSync('days/day11/input.txt', 'utf-8').trim().split('\n');

class Monkey {
    constructor() {
        this.items = [];
        this.operation = 0;
        this.div = 0;
        this.ifTrue = 0;
        this.ifFalse = 0;
        this.inspected = 0;
    }
}

let createFunction = (array) => {
    switch (array[1]) {
        case '+':
            if (array[2] == 'old') {
                return (worry) => worry + worry;
            } else {
                return (worry) => worry + parseInt(array[2]);
            }
            break;
        case '*':
            if (array[2] == 'old') {
                return (worry) => worry * worry;
            } else {
                return (worry) => worry * parseInt(array[2]);
            }
            break;
    }
};

let giveAnswer = () => {
    let inspected = [];
    monkeys.map((monkey) => {
        inspected.push(monkey.inspected);
    });
    inspected = inspected.sort((a, b) => b - a);
    let answer1 = inspected[0] * inspected[1];
    return answer1;
};

//Initialization
let initialization = () => {
    monkeys = [];
    currentMonkey = -1;
    array.map((line, index) => {
        let step = index % 7;
        if (step == 0) {
            monkeys.push(new Monkey());
            currentMonkey++;
        } else if (step == 1) {
            monkeys[currentMonkey].items = line.split(':')[1].split(',').map(Number);
        } else if (step == 2) {
            let command = line.split('=')[1].split(' ');
            monkeys[currentMonkey].operation = createFunction(command.slice(1, 4));
        } else if (step == 3) {
            monkeys[currentMonkey].div = parseInt(line.split(' ')[5]);
        } else if (step == 4) {
            monkeys[currentMonkey].ifTrue = parseInt(line.split(' ')[9]);
        } else if (step == 5) {
            monkeys[currentMonkey].ifFalse = parseInt(line.split(' ')[9]);
        }
    });
};

let monkeys = [];
let currentMonkey = -1;

//Part 1
console.time('Time part 1 ');

initialization();

let round = () => {
    monkeys.map((monkey, index) => {
        monkey.items.map((item) => {
            monkey.inspected++;
            let divisibility = Math.floor(monkey.operation(item) / 3) % monkey.div;
            if (divisibility == 0) {
                monkeys[monkey.ifTrue].items.push(Math.floor(monkey.operation(item) / 3));
            } else {
                monkeys[monkey.ifFalse].items.push(Math.floor(monkey.operation(item) / 3));
            }
        });
        monkey.items = [];
    });
};

for (let i = 0; i < 20; i++) {
    round();
}

console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + giveAnswer());

//Part 2
console.time('Time part 2 ');

initialization();

let prod = monkeys.reduce((acc, monkey) => acc * monkey.div, 1);

let round2 = () => {
    monkeys.map((monkey, index) => {
        monkey.items.map((item) => {
            monkey.inspected++;
            let divisibility = monkey.operation(item) % monkey.div;
            if (divisibility == 0) {
                monkeys[monkey.ifTrue].items.push(monkey.operation(item) % prod);
            } else {
                monkeys[monkey.ifFalse].items.push(monkey.operation(item) % prod);
            }
        });
        monkey.items = [];
    });
};

for (let i = 0; i < 10000; i++) {
    round2();
}

console.timeEnd('Time part 2 ');
console.log('Answer part 2 ' + giveAnswer());
