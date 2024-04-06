#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day17.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <queue>
#include <algorithm>

using namespace std;

vector<string> parse(string& filename) {

    ifstream file(filename);
    vector<string> lines;
    string line;

    while (getline(file, line)) {
        lines.push_back(line);
    }

    return lines;
}

int main() {

    string input = "../input.txt";

    int begin = clock();
    cout << "Answer part 1 : " << part1(input) << endl;
    int end = clock();
    cout << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    input = "../input.txt";

    begin = clock();
    cout << "Answer part 2 : " << part2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

struct State {
    vector<int> position;
    int cost;
    // 0 = up, 1 = down, 2 = left, 3 = right
    int last_move;
    int n_last_move;
    int heuristic;
    int total_cost;
};

bool operator<(const State& a, const State& b) {
    return a.total_cost + a.heuristic > b.total_cost + b.heuristic;
}

vector<State> get_neighbors(vector<string>& lines, State& state) {

    vector<State> neigbors = {};
    int current_line = state.position[0];
    int current_column = state.position[1];
    int cost = state.total_cost;

    int last_move = state.last_move;
    int n_last_move = state.n_last_move;

    int value;
    int n_moves;
    int new_cost;

    State new_state;

    if (current_line > 0 && last_move != 1) {

        if (last_move == 0) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 3) {
            value = lines[current_line-1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line - 1, current_column}, value, 0, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    } 
    if (current_line < (int)lines.size() - 1 && last_move != 0) {

        if (last_move == 1) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 3) {
            value = lines[current_line+1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line + 1, current_column}, value, 1, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }

    if (current_column > 0 && last_move != 3) {

        if (last_move == 2) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 3) {
            value = lines[current_line][current_column-1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column - 1}, value, 2, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }
    if (current_column < (int)lines[0].size() - 1 && last_move != 2) {

        if (last_move == 3) {
            n_moves = n_last_move + 1;
        } else {
           n_moves = 1;
        }

        if (n_moves <= 3) {
            value = lines[current_line][current_column+1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column + 1}, value, 3, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }

    for (State& neighbor : neigbors) {
        neighbor.heuristic = abs(neighbor.position[0] - (int)lines.size() + 1) + abs(neighbor.position[1] - (int)lines[0].size() + 1);
    }
    
    return neigbors;
}


int Astar(vector<string>& lines, State start, State end) {

    map<vector<int>, int> visited = {};
    map<vector<int>, int> distance = {};
    priority_queue<State> queue = {};
    queue.push(start);

    int c = 0;

    while (!queue.empty()) {

        c++;

        State current = queue.top();
        visited[{current.position[0], current.position[1], current.last_move, current.n_last_move}] = 1;
        queue.pop();

        if (current.position == end.position) {
            return current.total_cost;
        }
        
        vector<State> neighbors = get_neighbors(lines, current);

        for (State& neighbor : neighbors) {
            int new_distance = neighbor.total_cost;
            if (visited[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] != 1) {
                if (distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] == 0 || new_distance < distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}]) {
                    distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] = new_distance;
                    queue.push(neighbor);
                }
            }
        }
    }

    return -1;
}

int part1(string& input) {

    vector<string> lines = parse(input);
    State start = {{0, 0}, 0, 0, 0, 0, 0};
    State end = {{(int)lines.size()-1, (int)lines[0].size()-1}, 0, 0, 0, 0, 0};

    int answer = Astar(lines, start, end);

    return answer;
}

