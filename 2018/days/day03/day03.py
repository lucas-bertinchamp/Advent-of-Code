from timeit import default_timer as timer
import os

class Rectangle:
    
    def __init__(self, id, x, y, width, height):
        self.id = id[1:]
        self.top_left = (x, y)
        self.bottom_right = (x + height, y + width)
        
    def __str__(self):
        return f"Rectangle: {self.top_left} -> {self.bottom_right}"

def parse_input(file_path):
    rectangles = []
    with open(file_path, 'r') as file:
        lines = file.read().splitlines()
        
    for line in lines:
        id = line.split("@")[0].strip()
        values = line.split("@")[1]
        top_left, dimension = values.split(":")
        
        x, y = top_left.split(",")
        width, height = dimension.split("x")
        
        rectangles.append(Rectangle(id, int(y), int(x), int(width), int(height)))
        
    return rectangles

def part1(file_path):
    rectangles = parse_input(file_path)
    max_x = max([r.bottom_right[0] for r in rectangles])
    max_y = max([r.bottom_right[1] for r in rectangles])
    grid = [[0 for _ in range(max_y)] for _ in range(max_x)]
    
    answer = 0
    
    for rectangle in rectangles:
        for x in range(rectangle.top_left[0], rectangle.bottom_right[0]):
            for y in range(rectangle.top_left[1], rectangle.bottom_right[1]):
                grid[x][y] += 1
                if grid[x][y] == 2:
                    answer += 1             
    
    return answer

def is_overlapping(rectangle : Rectangle, rectangle2 : Rectangle):
    return not (rectangle2.top_left[0] >= rectangle.bottom_right[0] or
                rectangle2.bottom_right[0] <= rectangle.top_left[0] or
                rectangle2.top_left[1] >= rectangle.bottom_right[1] or
                rectangle2.bottom_right[1] <= rectangle.top_left[1])

def part2(file_path):
    rectangles = parse_input(file_path)
    for i, rectangle in enumerate(rectangles):
        for j, rectangle2 in enumerate(rectangles):
            if i == j:
                continue
            if is_overlapping(rectangle, rectangle2):
                break
        else:
            return rectangle.id
    return None
                
    
if __name__ == '__main__':
    day = "03"
    input_file = f'2018/days/day{day}/input.txt'
    example_file = f'2018/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for input_file in [example_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", input_file, end=" -> ")
        print(part2(input_file), end="          | ")
        print("Time: ", timer() - begin)