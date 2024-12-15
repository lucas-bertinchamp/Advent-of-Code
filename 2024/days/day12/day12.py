from timeit import default_timer as timer
import os
import sys

def parse_input(file_path):
    dict_region = {}
    with open(file_path, 'r') as file:
        for i, line in enumerate(file.readlines()):
            line = line.strip()
            for j, char in enumerate(line):
                if char in dict_region:
                    dict_region[char].append((i, j))
                else:
                    dict_region[char] = [(i, j)]
    return dict_region

def get_adjacent(i, j):
    return [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]

def define_region(region_char_list : list):
    """
    Returns the size of the region, the horizontal and vertical borders and the remaining plants
    """
    seen = set()
    first_plant = region_char_list[0]
    queue = [first_plant]
    h_border, v_border = [], []
    
    while queue:      
        plant = queue.pop(0)
        seen.add(plant)
        adj_plants = get_adjacent(*plant)
        for n_adj, adj in enumerate(adj_plants):
            if adj in region_char_list:
                if adj not in seen and adj not in queue:
                    queue.append(adj)
            else:
                if n_adj == 0:
                    h_border.append((plant[0]-0.1, plant[1]))
                elif n_adj == 1:
                    h_border.append((plant[0]+0.1, plant[1]))
                elif n_adj == 2:
                    v_border.append((plant[0], plant[1]-0.1))
                elif n_adj == 3:
                    v_border.append((plant[0], plant[1]+0.1))
                    
    size = len(seen)
    
    return size, h_border, v_border, [plant for plant in region_char_list if plant not in seen]

def part1(file_path):
    dict_region = parse_input(file_path)
    total = 0
    for char, region in dict_region.items():
        while region:
            size, h_border, v_border, new_region = define_region(region)
            total += size * (len(h_border) + len(v_border))
            region = new_region
    return total

def concat_border(h_border, v_border):
    """
    Returns the number of fences needed to enclose the region continuously
    """
    count = 0

    h_border.sort(key=lambda x: (x[0], x[1]))
    current_line = h_border[0][0]
    col_memory = h_border[0][1]
    count += 1
    for i in range(1, len(h_border)):
        if h_border[i][0] == current_line:
            if h_border[i][1] == col_memory + 1:
                col_memory = h_border[i][1]
            else:
                count += 1
                col_memory = h_border[i][1]
        else:
            count += 1
            current_line = h_border[i][0]
            col_memory = h_border[i][1]

    v_border.sort(key=lambda x: (x[1], x[0]))
    current_col = v_border[0][1]
    line_memory = v_border[0][0]
    count += 1
    for i in range(1, len(v_border)):
        if v_border[i][1] == current_col:
            if v_border[i][0] == line_memory + 1:
                line_memory = v_border[i][0]
            else:
                count += 1
                line_memory = v_border[i][0]
        else:
            count += 1
            current_col = v_border[i][1]
            line_memory = v_border[i][0]
            
    return count

def part2(file_path):
    dict_region = parse_input(file_path)
    total = 0
    for char, region in dict_region.items():
        while region:
            size, h_border, v_border, new_region = define_region(region)
            total += size * concat_border(h_border, v_border)
            region = new_region
    return total
    
if __name__ == '__main__':
    day = "12"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    example_file2 = f'2024/days/day{day}/example2.txt'
    example_file3 = f'2024/days/day{day}/example3.txt'
    example_file4 = f'2024/days/day{day}/example4.txt'
    example_file5 = f'2024/days/day{day}/example5.txt'
    example_file6 = f'2024/days/day{day}/example6.txt'
    
    print("\n --- Part 1 --- ")
    for file in [example_file, example_file2, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, example_file3, example_file4, example_file5, example_file6, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)