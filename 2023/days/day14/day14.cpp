#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day14.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <functional>
#include <random>
#include <algorithm>

using namespace std;


auto parse(string& filename) {

    ifstream file(filename);
    string line;

    vector<string> file_lines;
    map<int, vector<vector<int>>> columns;
    map<int, vector<vector<int>>> lines;
    vector<vector<int>> points;

    int i = 0;
    while (getline(file, line)) {

        if (i == 0) {
            for (int j = 0; j < (int)line.size(); j++) {
                columns[j] = {{-1, 1}};
            }
        }

        file_lines.push_back(line);
        lines[i] = {{-1, 1}};

        for (int j = 0; j < (int)line.size(); j++) {
            if (line[j] == '#') {
                columns[j].push_back({i, 1});
                lines[i].push_back({j, 1});
            } else if (line[j] == 'O') {
                points.push_back({i, j});
            }
        }

        lines[i].push_back({(int)file_lines[i].size(), 1});
        i++;
    }

    for (int j = 0; j < (int)line.size(); j++) {
        columns[j].push_back({i, 1});
    }

    return make_tuple(lines, columns, points);

}

int main() {

    string input = "../input.txt";

    int begin = clock();
    cout << "Answer part 1 : " << part1(input) << endl;
    int end = clock();
    cout << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    begin = clock();
    cout << "Answer part 2 : " << part2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

vector<vector<int>> move(vector<vector<int>>& points, map<int, vector<vector<int>>> lines, map<int, vector<vector<int>>> columns, char direction) {
    
    vector<vector<int>> new_points;
    if (direction == 'N') {
        for (int i = 0; i < (int)points.size(); i++) {
            int line = points[i][0];
            int column = points[i][1];
            vector<vector<int>> obstacles = columns[column];

            for (int j = 1; j < (int)obstacles.size(); j++) {
                if (line < obstacles[j][0]) {
                    new_points.push_back({obstacles[j-1][0] + obstacles[j-1][1], column});
                    columns[column][j-1][1] += 1;
                    break;
                }
            }
        }
    } else if (direction == 'S') {
        for (int i = 0; i < (int)points.size(); i++) {
            int line = points[i][0];
            int column = points[i][1];
            vector<vector<int>> obstacles = columns[column];

            for (int j = (int)obstacles.size() - 2; j >= 0; j--) {
                if (line > obstacles[j][0]) {
                    new_points.push_back({obstacles[j+1][0] - obstacles[j+1][1], column});
                    columns[column][j+1][1] += 1;
                    break;
                }
            }
        }
    } else if (direction == 'W') {
        for (int i = 0; i < (int)points.size(); i++) {
            int line = points[i][0];
            int column = points[i][1];
            vector<vector<int>> obstacles = lines[line];

            for (int j = 1; j < (int)obstacles.size(); j++) {
                if (column < obstacles[j][0]) {
                    new_points.push_back({line, obstacles[j-1][0] + obstacles[j-1][1]});
                    lines[line][j-1][1] += 1;
                    break;
                }
            }
        }
    } else if (direction == 'E') {
        for (int i = 0; i < (int)points.size(); i++) {
            int line = points[i][0];
            int column = points[i][1];
            vector<vector<int>> obstacles = lines[line];

            for (int j = (int)obstacles.size() - 2; j >= 0; j--) {
                if (column > obstacles[j][0]) {
                    new_points.push_back({line, obstacles[j+1][0] - obstacles[j+1][1]});
                    lines[line][j+1][1] += 1;
                    break;
                }
            }
        }
    }

   return new_points;
}

long calculate_load(vector<vector<int>>& points, int n_lines) {

    long total = 0;
    for (int i = 0; i < (int)points.size(); i++) {
        total += n_lines - points[i][0];
    }

    return total;
}

void visualisation(vector<vector<int>>& points, map<int, vector<vector<int>>> lines, int max_line, int max_column) {
    vector<string> grid;
    for (int i = 0; i < max_line; i++) {
        string line = "";
        for (int j = 0; j < max_column; j++) {
            line += ".";
        }
        grid.push_back(line);
    }

    for (int i = 0; i < (int)points.size(); i++) {
        grid[points[i][0]][points[i][1]] = 'O';
    }

    for (auto it = lines.begin(); it != lines.end(); it++) {
        int line = it->first;
        vector<vector<int>> obstacles = it->second;
        for (int i = 1; i < (int)obstacles.size(); i++) {
            int column = obstacles[i][0];
            grid[line][column] = '#';
        }
    }

}

long part1(string& input) {

    auto parsed = parse(input);
    map<int, vector<vector<int>>> lines = get<0>(parsed);
    map<int, vector<vector<int>>> columns = get<1>(parsed);
    vector<vector<int>> points = get<2>(parsed);
    
    vector<vector<int>> new_points = move(points, lines, columns, 'N');

    return calculate_load(new_points, (int)lines.size());
}

long part2(string& input) {

    auto parsed = parse(input);
    map<int, vector<vector<int>>> lines = get<0>(parsed);
    map<int, vector<vector<int>>> columns = get<1>(parsed);
    vector<vector<int>> points = get<2>(parsed);
    vector<vector<int>> new_points = points;

    map<vector<vector<int>>, vector<int>> hashmap;

    map<int, char> directions = {{0, 'N'}, {1, 'W'}, {2, 'S'}, {3, 'E'}};
    int n_cycles = 0;
    for (int i=0 ; i < 100000 ; i++) {
        new_points = move(new_points, lines, columns, 'N');
        new_points = move(new_points, lines, columns, 'W');
        new_points = move(new_points, lines, columns, 'S');
        new_points = move(new_points, lines, columns, 'E');

        n_cycles += 1;

        sort(new_points.begin(), new_points.end());

        if (hashmap[new_points].size() > 0) {
            vector<int> values = hashmap[new_points];
            int first = values[0];
            int second = n_cycles;
            int diff = second - first;
            int rest = (1000000000 - first) % diff;
            for (int j = 0; j < rest; j++) {
                new_points = move(new_points, lines, columns, 'N');
                new_points = move(new_points, lines, columns, 'W');
                new_points = move(new_points, lines, columns, 'S');
                new_points = move(new_points, lines, columns, 'E');
            }
            return calculate_load(new_points, (int)lines.size());
        } else {
            hashmap[new_points] = {n_cycles};
        }
    }
}