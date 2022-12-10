import * as fs from 'fs';

console.time('Total time ');

const array = fs.readFileSync('days/day9/input.txt', 'utf-8').trim().split('\n');

let distance2 = (p1, p2) => (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;

class Point {
    constructor(x, y, p) {
        this.x = x;
        this.y = y;
        this.ref = p;
    }
}

let movePoint = (p, side) => {
    switch (side) {
        case 'L':
            p.x--;
            break;
        case 'R':
            p.x++;
            break;
        case 'U':
            p.y++;
            break;
        case 'D':
            p.y--;
            break;
    }
};

let moveToRef = (p) => {
    let offsetX = p.x - p.ref.x > 0 ? -1 : 1;
    let offsetY = p.y - p.ref.y > 0 ? -1 : 1;

    p.x = p.x + offsetX;
    p.y = p.y + offsetY;
};

let needMovePoint = (p) => {
    let d = distance2(p, p.ref);
    if (d == 4) {
        if (p.x == p.ref.x) {
            if (p.y > p.ref.y) {
                movePoint(p, 'D');
            } else {
                movePoint(p, 'U');
            }
        } else if (p.y == p.ref.y) {
            if (p.x > p.ref.x) {
                movePoint(p, 'L');
            } else {
                movePoint(p, 'R');
            }
        }
    } else if (d >= 5) {
        moveToRef(p);
    }
};

let code = (x, y) => {
    return `${x},${y}`;
};

let giveAnswer = (tabPoints) => {
    let allCoords = [];
    let lastPoint = tabPoints[tabPoints.length - 1];
    array.map((line) => {
        let command = line.split(' ');
        for (let _ = 0; _ < command[1]; _++) {
            movePoint(head, command[0]);

            tabPoints.map((point) => {
                needMovePoint(point);
            });

            if (!allCoords.includes(code(lastPoint.x, lastPoint.y))) {
                allCoords.push(code(lastPoint.x, lastPoint.y));
            }
        }
    });
    return allCoords.length;
};

//Part 1

console.time('Time part 1 ');

let head = new Point(0, 0, 0);
let point1 = new Point(0, 0, head);

let listPoints = [point1];

let answer1 = giveAnswer(listPoints);

console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

//Part 2

console.time('Time part 2 ');

let point2 = new Point(0, 0, point1);
let point3 = new Point(0, 0, point2);
let point4 = new Point(0, 0, point3);
let point5 = new Point(0, 0, point4);
let point6 = new Point(0, 0, point5);
let point7 = new Point(0, 0, point6);
let point8 = new Point(0, 0, point7);
let point9 = new Point(0, 0, point8);

let listPoints2 = [point1, point2, point3, point4, point5, point6, point7, point8, point9];

let answer2 = giveAnswer(listPoints2);

console.timeEnd('Time part 2 ');

console.log('Answer part 2 : ' + answer2);
