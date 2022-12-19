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

## Day 1

Easy problem

## Day 2

Learn charCodeAt() method which transforms a letter (char object) into its ASCII code

## Day 3

Learn to use Set objects which are data structures without duplicates.
Interesting syntax to find the intersection of two sets :

```js
intersection = new Set([...set1].filter((x) => set2.includes(x)));
```

## Day 4

Easy problem

## Day 5

The format of the input is hard to work with. When the data are correctly processed, the problem is easy.

/!\ .trim() which removes spaces at the beginning of the file, was an issue to process the input

## Day 6

Easy problem

## Day 7 

Interesting problem about file and folder. Seems hard at first sight but a good data structure makes the problem easier.
Here, I choose to save the path of each folder in a Map. Then, for each file, I add its size to the value associated with the path of the folder in which it is.

## Day 8

To know if a tree is visible from one side, I search the nearest tree on the same side which is taller than the one we are studying. That's why I use for loops to stop the search when I find the nearest tallest tree on a side.

## Day 9

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

## Day 10

Easy problem

## Day 11

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

## Day 12

Solution given by a Breadth First Search (BFS) algorithm. Works by considering a frontier made of cells which will expend by adding the unvisited neighbours of the previous frontier. The first cell to reach the target cell will stop the algorithm and give the shortest path.

## Day 13 to 17 done. README will be updated soon

## Advent of Code 2020

The first two problems done in JavaScript and TypeScript
