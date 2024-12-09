from timeit import default_timer as timer
import os
from itertools import permutations
import random
from collections import defaultdict, deque
from functools import cmp_to_key


def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.read()
        rules = []
        updates = []
        update_bool = False
        for line in lines.split("\n"):
            if line == "":
                update_bool = True
            else:
                if not update_bool:
                    rules.append(list(map(int, line.split("|"))))
                else:
                    values = list(map(int, line.split(",")))
                    updates.append(values)
        return rules, updates
    
def test_update(rules, update):
    for r in rules:
        if r[0] not in update or r[1] not in update:
            continue
        if update.index(r[0]) > update.index(r[1]):
            return False
    return True

def compare(a, b, rules):
    for r in rules:
        if r[0] == a and r[1] == b:
            return -1
        if r[0] == b and r[1] == a:
            return 1
    return 0
    
def part1(file_path):
    rules, updates = parse_input(file_path)
    correct = 0
    for update in updates:
        if test_update(rules,update):
            correct += update[len(update) // 2]
    return correct

def part2(file_path):
    rules, updates = parse_input(file_path)
    correct = 0
    for update in updates:
        if not test_update(rules,update):
            corrected = sorted(update, key=cmp_to_key(lambda a, b: compare(a, b, rules)))
            correct += corrected[len(update) // 2]
    return correct
    
if __name__ == '__main__':
    day = "05"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)