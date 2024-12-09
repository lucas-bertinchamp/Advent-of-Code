from timeit import default_timer as timer
import os
from copy import deepcopy

class Game:
    
    def __init__(self, grid_size, player_pos, obstacles):
        self.grid_size = grid_size
        self.player_pos = player_pos
        self.obstacles = obstacles
        self.initial_player_pos = player_pos
        self.player_dir = "^"
        
        self.all_directions = ["^", ">", "v", "<"]
        self.move = {
            "^": (-1, 0),
            "v": (1, 0),
            "<": (0, -1),
            ">": (0, 1)
        }
        
        self.init_row_col_obstacles()
        self.visited = set([player_pos])
        self.position_dir = set()
        
        self.last_obstacle_added = None
    
    def reset(self, new_obstacle=None):
        self.player_pos = self.initial_player_pos
        self.player_dir = "^"
        self.position_dir = set()
        if self.last_obstacle_added is not None:
            self.remove_obstacle(self.last_obstacle_added)
        if new_obstacle is not None:
            self.add_obstacle(new_obstacle)
            self.last_obstacle_added = new_obstacle
        
    def init_row_col_obstacles(self):
        self.row_obstacles = {}
        self.col_obstacles = {}
        for obs in self.obstacles:
            if obs[0] not in self.row_obstacles:
                self.row_obstacles[obs[0]] = []
            self.row_obstacles[obs[0]].append(obs[1])
            
            if obs[1] not in self.col_obstacles:
                self.col_obstacles[obs[1]] = []
            self.col_obstacles[obs[1]].append(obs[0])
            
    def remove_obstacle(self, obstacle):
        self.obstacles.remove(obstacle)
        self.row_obstacles[obstacle[0]].remove(obstacle[1])
        self.col_obstacles[obstacle[1]].remove(obstacle[0])
    
    def add_obstacle(self, obstacle):
        self.obstacles.append(obstacle)
        if obstacle[0] not in self.row_obstacles:
            self.row_obstacles[obstacle[0]] = []
        self.row_obstacles[obstacle[0]].append(obstacle[1])
        
        if obstacle[1] not in self.col_obstacles:
            self.col_obstacles[obstacle[1]] = []
        self.col_obstacles[obstacle[1]].append(obstacle[0])
    
    def get_closest_obstacle(self):
        if self.player_dir == "^":
            if self.player_pos[1] in self.col_obstacles:
                return max([obs for obs in self.col_obstacles[self.player_pos[1]] if obs < self.player_pos[0]], default=None)
        elif self.player_dir == "v":
            if self.player_pos[1] in self.col_obstacles:
                return min([obs for obs in self.col_obstacles[self.player_pos[1]] if obs > self.player_pos[0]], default=None)
        elif self.player_dir == "<":
            if self.player_pos[0] in self.row_obstacles:
                return max([obs for obs in self.row_obstacles[self.player_pos[0]] if obs < self.player_pos[1]], default=None)
        elif self.player_dir == ">":
            if self.player_pos[0] in self.row_obstacles:         
                return min([obs for obs in self.row_obstacles[self.player_pos[0]] if obs > self.player_pos[1]], default=None)
        return None
        
    def move_player_1(self):
        new_pos = (self.player_pos[0] + self.move[self.player_dir][0], self.player_pos[1] + self.move[self.player_dir][1])
        if new_pos in self.obstacles:
            return False
        self.player_pos = new_pos
        self.visited.add(new_pos)
        return True
    
    def move_player_2(self):
        obs = self.get_closest_obstacle()
        if obs is None:
            return False, "finished"
        if self.player_dir == "^":
            new_pos = (obs + 1, self.player_pos[1])
        elif self.player_dir == "v":
            new_pos = (obs - 1, self.player_pos[1])
        elif self.player_dir == "<":
            new_pos = (self.player_pos[0], obs + 1)
        elif self.player_dir == ">":
            new_pos = (self.player_pos[0], obs - 1)
        self.player_pos = new_pos
        
        if (self.player_pos[0], self.player_pos[1], self.player_dir) in self.position_dir:
            return False, "loop"
        self.position_dir.add((self.player_pos[0], self.player_pos[1], self.player_dir))
        
        return True, "continue"
    
    def turn_player(self, direction):
        current_dir = self.all_directions.index(self.player_dir)
        self.player_dir = self.all_directions[(current_dir + direction) % 4]
        
    def is_finished(self):
        finished = self.player_pos[0] < 0 or self.player_pos[0] >= self.grid_size[0] or self.player_pos[1] < 0 or self.player_pos[1] >= self.grid_size[1]
        if finished:
            self.visited.remove(self.player_pos)
        return finished

def parse_input(file_path):
    obstacles = []
    grid_size = None
    player_pos = None
    with open(file_path, 'r') as file:
        lines = file.read().splitlines()
        grid_size = (len(lines), len(lines[0].strip()))
        for i, line in enumerate(lines):
            line = line.strip()
            for j, char in enumerate(line):
                if char == "#":
                    obstacles.append((i, j))
                elif char == "^":
                    player_pos = (i, j)
    return grid_size, player_pos, obstacles

def part1(file_path):
    grid_size, player_pos, obstacles = parse_input(file_path)
    game = Game(grid_size, player_pos, obstacles)

    while not game.is_finished():
        moved = game.move_player_1()
        if not moved:
            game.turn_player(1)
            
    return len(game.visited)
    
def part2(file_path):
    grid_size, player_pos, obstacles = parse_input(file_path)
    game = Game(grid_size, player_pos, obstacles)
    
    # Get positions visited withouth more obstacles
    while not game.is_finished():
        moved = game.move_player_1()
        if not moved:
            game.turn_player(1)
    
    on_road = game.visited
            
    count = 0
    
    # Add obstacles one by one
    for obs in on_road:
        game.reset(obs)
        while True:
            move, state = game.move_player_2()
            if state == "finished":
                break
            if state == "loop":
                count += 1
                break
            game.turn_player(1)
    
    return count
    
    
if __name__ == '__main__':
    day = "06"
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
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)