#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day03.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>

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

    begin = clock();
    cout << "Answer part 2 : " << part2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

vector<tuple<int , vector<vector<int>>>> find_numbers(vector<string> lines) {

    // Vectors of tuples : first = number, second = positions of its digits
    vector<tuple<int, vector<vector<int>>>> numbers;
    for (int i = 0; i < int(lines.size()); i++) {
        string line = lines[i];
        int number = 0;

        int index = 0;
        int begin = -1;
        
        while (index < int(line.size())) {
            if (isdigit(line[index])) {
                number = number * 10 + (line[index] - '0');
                if (begin == -1) {
                    begin = index;
                }
            } else {
                if (number != 0) {
                    vector<vector<int>> all_pos = {};
                    for (int j = begin; j < index; j++) {
                        all_pos.push_back({i, j});
                    }
                    numbers.push_back(make_tuple(number, all_pos));
                    number = 0;
                    begin = -1;
                }
            }
            index++;
        }

        // If the last character of a line is a digit, don't forget to add the number to the vector
        if (number != 0) {
            vector<vector<int>> all_pos = {};
            for (int j = begin; j < index; j++) {
                all_pos.push_back({i, j});
            }
            numbers.push_back(make_tuple(number, all_pos));
        }
    }
    return numbers;
}

bool check_around(vector<vector<int>> positions, vector<string> lines) {

    // For each position, check around if there is a symbol
    for (int i = 0; i < int(positions.size()); i++) {
        vector<int> position = positions[i];
        int x = position[0];
        int y = position[1];

        if (x-1 >= 0 && y-1 >= 0 && lines[x-1][y-1] != '.' && !isdigit(lines[x-1][y-1])) {
            return true;
        }
        if (x-1 >= 0 && lines[x-1][y] != '.' && !isdigit(lines[x-1][y])) {
            return true;
        }
        if (x-1 >= 0 && y+1 < int(lines[x-1].size()) && lines[x-1][y+1] != '.' && !isdigit(lines[x-1][y+1])) {
            return true;
        }
        if (y-1 >= 0 && lines[x][y-1] != '.' && !isdigit(lines[x][y-1])) {
            return true;
        }
        if (y+1 < int(lines[x].size()) && lines[x][y+1] != '.' && !isdigit(lines[x][y+1])) {
            return true;
        }
        if (x+1 < int(lines.size()) && y-1 >= 0 && lines[x+1][y-1] != '.' && !isdigit(lines[x+1][y-1])) {
            return true;
        }
        if (x+1 < int(lines.size()) && lines[x+1][y] != '.' && !isdigit(lines[x+1][y])) {
            return true;
        }
        if (x+1 < int(lines.size()) && y+1 < int(lines[x+1].size()) && lines[x+1][y+1] != '.' && !isdigit(lines[x+1][y+1])) {
            return true;
        }
    }
    return false;
}

int part1(string& input) {

    vector<string> lines = parse(input);
    vector<tuple<int, vector<vector<int>>>> numbers;

    numbers = find_numbers(lines);

    int result = 0;
    for (int i = 0; i < int(numbers.size()); i++) {
        tuple<int, vector<vector<int>>> number = numbers[i];
        int count = get<0>(number);
        vector<vector<int>> positions = get<1>(number);
        if (check_around(positions, lines)) {
            result += count;
        }
    }
    return result;
}

map<vector<int>, set<int>> check_around_2(vector<tuple<int, vector<vector<int>>>>& numbers, vector<string>& lines) {

    // Keys : Gear position | Values : Set of numbers around the gear
    map<vector<int>, set<int>> gears = {};
    
    for (int i = 0; i < int(numbers.size()); i++) {
        vector<vector<int>> positions = get<1>(numbers[i]);
        int number = get<0>(numbers[i]);

        for (vector<int> pos : positions) {
            int x = pos[0];
            int y = pos[1];
            // Check around all positions if is a . or not
            if (x-1 >= 0 && y-1 >= 0 && lines[x-1][y-1] == '*') {
                gears[{x-1, y-1}].insert(number);
            }
            if (x-1 >= 0 && lines[x-1][y] == '*') {
                gears[{x-1, y}].insert(number);
            }
            if (x-1 >= 0 && y+1 < int(lines[x-1].size()) && lines[x-1][y+1] == '*') {
                gears[{x-1, y+1}].insert(number);
            }
            if (y-1 >= 0 && lines[x][y-1] == '*') {
                gears[{x, y-1}].insert(number);
            }
            if (y+1 < int(lines[x].size()) && lines[x][y+1] == '*') {
                gears[{x, y+1}].insert(number);
            }
            if (x+1 < int(lines.size()) && y-1 >= 0 && lines[x+1][y-1] == '*') {
                gears[{x+1, y-1}].insert(number);
            }
            if (x+1 < int(lines.size()) && lines[x+1][y] == '*') {
                gears[{x+1, y}].insert(number);
            }
            if (x+1 < int(lines.size()) && y+1 < int(lines[x+1].size()) && lines[x+1][y+1] == '*') {
                gears[{x+1, y+1}].insert(number);
            }
        }
    }

    return gears;
}

int part2(string& input) {

    vector<string> lines = parse(input);
    vector<tuple<int, vector<vector<int>>>> numbers;

    numbers = find_numbers(lines);

    map<vector<int>, set<int>> gears = check_around_2(numbers, lines);

    int result = 0;
    // For each gear, if there is 2 numbers around, multiply them and add to result
    for (auto const& [key, val] : gears) {
        if (val.size() == 2) {
            int mult = 1;
            for (int i : val) {
                mult *= i;
            }
            result += mult;
        }
    }

    return result;
}