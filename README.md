# Advent-of-Code

## Advent of Code 2022

Language : JavaScript (never used before)

From the root of the folder, do :

```
cd 2022/js
```

Then to execute the code of the XX day

```
npm run dayXX
```

## <b> [--- Day 1 : Calorie Counting ---](https://adventofcode.com/2022/day/1) </b>

Easy problem

## <b> [--- Day 2 : Rock Paper Scissors ---](https://adventofcode.com/2022/day/2) </b>

Learn charCodeAt() method which transforms a letter (char object) into its ASCII code

## <b> [--- Day 3 : Rucksack Reorganization ---](https://adventofcode.com/2022/day/3) </b>

Learn to use Set objects which are data structures without duplicates.
Interesting syntax to find the intersection of two sets :

```js
intersection = new Set([...set1].filter((x) => set2.includes(x)));
```

## <b> [--- Day 4 : Camp Cleanup ---](https://adventofcode.com/2022/day/4) </b>

Easy problem

## <b> [--- Day 5 : Supply Stacks ---](https://adventofcode.com/2022/day/5) </b>

The format of the input is hard to work with. When the data are correctly processed, the problem is easy.

/!\ .trim() which removes spaces at the beginning of the file, was an issue to process the input

## <b> [--- Day 6 : Tuning Trouble ---](https://adventofcode.com/2022/day/6) </b>

Easy problem

## <b> [--- Day 7 : No Space Left On Device ---](https://adventofcode.com/2022/day/7) </b>

Interesting problem about file and folder. Seems hard at first sight but a good data structure makes the problem easier.
Here, I choose to save the path of each folder in a Map. Then, for each file, I add its size to the value associated with the path of the folder in which it is.

## <b> [--- Day 8 : Treetop Tree House ---](https://adventofcode.com/2022/day/8) </b>

To know if a tree is visible from one side, I search the nearest tree on the same side which is taller than the one we are studying. That's why I use for loops to stop the search when I find the nearest tallest tree on a side.

## <b> [--- Day 9 : Rope Bridge ---](https://adventofcode.com/2022/day/9) </b>

I chose to represent each node by a object Point with this.ref, the previous node of the rope.

```js
class Point {
  constructor(x, y, p) {
    this.x = x;
    this.y = y;
    this.ref = p;
  }
}
```

So, each point has a reference on which its movement will depend. By calculating the euclidian distance between a point and its referent, we can move this point correctly. Step by step, the complete rope will move according to the constraints of the problem.

## <b> [--- Day 10 : Cathode-Ray Tube ---](https://adventofcode.com/2022/day/10) </b>

Easy problem

## <b> [--- Day 11 : Monkey in the Middle ---](https://adventofcode.com/2022/day/11) </b>

I decided to represent each monkey by an object :

```js
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
```

When the parsing comes, I will be able to set each action of the monkeys.

## <b> [--- Day 12 : Hill Climbing Algorithm ---](https://adventofcode.com/2022/day/12) </b>

Solution given by a Dijkstra algorithm. Works by considering a frontier made of cells which will expend by adding the unvisited neighbours of the previous frontier. The first cell to reach the target cell will stop the algorithm and give the shortest path.

## <b> [--- Day 13 : Distress Signal ---](https://adventofcode.com/2022/day/13) </b>

Problem without any difficulties when we know the JSON.parse() method.

- Part 1 : Parsing with this method. Then compare recursively each array.

- Part 2 : The Array.sort() method enables the user to give the criteria of sorting. As a consequence, we can use the function created in part 1 to sort all the arrays as wanted.

I can improve the part 1 function which is today too sophisticated for what it does.

## <b> [--- Day 14 : Regolith Reservoir ---](https://adventofcode.com/2022/day/14) </b>

For the two parts, I represented the grid as a Set. Each element of the set can be a sand or a wall.

- Part 1 : When a sand falls, we need to watch in the grid if something is behind him. If it's the case, we look the bottom diagonals. I stop the algorithm when a sand reaches a limit given by the lowest wall.

- Part 2 : Repeat the same algorithm, except that the limit will stop the movement of the sand, not the algorithm. Stop when a sand blocks the sand entrance.

## <b> [--- Day 15 : Beacon Exclusion Zone ---](https://adventofcode.com/2022/day/15) </b>

First problem in which an optimization needs to be found to complete the execution of the algorithm.

- Part 1 : Simply consider the row of interest and, for each sensor, indicate which places of the row is overlapped by the sensor's detection area.

- Part 2 : Here, we need to find the single place which is not covered by any sensor. Testing each place will give an exception (16 000 000 000 000 possible positions). I have found that the position we are looking for is necessarly at the edge of a sensor's detection area. So we can limit the searches to the union of the points on the edge of each sensors.

Algorithm quite long (5 min for part 2). I think we can improve it by looking the intersection of these sets. In fact, the position searched must be simultaneously at the edge of 2 sensor's detection areas.

## <b> [--- Day 16 : Proboscidea Volcanium ---](https://adventofcode.com/2022/day/16) </b>

The first problem which was actually hard to solve. I had to test several solutions before finding the right one. I decided to consider the problem as a tree in which the root is the initial state and each branch is a possible movement. So I used a BFS algorithm which explore the tree to find the best solution. (I used a criteria to remove the branches which are not interesting)

