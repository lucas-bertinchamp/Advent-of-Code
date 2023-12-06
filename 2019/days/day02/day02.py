input = list(map(int, open("days/day02/input.txt", "r").read().split(",")))
op = {1: lambda x, y: x + y, 2: lambda x, y: x * y}

# Part 1
current_pos = 0
input[1] = 12
input[2] = 2

while input[current_pos] != 99:
    input[input[current_pos + 3]] = op[input[current_pos]](input[input[current_pos + 1]], input[input[current_pos + 2]])
    current_pos += 4

print(f"First star answer : {input[0]}")

# Part 2
for noun in range(100):
    for verb in range(100):
        current_pos = 0
        input = list(map(int, open("days/day02/input.txt", "r").read().split(",")))
        input[1] = noun
        input[2] = verb
        while input[current_pos] != 99:
            input[input[current_pos + 3]] = op[input[current_pos]](input[input[current_pos + 1]], input[input[current_pos + 2]])
            current_pos += 4

        if input[0] == 19690720:
            print(f"Second star answer : {100 * noun + verb}")
            break