from collections import Counter
from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        values = file.read().splitlines()
        values = [int(value) for value in values]
    return values

def part1(file_path):
    return sum(parse_input(file_path))

def part2(file_path):
    values = parse_input(file_path)
    seen = set()
    freq = 0
    index = 0
    while freq not in seen:
        seen.add(freq)
        freq += values[index % len(values)]
        index += 1
    return freq
    
if __name__ == '__main__':
    day = "01"
    input_file = f'2018/days/day{day}/input.txt'
    example_file = f'2018/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for input_file in [example_file, input_file]:
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)