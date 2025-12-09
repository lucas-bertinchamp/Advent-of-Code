from timeit import default_timer as timer

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    return [tuple(map(int, l.split(","))) for l in lines]
    

def part1(file_path):
    reds = parse_input(file_path)
    maxi = 0
    for i in range(len(reds)):
        for j in range(i+1, len(reds)):
            area = (max(reds[i][0], reds[j][0]) - min(reds[i][0], reds[j][0]) + 1) * (max(reds[i][1], reds[j][1]) - min(reds[i][1], reds[j][1]) + 1)
            maxi = max(maxi, area)

    return maxi

def is_rectangle_valid(left, right, top, bottom, points):
    # aucun coté du polygone ne doit traverser le rectangle

    for i in range(len(points)):
        x1, y1 = points[i]
        x2, y2 = points[(i + 1) % len(points)]

        # coté vertical
        if x1 == x2:
            ymin = min(y1, y2)
            ymax = max(y1, y2)
            if left < x1 < right and (ymax > top and ymin < bottom):
                return False

        # coté horizontal
        if y1 == y2:
            xmin = min(x1, x2)
            xmax = max(x1, x2)
            if top < y1 < bottom and (xmax > left and xmin < right):
                return False

    return True

def part2(file_path):
    reds = parse_input(file_path)
    maxi = 0
    for i in range(len(reds)):
        for j in range(i + 1, len(reds)):
            left = min(reds[i][0], reds[j][0])
            right = max(reds[i][0], reds[j][0])
            top = min(reds[i][1], reds[j][1])
            bottom = max(reds[i][1], reds[j][1])
            if is_rectangle_valid(left, right, top, bottom, reds):

                area = (right- left + 1) * (bottom - top + 1)
                maxi = max(maxi, area)

    return maxi
    
if __name__ == '__main__':
    day = "09"
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