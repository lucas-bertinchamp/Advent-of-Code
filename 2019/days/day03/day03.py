input = open("days/day03/input.txt", "r").read().split("\n")
wire1 = input[0].split(",")
wire2 = input[1].split(",")

op = {"R": (1, 0), "L": (-1, 0), "U": (0, 1), "D": (0, -1)}

wire1_points, wire2_points = [], []
wire1_steps, wire2_steps = {}, {}

o = (0, 0)
step = 0
for i in wire1:
    d = op[i[0]]
    for j in range(int(i[1:])):
        step += 1
        o = (o[0] + d[0], o[1] + d[1])
        wire1_points.append(o)
        wire1_steps[o] = step

o = (0, 0)
step = 0
for i in wire2:
    d = op[i[0]]
    for j in range(int(i[1:])):
        step += 1
        o = (o[0] + d[0], o[1] + d[1])
        wire2_points.append(o)
        wire2_steps[o] = step

intersections = set(wire1_points).intersection(set(wire2_points))

print(f"First star solution : {min([abs(x) + abs(y) for (x, y) in intersections])}")
print(f"Second star solution: {min([wire1_steps[i] + wire2_steps[i] for i in intersections])}")

