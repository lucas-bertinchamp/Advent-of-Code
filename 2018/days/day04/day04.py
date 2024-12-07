from timeit import default_timer as timer
import os

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.read().splitlines()
    return lines

def part1(file_path):
    print(parse_input(file_path))

def part2(file_path):
    pass
    
if __name__ == '__main__':
    day = "04"
    input_file = f'2018/days/day{day}/input.txt'
    example_file = f'2018/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for input_file in [example_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)