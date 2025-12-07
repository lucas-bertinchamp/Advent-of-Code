from timeit import default_timer as timer
import os

def parse_input(file_path):
    grid = []
    with open(file_path, 'r') as file:
        pass

# ==================== Part 1 ====================


def part1(file_path):
    pass

# ==================== Part 2 ====================

def part2(file_path):
    pass

# ==================== Testing ====================

if __name__ == '__main__':
    day = "19"
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