- Part 1 : I explore the tree to find all the possibles final states. During each step (each minute), I remove the states which are not interesting. That is to say, I calculate the maximum score which can be reached from the current state. If the current score plus the maximum score available is lower than the best score already found in one state, I remove the state.

- Part 2 : Same principle as part 1. I just adapted the criteria to calculate the maximum score available considering both the human and the elephant.

## <b> [--- Day 17 : Pyroclastic Flow ---](https://adventofcode.com/2022/day/17) </b>

- Part 1 : I did some utility functions to create each piece of the game and to move them. Then, I created them and I moved them until the game is over. I used a Set to represent the game. The answer is the maximum height of the block.

- Part 2 : We have to find a cycle in the game. When we find a cycle, we can calculate easily the height of a cycle and then the height of the total game by multiplying the number of cycles by the height of a cycle and adding the height of the game before the cycle and the remaining pieces.

## <b> [--- Day 18 : Boiling Boulders ---](https://adventofcode.com/2022/day/18) </b>

Quite easy problem.

- Part 1 : I represent the space as a Set. Each element of the set is a point. For each point, I search the number of neighbours which are air. The sum of all these numbers gives the surface of the lava.

- Part 2 : I consider an air cube surronding the lava. With a BFS algorithm, I get the number of air cubes which are outside the lava. The others one are inside the lava. We have to remove the surface of air cubes which are inside the lava to the total surface.

## <b> [--- Day 19 : Not Enough Minerals ---](https://adventofcode.com/2022/day/19) </b>

The second problem which was hard to solve (and may be the most difficult of the adventure). It was necessary to find a solution which was not too long to execute by finding optimizations.
For the two parts, I calculate all the possible paths from the initial state to the final state.

Below are the optimizations I found :

- Do not create robot if we can create a factory with the material of each type in one minute.
- If we can create a geode factory, do it.
- Do not stack too much ore. If the number of ore stock is 4 times the maximum number of ore needed to create a factory, remove this state.
- When there is less than 15 minutes (23 in part 2) remove the states in which the number of obsidian factories is lower than 1.5 times the maximum number of obsidian factories from the states found. Coherent hypothesis because we need to create a lot of obsidian factories quickly to create a lot of geode factories.
- Remove the states in which the number of geode factories is not maximal. Empirical hypothesis which seems to work well here.

The first implementation of the algorithm was long to execute (11 min for part 1). I have refactored the code to improve the execution time. (20 seconds for both part 1 and 2)

## <b> [--- Day 20 : Grove Positioning System ---](https://adventofcode.com/2022/day/20) </b>

Problem easier than the previous one. Need to worry about the index of the permutation in array.
Nothing more to say.

## <b> [--- Day 21 : Monkey Math ---](https://adventofcode.com/2022/day/21) </b>

- Part 1 : I stock all the values of the monkeys in a map (key = monkey's name, value = monkey's value). I stock all the monkey which are waiting for values to be yield. Then, for each monkey which is waiting, I check if all the monkeys which are needed to calculate the value of the current monkey are already yield. If it's the case, I calculate the value of the current monkey and I remove it from the waiting list. I repeat this process until the waiting list is empty.

- Part 2 : I reversed the principle of part 1. I begin with the root monkey and I recursively calculate the value of each monkey which is needed to calculate the value of the root monkey. I stop the recursion when I find the humn monkey. I return the value of the human monkey.

## <b> [--- Day 22 : Monkey Map ---](https://adventofcode.com/2022/day/22) </b>

- Part 1 : I stock the map in a Set. If the player wants to go to a place which is not in the map, I calculate the coordinates of the place which is on the other side of the map.

- Part 2 : Not satisfied with my solution and I think it's possible to do better. I calculate manually the position where the player needs to go if he wants to go to the other side of the map.

## <b> [--- Day 23: Unstable Diffusion ---](https://adventofcode.com/2022/day/23) </b>

Not a difficult problem. I used a Set to represent the elves.

- Part 1 : For each elf, I look for its neighbours. According to the criteria given in the problem, I move the elf to the right place. I repeat this process 20 times.

- Part 2 : I repeat the same process as part 1 but I repeat until the elves are stable. The algorithm given in part 1 was enough to find the stable position quite quickly.

## <b> [--- Day 24 : Blizzard Basin ---](https://adventofcode.com/2022/day/24) </b>

When a first look at the problem, I thought it was as difficult as the 16 and 19 problems. But it was not the case because the number of states is limited by the number of positions of the player.

- Part 1 : As in problem 16 and 19, I used a BFS algorithm to find all the possible states minutes by minutes. We stop when the player is in the final position. The answer is the number of minutes needed to reach the final position.

- Part 2 : I used the same algorithm as part 1 but I implemented an aim position. I stop the algorithm when the player is in the aim position. So the answer is the number of minutes needed to reach the end, then the beginning and finally the end position.

## <b> [--- Day 25 : Full of Hot Air ---](https://adventofcode.com/2022/day/24) </b>

Easy problem of conversion between bases.

I converted the numbers given in Snafu base to decimal base by successively multiplying each digit by the power of the base.
After that, I sum all the numbers and I convert the result to Snafu base. (a bit more complicated this way, but the principle is just the reverse of the first step)

## Advent of Code 2020

The first two problems done in JavaScript and TypeScript
