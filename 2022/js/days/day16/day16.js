import * as fs from 'fs';

const valves = fs.readFileSync('days/day16/input.txt', 'utf-8').trim().split('\n');

//Class to represent a valve
class valve {
    constructor(name, flow, neighbors) {
        this.name = name;
        this.flow = parseInt(flow);
        this.neighbors = neighbors;
        this.activated = this.flow > 0 ? false : true;
    }
}

//Class to represent a game
class game {
    constructor(valves, currentPostion, elephantPosition, time, score, playerFullTime, elephantFullTime) {
        this.valves = valves;

        this.currentPostion = currentPostion;
        this.elephantPosition = elephantPosition;

        this.currentTime = time;
        this.finished = false;
        this.score = parseInt(score);

        //The time left for the player and the elephant
        this.playerFullTime = playerFullTime;
        this.elephantFullTime = elephantFullTime;

        //The time before the player and the elephant can move again
        this.playerTime = 0;
        this.elephantTime = 0;
    }
}

//Check if all valves are activated
const isAllActivated = (game) => {
    let boolean = true;
    game.valves.map((v) => {
        if (v.activated == false) {
            boolean = false;
        }
    });
    return boolean;
};

//Check if the process is finished by checking if all possible games are finished
const allFinished = (listGames) => {
    let boolean = true;
    listGames.map((g) => {
        if (g.finished == false) {
            boolean = false;
        }
    });
    return boolean;
};

//Get the list of non activated valves
const getNonActivated = (game) => {
    let nonActivated = [];
    game.valves.map((v) => {
        if (v.activated == false) {
            nonActivated.push(v.name);
        }
    });
    return nonActivated;
};

//Get the distance between two valves on the map
const distanceToPosition = (currentPos, positionSearched, currentGame) => {
    let alreadyVisited = [];
    let frontier = [currentPos];
    let nodes = new Map();
    nodes.set(currentPos, 0);

    let current = frontier.shift();
    while (current != positionSearched) {
        let neighbors = currentGame.valves[index.get(current)].neighbors;
        neighbors.map((n) => {
            if (!alreadyVisited.includes(n)) {
                frontier.push(n);
                nodes.set(n, nodes.get(current) + 1);
            }
        });
        alreadyVisited.push(current);
        current = frontier.shift();
    }

    return nodes.get(positionSearched);
};

//Returns the list of possible games, each possible game comes from one different movement of the player
const nextPosition = (previousGame) => {
    let possibleGames = [];

    let possibleDestination = getNonActivated(previousGame);

    [...possibleDestination].map((p) => {
        let distance = distanceMap.get(previousGame.currentPostion + p);
        if (previousGame.currentTime - distance - 1 >= 0) {
            let valvesCopy = JSON.parse(JSON.stringify(previousGame.valves));
            let newGame = new game(
                valvesCopy,
                p,
                previousGame.elephantPosition,
                previousGame.currentTime - distance - 1,
                previousGame.score
            );
            newGame.valves[index.get(p)].activated = true;
            newGame.score += parseInt(newGame.valves[index.get(p)].flow) * newGame.currentTime;
            possibleGames.push(newGame);
        }
    });

    return possibleGames;
};

//Returns a majorant of the score that can be obtained by the player in the current game (part 1)
const remainingScore = (currentGame) => {
    let possibleDestination = getNonActivated(currentGame);

    let remaining = 0;

    let score = [...possibleDestination].map((p) => {
        let d1 = distanceMap.get(currentGame.currentPostion + p);
        if (currentGame.currentTime - d1 - 1 >= 0) {
            return currentGame.valves[index.get(p)].flow * (currentGame.currentTime - d1 - 1);
        } else {
            return 0;
        }
    });

    remaining = score.reduce((a, b) => a + b, 0);

    return remaining;
};

