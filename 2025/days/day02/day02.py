import math
from timeit import default_timer as timer

def parse_input(file_path):
    l = []
    maxi = 0
    with open(file_path, 'r') as file:
        lines = file.readlines()
        line = lines[0]
        units = line.split(',')

        for u in units:
            a, b = u.split('-')
            l.append((int(a),int(b)))
            maxi = max(maxi, int(b))
    return l, maxi

def sym_gen(maxi):
    values = [0]
    i = 1
    int_value = 0
    while int_value < maxi:
        int_value = i * 10**(math.floor(math.log10(i) + 1)) + i
        values.append(int_value)
        i += 1

    return values

def sym_gen2(maxi):
    values = {0}
    i = 1
    while True:
        length = 2
        while True:
            int_value = int(str(i) * length)
            if int_value <= maxi:
                values.add(int_value)
                length += 1
            else:
                break
        i += 1
        if length == 2:
            break

    return sorted(list(values))

def find_index(l, value, left = True):
    if left:
        for i, e in enumerate(l):
            if e < value:
                continue
            else:
                return i
        return i
    else:
        for i in range(len(l)-1 , -1 , -1 ):
            if value < l[i]:
                continue
            else:
                return i
        return i



def part1(file_path):
    units, maxi = parse_input(file_path)
    sym = sym_gen(maxi)
    sol = 0
    for unit in units:
        a = find_index(sym, unit[0])
        b = find_index(sym, unit[1], False)

        if b < a:
            continue
        else:
            for c in range(a,b+1):
                sol += sym[c]

    return sol

def part2(file_path):
    units, maxi = parse_input(file_path)
    sym = sym_gen2(maxi)
    sol = 0
    for unit in units:
        a = find_index(sym, unit[0])
        b = find_index(sym, unit[1], False)

        if b < a:
            continue
        else:
            for c in range(a, b + 1):
                sol += sym[c]

    return sol
    
if __name__ == '__main__':
    day = "02"
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