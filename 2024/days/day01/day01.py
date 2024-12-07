from collections import Counter
from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        l1, l2 = [], []
        for line in file:
            a, b = map(int, line.strip().split())
            l1.append(a)
            l2.append(b)
    return l1, l2

def part1(file_path):
    l1, l2 = parse_input(file_path)
    l1.sort()
    l2.sort()
    dist = sum([abs(l1[i] - l2[i]) for i in range(len(l1))])
    return dist

def part2(file_path):
    l1, l2 = parse_input(file_path)
    elements = Counter(l2)
    dist = sum([elements[l1[i]] * l1[i] for i in range(len(l1))])
    return dist
    
if __name__ == '__main__':
    day = "01"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    
    
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