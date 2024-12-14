from timeit import default_timer as timer
import os
from fractions import Fraction

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    
    machine = []
    current_machine = []
    for i, line in enumerate(lines):
        if "Button" in line:
            line = line.split(": ")[1].strip().split(", ")
            current_machine += [int(line[0].split("+")[1]), int(line[1].split("+")[1])]
        elif "Prize" in line:
            line = line.split(": ")[1].strip().split(", ")
            current_machine += [int(line[0].split("=")[1]), int(line[1].split("=")[1])]
        else:
            machine.append(current_machine)
            current_machine = []
    machine.append(current_machine)
    return machine

def system(a, b, c, a2, b2, c2):
    y = Fraction(c - a * Fraction(c2, a2), (b - a * Fraction(b2, a2)))
    x = Fraction(c - b * y, a)
    if int(x) != x or int(y) != y:
        return None, None
    return int(x), int(y)
    
def part1(file_path):
    machines = parse_input(file_path)
    total = 0
    for machine in machines:
        a1, b1 = machine[0], machine[2]
        a2, b2 = machine[1], machine[3]
        prize_x, prize_y = machine[4], machine[5]
        x, y = system(a1, b1, prize_x, a2, b2, prize_y)
        if x is None:
            continue
        total += 3*x + 1*y
            
    return total
    
def part2(file_path):
    machines = parse_input(file_path)
    total = 0
    for machine in machines:
        a1, b1 = machine[0], machine[2]
        a2, b2 = machine[1], machine[3]
        prize_x, prize_y = machine[4] + 10000000000000, machine[5] + 10000000000000
        x, y = system(a1, b1, prize_x, a2, b2, prize_y)
        if x is None:
            continue
        total += 3*x + 1*y
            
    return total
    
if __name__ == '__main__':
    day = "13"
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
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)