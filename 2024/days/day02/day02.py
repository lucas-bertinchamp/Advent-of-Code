from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        reports = []
        reports = [list(map(int, line.strip().split(" "))) for line in file]
    return reports

def test_safe(report):
    sign = (report[len(report)-1] - report[0]) >= 0
    for i in range(len(report) - 1):
        delta = report[i+1] - report[i]
        if delta == 0 or abs(delta) > 3:
            return False, i
        if sign != (delta >= 0):
            return False, i
    return True, -1

def part1(file_path):
    reports = parse_input(file_path)
    
    answer = sum([1 for report in reports if test_safe(report)[0]])
                
    return answer

def part2(file_path):
    
    reports = parse_input(file_path)
    answer = 0
    
    for report in reports:
        result, idx = test_safe(report)
        
        if result:
            answer += 1
        else:
            for offset in range(-1, 2):
                if idx + offset < 0 or idx + offset >= len(report):
                    continue
                report_1 = report.copy()
                report_1.pop(idx + offset)
                if test_safe(report_1)[0]:
                    answer += 1
                    break
                
    return answer
    
if __name__ == '__main__':
    day = "02"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for input_file in [example_file, input_file]:
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)