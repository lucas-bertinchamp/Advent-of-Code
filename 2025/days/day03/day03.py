from timeit import default_timer as timer

def parse_input(file_path):
    l = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            line = list(map(int, list(line)))
            l.append(line)

    return l

def find_best(bank : list, n : int = 2) -> int:
    # dp[i,j] =  le nombre maximum obtenable avec i chiffres dans bank[:j+1]
    dp = [[0 for _ in range(len(bank))] for _ in range(n)]

    # 1 seul chiffre
    maximum = 0
    for i, b in enumerate(bank):
        maximum = max(maximum, b)
        dp[0][i] = maximum

    # Cas général
    for i in range(1, n):
        for j in range(len(bank)):
            if i > j:
                value = 0
                for d in bank[:j + 1]:
                    value = value * 10 + d
                dp[i][j] = value
            else:
                dp[i][j] = max(dp[i][j - 1], dp[i - 1][j - 1] * 10 + bank[j])

    return dp[n-1][len(bank) - 1]


def part1(file_path):
    banks = parse_input(file_path)
    return sum([find_best(b) for b in banks])

def part2(file_path):
    banks = parse_input(file_path)
    return sum([find_best(b, 12) for b in banks])

    
if __name__ == '__main__':
    day = "03"
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