import * as fs from 'fs';

const blueprints = fs.readFileSync('days/day19/input.txt', 'utf-8').trim().split('\n');

// Classes to represent a blueprint and a game
class Blueprint {
    constructor(costRobotOre, costRobotClay, costRobotObsidian, costRobotGeode, id) {
        this.costRobotOre = costRobotOre;
        this.costRobotClay = costRobotClay;
        this.costRobotObsidian = costRobotObsidian;
        this.costRobotGeode = costRobotGeode;
        this.id = id;
    }
}

class Game {
    constructor(blueprint, time) {
        this.blueprint = blueprint;

        this.ore = 0;
        this.robotOre = 1;

        this.clay = 0;
        this.robotClay = 0;

        this.obsidian = 0;
        this.robotObsidian = 0;

        this.geode = 0;
        this.robotGeode = 0;

        this.timeLeft = time;
    }
}

// Function which process a whole minute
const passMinute = (game, buyRobotOre, buyRobotClay, buyRobotObsidian, buyRobotGeode) => {
    // Pay the price for the robots
    game.ore = buyRobotOre ? game.ore - game.blueprint.costRobotOre[0] : game.ore;

    game.ore = buyRobotClay ? game.ore - game.blueprint.costRobotClay[0] : game.ore;

    game.ore = buyRobotObsidian ? game.ore - game.blueprint.costRobotObsidian[0] : game.ore;
    game.clay = buyRobotObsidian ? game.clay - game.blueprint.costRobotObsidian[1] : game.clay;

    game.ore = buyRobotGeode ? game.ore - game.blueprint.costRobotGeode[0] : game.ore;
    game.obsidian = buyRobotGeode ? game.obsidian - game.blueprint.costRobotGeode[2] : game.obsidian;

    // Robots do their job
    game.ore += game.robotOre;
    game.clay += game.robotClay;
    game.obsidian += game.robotObsidian;
    game.geode += game.robotGeode;

    // Robots are built
    game.robotOre = buyRobotOre ? game.robotOre + 1 : game.robotOre;
    game.robotClay = buyRobotClay ? game.robotClay + 1 : game.robotClay;
    game.robotObsidian = buyRobotObsidian ? game.robotObsidian + 1 : game.robotObsidian;
    game.robotGeode = buyRobotGeode ? game.robotGeode + 1 : game.robotGeode;

    // Time passes
    game.timeLeft -= 1;
};

// Give all actions possibles according to the current state of a game
const possibilities = (game) => {
    let possibilitiesToPlay = [];

    let maxOreNeeded = Math.max(
        game.blueprint.costRobotOre[0],
        game.blueprint.costRobotClay[0],
        game.blueprint.costRobotObsidian[0],
        game.blueprint.costRobotGeode[0]
    );

    // Build an ore robot
    if (game.ore >= game.blueprint.costRobotOre[0]) {
        if (game.robotOre < maxOreNeeded) {
            possibilitiesToPlay.push([true, false, false, false]);
        }
    }

    // Build a clay robot
    if (game.ore >= game.blueprint.costRobotClay[0]) {
        if (game.robotClay < game.blueprint.costRobotObsidian[1]) {
            possibilitiesToPlay.push([false, true, false, false]);
        }
    }

    // Build an obsidian robot
    if (game.ore >= game.blueprint.costRobotObsidian[0] && game.clay >= game.blueprint.costRobotObsidian[1]) {
        if (game.robotObsidian < game.blueprint.costRobotGeode[2]) {
            possibilitiesToPlay.push([false, false, true, false]);
        }
    }

    // Build a geode robot
    if (game.ore >= game.blueprint.costRobotGeode[0] && game.obsidian >= game.blueprint.costRobotGeode[2]) {
        possibilitiesToPlay.push([false, false, false, true]);
    }

    possibilitiesToPlay.push([false, false, false, false]);

    return possibilitiesToPlay;
};

// For a list of game, return the maximum number of geodes-robots built
const getMaxRobotGeode = (gameList) => {
    let maxRobotGeode = 0;
    gameList.map((game) => {
        if (game.robotGeode > maxRobotGeode) {
            maxRobotGeode = game.robotGeode;
        }
    });
    return maxRobotGeode;
};

// For a list of game, return the maximum number of obsidians-robots built
const getMaxRobotObsi = (gameList) => {
    let maxRobotObsi = 0;
    gameList.map((game) => {
        if (game.robotObsidian > maxRobotObsi) {
            maxRobotObsi = game.robotObsidian;
        }
    });
    return maxRobotObsi;
};

// For a list of game, return the maximum number of clay-robots built
const getMaxRobotClay = (gameList) => {
    let maxRobotClay = 0;
    gameList.map((game) => {
        if (game.robotClay > maxRobotClay) {
            maxRobotClay = game.robotClay;
        }
    });
    return maxRobotClay;
};

// For a list of game, return the maximum number of geodes mined
const getMaxGeodeGame = (gameList) => {
    let maxGame = gameList[0];
    gameList.map((game) => {
        if (game.geode > maxGame.geode) {
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
            let newGame = JSON.parse(JSON.stringify(game));
            passMinute(newGame, ...possibilitiesToPlay[i]);
            newGameList.push(newGame);
        }
    });
    return newGameList;
};

// Give contraints that each game must respect (part 1)
const contraint = (maxRobotClay, maxRobotObsi, maxRobotGeode, game) => {
    let maxOreNeeded = Math.max(
        game.blueprint.costRobotOre[0],
        game.blueprint.costRobotClay[0],
        game.blueprint.costRobotObsidian[0],
        game.blueprint.costRobotGeode[0]
    );

    let contraint = game.robotGeode == maxRobotGeode;

    let contraint2 = game.ore <= maxOreNeeded * 5;

    let contraint3 = true;

    let contraint4 = true;
    if (game.timeLeft <= 15) {
        contraint4 = game.robotObsidian >= parseInt(maxRobotObsi / 2) ? true : false;
    }

    return contraint && contraint2 && contraint3 && contraint4;
};

// Give contraints that each game must respect (part 2)
const contraint2 = (maxRobotClay, maxRobotObsi, maxRobotGeode, game) => {
    let maxOreNeeded = Math.max(
        game.blueprint.costRobotOre[0],
        game.blueprint.costRobotClay[0],
        game.blueprint.costRobotObsidian[0],
        game.blueprint.costRobotGeode[0]
    );

    let contraint = game.robotGeode >= maxRobotGeode - 1;

    let contraint2 = game.ore <= maxOreNeeded * 3;

    let contraint3 = true;
    if (game.timeLeft <= 15) {
        contraint3 = game.robotClay >= parseInt(maxRobotClay / 1.5) ? true : false;
    }

    let contraint4 = true;
    if (game.timeLeft <= 10) {
        contraint4 = game.robotObsidian >= parseInt(maxRobotObsi / 1.5) ? true : false;
    }

    return contraint && contraint2 && contraint3 && contraint4;
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
        return maxGeodeGame.geode * maxGeodeGame.blueprint.id;
    } else {
        return maxGeodeGame.geode;
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
        const game = new Game(blueprint, 24);
        const copyGame = JSON.parse(JSON.stringify(game));
        return playGameBFS(copyGame, 24);
    });
    return quality.reduce((a, b) => a + b, 0);
};

// Give answer for part 2
const part2 = () => {
    const quality = blueprintList2.map((blueprint, id) => {
        console.log('Processing blueprint ' + (id + 1) + ' out of 3');
        const game = new Game(blueprint, 32);
        const copyGame = JSON.parse(JSON.stringify(game));
        return playGameBFS(copyGame, 32);
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

//11m47s
//1m27s
