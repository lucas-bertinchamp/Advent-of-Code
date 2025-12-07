from collections import Counter
from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        pass
    return l1, l2

def part1(file_path):
    return dist

def part2(file_path):
    return dist
    
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