vector<State> get_neighbors2(vector<string>& lines, State& state) {

    vector<State> neigbors = {};
    int current_line = state.position[0];
    int current_column = state.position[1];
    int cost = state.total_cost;

    int last_move = state.last_move;
    int n_last_move = state.n_last_move;

    int value;
    int n_moves;
    int new_cost;

    State new_state;

    if (state.position == (vector<int>){(int)lines.size()-1, (int)lines[0].size()-1}) {
        return {};
    }

    if (n_last_move < 4) {
        if (last_move == 0 && current_line > 0) {
            value = lines[current_line-1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line - 1, current_column}, value, 0, n_last_move + 1, 0, new_cost};
            neigbors.push_back(new_state);
        } else if (last_move == 1 && current_line < (int)lines.size() - 1) {
            value = lines[current_line+1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line + 1, current_column}, value, 1, n_last_move + 1, 0, new_cost};
            neigbors.push_back(new_state);
        } else if (last_move == 2 && current_column > 0) {
            value = lines[current_line][current_column-1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column - 1}, value, 2, n_last_move + 1, 0, new_cost};
            neigbors.push_back(new_state);
        } else if (last_move == 3 && current_column < (int)lines[0].size() - 1) {
            value = lines[current_line][current_column+1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column + 1}, value, 3, n_last_move + 1, 0, new_cost};
            neigbors.push_back(new_state);
        }
        return neigbors;
    }

    if (current_line > 0 && last_move != 1) {

        if (last_move == 0) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 10) {
            value = lines[current_line-1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line - 1, current_column}, value, 0, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    } 
    if (current_line < (int)lines.size() - 1 && last_move != 0) {

        if (last_move == 1) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 10) {
            value = lines[current_line+1][current_column] - '0';
            new_cost = cost + value;
            new_state = {{current_line + 1, current_column}, value, 1, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }

    if (current_column > 0 && last_move != 3) {

        if (last_move == 2) {
            n_moves = n_last_move + 1;
        } else {
            n_moves = 1;
        }

        if (n_moves <= 10) {
            value = lines[current_line][current_column-1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column - 1}, value, 2, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }
    if (current_column < (int)lines[0].size() - 1 && last_move != 2) {

        if (last_move == 3) {
            n_moves = n_last_move + 1;
        } else {
           n_moves = 1;
        }

        if (n_moves <= 10) {
            value = lines[current_line][current_column+1] - '0';
            new_cost = cost + value;
            new_state = {{current_line, current_column + 1}, value, 3, n_moves, 0, new_cost};
            neigbors.push_back(new_state);
        }
    }

    for (State& neighbor : neigbors) {
        neighbor.heuristic = abs(neighbor.position[0] - (int)lines.size() + 1) + abs(neighbor.position[1] - (int)lines[0].size() + 1);
    }
    
    return neigbors;
}


int Astar2(vector<string>& lines, State start, State end) {

    map<vector<int>, int> visited = {};
    map<vector<int>, int> distance = {};
    priority_queue<State> queue = {};

    start = {{0, 0}, 0, 3, 0, 0, 0};
    State start2 = {{0, 0}, 0, 1, 0, 0, 0};

    queue.push(start);
    queue.push(start2);

    while (!queue.empty()) {

        State current = queue.top();
        visited[{current.position[0], current.position[1], current.last_move, current.n_last_move}] = 1;
        queue.pop();

        if (current.position == end.position && current.n_last_move >= 4) {
            return current.total_cost;
        }
        
        vector<State> neighbors = get_neighbors2(lines, current);

        for (State& neighbor : neighbors) {
            int new_distance = neighbor.total_cost;
            if (visited[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] != 1) {
                if (distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] == 0 || new_distance < distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}]) {
                    distance[{neighbor.position[0], neighbor.position[1], neighbor.last_move, neighbor.n_last_move}] = new_distance;
                    queue.push(neighbor);
                }
            }
        }

    }

    return -1;
}

int part2(string& input) {

    vector<string> lines = parse(input);
    State start = {{0, 0}, 0, 0, 3, 0, 0};
    State start2 = {{0, 0}, 0, 0, 1, 0, 0};
    State end = {{(int)lines.size()-1, (int)lines[0].size()-1}, 0, 0, 0, 0, 0};

    int answer = Astar2(lines, start, end);

    return answer;
}