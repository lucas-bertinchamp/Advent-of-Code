from timeit import default_timer as timer
import os

def parse_input(file_path):
    
    equations = []
    
    with open(file_path, 'r') as file:
        lines = file.read().splitlines()
        
        for line in lines:
            line = line.strip().split(":")
            equation = (int(line[0]), list(map(int, line[1][1:].split(" "))))
            equations.append(equation)
        
    return equations

def solve_equation(current_value, equation):
    if current_value > equation[0]:
        return False
    if len(equation[1]) == 0 and current_value == equation[0]:
        return True
    if len(equation[1]) == 0:
        return False
    
    add = current_value + equation[1][0]
    mult = current_value * equation[1][0]

    return solve_equation(add, (equation[0], equation[1][1:])) or solve_equation(mult, (equation[0], equation[1][1:]))

def solve_equation_2(current_value, equation):
    if current_value > equation[0]:
        return False
    if len(equation[1]) == 0:
        return current_value == equation[0]
    
    add = current_value + equation[1][0]
    mult = current_value * equation[1][0]
    concat = int(str(current_value) + str(equation[1][0]))

    return solve_equation_2(add, (equation[0], equation[1][1:])) or solve_equation_2(mult, (equation[0], equation[1][1:])) or solve_equation_2(concat, (equation[0], equation[1][1:]))

def part1(file_path):
    equations = parse_input(file_path)
    answer = 0
    for eq in equations:
        first_value = eq[1][0]
        values = eq[1][1:]
        result = solve_equation(first_value, (eq[0], values))
        if result:
            answer += eq[0]
    return answer

def part2(file_path):
    equations = parse_input(file_path)
    answer = 0
    for eq in equations:
        first_value = eq[1][0]
        values = eq[1][1:]
        if solve_equation_2(first_value, (eq[0], values)):
            answer += eq[0]
    return answer
    
if __name__ == '__main__':
    day = "07"
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
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)