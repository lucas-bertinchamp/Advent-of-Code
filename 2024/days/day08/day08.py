from timeit import default_timer as timer
import os

def parse_input(file_path):
    all_antennas = {}
    grid_size = None
    with open(file_path, 'r') as file:
        lines = file.readlines()
        grid_size = (len(lines), len(lines[0].strip()))
        for n_line, line in enumerate(lines):
            line = line.strip()
            for n_col in range(len(line)):
                if line[n_col] == '.':
                    continue
                if line[n_col] not in all_antennas:
                    all_antennas[line[n_col]] = []
                all_antennas[line[n_col]].append((n_line, n_col))
            
    return all_antennas, grid_size

def symetric(a, b):
    vector = (a[0] - b[0], a[1] - b[1])
    pos1 = (a[0] + vector[0], a[1] + vector[1])
    pos2 = (b[0] - vector[0], b[1] - vector[1])
    return pos1, pos2

def in_map(pos, grid_size):
    return 0 <= pos[0] < grid_size[0] and 0 <= pos[1] < grid_size[1]

def part1(file_path):
    all_antennas, grid_size = parse_input(file_path)
    antinodes = set()
    for antenna in all_antennas:
        for i in range(len(all_antennas[antenna])):
            for j in range(i+1, len(all_antennas[antenna])):
                pos1, pos2 = symetric(all_antennas[antenna][i], all_antennas[antenna][j])
                if in_map(pos1, grid_size):
                    antinodes.add(pos1)
                if in_map(pos2, grid_size):
                    antinodes.add(pos2)
    return len(antinodes)
                
def symetric_2(a, b, grid_size):
    initial_a = a
    vector = (a[0] - b[0], a[1] - b[1])
    all_pos = []
    while in_map(a, grid_size):
        all_pos.append(a)
        a = (a[0] + vector[0], a[1] + vector[1])
    a = initial_a
    while in_map(b, grid_size):
        all_pos.append(b)
        b = (b[0] - vector[0], b[1] - vector[1])
    return all_pos
    
def part2(file_path):
    all_antennas, grid_size = parse_input(file_path)
    antinodes = set()
    for antenna in all_antennas:
        for i in range(len(all_antennas[antenna])):
            for j in range(i+1, len(all_antennas[antenna])):
                all_pos = symetric_2(all_antennas[antenna][i], all_antennas[antenna][j], grid_size)
                for pos in all_pos:
                    antinodes.add(pos)
    return len(antinodes)
    
if __name__ == '__main__':
    day = "08"
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
    for input_file in [example_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)