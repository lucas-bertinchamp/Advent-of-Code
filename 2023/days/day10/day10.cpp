#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day10.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <algorithm>
#include <regex>

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

vector<int> find_start(vector<string>& lines) {
    vector<int> start;
    for (int i = 0; i < (int)lines.size(); i++) {
        string& line = lines[i];
        auto s_pos = line.find("S");
        if (s_pos != string::npos) {
            start.push_back(i);
            start.push_back(s_pos);
            break;
        }
    }
    return start;
}

tuple<char, vector<int>> next_symbol_fun(vector<string>& lines, char& symbol, int& posX, int& posY, int& prevX, int& prevY) {

    vector<vector<int>> next_pos;
    if (symbol == '|') {
        next_pos = {{posX-1, posY}, {posX+1, posY}};
    } else if (symbol == '-') {
        next_pos = {{posX, posY - 1}, {posX, posY + 1}};
    } else if (symbol == '7') {
        next_pos = {{posX, posY-1}, {posX+1, posY}};
    } else if (symbol == 'J') {
        next_pos = {{posX - 1, posY}, {posX, posY - 1}};
    } else if (symbol == 'L') {
        next_pos = {{posX, posY+1}, {posX-1, posY}};
    } else if (symbol == 'F') {
        next_pos = {{posX, posY+1}, {posX+1, posY}};
    }

    if (next_pos[0][0] == prevX && next_pos[0][1] == prevY) {
        return make_tuple(lines[next_pos[1][0]][next_pos[1][1]], next_pos[1]);
    } else if (next_pos[1][0] == prevX && next_pos[1][1] == prevY) {
        return make_tuple(lines[next_pos[0][0]][next_pos[0][1]], next_pos[0]);
    }

}


int part1(string& input) {

    vector<string> lines = parse(input);
    vector<int> start = find_start(lines);
    int s0 = start[0];
    int s1 = start[1];

    int next0, next1;
    char next_symbol = 0;

    if (s0 - 1 >= 0 && (lines[s0 - 1][s1] == '7' || lines[s0 - 1][s1] == 'F' || lines[s0 - 1][s1] == '|')) {
        next0 = s0 - 1;
        next1 = s1;
        next_symbol = lines[s0 - 1][s1];
    } else if (s0 + 1 < (int)lines.size() && (lines[s0 + 1][s1] == '|' || lines[s0 + 1][s1] == 'J' || lines[s0 + 1][s1] == 'L')) {
        next0 = s0 + 1;
        next1 = s1;
        next_symbol = lines[s0 + 1][s1];
    } else if (s1 - 1 >= 0 && (lines[s0][s1 - 1] == '-' || lines[s0][s1 - 1] == 'F' || lines[s0][s1 - 1] == 'L')) {
        next0 = s0;
        next1 = s1 - 1;
        next_symbol = lines[s0][s1 - 1];
    } else if (s1 + 1 < (int)lines[s0].size() && (lines[s0][s1 + 1] == '-' || lines[s0][s1 + 1] == 'J' || lines[s0][s1 + 1] == '7')) {
        next0 = s0;
        next1 = s1 + 1;
        next_symbol = lines[s0][s1 + 1];
    } 

    int prev0 = s0;
    int prev1 = s1;
    int count = 0;

    while (next_symbol != 'S') {
        count++;
        tuple<char, vector<int>> next_symbol_pos = next_symbol_fun(lines, next_symbol, next0, next1, prev0, prev1);
        next_symbol = get<0>(next_symbol_pos);
        prev0 = next0;
        prev1 = next1;
        next0 = get<1>(next_symbol_pos)[0];
        next1 = get<1>(next_symbol_pos)[1];
    }

    return (count + 1) / 2;
}

vector<vector<int>> process_line(string& line, int& index_line, map<int, map<int, int>>& loop_positions) {

    map<string , int> count = {{"7", 0}, {"J", 0}, {"L", 0}, {"F", 0}, {"|", 0}, {"-", 0}, {"LJ", 0}, {"FJ", 0}, {"L7", 0}, {"F7", 0}};

    if (loop_positions[index_line].size() == 0) {
        return {};
    }

    vector<vector<int>> inside;
    vector<int> cross(line.size(), 0);
    string last_symbol = "";

    for (int j = 0; j < (int)line.size(); j++) {
        if (loop_positions[index_line][j] == 1) {

            if (line[j] == '-') {
                continue;
            } else if (line[j] == '|') {
                count["|"] += 1;
                last_symbol = "|";
            } else {
                string concat = last_symbol + line[j];
                if (concat == "LJ" || concat == "FJ" || concat == "L7" || concat == "F7") {
                    count[concat] += 1;
                    last_symbol = "";
                } else {
                    last_symbol = line[j];
                }
            }

        } else if (loop_positions[index_line][j] != 1) {
            cross[j] = count["|"] + 2*count["LJ"] + count["FJ"] + count["L7"] + 2*count["F7"];
        }
    }

    for (int j = 0; j < (int)line.size(); j++) {
        if (loop_positions[index_line][j] == 1) {
            continue;
        }
        else if (cross[j] % 2 == 1) {
            inside.push_back({index_line, j});
        }
    }
    
    return inside;
}

