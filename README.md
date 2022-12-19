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

--

Easy problem

## <b> [--- Day 2 : Rock Paper Scissors ---](https://adventofcode.com/2022/day/2) </b>

--

Learn charCodeAt() method which transforms a letter (char object) into its ASCII code

## <b> [--- Day 3 : Rucksack Reorganization ---](https://adventofcode.com/2022/day/3) </b>

Learn to use Set objects which are data structures without duplicates.
Interesting syntax to find the intersection of two sets :

```js
intersection = new Set([...set1].filter((x) => set2.includes(x)));
```

## <b> [--- Day 4: Camp Cleanup ---](https://adventofcode.com/2022/day/4) </b>

Easy problem

## <b> Day 5 </b>

The format of the input is hard to work with. When the data are correctly processed, the problem is easy.

/!\ .trim() which removes spaces at the beginning of the file, was an issue to process the input

## <b> Day 6 </b>

Easy problem

## <b> Day 7 </b>

Interesting problem about file and folder. Seems hard at first sight but a good data structure makes the problem easier.
Here, I choose to save the path of each folder in a Map. Then, for each file, I add its size to the value associated with the path of the folder in which it is.

## <b> Day 8 </b>

To know if a tree is visible from one side, I search the nearest tree on the same side which is taller than the one we are studying. That's why I use for loops to stop the search when I find the nearest tallest tree on a side.

## <b> Day 9 </b>

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

## <b> Day 10 </b>

Easy problem

## <b> Day 11 </b>

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

## <b> Day 12 </b>

Solution given by a Dijkstra algorithm. Works by considering a frontier made of cells which will expend by adding the unvisited neighbours of the previous frontier. The first cell to reach the target cell will stop the algorithm and give the shortest path.

## <b> Day 13 </b>

--

Problem without any difficulties when we know the JSON.parse() method.

- Part 1 : Parsing with this method. Then compare recursively each array.

- Part 2 : The Array.sort() method enables the user to give the criteria of sorting. As a consequence, we can use the function created in part 1 to sort all the arrays as wanted.

I can improve the part 1 function which is today too sophisticated for what it does.

## Day 14 to 19 done. README will be updated soon

## Advent of Code 2020

The first two problems done in JavaScript and TypeScript
