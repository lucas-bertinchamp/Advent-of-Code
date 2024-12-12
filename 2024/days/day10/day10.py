from timeit import default_timer as timer
import os
from collections import deque
from copy import deepcopy

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = [list(map(int, list(line.strip()))) for line in file.readlines()]
    return lines

def get_values(grid, value):
    values = []
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == value:
                values.append((i, j))
    return values

def DFS(grid, start, end_value):
    """
    DFS to find the number of end_value in the grid starting from start
    """
    stack = deque([start])
    visited = set()
    count = {}
    while stack:
        x, y = stack.pop()
        current_value = grid[x][y]
        if current_value == end_value and (x, y) != start:
            if (x, y) not in count:
                count[(x,y)] = 0
            count[(x,y)] += 1
        visited.add((x, y))
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < len(grid) and 0 <= new_y < len(grid[0]) and grid[new_x][new_y] == current_value + 1 and (new_x, new_y) not in visited:
                stack.append((new_x, new_y))
    return count

def DFS_all_paths(grid, start, end_value):
    """
    DFS to find the number of paths to an end_value in the grid starting from start
    """
    stack = deque([[start]])
    visited_path = []
    count = {}
    while stack:
        path = stack.pop()
        x, y = path[-1]
        current_value = grid[x][y]
        if current_value == end_value and (x, y) != start:
            if (x, y) not in count:
                count[(x,y)] = 0
            count[(x,y)] += 1
        visited_path.append(path)
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < len(grid) and 0 <= new_y < len(grid[0]) and grid[new_x][new_y] == current_value + 1 and (new_x, new_y) not in visited_path:
                new_path = deepcopy(path)
                new_path.append((new_x, new_y))
                if new_path not in visited_path:
                    stack.append(new_path)
    return count
    

def part1(file_path):
    initial_grid = parse_input(file_path)
    zeros = get_values(initial_grid, 0)
    total = 0
    for z in zeros:
        count = DFS(initial_grid, z, 9)
        total += sum(count.values())
    return total

def part2(file_path):
    initial_grid = parse_input(file_path)
    zeros = get_values(initial_grid, 0)
    total = 0
    for z in zeros:
        count = DFS_all_paths(initial_grid, z, 9)
        total += sum(count.values())
    return total
    
if __name__ == '__main__':
    day = "10"
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