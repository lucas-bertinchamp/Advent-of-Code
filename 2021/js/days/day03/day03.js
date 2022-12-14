import * as fs from 'fs';

const array = fs.readFileSync('days/day03/input.txt', 'utf-8').trim().split('\n');

let n = array[0].length;

// Part 1
const partOne = () => {
    let count = Array.from({ length: n }, () => 0);

    array.map((line) => {
        for (let i = 0; i < n; i++) {
            count[i] += line[i] === '1' ? 1 : 0;
        }
    });

    const gamma = count.map((v) => (v > array.length / 2 ? 1 : 0));
    const epsilon = count.map((v) => (v > array.length / 2 ? 0 : 1));

    const gammaDecimal = gamma.reduce((acc, val, i) => acc + val * 2 ** (n - i - 1), 0);
    const epsilonDecimal = epsilon.reduce((acc, val, i) => acc + val * 2 ** (n - i - 1), 0);

    return gammaDecimal * epsilonDecimal;
};

// Part 2
const getMostFrequent = (array, position) => {
    const countOne = array.reduce((acc, val) => (val[position] === '1' ? acc + 1 : acc), 0);
    return countOne >= array.length / 2 ? '1' : '0';
};

const getLeastFrequent = (array, position) => {
    return getMostFrequent(array, position) === '1' ? '0' : '1';
};

const getOxygenRating = () => {
    let candidate = array;
    for (let i = 0; i < n; i++) {
        let mostFrequent = getMostFrequent(candidate, i);
        candidate = candidate.filter((val) => val[i] === mostFrequent);
        if (candidate.length === 1) {
            break;
        }
    }
    console.log(candidate);
    return candidate[0].split('').reduce((acc, val, i) => acc + val * 2 ** (n - i - 1), 0);
};

const getCO2Rating = () => {
    let candidate = array;
    for (let i = 0; i < n; i++) {
        let leastFrequent = getLeastFrequent(candidate, i);
        candidate = candidate.filter((val) => val[i] === leastFrequent);
        if (candidate.length === 1) {
            break;
        }
    }
    console.log(candidate);
    return candidate[0].split('').reduce((acc, val, i) => acc + val * 2 ** (n - i - 1), 0);
};

const partTwo = () => {
    return getOxygenRating() * getCO2Rating();
};

console.log('Answer part 1 : ' + partOne());
console.log('Answer part 2 : ' + partTwo());
