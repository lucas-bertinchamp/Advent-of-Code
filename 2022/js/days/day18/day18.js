import * as fs from 'fs';

const lava = fs.readFileSync('days/day18/input.txt', 'utf-8').trim();

// Create a array of string with the coordinates of the lava cubes (useful for the includes method)
const lavaCubes = lava.split('\n').map((row) => row.split(',').map(Number));
const lavaCubesString = lavaCubes.map((cube) => JSON.stringify(cube));

// Get the surface of a cube in contact with the exterior (interior = listCubes)
const surfaceCube = (cube, listCubes) => {
    const [x, y, z] = cube;
    let surface = 0;
    listCubes.includes(JSON.stringify([x + 1, y, z])) ? surface : surface++;
    listCubes.includes(JSON.stringify([x - 1, y, z])) ? surface : surface++;
    listCubes.includes(JSON.stringify([x, y + 1, z])) ? surface : surface++;
    listCubes.includes(JSON.stringify([x, y - 1, z])) ? surface : surface++;
    listCubes.includes(JSON.stringify([x, y, z + 1])) ? surface : surface++;
    listCubes.includes(JSON.stringify([x, y, z - 1])) ? surface : surface++;
    return surface;
};

// Get the max coordinates of the lava composing the droplet
const getMaxCoords = (listCubes) => {
    let max = [0, 0, 0];
    listCubes.forEach((cube) => {
        cube.forEach((coord, i) => {
            if (coord > max[i]) {
                max[i] = coord;
            }
        });
    });
    return [max[0] + 1, max[1] + 1, max[2] + 1];
};

// Get the list of all the air cubes of a cube surrounding the lava droplet
const getAirCubes = (listCubes) => {
    const [xMax, yMax, zMax] = getMaxCoords(listCubes);
    const airCubes = [];
    for (let x = 0; x <= xMax; x++) {
        for (let y = 0; y <= yMax; y++) {
            for (let z = 0; z <= zMax; z++) {
                if (!lavaCubesString.includes(JSON.stringify([x, y, z]))) {
                    airCubes.push([x, y, z]);
                }
            }
        }
    }
    return airCubes;
};

// Get the list of all the neighbors of a cube
const neighbors = (cube) => {
    const [x, y, z] = cube;
    return [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
    ];
};

// Get the list of all the air cubes inside the lava droplet (remove the air cubes in contact with the exterior with a BFS algorithm)
const getInsideAirCubes = (listCubes) => {
    const airCubes = getAirCubes(listCubes);
    const airCubesString = airCubes.map((cube) => JSON.stringify(cube));

    const outsideAirCubes = [];
    const insideAirCubes = [];

    const frontier = [JSON.stringify([0, 0, 0])];
    const alreadyChecked = [];
    while (frontier.length !== 0) {
        const current = frontier.shift();
        outsideAirCubes.push(current);

        alreadyChecked.push(current);

        const neighborsCurrent = neighbors(JSON.parse(current));

        neighborsCurrent.map((neighbor) => {
            if (
                !alreadyChecked.includes(JSON.stringify(neighbor)) &&
                !frontier.includes(JSON.stringify(neighbor)) &&
                airCubesString.includes(JSON.stringify(neighbor))
            ) {
                frontier.push(JSON.stringify(neighbor));
            }
        });
    }

    airCubes.map((cube) => {
        if (!outsideAirCubes.includes(JSON.stringify(cube))) {
            insideAirCubes.push(cube);
        }
    });

    return insideAirCubes;
};

// Part 1

console.time('Time part 1 ');
const answer1 = lavaCubes.map((cube) => surfaceCube(cube, lavaCubesString)).reduce((a, b) => a + b, 0);
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

// Part 2

console.time('Time part 2 ');
const insideAirCubes = getInsideAirCubes(lavaCubes);
const insideAirCubesString = insideAirCubes.map((cube) => JSON.stringify(cube));
const answer2 =
    answer1 - insideAirCubes.map((cube) => surfaceCube(cube, insideAirCubesString)).reduce((a, b) => a + b, 0);
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
