print(f"First star answer : {sum([int(int(i)/3) - 2 for i in open('days/day01/input.txt', 'r').readlines()])}")

fuels = [(0, int(i)) for i in open('days/day01/input.txt', 'r').readlines()]
final = []
for f in fuels:
    need = int(f[1]/3) - 2
    while need > 0:
        f = (f[0] + need, need)
        need = int(need/3) - 2
    final.append(f[0])
    
print(f"Second star answer : {sum(final)}")