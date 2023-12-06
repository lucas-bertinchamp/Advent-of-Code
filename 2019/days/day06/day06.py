import time

def parsing(file : str):
    input = [line.split(")") for line in open(file, "r").read().split("\n")]
    return input

def main():

    file = "days/day06/input.txt"

    begin1 = time.time()
    print("Answer part 1 : {}".format(part1(file)))
    end1 = time.time()
    print("Time part 1 : {} ms".format(1000*(end1 - begin1)))

    begin2 = time.time()
    print("Answer part 2 : {}".format(part2(file)))
    end2 = time.time()
    print("Time part 2 : {} ms".format(1000*(end2 - begin2)))

def find_orbits(input):
    
    orbits = {}

    for orbit in input:
        planet1 = orbit[0]
        planet2 = orbit[1]

        if planet1 in orbits and planet2 in orbits:
            orbits[planet2].append(planet1)
            orbits[planet2] += orbits[planet1]
            for p in orbits:
                if planet2 in orbits[p]:
                    orbits[p].append(planet1)
                    orbits[p] += orbits[planet1]

        elif planet1 in orbits:
            orbits[planet2] = [planet1] + orbits[planet1]

        elif planet2 in orbits:
            orbits[planet1] = []
            orbits[planet2].append(planet1)
            for p in orbits:
                if planet2 in orbits[p]:
                    orbits[p].append(planet1)

        else:
            orbits[planet1] = []
            orbits[planet2] = [planet1]
        
    return orbits

def part1(file : str):

    input = parsing(file)
    orbits = find_orbits(input)
    total = 0
    for in_orbit in orbits.values():
        total += len(in_orbit)

    return total

def dfs(orbits, start, end, visited = []):
    if start == end:
        return visited

    for planet in orbits[start]:
        if planet not in visited:
            return dfs(orbits, planet, end, visited + [planet])

    return visited

def part2(file : str):

    input = parsing(file)
    orbits = find_orbits(input)

    to_san = dfs(orbits, "SAN", "COM")
    to_you = dfs(orbits, "YOU", "COM")

    index = 0
    while to_san[-1 - index] == to_you[-1 - index]:
        index += 1

    # -1 because we search for the last common planet
    index -= 1

    return len(to_san) - index + len(to_you) - index - 2

if __name__ == "__main__":
    main()