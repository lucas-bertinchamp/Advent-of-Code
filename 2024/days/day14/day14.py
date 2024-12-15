from timeit import default_timer as timer
import os
from PIL import Image

class Robot:
    
    def __init__(self, pos, direction, width=11, height=7):
        self.pos = pos
        self.direction = direction
        self.width = width
        self.height = height
        
    def move(self, steps):
        self.pos[0] += (self.direction[0] * steps)
        self.pos[0] = self.pos[0] % self.width
        self.pos[1] += (self.direction[1] * steps)
        self.pos[1] = self.pos[1] % self.height
    
    def __eq__(self, value):
        if not isinstance(value, Robot):
            return False
        return self.pos == value.pos
    
    def __str__(self):
        return f"Robot: {self.pos} {self.direction}"
    
    def __repr__(self):
        return f"Robot: {self.pos} {self.direction}"

def parse_input(file_path, width=11, height=7):
    robots = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            p, v = line.strip().split(" ")
            p = list(map(int, p.split("=")[1].split(",")))
            v = list(map(int, v.split("=")[1].split(",")))
            robots.append(Robot(p, v, width, height))
    return robots

def count_robots(robots):
    count = [0, 0, 0, 0]
    width, height = robots[0].width, robots[0].height
    middle_w, middle_h = width // 2, height // 2
    for r in robots:
        if r.pos[0] < middle_w and r.pos[1] < middle_h:
            count[0] += 1
        elif r.pos[0] < middle_w and r.pos[1] > middle_h:
            count[1] += 1
        elif r.pos[0] > middle_w and r.pos[1] < middle_h:
            count[2] += 1
        elif r.pos[0] > middle_w and r.pos[1] > middle_h:
            count[3] += 1
    return count

def part1(file_path):
    width, height = 11, 7
    if "input" in file_path:
        width, height = 101, 103
    robots = parse_input(file_path, width, height)
    for r in robots:
        r.move(100)
    count = count_robots(robots)
    return count[0] * count[1] * count[2] * count[3]
            
def print_robots(robots, width, height):
    grid = [["." for _ in range(width)] for _ in range(height)]
    for r in robots:
        grid[r.pos[1]][r.pos[0]] = "#"
    for row in grid:
        print("".join(row))
    print()
    
def create_image(robots, width, height, iter):
    image = Image.new("RGB", (width, height), "white")
    for r in robots:
        image.putpixel((r.pos[0], r.pos[1]), (0, 0, 0))
    image.save(f"2024/days/day14/images/image_{iter + 1}.bmp")

def part2(file_path):
    width, height = 11, 7
    max_iter = 10000
    if "input" in file_path:
        width, height = 101, 103
    robots = parse_input(file_path, width, height)
    for iter in range(max_iter):
        for r in robots:
            r.move(1)
        create_image(robots, width, height, iter)
    return "Images created"
    
if __name__ == '__main__':
    day = "14"
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
    
    print("\n --- Part 2 --- ")
    for file in [input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)