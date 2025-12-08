from timeit import default_timer as timer

def parse_input(file_path):
    splitters = set()
    start = (0, 0)
    with open(file_path, 'r') as file:
        lines = file.readlines()

    for i, line in enumerate(lines):
        for j, c in enumerate(line):
            if c == ".":
                continue
            elif c == "S":
                start = (i, j)
            elif c == "^":
                splitters.add((i, j))

    return splitters, start

def part1(file_path):
    splitters, start = parse_input(file_path)
    current = {start}
    depth = 0
    answer = 0
    max_depth = max([s[0] for s in splitters])

    while depth < max_depth:
        new = set()
        for cur in current:
            new_pos = (cur[0] + 1, cur[1])
            if new_pos in splitters:
                answer += 1
                new.add((cur[0] + 1, cur[1] - 1))
                new.add((cur[0] + 1, cur[1] + 1))
            else:
                new.add(new_pos)
        current = new
        depth += 1

    return answer


def part2(file_path):
    splitters, start = parse_input(file_path)
    current = {start : 1}
    depth = 0
    max_depth = max([s[0] for s in splitters])

    while depth < max_depth:
        new = {}
        for cur in current:
            new_pos = (cur[0] + 1, cur[1])
            if new_pos in splitters:
                new[(cur[0] + 1, cur[1] - 1)] = new.get((cur[0] + 1, cur[1] - 1), 0) + current[cur]
                new[(cur[0] + 1, cur[1] + 1)] = new.get((cur[0] + 1, cur[1] + 1), 0) + current[cur]
            else:
                new[new_pos] = new.get(new_pos, 0) + current[cur]
        current = new
        depth += 1

    return sum(current.values())
    
if __name__ == '__main__':
    day = "07"
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