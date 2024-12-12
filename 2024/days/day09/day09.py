from timeit import default_timer as timer
import os

def parse_input(file_path):
    with open(file_path, 'r') as file:
        return file.readlines()[0].strip()

def create_disk(input):
    occupied = []
    free = []
    i = 0
    pos = 0
    while i < len(input):
        number = int(input[i])
        if i % 2 == 0:
            for j in range(number):
                occupied.append((pos + j, i // 2))
        elif number >= 1:
            free.append((pos, number))
        i += 1
        pos += number
    return occupied, free

def move_number(occupied, free):
    pos, id = occupied.pop(-1)
    first_free = free.pop(0)
    first_free_pos, first_free_length = first_free
    
    if pos < first_free_pos:
        occupied.append((pos, id))
        return occupied, free
    
    occupied.insert(0, (first_free_pos, id))
    if first_free_length > 1:
        free.insert(0, (first_free_pos + 1, first_free_length - 1))
                
    return occupied, free

def part1(file_path):
    line = parse_input(file_path)
    ocupied, free = create_disk(line)
    
    while free:
        ocupied, free = move_number(ocupied, free)
        
    total = 0
    for pos, id in ocupied:
        total += pos * id

    return total

def create_disk2(input):
    occupied = {}
    free = []
    i = 0
    pos = 0
    while i < len(input):
        number = int(input[i])
        if i % 2 == 0:
            occupied[i // 2] = (pos, number)
        elif number >= 1:
            free.append((pos, number))
        i += 1
        pos += number
    return occupied, free

def move_number2(occupied, free, id):

    length = occupied[id][1]
    pos = occupied[id][0]
    
    for i, (free_pos, free_length) in enumerate(free):
        if pos < free_pos:
            break
        elif free_length >= length:
            free[i] = (free_pos + length, free_length - length)
            occupied[id] = (free_pos, length)
            if free_length == length:
                free.pop(i)
            break
                
    return occupied, free

def part2(file_path):
    line = parse_input(file_path)
    occupied, free = create_disk2(line)
    max_number = max(occupied.keys())
    
    for id in range(max_number, -1, -1):
        occupied, free = move_number2(occupied, free, id)
    
    total = 0
    for id, (pos, length) in occupied.items():
        for i in range(length):
            total += (pos + i) * id
    return total
    
if __name__ == '__main__':
    day = "09"
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