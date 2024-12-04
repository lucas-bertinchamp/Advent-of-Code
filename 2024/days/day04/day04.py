import re

def parse_input(file_path):
    letter_matrix = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            letter_matrix.append([])
            for letter in line.strip():
                letter_matrix[-1].append(letter)
    return letter_matrix

def analyze_position(letter_matrix, x, y):
    if letter_matrix[x][y] != "X":
        return 0
    
    count = 0
    
    # Column
    if x < len(letter_matrix[y]) - 3:
        word = "".join([letter_matrix[i][y] for i in range(x, x+4)])
        if word == "XMAS":
            count += 1
            
    if x >= 3:
        word = "".join([letter_matrix[i][y] for i in range(x, x-4, -1)])
        if word == "XMAS":
            count += 1
            
    # Row
    if y < len(letter_matrix) - 3:
        word = "".join([letter_matrix[x][i] for i in range(y, y+4)])
        if word == "XMAS":
            count += 1
            
    if y >= 3:
        word = "".join([letter_matrix[x][i] for i in range(y, y-4, -1)])
        if word == "XMAS":
            count += 1
            
    # Diagonal
    if x < len(letter_matrix[y]) - 3 and y < len(letter_matrix) - 3:
        word = "".join([letter_matrix[x+i][y+i] for i in range(4)])
        if word == "XMAS":
            count += 1
            
    if x >= 3 and y >= 3:
        word = "".join([letter_matrix[x-i][y-i] for i in range(4)])
        if word == "XMAS":
            count += 1
            
    if x < len(letter_matrix[y]) - 3 and y >= 3:
        word = "".join([letter_matrix[x+i][y-i] for i in range(4)])
        if word == "XMAS":
            count += 1
            
    if x >= 3 and y < len(letter_matrix) - 3:
        word = "".join([letter_matrix[x-i][y+i] for i in range(4)])
        if word == "XMAS":
            count += 1
            
    return count

def part1(file_path):
    letter_matrix = parse_input(file_path)
    total = 0
    for x in range(len(letter_matrix)):
        for y in range(len(letter_matrix[x])):
            total += analyze_position(letter_matrix, x, y)
    return total
    
def analyse_position_2(letter_matrix, x, y):
    if letter_matrix[x][y] != "A":
        return 0
    
    diag1 = [letter_matrix[x-1][y-1], letter_matrix[x+1][y+1]]
    diag2 = [letter_matrix[x-1][y+1], letter_matrix[x+1][y-1]]

    if "M" in diag1 and "S" in diag1 and "M" in diag2 and "S" in diag2:
        return 1
    return 0

def part2(file_path):
    letter_matrix = parse_input(file_path)
    total = 0
    for x in range(1, len(letter_matrix) - 1):
        for y in range(1, len(letter_matrix[x]) - 1):
            total += analyse_position_2(letter_matrix, x, y)
    return total
    
if __name__ == '__main__':
    day = "04"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        print("File: ", file, end=" -> ")
        print(part1(file))
    
    #293 is too low
    print("\n --- Part 2 --- ")
    for input_file in [example_file, input_file]:
        print("File: ", input_file, end=" -> ")
        print(part2(input_file))