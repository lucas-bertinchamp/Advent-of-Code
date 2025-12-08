from timeit import default_timer as timer

funcs = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}

def parse_input(file_path):
    numbers = []
    operators = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for i in range(len(lines) - 1):
            numbers.append(list(map(int, lines[i].split())))

        operators = lines[-1].strip().split()

    return numbers, operators

def part1(file_path):
    numbers, operators = parse_input(file_path)
    answer = 0

    for i, op in enumerate(operators):
        value = 0 if op == "+" else 1
        for j in range(len(numbers)):
            value = funcs[op](numbers[j][i], value)
        answer += value

    return answer

def parse_input2(file_path):
    numbers = []
    operators = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        values = []
        for c in range(len(lines[0])):
            value = ""
            for l in range(len(lines)-1):
                if lines[l][c] != "\n":
                    value += lines[l][c]
                else:
                    value += " "
            if value != " " * (len(lines) - 1):
                values.append(int(value))
            else:
                numbers.append(values)
                values = []

        numbers.append(values)

        operators = lines[-1].strip().split()

    return numbers, operators

def part2(file_path):
    numbers, operators = parse_input2(file_path)
    answer = 0
    for i, op in enumerate(operators):
        value = 0 if op == "+" else 1
        for num in numbers[i]:
            value = funcs[op](num, value)
        answer += value
    return answer
    
if __name__ == '__main__':
    day = "06"
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

# 11950004808437 too low