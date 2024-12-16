from timeit import default_timer as timer
import os

def parse_input(file_path):
    grid = []
    instructions = []
    instructions_read = False
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            if not instructions_read:
                if line == "\n":
                    instructions_read = True
                else:
                    grid.append(list(line.strip()))
            else:
                instructions += list(line.strip())
    
    return grid, instructions

# ==================== Part 1 ====================

def get_current_pos(grid):
    """Get the current position of the player"""
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "@":
                return i, j
    return -1, -1

def move_rock(grid, pos, next_pos):
    """Move a rock from pos to next_pos"""
    vector = (next_pos[0] - pos[0], next_pos[1] - pos[1])
    count = 0
    to_move = []
    
    # Count the number of rocks
    while grid[next_pos[0]][next_pos[1]] == "O":
        to_move.append(next_pos)
        count += 1
        next_pos = (next_pos[0] + vector[0], next_pos[1] + vector[1])
    
    # Check if the next position is a wall and return the original grid
    if grid[next_pos[0]][next_pos[1]] == "#":
        return grid, pos
    
    # If the next position is empty, move the rocks
    elif grid[next_pos[0]][next_pos[1]] == ".":
        for obj in to_move:
            grid[obj[0]][obj[1]] = "."
        for obj in to_move:
            grid[obj[0] + vector[0]][obj[1] + vector[1]] = "O"
        grid[pos[0]][pos[1]] = "."
        new_pos = (pos[0] + vector[0], pos[1] + vector[1])
        grid[new_pos[0]][new_pos[1]] = "@"
        return grid, new_pos

def apply_instruction(grid, pos, instruction):
    i, j = pos
    if instruction == "^":
        next_pos = (i - 1, j)
    elif instruction == "v":
        next_pos = (i + 1, j)
    elif instruction == "<":
        next_pos = (i, j - 1)
    elif instruction == ">":
        next_pos = (i, j + 1)
    
    next_value = grid[next_pos[0]][next_pos[1]]
    if next_value == "#":
        return grid, pos
    elif next_value == ".":
        grid[i][j] = "."
        grid[next_pos[0]][next_pos[1]] = "@"
        return grid, next_pos
    elif next_value == "O":
        return move_rock(grid, pos, next_pos)
    elif next_value == "[" or next_value == "]":
        return move_rock2(grid, pos, next_pos)
    
def compute_gps(pos):
    return 100 * pos[0] + pos[1]

def part1(file_path):
    grid, instructions = parse_input(file_path)
    pos = get_current_pos(grid)
    for instruction in instructions:
        grid, pos = apply_instruction(grid, pos, instruction)
    return sum([compute_gps((i,j)) for i in range(len(grid)) for j in range(len(grid[i])) if grid[i][j] == "O"])

# ==================== Part 2 ====================

def double_grid(grid):
    new_grid = []
    for i in range(len(grid)):
        row = []
        for j in range(len(grid[i])):
            value = grid[i][j]
            if value == "@":
                row.append("@")
                row.append(".")
            elif value == "." or value == "#":
                row.append(value)
                row.append(value)
            else:
                row.append("[")
                row.append("]")
        new_grid.append(row)
    return new_grid

def print_grid(grid):
    for row in grid:
        print("".join(row))
        
def move_horizontal(grid, pos, next_pos):
    vector = (next_pos[0] - pos[0], next_pos[1] - pos[1])
    count = 0
    to_move = []
    next_pos = (next_pos[0], next_pos[1], grid[next_pos[0]][next_pos[1]])
    
    # Count the number of rocks
    while next_pos[2] == "[" or next_pos[2] == "]":
        count += 1
        to_move.append(next_pos)
        next_pos = (next_pos[0] + vector[0], next_pos[1] + vector[1], grid[next_pos[0] + vector[0]][next_pos[1] + vector[1]])
    
    # Check if the next position is a wall and return the original grid
    if grid[next_pos[0]][next_pos[1]] == "#":
        return grid, pos
    
    # If the next position is empty, move the rocks
    elif grid[next_pos[0]][next_pos[1]] == ".":
        for obj in to_move:
            grid[obj[0]][obj[1]] = "."
        for obj in to_move:
            grid[obj[0] + vector[0]][obj[1] + vector[1]] = obj[2]
        grid[pos[0]][pos[1]] = "."
        new_pos = (pos[0] + vector[0], pos[1] + vector[1])
        grid[new_pos[0]][new_pos[1]] = "@"
        
        return grid, new_pos
    
def move_vertical(grid, pos, next_pos):
    vector = (next_pos[0] - pos[0], next_pos[1] - pos[1])
    count = 0
    
    next_pos = (next_pos[0], next_pos[1] + vector[1], grid[next_pos[0]][next_pos[1]])
    
    to_move = [next_pos]
    to_check = [next_pos]
    
    value = grid[next_pos[0]][next_pos[1]]
    if value == "[":
        to_move.append((next_pos[0], next_pos[1] + 1, grid[next_pos[0]][next_pos[1] + 1]))
        to_check.append((next_pos[0], next_pos[1] + 1, grid[next_pos[0]][next_pos[1] + 1]))
    elif value == "]":
        to_move.append((next_pos[0], next_pos[1] - 1, grid[next_pos[0]][next_pos[1] - 1]))
        to_check.append((next_pos[0], next_pos[1] - 1, grid[next_pos[0]][next_pos[1] - 1]))
    
    can_move = True

    while len(to_check) > 0:
        new_to_check = []
        for check in to_check:
            
            new_element = (check[0] + vector[0], check[1] + vector[1], grid[check[0] + vector[0]][check[1] + vector[1]])
            new_element_value = new_element[2]
            
            if new_element_value == "#":
                can_move = False
                new_to_check = []
                break
            
            elif new_element_value == "[":
                right = (new_element[0], new_element[1] + 1, "]")
                new_to_check.append(new_element)
                new_to_check.append(right)
                to_move.append(new_element)
                to_move.append(right)
                
            elif new_element_value == "]":
                left = (new_element[0], new_element[1] - 1, "[")
                new_to_check.append(new_element)
                new_to_check.append(left)
                to_move.append(new_element)
                to_move.append(left)
            
        to_check = new_to_check
            
    if not can_move:
        return grid, pos
    
    # Move the elements
    for move in to_move:
        grid[move[0]][move[1]] = "."
    for move in to_move:
        grid[move[0] + vector[0]][move[1] + vector[1]] = move[2]

    # Move the player
    grid[pos[0]][pos[1]] = "."
    new_pos = (pos[0] + vector[0], pos[1] + vector[1])
    grid[new_pos[0]][new_pos[1]] = "@"
    
    return grid, new_pos
        
def move_rock2(grid, pos, next_pos):
    vector = (next_pos[0] - pos[0], next_pos[1] - pos[1])
    
    if vector[0] == 0:
        return move_horizontal(grid, pos, next_pos)
    else:
        return move_vertical(grid, pos, next_pos)

def part2(file_path):
    grid, instructions = parse_input(file_path)
    grid = double_grid(grid)
    pos = get_current_pos(grid)
    for instruction in instructions:
        grid, pos = apply_instruction(grid, pos, instruction)
    return sum([compute_gps((i,j)) for i in range(len(grid)) for j in range(len(grid[i])) if grid[i][j] == "["])

# ==================== Testing ====================

if __name__ == '__main__':
    day = "15"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    example_file2 = f'2024/days/day{day}/example2.txt'
    example_file3 = f'2024/days/day{day}/example3.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, example_file2, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, example_file3, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)