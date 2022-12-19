import * as fs from 'fs';

const sensors = fs.readFileSync('days/day15/input.txt', 'utf-8').trim().split('\n');

//Function which returns the answer of part 1
const partOne = (y) => {
    const occupated = occupatedRow(y);
    const obstacles = new Set();
    let answer = 0;

    sensors.map((sensor) => {
        const words = sensor.split(', ');
        const xSensor = parseInt(words[0].split(' ')[2].split('=')[1]);
        const ySensor = parseInt(words[1].split(':')[0].split('=')[1]);

        const xBeacon = parseInt(words[1].split(' ')[5].split('=')[1]);
        const yBeacon = parseInt(words[2].split(':')[0].split('=')[1]);

        if (yBeacon === y) {
            obstacles.add(xBeacon);
        }

        if (ySensor === y) {
            obstacles.add(xSensor);
        }

        answer = [...occupated].filter((x) => !obstacles.has(x));
    });
    return answer.length;
};

//Function which returns all the positions of a row which are detected by a sensor
const occupatedRow = (y) => {
    const occupated = new Set();
    const beacon = new Set();
    let answer = 0;
    sensors.map((sensor) => {
        const words = sensor.split(', ');
        const xSensor = parseInt(words[0].split(' ')[2].split('=')[1]);
        const ySensor = parseInt(words[1].split(':')[0].split('=')[1]);

        const xBeacon = parseInt(words[1].split(' ')[5].split('=')[1]);
        const yBeacon = parseInt(words[2].split(':')[0].split('=')[1]);

        const xOffset = Math.abs(xSensor - xBeacon);
        const yOffset = Math.abs(ySensor - yBeacon);
        const radius = xOffset + yOffset;

        if (ySensor >= y) {
            if (ySensor - radius <= y) {
                let over = y - ySensor + radius;
                for (let i = xSensor - over; i <= xSensor + over; i++) {
                    occupated.add(i);
                }
            }
        } else {
            if (ySensor + radius >= y) {
                let over = ySensor + radius - y;
                for (let i = xSensor - over; i <= xSensor + over; i++) {
                    occupated.add(i);
                }
            }
        }
        answer = [...occupated].filter((x) => !beacon.has(x));
    });

    return answer;
};

//Function which returns the distance between two points
const distance = (x1, y1, x2, y2) => {
    const xOffset = Math.abs(x1 - x2);
    const yOffset = Math.abs(y1 - y2);
    return xOffset + yOffset;
};

//Function which codes a point in a string
const code = (x, y) => {
    return `${x}.${y}`;
};

//Function which returns the points on the border of a sensor (not included in the scanning area of the sensor)
const getPointsOnBorder = (sensor) => {
    let points = new Set();

    const words = sensor.split(', ');
    const xSensor = parseInt(words[0].split(' ')[2].split('=')[1]);
    const ySensor = parseInt(words[1].split(':')[0].split('=')[1]);

    const xBeacon = parseInt(words[1].split(' ')[5].split('=')[1]);
    const yBeacon = parseInt(words[2].split(':')[0].split('=')[1]);

    const xOffset = Math.abs(xSensor - xBeacon);
    const yOffset = Math.abs(ySensor - yBeacon);
    const radius = xOffset + yOffset;

    for (let x = xSensor; x <= xSensor + radius + 1; x++) {
        if (x <= n && x >= 0) {
            if (ySensor + radius + xSensor - x + 1 <= n && ySensor + radius + xSensor - x + 1 >= 0) {
                points.add(code(x, ySensor + radius + xSensor - x + 1));
            } else if (ySensor - radius - xSensor + x - 1 <= n && ySensor - radius - xSensor + x - 1 >= 0) {
                points.add(code(x, ySensor - radius - xSensor + x - 1));
            }
        }
    }

    for (let x = xSensor; x >= xSensor - radius - 1; x--) {
        if (x <= n && x >= 0) {
            if (ySensor + radius + xSensor - x + 1 <= n && ySensor + radius + xSensor - x + 1 >= 0) {
                points.add(code(x, ySensor + radius + xSensor - x + 1));
            } else if (ySensor - radius - xSensor + x - 1 <= n && ySensor - radius - xSensor + x - 1 >= 0) {
                points.add(code(x, ySensor - radius - xSensor + x - 1));
            }
        }
    }
    return points;
};

//Function which tests if a point is outside the scanning area of all sensors
const testPoint = (point) => {
    for (let sensor of sensors) {
        const words = sensor.split(', ');
        const xSensor = parseInt(words[0].split(' ')[2].split('=')[1]);
        const ySensor = parseInt(words[1].split(':')[0].split('=')[1]);
        if (distance(xSensor, ySensor, point[0], point[1]) <= dist[sensors.indexOf(sensor)]) {
            return false;
        }
    }
    return true;
};

//Function which gives the answer to part 2
const partTwo = () => {
    for (let idSensor = 0; idSensor < sensors.length; idSensor++) {
        console.log('Analyzing sensor ' + (idSensor + 1) + ' out of ' + sensors.length);
        let points = [...getPointsOnBorder(sensors[idSensor])];
        for (let i = 0; i < points.length; i++) {
            let boolean = testPoint(points[i].split('.').map((x) => parseInt(x)));
            if (boolean) {
                let answerPoint = points[i];
                let coordsAnswer = answerPoint.split('.').map((x) => parseInt(x));
                return 4000000 * coordsAnswer[0] + coordsAnswer[1];
            }
        }
    }
};

// Intialization of the variables
let dist = sensors.map((sensor) => {
    const words = sensor.split(', ');
    const xSensor = parseInt(words[0].split(' ')[2].split('=')[1]);
    const ySensor = parseInt(words[1].split(':')[0].split('=')[1]);

    const xBeacon = parseInt(words[1].split(' ')[5].split('=')[1]);
    const yBeacon = parseInt(words[2].split(':')[0].split('=')[1]);

    return distance(xSensor, ySensor, xBeacon, yBeacon);
});

let n = 4000000;

// Part 1

console.time('Time part 1 ');
let answer1 = partOne(10);
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

// Part 2

console.time('Time part 2 ');
let answer2 = partTwo();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
