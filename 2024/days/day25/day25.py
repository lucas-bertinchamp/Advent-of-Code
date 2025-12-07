import itertools
from timeit import default_timer as timer
import os


def parse_input(file_path):
    allKeys = set()
    allLocks = set()
    currentPattern = [-1] * 5
    currentLine = 0
    isKey = False
    with open(file_path, 'r') as file:
        for line in file.readlines():
            if line == "\n":
                currentLine = 0
                if isKey:
                    allKeys.add(tuple(currentPattern))
                else:
                    allLocks.add(tuple(currentPattern))
                currentPattern = [-1] * 5
                continue

            elif currentLine == 0:
                isKey = False if line == "#####\n" else True

            for i, char in enumerate(line.strip()):
                if char == "#":
                    currentPattern[i] += 1

            currentLine += 1

    if isKey:
        allKeys.add(tuple(currentPattern))
    else:
        allLocks.add(tuple(currentPattern))

    return allKeys, allLocks


def part1(file_path):
    keys, locks = parse_input(file_path)
    print("Keys:", keys)
    print("Locks:", locks)
    total = 0
    for key, lock in itertools.product(keys, locks):
        sumPair = [ key[i] + lock[i] for i in range(5)]
        if any(x > 5 for x in sumPair):
            continue
        else:
            total += 1

    return total



if __name__ == '__main__':
    day = "25"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'

    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            print("File not found:", file)
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
