import re
from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    return lines

def part1(file_path):
    lines = parse_input(file_path)
    re_pattern = r'mul\(\d+,\d+\)'
    answer = 0
    for line in lines:
        matches = re.findall(re_pattern, line)
        for match in matches:
            x1, x2 = map(int, match[4:-1].split(","))
            answer += x1 * x2
    return answer
    

def part2(file_path):
    lines = parse_input(file_path)
    re_pattern = r"(?:do(?:n't)?\(\))|(?:mul\(\d+,\d+\))"
    do = True
    answer = 0
    for line in lines:
        matches = re.findall(re_pattern, line)
        for match in matches:
            if match == "don't()":
                do = False
            elif match == "do()":
                do = True
            else:
                if do:
                    x1, x2 = map(int, match[4:-1].split(","))
                    answer += x1 * x2
    return answer
    
if __name__ == '__main__':
    day = "03"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    example_file2 = f'2024/days/day{day}/example2.txt'
    
    
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