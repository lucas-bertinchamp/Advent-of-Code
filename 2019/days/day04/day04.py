input = open("days/day04/input.txt", "r").read().split("-")
min = int(input[0])
max = int(input[1])

# Part 1
numbers = [i for i in range(min, max + 1) if list(str(i)) == sorted(str(i)) and len(set(str(i))) < len(str(i))]
print(f"First star solution : {len(numbers)}")

# Part 2
numbers = [i for i in numbers if 2 in [str(i).count(j) for j in set(str(i))]]
print(f"Second star solution: {len(numbers)}")

