#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day13.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

tuple<vector<vector<string>>, vector<vector<string>>> parse(string& filename) {

    ifstream file(filename);
    vector<vector<string>> lines;
    string line;

    vector<string> pattern_line;

    while (getline(file, line)) {
        if (line.size() == 0) {
            lines.push_back(pattern_line);
            pattern_line.clear();
            continue;
        } else {
            pattern_line.push_back(line);
        }
    }
    lines.push_back(pattern_line);

    vector<vector<string>> columns;

    for (vector<string> pattern : lines) {
        vector<string> pattern_column;
        for (int col = 0; col < (int)pattern[0].size(); col++) {
            string column = "";
            for (int row = 0; row < (int)pattern.size(); row++) {
                column += pattern[row][col];
            }
            pattern_column.push_back(column);
        }
        columns.push_back(pattern_column);
    }

    return make_tuple(lines, columns);
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

// This function checks if there is a line of reflection in the pattern
// is_line = true if we are checking the lines, false if we are checking the columns
// continue_if = x if we want to skip the line/column x
// These two parameters are used for part 2
int find_row(vector<string>& lines, bool is_line = false, int continue_if = -1) {

    for (int i = 1; i < (int)lines.size(); i++) {
        if ((is_line && continue_if == 100*i) || (!is_line && continue_if == i)) {
            continue;
        }

        bool found = false;
        // +1 because we want to check the middle line as well
        for (int j = 0; j < (int)lines[i].size()+1; j++) {
            if (i - j - 1 >= 0 && i+j < (int)lines.size() && lines[i-j-1] == lines[i+j]) {
                continue;

            } else if (i-j-1 < 0 || i+j >= (int)lines.size()) {
                found = true;
                break;

            } else {
                break;
            }
        }

        if (found) {
            return i;
        }
    }
    return -1;
}

int part1(string& input) {

    tuple<vector<vector<string>>, vector<vector<string>>> parsed = parse(input);
    vector<vector<string>> lines = get<0>(parsed);
    vector<vector<string>> columns = get<1>(parsed);

    int total = 0;
    for (int pattern = 0; pattern < (int)lines.size(); pattern++) {
        vector<string> pattern_line = lines[pattern];
        
        int row = find_row(pattern_line);
        if (row != -1) {
            total += 100* row;

        } else {
            vector<string> pattern_column = columns[pattern];
            int col = find_row(pattern_column);
            total += col;
        }
    }

    return total;
}

// This function tests all the possible new patterns until it finds one with a different line of reflection
int find_new(vector<string> pattern_line, vector<string> pattern_column, int original) {

    for (int line = 0; line < (int)pattern_line.size(); line++) {
        for (int col = 0; col < (int)pattern_line[line].size(); col++) {
            vector<string> new_pattern_line = pattern_line;
            vector<string> new_pattern_column = pattern_column;

            if (pattern_line[line][col] == '.') {
                new_pattern_line[line].replace(col, 1, "#");
                new_pattern_column[col].replace(line, 1, "#");

            } else if (pattern_line[line][col] == '#') {
                new_pattern_line[line].replace(col, 1, ".");
                new_pattern_column[col].replace(line, 1, ".");
            }

            int value = find_row(new_pattern_line, true, original);
            if (value != -1 && 100 * value != original) {
                return 100*value;
            }

            value = find_row(new_pattern_column, false, original);
            if (value != -1 && value != original) {
                return value;
            }
        }
    }
    return -1;
    
}

int part2(string& input) {

    tuple<vector<vector<string>>, vector<vector<string>>> parsed = parse(input);
    vector<vector<string>> lines = get<0>(parsed);
    vector<vector<string>> columns = get<1>(parsed);

    int total = 0;
    for (int pattern = 0; pattern < (int)lines.size(); pattern++) {
        int original = 0;

        vector<string> pattern_line = lines[pattern];
        vector<string> pattern_column = columns[pattern];

        int row = find_row(pattern_line);
        if (row != -1) {
            original = 100 * row;
        } else {
            int col = find_row(pattern_column);
            original = col;
        }

        int new_value = find_new(pattern_line, pattern_column, original);
        total += new_value;
    }

    return total;
}