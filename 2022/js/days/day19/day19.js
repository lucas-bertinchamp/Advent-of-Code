import * as fs from 'fs';
import _ from 'lodash';

const blueprints = fs.readFileSync('days/day19/input.txt', 'utf-8').trim().split('\n');

class Blueprint {
    constructor(costRobotOre, costRobotClay, costRobotObsidian, costRobotGeode, id) {
        this.costRobotOre = costRobotOre;
        this.costRobotClay = costRobotClay;
        this.costRobotObsidian = costRobotObsidian;
        this.costRobotGeode = costRobotGeode;
        this.id = id;
    }
}

// game : [blueprint, ore, clay, obsidian, geode, robotOre, robotClay, robotObsidian, robotGeode, timeLeft]

// Function which process a whole minute
const passMinute = (
    blueprint,
    currentOre,
    currentClay,
    currentObsidian,
    currentGeode,
    currentRobotOre,
    currentRobotClay,
    currentRobotObsidian,
    currentRobotGeode,
    currentTimeLeft,
    buyRobotOre,
    buyRobotClay,
    buyRobotObsidian,
    buyRobotGeode
) => {
    let newGame = [
        blueprint,
        currentOre,
        currentClay,
        currentObsidian,
        currentGeode,
        currentRobotOre,
        currentRobotClay,
        currentRobotObsidian,
        currentRobotGeode,
        currentTimeLeft,
    ];
    // Pay the price for the robots
    newGame[1] = buyRobotOre ? newGame[1] - newGame[0].costRobotOre[0] : newGame[1];

    newGame[1] = buyRobotClay ? newGame[1] - newGame[0].costRobotClay[0] : newGame[1];

    newGame[1] = buyRobotObsidian ? newGame[1] - newGame[0].costRobotObsidian[0] : newGame[1];
    newGame[2] = buyRobotObsidian ? newGame[2] - newGame[0].costRobotObsidian[1] : newGame[2];

    newGame[1] = buyRobotGeode ? newGame[1] - newGame[0].costRobotGeode[0] : newGame[1];
    newGame[3] = buyRobotGeode ? newGame[3] - newGame[0].costRobotGeode[2] : newGame[3];

    // Robots do their job
    newGame[1] += newGame[5];
    newGame[2] += newGame[6];
    newGame[3] += newGame[7];
    newGame[4] += newGame[8];

    // Robots are built
    newGame[5] = buyRobotOre ? newGame[5] + 1 : newGame[5];
    newGame[6] = buyRobotClay ? newGame[6] + 1 : newGame[6];
    newGame[7] = buyRobotObsidian ? newGame[7] + 1 : newGame[7];
    newGame[8] = buyRobotGeode ? newGame[8] + 1 : newGame[8];

    // Time passes
    newGame[9] -= 1;

    return newGame;
};

const possibilities = (game) => {
    let possibilitiesToPlay = [];

    let maxOreNeeded = Math.max(
        game[0].costRobotOre[0],
        game[0].costRobotClay[0],
        game[0].costRobotObsidian[0],
        game[0].costRobotGeode[0]
    );

    // Build an ore robot
    if (game[1] >= game[0].costRobotOre[0]) {
        if (game[5] < maxOreNeeded) {
            possibilitiesToPlay.push([true, false, false, false]);
        }
    }

    // Build a clay robot
    if (game[1] >= game[0].costRobotClay[0]) {
        if (game[6] < game[0].costRobotObsidian[1]) {
            possibilitiesToPlay.push([false, true, false, false]);
        }
    }

    // Build an obsidian robot
    if (game[1] >= game[0].costRobotObsidian[0] && game[2] >= game[0].costRobotObsidian[1]) {
        if (game[7] < game[0].costRobotGeode[2]) {
            possibilitiesToPlay.push([false, false, true, false]);
        }
    }

    possibilitiesToPlay.push([false, false, false, false]);

    // Build a geode robot
    if (game[1] >= game[0].costRobotGeode[0] && game[3] >= game[0].costRobotGeode[2]) {
        possibilitiesToPlay = [[false, false, false, true]];
    }

    return possibilitiesToPlay;
};

// For a list of game, return the maximum number of geodes-robots built
const getMaxRobotGeode = (gameList) => {
    let maxRobotGeode = 0;
    gameList.map((game) => {
        if (game[8] > maxRobotGeode) {
            maxRobotGeode = game[8];
        }
    });
    return maxRobotGeode;
};

// For a list of game, return the maximum number of obsidians-robots built
const getMaxRobotObsi = (gameList) => {
    let maxRobotObsi = 0;
    gameList.map((game) => {
        if (game[7] > maxRobotObsi) {
            maxRobotObsi = game[7];
        }
    });
    return maxRobotObsi;
};

