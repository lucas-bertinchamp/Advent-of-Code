from timeit import default_timer as timer
import os

def parse_input(file_path):
    with open(file_path, 'r') as file:
        line = file.readline().strip()
        return list(map(int, line.split(" ")))
    
    
def blink(stone, blinks_remaining):
    
    if memo.get((stone, blinks_remaining), None) is not None:
        return memo[(stone, blinks_remaining)]

    if blinks_remaining == 0:
        return 1
    
    if stone == 0:
        memo[(stone, blinks_remaining)] = blink(1, blinks_remaining - 1)
        return memo[(stone, blinks_remaining)]
    
    if len(str(stone)) % 2 == 0:
        stone1 = int(str(stone)[:len(str(stone))//2])
        stone2 = int(str(stone)[len(str(stone))//2:])
        value_stone1 = memo.get((stone1, blinks_remaining - 1), None)
        value_stone2 = memo.get((stone2, blinks_remaining - 1), None)
        if value_stone1 is not None and value_stone2 is not None:
            return value_stone1 + value_stone2
        if value_stone1 is None:
            memo[(stone1, blinks_remaining - 1)] = blink(stone1, blinks_remaining - 1)
        if value_stone2 is None:
            memo[(stone2, blinks_remaining - 1)] = blink(stone2, blinks_remaining - 1)
        return memo[(stone1, blinks_remaining - 1)] + memo[(stone2, blinks_remaining - 1)]
    
    else:
        memo[(stone, blinks_remaining)] = blink(stone * 2024, blinks_remaining - 1)
        return memo[(stone, blinks_remaining)]

memo = {}

def part1(file_path):
    stones = parse_input(file_path)
    stones_after_blinks = [blink(stone, 25) for stone in stones]
    return sum(stones_after_blinks)

def part2(file_path):
    stones = parse_input(file_path)
    stones_after_blinks = [blink(stone, 75) for stone in stones]
    return sum(stones_after_blinks)
    
if __name__ == '__main__':
    day = "11"
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
        
    memo = {}
    
    print("\n --- Part 2 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)