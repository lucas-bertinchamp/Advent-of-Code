from timeit import default_timer as timer
import os
import heapq

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        lines = [list(map(int, line.strip().split(","))) for line in lines]

    return lines


# ==================== Part 1 ====================

def create_grid(bits, width, height, n):
    grid = [["." for _ in range(width+1)] for _ in range(height+1)]
    for i in range(n):
        x, y = bits[i]
        grid[y][x] = "#"
    return grid

def print_grid(grid):
    print("Grid:")
    for row in grid:
        print("".join(row))

def UCS(grid, start, end):
    queue = []
    heapq.heappush(queue, (0, start))
    visited = set()
    while queue:
        cost, node = heapq.heappop(queue)
        if node == end:
            return cost
        if node in visited:
            continue
        visited.add(node)
        x, y = node
        for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < len(grid[0]) and 0 <= new_y < len(grid):
                if grid[new_y][new_x] == "#":
                    continue
                heapq.heappush(queue, (cost+1, (new_x, new_y)))
    return -1

def part1(file_path):
    width, height, n = 6, 6, 12
    if "input" in file_path:
        width, height, n = 70, 70, 1024
    bits = parse_input(file_path)
    grid = create_grid(bits, width, height, n)
    return UCS(grid, (0, 0), (width, height))

# ==================== Part 2 ====================

def part2(file_path):
    width, height, n_start = 6, 6, 12
    if "input" in file_path:
        width, height, n_start = 70, 70, 1024
    bits = parse_input(file_path)
    n_end = len(bits)
    for i in range(n_start, n_end):
        grid = create_grid(bits, width, height, i)
        if UCS(grid, (0, 0), (width, height)) == -1:
            return ",".join(map(str, bits[i-1]))

# ==================== Testing ====================

if __name__ == '__main__':
    day = "18"
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