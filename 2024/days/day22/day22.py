from itertools import product
from timeit import default_timer as timer
import os
from tqdm import tqdm

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    return [int(line.strip()) for line in lines]

# ==================== Part 1 ====================

memory = {}

def evolve(secret : int) -> int:

    # step 1
    temp = secret * 64
    new = temp ^ secret
    new = new % 16777216

    # step 2
    temp2 = new // 32
    new = temp2 ^ new
    new = new % 16777216

    # step 3
    temp3 = new * 2048
    new = temp3 ^ new
    new = new % 16777216

    return new

def part1(file_path):
    secrets = parse_input(file_path)
    new_secrets = secrets
    for i in range(2000):
        for j in range(len(new_secrets)):
            new_secrets[j] = evolve(new_secrets[j])
    return sum(new_secrets)


# ==================== Part 2 ====================

def compute_comb(secrets_list : list[int], memory : dict):
    seen = set()
    window = []
    for i in range(len(secrets_list)-1):
        window.append(secrets_list[i+1] % 10 - secrets_list[i] % 10)
        if len(window) == 5:
            window.pop(0)
        if len(window) == 4 and tuple(window) not in seen:
            seen.add(tuple(window))
            memory[tuple(window)] = memory.get(tuple(window), 0) + secrets_list[i+1] % 10

def part2(file_path):
    memory = {}
    # Generate secrets
    secrets = parse_input(file_path)
    new_secrets : list[list[int]] = [[secret] for secret in secrets]
    for i in range(len(new_secrets)):
        for j in range(2000):
            new_secrets[i].append(evolve(new_secrets[i][-1]))

    # Generate all comb
    for s_list in new_secrets:
        compute_comb(s_list, memory)

    return max(memory.values())

# 1702 too high

# ==================== Testing ====================

if __name__ == '__main__':
    day = "22"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    example2_file = f'2024/days/day{day}/example2.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example2_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)