// For a list of game, return the maximum number of clay-robots built
const getMaxRobotClay = (gameList) => {
    let maxRobotClay = 0;
    gameList.map((game) => {
        if (game[6] > maxRobotClay) {
            maxRobotClay = game[6];
        }
    });
    return maxRobotClay;
};

// For a list of game, return the maximum number of geodes mined
const getMaxGeodeGame = (gameList) => {
    let maxGame = gameList[0];
    gameList.map((game) => {
        if (game[4] > maxGame[4]) {
            maxGame = game;
        }
    });
    return maxGame;
};

// Play all the possible actions for a gameList and returns the new list of game (timeLeft - 1)
const playListGame = (gameList) => {
    let newGameList = [];
    gameList.map((game) => {
        let possibilitiesToPlay = possibilities(game);
        for (let i = 0; i < possibilitiesToPlay.length; i++) {
            let newGame = passMinute(...game, ...possibilitiesToPlay[i]);
            newGameList.push(newGame);
        }
    });
    return newGameList;
};

// Give contraints that each game must respect (part 1)
const contraint = (maxRobotClay, maxRobotObsi, maxRobotGeode, game) => {
    let maxOreNeeded = Math.max(
        game[0].costRobotOre[0],
        game[0].costRobotClay[0],
        game[0].costRobotObsidian[0],
        game[0].costRobotGeode[0]
    );

    let contraint = game[8] == maxRobotGeode;

    let contraint2 = game[1] <= maxOreNeeded * 4;

    let contraint3 = true;
    if (game[9] <= 15) {
        contraint3 = game[7] >= parseInt(maxRobotObsi / 1.5) ? true : false;
    }
    return contraint && contraint2 && contraint3;
};

// Give contraints that each game must respect (part 2)
const contraint2 = (maxRobotClay, maxRobotObsi, maxRobotGeode, game) => {
    let maxOreNeeded = Math.max(
        game[0].costRobotOre[0],
        game[0].costRobotClay[0],
        game[0].costRobotObsidian[0],
        game[0].costRobotGeode[0]
    );

    let contraint = game[8] >= maxRobotGeode - 1;

    let contraint2 = game[1] <= maxOreNeeded * 4;

    let contraint3 = true;
    if (game[9] <= 23) {
        contraint3 = game[7] >= parseInt(maxRobotObsi / 1.5) ? true : false;
    }

    return contraint && contraint2 && contraint3;
};

// Run a BFS algorithm to find the maximum geodes which can be opened ; need to respect the contraints
const playGameBFS = (initialGame, timelimit) => {
    let listGame = [initialGame];
    for (let i = 0; i < timelimit; i++) {
        listGame = playListGame(listGame);

        let maxRobotGeode = getMaxRobotGeode(listGame);
        let maxRobotObsi = getMaxRobotObsi(listGame);
        let maxRobotClay = getMaxRobotClay(listGame);

        listGame = listGame.filter((game) => {
            if (timelimit == 24) {
                return contraint(maxRobotClay, maxRobotObsi, maxRobotGeode, game);
            } else {
                return contraint2(maxRobotClay, maxRobotObsi, maxRobotGeode, game);
            }
        });
    }

    let maxGeodeGame = getMaxGeodeGame(listGame);
    if (timelimit == 24) {
        return maxGeodeGame[4] * maxGeodeGame[0].id;
    } else {
        return maxGeodeGame[4];
    }
};

// Initialization of blueprints lists
const blueprintList = blueprints.map((blueprint, id) => {
    const splited = blueprint.split('robot');
    const robotOre = [parseInt(splited[1].split(' ')[2]), 0, 0];
    const robotClay = [parseInt(splited[2].split(' ')[2]), 0, 0];
    const robotObsidian = [parseInt(splited[3].split(' ')[2]), parseInt(splited[3].split(' ')[5]), 0];
    const robotGeode = [parseInt(splited[4].split(' ')[2]), 0, parseInt(splited[4].split(' ')[5])];
    return new Blueprint(robotOre, robotClay, robotObsidian, robotGeode, id + 1);
});

const blueprintList2 = blueprintList.slice(0, 3);

// Give answer for part 1
const part1 = () => {
    const quality = blueprintList.map((blueprint, id) => {
        console.log('Processing blueprint ' + (id + 1) + ' out of 30');
        const game = [blueprint, 0, 0, 0, 0, 1, 0, 0, 0, 24];
        return playGameBFS(game, 24);
    });
    return quality.reduce((a, b) => a + b, 0);
};

// Give answer for part 2
const part2 = () => {
    const quality = blueprintList2.map((blueprint, id) => {
        console.log('Processing blueprint ' + (id + 1) + ' out of 3');
        const game = [blueprint, 0, 0, 0, 0, 1, 0, 0, 0, 32];
        return playGameBFS(game, 32);
    });
    return quality.reduce((a, b) => a * b, 1);
};

console.time('Time part 1 ');
let answer1 = part1();
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

console.time('Time part 2 ');
let answer2 = part2();
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
