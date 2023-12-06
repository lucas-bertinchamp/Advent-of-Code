input_list = list(map(int, open("days/day05/input.txt", "r").read().split(",")))

op = {"1" : {"fun" : lambda x, y : x + y, "n" : 4},
      "2" : {"fun" : lambda x, y: x * y, "n" : 4} ,
      "3" : {"n" : 2},
      "4" : {"n" : 2},
      "5" : {"n" : 3},
      "6" : {"n" : 3},
      "7" : {"n" : 4},
      "8" : {"n" : 4}}

# Part 1
current = 0
output = []
while input_list[current] != 99:
    full_opcode = str(input_list[current])
    full_opcode = "0" * (5 - len(full_opcode)) + full_opcode
    opcode = full_opcode[-1]

    if opcode == "1" or opcode == "2":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        result = op[opcode]["fun"](x, y)
        input_list[input_list[current + 3]] = result
    elif opcode == "3":
        input_list[input_list[current + 1]] = int(input())
    else:
        output.append(input_list[input_list[current+1]])
    
    current += op[opcode]["n"]

print(output)

# Part 2

input_list = list(map(int, open("days/day05/input.txt", "r").read().split(",")))
current = 0
output = []
while input_list[current] != 99:
    full_opcode = str(input_list[current])
    full_opcode = "0" * (5 - len(full_opcode)) + full_opcode
    opcode = full_opcode[-1]

    if opcode == "1" or opcode == "2":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        result = op[opcode]["fun"](x, y)
        input_list[input_list[current + 3]] = result
    elif opcode == "3":
        input_list[input_list[current + 1]] = int(input())
    elif opcode == "4":
        output.append(input_list[input_list[current+1]])
    elif opcode == "5":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        if x != 0:
            current = y
            continue
    elif opcode == "6":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        if x == 0:
            current = y
            continue
    elif opcode == "7":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        input_list[input_list[current + 3]] = 1 if x < y else 0
    elif opcode == "8":
        x = int(input_list[current + 1]) if full_opcode[-3] == "1" else int(input_list[input_list[current + 1]])
        y = int(input_list[current + 2] if full_opcode[-4] == "1" else int(input_list[input_list[current + 2]]))
        input_list[input_list[current + 3]] = 1 if x == y else 0

    current += op[opcode]["n"]

print(output)