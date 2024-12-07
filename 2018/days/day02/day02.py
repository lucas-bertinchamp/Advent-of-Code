from collections import Counter
from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.read().splitlines()
    return lines

def part1(file_path):
    words = parse_input(file_path)
    twice = 0
    thrice = 0
    for word in words:
        letters = Counter(word)
        if 2 in letters.values():
            twice += 1
        if 3 in letters.values():
            thrice += 1
    return twice * thrice

def distance(w1, w2, current_min):
    dist = 0
    for i in range(len(w1)):
        if w1[i] != w2[i]:
            dist += 1
        if dist >= current_min:
            return dist
    return dist

def part2(file_path):
    words = parse_input(file_path)
    min_dist = 1000
    best_index = (-1, -1)
    for i in range(len(words)):
        for j in range(i+1, len(words)):
            dist = distance(words[i], words[j], min_dist)
            if dist < min_dist:
                min_dist = dist
                best_index = (i, j)
    word = "".join([words[best_index[0]][i] for i in range(len(words[0])) if words[best_index[0]][i] == words[best_index[1]][i]])
    return word
    
if __name__ == '__main__':
    day = "02"
    input_file = f'2018/days/day{day}/input.txt'
    example_file = f'2018/days/day{day}/example.txt'
    example_file2 = f'2018/days/day{day}/example2.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for input_file in [example_file2, input_file]:
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)