//Returns a majorant of the score that can be obtained by the player in the current game (part 2)
const remainingScore2 = (currentGame) => {
    let possibleDestination = getNonActivated(currentGame);

    let remaining = 0;

    let score = [...possibleDestination].map((p) => {
        let d1 = distanceMap.get(currentGame.currentPostion + p);
        let d2 = distanceMap.get(currentGame.elephantPosition + p);
        if (d1 < d2) {
            if (currentGame.playerFullTime - d1 - 1 >= 0) {
                return currentGame.valves[index.get(p)].flow * (currentGame.playerFullTime - d1 - 1);
            } else {
                return 0;
            }
        } else {
            if (currentGame.elephantFullTime - d2 - 1 >= 0) {
                return currentGame.valves[index.get(p)].flow * (currentGame.elephantFullTime - d2 - 1);
            } else {
                return 0;
            }
        }
    });

    remaining = score.reduce((a, b) => a + b, 0);

    return remaining;
};

//Removes the games that are impossible to get a score higher than the best score found so far (by considering the remaining score)
const removeImpossible = (listGames, limit, part2) => {
    let newList = listGames.filter((g) => {
        let remaining = part2 ? remainingScore2(g) : remainingScore(g);
        return g.score + remaining >= limit;
    });
    return newList;
};

//Returns the list of possible games, each possible game comes from one different movement of both the player and the elephant (part 2)
const nextPosition2 = (previousGame) => {
    let possibleGames = [];
    if (previousGame.playerTime <= 0 && previousGame.elephantTime <= 0) {
        let possibleDestinationPlayer = getNonActivated(previousGame);
        let possibleDestinationElephant = getNonActivated(previousGame);
        let alreadyVisitedByPlayer = [];

        [...possibleDestinationPlayer].map((possiblePlayer) => {
            alreadyVisitedByPlayer.push(possiblePlayer);
            [...possibleDestinationElephant].map((possibleElephant) => {
                if (!alreadyVisitedByPlayer.includes(possibleElephant)) {
                    let valvesCopy = JSON.parse(JSON.stringify(previousGame.valves));
                    let newGame = new game(
                        valvesCopy,
                        previousGame.currentPostion,
                        previousGame.elephantPosition,
                        previousGame.currentTime,
                        previousGame.score,
                        previousGame.playerFullTime,
                        previousGame.elephantFullTime
                    );

                    let distanceElephant = distanceMap.get(previousGame.elephantPosition + possibleElephant);
                    let distancePlayer = distanceMap.get(previousGame.currentPostion + possiblePlayer);

                    if (previousGame.playerFullTime - distancePlayer - 1 >= 0) {
                        newGame.currentPostion = possiblePlayer;
                        newGame.valves[index.get(possiblePlayer)].activated = true;
                        newGame.playerFullTime -= distancePlayer + 1;
                        newGame.score +=
                            parseInt(newGame.valves[index.get(possiblePlayer)].flow) * newGame.playerFullTime;
                        newGame.playerTime = distancePlayer + 1;
                    }

                    if (previousGame.elephantFullTime - distanceElephant - 1 >= 0) {
                        newGame.elephantPosition = possibleElephant;
                        newGame.valves[index.get(possibleElephant)].activated = true;
                        newGame.elephantFullTime -= distanceElephant + 1;
                        newGame.score +=
                            parseInt(newGame.valves[index.get(possibleElephant)].flow) * newGame.elephantFullTime;
                        newGame.elephantTime = distanceElephant + 1;
                    }

                    possibleGames.push(newGame);
                }
            });
        });
    } else if (previousGame.playerTime <= 0) {
        let possibleDestinationPlayer = getNonActivated(previousGame);

        possibleDestinationPlayer = possibleDestinationPlayer.filter(
            (possiblePlayer) => possiblePlayer != previousGame.elephantPosition
        );

        [...possibleDestinationPlayer].map((possiblePlayer) => {
            let distance = distanceMap.get(previousGame.currentPostion + possiblePlayer);
            if (previousGame.playerFullTime - distance - 1 >= 0) {
                let valvesCopy = JSON.parse(JSON.stringify(previousGame.valves));
                let newGame = new game(
                    valvesCopy,
                    possiblePlayer,
                    previousGame.elephantPosition,
                    previousGame.currentTime - distance - 1,
                    previousGame.score,
                    previousGame.playerFullTime - distance - 1,
                    previousGame.elephantFullTime
                );

                newGame.valves[index.get(possiblePlayer)].activated = true;
                newGame.score += parseInt(newGame.valves[index.get(possiblePlayer)].flow) * newGame.playerFullTime;
                newGame.playerTime = distance + 1;
                possibleGames.push(newGame);
            }
        });
    } else if (previousGame.elephantTime <= 0) {
        let possibleDestinationElephant = getNonActivated(previousGame);

        possibleDestinationElephant = possibleDestinationElephant.filter(
            (possibleElephant) => possibleElephant != previousGame.currentPostion
        );

        [...possibleDestinationElephant].map((possibleElephant) => {
            let distance = distanceMap.get(previousGame.elephantPosition + possibleElephant);

            if (previousGame.elephantFullTime - distance - 1 >= 0) {
                let valvesCopy = JSON.parse(JSON.stringify(previousGame.valves));
                let newGame = new game(
                    valvesCopy,
                    previousGame.currentPostion,
                    possibleElephant,
                    previousGame.currentTime,
                    previousGame.score,
                    previousGame.playerFullTime,
                    previousGame.elephantFullTime - distance - 1
                );

                newGame.valves[index.get(possibleElephant)].activated = true;
                newGame.score += parseInt(newGame.valves[index.get(possibleElephant)].flow) * newGame.elephantFullTime;
                newGame.elephantTime = distance + 1;
                possibleGames.push(newGame);
            }
        });
    } else {
        possibleGames.push(previousGame);
    }

    previousGame.elephantTime--;
    previousGame.playerTime--;

    return possibleGames;
};

