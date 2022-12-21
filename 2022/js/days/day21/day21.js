import * as fs from 'fs';

const monkeys = fs.readFileSync('days/day21/input.txt', 'utf-8').trim().split('\n');

const operation = {
    '+': (v1, v2) => v1 + v2,
    '-': (v1, v2) => v1 - v2,
    '*': (v1, v2) => v1 * v2,
    '/': (v1, v2) => v1 / v2,
};

let values = new Map();
let waiting = new Map();

const checkWaitedMonkey = () => {
    const monkeysWaiting = [...waiting.keys()];
    monkeysWaiting.map((monkey) => {
        let m1 = waiting.get(monkey)[1];
        let m2 = waiting.get(monkey)[2];
        if (values.get(m1) !== undefined && values.get(m2) !== undefined) {
            values.set(monkey, operation[waiting.get(monkey)[0]](values.get(m1), values.get(m2)));
            waiting.delete(monkey);
        }
    });
};

const partOne = () => {
    monkeys.map((monkey) => {
        let nameMonkey, command;
        [nameMonkey, command] = monkey.split(':');
        let elementsCommand = command.split(' ');
        if (elementsCommand.length == 2) {
            values.set(nameMonkey, parseInt(elementsCommand[1]));
        } else {
            waiting.set(nameMonkey, [elementsCommand[2], elementsCommand[1], elementsCommand[3]]);
        }
    });

    while ([...waiting.keys()].length != 0) {
        checkWaitedMonkey();
    }
    return values.get('root');
};

const inverseOperation = (monkey, value) => {
    if (monkey == 'humn') {
        return value;
    } else {
        let m1 = waiting.get(monkey)[1];
        let m2 = waiting.get(monkey)[2];
        if (values.get(m1) === undefined) {
            switch (waiting.get(monkey)[0]) {
                case '+':
                    return inverseOperation(m1, value - values.get(m2));
                case '*':
                    return inverseOperation(m1, value / values.get(m2));
                case '-':
                    return inverseOperation(m1, values.get(m2) + value);
                case '/':
                    return inverseOperation(m1, values.get(m2) * value);
            }
        } else if (values.get(m2) === undefined) {
            switch (waiting.get(monkey)[0]) {
                case '+':
                    return inverseOperation(m2, value - values.get(m1));
                case '*':
                    return inverseOperation(m2, value / values.get(m1));
                case '-':
                    return inverseOperation(m2, values.get(m1) - value);
                case '/':
                    return inverseOperation(m2, values.get(m1) / value);
            }
        }
    }
};

const partTwo = () => {
    monkeys.map((monkey) => {
        let nameMonkey, command;
        [nameMonkey, command] = monkey.split(':');
        if (nameMonkey == 'humn') {
        } else {
            let elementsCommand = command.split(' ');
            if (elementsCommand.length == 2) {
                values.set(nameMonkey, parseInt(elementsCommand[1]));
            } else {
                waiting.set(nameMonkey, [elementsCommand[2], elementsCommand[1], elementsCommand[3]]);
            }
        }
    });

    let previousKeys = [...waiting.keys()];
    checkWaitedMonkey();
    while ([...waiting.keys()].length != previousKeys.length) {
        previousKeys = [...waiting.keys()];
        checkWaitedMonkey();
    }
    let root = waiting.get('root');
    let humn;

    if (values.get(root[1]) === undefined) {
        humn = inverseOperation(root[1], values.get(root[2]));
    } else if (values.get(root[2]) === undefined) {
        humn = inverseOperation(root[2], values.get(root[1]));
    }

    return humn;
};

// Part 1
console.time('Time part 1 ');
const answer1 = partOne();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

// Part 2

values = new Map();
waiting = new Map();

console.time('Time part 2 ');
const answer2 = partTwo();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
