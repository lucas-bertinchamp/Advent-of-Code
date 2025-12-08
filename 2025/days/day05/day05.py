from timeit import default_timer as timer

def parse_input(file_path) -> tuple[list[tuple], list[int]]:
    with open(file_path, 'r') as file:
        lines = file.readlines()
        step1 = True
        intervals = []
        ids = []
        for line in lines:
            if line == '\n':
                step1 = False
                continue

            if step1:
                line = line.strip().split('-')
                intervals.append((int(line[0]), int(line[1])))

            else:
                ids.append(int(line.strip()))

        return intervals, ids

def merge_intervals(intervals):
    intervals = sorted(intervals, key=lambda x: x[0])
    i = 0
    while i < len(intervals) - 1:
        if intervals[i][1] >= intervals[i + 1][0]:
            intervals[i] = (intervals[i][0], max(intervals[i][1], intervals[i+1][1]))
            intervals.pop(i + 1)
        else:
            i += 1
    return intervals

def check_id(intervals : list[tuple], ing_id : int) -> bool:

    for interval in intervals:
        if interval[0] <= ing_id <= interval[1]:
            return True

        elif ing_id < interval[0]:
            return False
        else:
            continue

    return False

def part1(file_path):
    intervals, ids = parse_input(file_path)
    intervals = merge_intervals(intervals)
    return sum(check_id(intervals, ing_id) for ing_id in ids)

def part2(file_path):
    intervals, ids = parse_input(file_path)
    intervals = merge_intervals(intervals)
    return sum([i[1] - i[0] + 1 for i in intervals])
    
if __name__ == '__main__':
    day = "05"
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