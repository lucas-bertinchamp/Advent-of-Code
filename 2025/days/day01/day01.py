from collections import Counter
from timeit import default_timer as timer

def parse_input(file_path):
    l = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            l.append((line[0], int(line[1:])))
    return l

def part1(file_path):
    instructions = parse_input(file_path)
    initial = 50
    count = 0
    for inst in instructions:
        if inst[0] == "L":
            initial -= inst[1]
        elif inst[0] == "R":
            initial += inst[1]

        initial %= 100

        if initial == 0:
            count += 1

    return count

def part2(file_path):
    instructions = parse_input(file_path)
    count = 0
    prev = next = 50
    for inst in instructions:
        if inst[0] == "L":
            next = prev - inst[1]

            while next < 0:
                next += 100
                count += 1

            if next == 0 and prev != 0:
                count += 1

            if prev == 0:
                count -= 1

        elif inst[0] == "R":
            next = prev + inst[1]
            while next > 99:
                next -= 100
                count += 1
        prev = next
    return count

# too high 6142
# too low 6023

if __name__ == '__main__':
    day = "01"
    input_file = f'2025/days/day{day}/input.txt'
    example_file = f'2025/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)