int part2(string& input) {

    vector<string> lines = parse(input);
    vector<int> start = find_start(lines);

    int s0 = start[0];
    int s1 = start[1];

    int next0, next1;
    char next_symbol = 0;

    if (s0 - 1 >= 0 && (lines[s0 - 1][s1] == '7' || lines[s0 - 1][s1] == 'F' || lines[s0 - 1][s1] == '|')) {
        next0 = s0 - 1;
        next1 = s1;
        next_symbol = lines[s0 - 1][s1];
    } else if (s0 + 1 < (int)lines.size() && (lines[s0 + 1][s1] == '|' || lines[s0 + 1][s1] == 'J' || lines[s0 + 1][s1] == 'L')) {
        next0 = s0 + 1;
        next1 = s1;
        next_symbol = lines[s0 + 1][s1];
    } else if (s1 - 1 >= 0 && (lines[s0][s1 - 1] == '-' || lines[s0][s1 - 1] == 'F' || lines[s0][s1 - 1] == 'L')) {
        next0 = s0;
        next1 = s1 - 1;
        next_symbol = lines[s0][s1 - 1];
    } else if (s1 + 1 < (int)lines[s0].size() && (lines[s0][s1 + 1] == '-' || lines[s0][s1 + 1] == 'J' || lines[s0][s1 + 1] == '7')) {
        next0 = s0;
        next1 = s1 + 1;
        next_symbol = lines[s0][s1 + 1];
    }

    map<int, map<int, int>> loop_positions;

    int prev0 = s0;
    int prev1 = s1;

    loop_positions[next0][next1] = 1;

    while (next_symbol != 'S') {
        tuple<char, vector<int>> next_symbol_pos = next_symbol_fun(lines, next_symbol, next0, next1, prev0, prev1);

        next_symbol = get<0>(next_symbol_pos);
        prev0 = next0;
        prev1 = next1;
        next0 = get<1>(next_symbol_pos)[0];
        next1 = get<1>(next_symbol_pos)[1];

        loop_positions[next0][next1] = 1;
    }

    // Replace S
    vector<int> pos(4, 0);
    if (s0 - 1 >= 0 && loop_positions[s0 - 1][s1] == 1) {
        if (lines[s0 - 1][s1] == '7' || lines[s0 - 1][s1] == 'F' || lines[s0 - 1][s1] == '|'){
            pos[0] = 1;
        }
    } if (s0 + 1 < (int)lines.size() && loop_positions[s0 + 1][s1] == 1) {
        if (lines[s0 + 1][s1] == '|' || lines[s0 + 1][s1] == 'J' || lines[s0 + 1][s1] == 'L') {
            pos[1] = 1;
        }
    } if (s1 - 1 >= 0 && loop_positions[s0][s1 - 1] == 1) {
        if (lines[s0][s1 - 1] == '-' || lines[s0][s1 - 1] == 'F' || lines[s0][s1 - 1] == 'L') {
            pos[2] = 1;
        }
    } if (s1 + 1 < (int)lines[s0].size() && loop_positions[s0][s1 + 1] == 1) {
        if (lines[s0][s1 + 1] == '-' || lines[s0][s1 + 1] == 'J' || lines[s0][s1 + 1] == '7') {
            pos[3] = 1;
        }
    }

    if (pos[0] == 1 && pos[1] == 1) {
        lines[s0] = lines[s0].replace(s1, 1, "|");
    } else if (pos[2] == 1 && pos[3] == 1) {
        lines[s0] = lines[s0].replace(s1, 1, "-");
    } else if (pos[0] == 1 && pos[3] == 1) {
        lines[s0] = lines[s0].replace(s1, 1, "F");
    } else if (pos[1] == 1 && pos[2] == 1) {
        lines[s0][s1] = lines[s0][s1] = 'J';
    } else if (pos[1] == 1 && pos[3] == 1) {
        lines[s0] = lines[s0].replace(s1, 1, "F");
    } else if (pos[0] == 1 && pos[2] == 1) {
        lines[s0][s1] = lines[s0][s1] = 'L';
    }
        
    vector<vector<int>> inside;

    for (int i = 0; i < (int)lines.size(); i++) {
        string& line = lines[i];
        vector<vector<int>> inside_line = process_line(line, i, loop_positions);
        inside.insert(inside.end(), inside_line.begin(), inside_line.end());
    }

    return inside.size();
}