//Returns the best score of the list of games
const getBestScore = (listGames) => {
    let bestScore = 0;
    listGames.map((g) => {
        if (g.score > bestScore) {
            bestScore = g.score;
        }
    });
    return bestScore;
};

//Launch the algorithm by testing all the possible moves
const play = (initialGame, part2) => {
    const step = (listGames) => {
        if (allFinished(listGames)) {
            return listGames;
        }
        let newGames = [];
        listGames.map((g) => {
            if (g.finished) {
                newGames.push(g);
            } else {
                if (g.currentTime <= 0) {
                    g.finished = true;
                    newGames.push(g);
                } else if (isAllActivated(g)) {
                    g.finished = true;
                    newGames.push(g);
                } else {
                    let getNextPostion = part2 ? nextPosition2(g) : nextPosition(g);
                    if (getNextPostion.length == 0) {
                        g.finished = true;
                        newGames.push(g);
                    } else {
                        newGames.push(...getNextPostion);
                    }
                }
            }
        });

        newGames = removeImpossible(newGames, getBestScore(newGames), part2);
        return step(newGames);
    };

    return step([initialGame]);
};

// Initialisation
const index = new Map();

const distanceMap = new Map();

const game1 = new game([], 'AA', 'AA', 30, 0, 26, 26);

valves.map((v, i) => {
    let parts = v.split(';');
    let name = parts[0].split(' ')[1];
    let flow = parseInt(parts[0].split(' ')[4].split('=')[1]);
    let lengthSecondPart = parts[1].split(' ').length;
    let neighbors = parts[1]
        .split(' ')
        .slice(5, lengthSecondPart)
        .map((n) => n.replace(',', ''));

    let currentValve = new valve(name, flow, neighbors);
    game1.valves.push(currentValve);
    index.set(currentValve.name, i);
});

let valveName = [...index.keys()];
for (let i = 0; i < valveName.length; i++) {
    for (let j = 0; j < valveName.length; j++) {
        distanceMap.set(valveName[i] + valveName[j], distanceToPosition(valveName[i], valveName[j], game1));
    }
}

// Part 1

console.time('Time part 1 ');
let allGames = play(game1, false);
let answer1 = getBestScore(allGames);
console.timeEnd('Time part 1 ');
console.log('Answer part 1 : ' + answer1);

// Part 2

console.time('Time part 2 ');
let allGames2 = play(game1, true);
let answer2 = getBestScore(allGames2);
console.timeEnd('Time part 2 ');
console.log('Answer part 2 : ' + answer2);
