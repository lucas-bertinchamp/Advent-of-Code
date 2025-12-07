from timeit import default_timer as timer
import os
import heapq

def parse_input(file_path):
    grid = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            grid.append(list(line.strip()))
    return grid

class State:
    
    def __init__(self, x, y, orientation):
        self.x = x
        self.y = y
        self.orientation = orientation # 0: up, 1: right, 2: down, 3: left

    def __str__(self):
        return f"({self.x}, {self.y}) {self.orientation}"
    
    def __repr__(self):
        return f"({self.x}, {self.y}) {self.orientation}"
    
    def __eq__(self, value):
        return self.x == value.x and self.y == value.y and self.orientation == value.orientation
    
    def __lt__(self, value):
        return (self.x, self.y, self.orientation) < (value.x, value.y, value.orientation)
    
    def __hash__(self):
        return hash((self.x, self.y, self.orientation))

# ==================== Part 1 ====================

def get_initial_final_state(grid):
    initial = None
    final = None
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "S":
                initial = State(i, j, 1)
            if grid[i][j] == "E":
                final = State(i, j, 1)
    return initial, final

def get_next_state(grid, state : State):
    x, y = state.x, state.y
    orientation = state.orientation
    all_next_states = []
    
    # Rotate left or right
    for i in [-1, 1]:
        new_orientation = (orientation + i) % 4
        all_next_states.append((State(x, y, new_orientation), 1000))
    
    # Move forward
    new_x, new_y = x, y
    if orientation == 0:
        new_x -= 1
    elif orientation == 1:
        new_y += 1
    elif orientation == 2:
        new_x += 1
    elif orientation == 3:
        new_y -= 1

    if grid[new_x][new_y] != "#":
        all_next_states.append((State(new_x, new_y, orientation), 1))

    return all_next_states

def UCS(grid, initial : State, final : tuple[int, int]):
    visited = set()
    queue = []
    heapq.heappush(queue, (0, initial))
    while queue:
        cost, state = heapq.heappop(queue)
        if state in visited:
            continue
        visited.add(state)
        if state.x == final[0] and state.y == final[1]:
            return cost
        for next_state, next_cost in get_next_state(grid, state):
            if next_state not in visited:
                heapq.heappush(queue, (cost + next_cost, next_state))
    return -1

def part1(file_path):
    grid = parse_input(file_path)
    initial, final = get_initial_final_state(grid)
    return UCS(grid, initial, (final.x, final.y))

# ==================== Part 2 ====================

Path = tuple[State]

def UCS2(grid, initial : State, final : tuple[int, int]):
    
    best_cost = -1
    parent = dict()
    visited = set()
    queue = []

    heapq.heappush(queue, (0, initial))
    parent[(0, initial)] = None
    while queue:

        # We get the next state to visit
        cost, state = heapq.heappop(queue)
        if state in visited:
            continue
        visited.add(state)

        # If we reached the final state for the first time, we update the best cost
        # We have the guarantee that the first time we reach the final state, it will be the best cost (UCS)
        if state.x == final[0] and state.y == final[1]:
            if best_cost == -1:
                best_cost = cost
            
        for next_state, next_cost in get_next_state(grid, state):
            # If we already have a best cost and the current cost is higher, we can skip this path
            if best_cost != -1 and cost + next_cost > best_cost:
                continue
            
            # If we haven't visited the next state, we add it to the queue
            elif next_state not in visited:
                heapq.heappush(queue, (cost + next_cost, next_state))

                # We add the parent of the next state
                if (cost + next_cost, next_state) not in parent:
                    parent[(cost + next_cost, next_state)] = []
                parent[(cost + next_cost, next_state)].append((cost, state))

    return parent, best_cost
    
# 710 too high
def part2(file_path):
    grid = parse_input(file_path)
    initial, final = get_initial_final_state(grid)
    parent, best_cost = UCS2(grid, initial, (final.x, final.y))

    all_keys = list(parent.keys())

    to_check = []
    for key in all_keys:
        if key[0] == best_cost:
            to_check.append(key)
    
    all_visited = set()
    while to_check:
        cost, state = to_check.pop(0)
        all_visited.add((state.x, state.y))
        parents = parent[(cost, state)]
        if parents is not None:
            for p in parents:
                to_check.append(p)

    return len(all_visited)
    

# ==================== Testing ====================

if __name__ == '__main__':
    day = "16"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    example_file2 = f'2024/days/day{day}/example2.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, example_file2, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, example_file2, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)