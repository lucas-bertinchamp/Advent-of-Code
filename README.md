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

## Day 16 to 19 done. README will be updated soon

## Advent of Code 2020

The first two problems done in JavaScript and TypeScript
