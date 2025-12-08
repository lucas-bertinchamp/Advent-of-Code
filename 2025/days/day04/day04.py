from copy import deepcopy
from timeit import default_timer as timer

moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    return [line.strip() for line in lines]

def is_valid(grid : list[list], i : int, j : int) -> bool:
    count = 0
    for m in moves:
        new_line = i + m[0]
        if new_line < 0 or new_line >= len(grid):
            continue
        new_col = j + m[1]
        if new_col < 0 or new_col >= len(grid[0]):
            continue
        if grid[new_line][new_col] == "@":
            count += 1

        if count >= 4:
            return False

    return True

def part1(file_path):
    grid = parse_input(file_path)
    total = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "@":
                total += is_valid(grid, i, j)
    return total


def part2(file_path):
    grid = parse_input(file_path)
    total = 0
    while True:
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[i])):
                if grid[i][j] == "@" and is_valid(grid, i, j):
                    count += 1
                    grid[i] = grid[i][:j] + "." + grid[i][j + 1:]
                    total += 1

        if count == 0:
            break

    return total



if __name__ == '__main__':
    day = "04"
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