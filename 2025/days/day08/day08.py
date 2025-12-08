import heapq
from timeit import default_timer as timer

class UnionFind(object):
    def __init__(self):
        self.parent = {}
        self.rank = {}

    def add(self, box : tuple):
        self.parent[box] = box
        self.rank[box] = 0

    def find_parent(self, box):
        if self.parent[box] == box:
            return box
        else:
            return self.find_parent(self.parent[box])

    def same_group(self, box1, box2):
        return self.find_parent(box1) == self.find_parent(box2)

    def union(self, box1, box2):
        root1 = self.find_parent(box1)
        root2 = self.find_parent(box2)
        if root1 != root2:
            if self.rank[root1] < self.rank[root2]:
                self.parent[root1] = root2
            elif self.rank[root1] > self.rank[root2]:
                self.parent[root2] = root1
            else:
                self.parent[root2] = root1
                self.rank[root1] += 1

    def get_groups(self):
        groups = {}
        for parent in self.parent:
            root = self.find_parent(parent)
            if root in groups:
                groups[root].append(parent)
            else:
                groups[root] = [parent]
        return groups

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        boxes = [tuple(map(int, l.strip().split(","))) for l in lines]

    return boxes

def distance(box1: tuple, box2: tuple) -> float:
    return (box1[0] - box2[0])**2 + (box1[1] - box2[1])**2 + (box1[2] - box2[2])**2

def part1(file_path, n : int = 10):
    boxes = parse_input(file_path)

    uf = UnionFind()
    for box in boxes:
        uf.add(box)

    heap = []
    heapq.heapify(heap)

    for i in range(len(boxes)):
        for j in range(i+1, len(boxes)):
            heapq.heappush(heap, (distance(boxes[i], boxes[j]), boxes[i], boxes[j]))

    for i in range(n):
        d, box1, box2 = heapq.heappop(heap)
        uf.union(box1, box2)

    groups = uf.get_groups()
    groups_len = sorted([len(groups[p]) for p in groups], reverse=True)
    return groups_len[0] * groups_len[1] * groups_len[2]

def part2(file_path):
    boxes = parse_input(file_path)

    uf = UnionFind()
    for box in boxes:
        uf.add(box)

    heap = []
    heapq.heapify(heap)

    for i in range(len(boxes)):
        for j in range(i + 1, len(boxes)):
            heapq.heappush(heap, (distance(boxes[i], boxes[j]), boxes[i], boxes[j]))

    while True:
        d, box1, box2 = heapq.heappop(heap)
        uf.union(box1, box2)
        if len(uf.get_groups()) == 1:
            return box1[0] * box2[0]

if __name__ == '__main__':
    day = "08"
    input_file = f'2025/days/day{day}/input.txt'
    example_file = f'2025/days/day{day}/example.txt'

    n = 10
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if file == input_file:
            n = 1000
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file, n), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, input_file]:
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)