#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day09.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <algorithm>
#include <regex>

using namespace std;

vector<vector<int>> parse(string& filename) {
    ifstream file(filename);
    vector<vector<int>> lines;
    string line;

    while (getline(file, line)) {
        vector<int> line_values;
        while (line.find(" ") != string::npos) {
            line_values.push_back(stoi(line.substr(0, line.find(" "))));
            line = line.substr(line.find(" ") + 1);
        }
        line_values.push_back(stoi(line));
        lines.push_back(line_values);
    }
    
    return lines;
}

int main() {
    string input = "../example.txt";

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

bool check_all_zero(vector<int>& diffs) {
    for (int i = 0; i < (int)diffs.size() - 1; i++) {
        if (diffs[i] != 0) {
            return false;
        }
    }
    return true;
}

int part1(string& input) {

    vector<vector<int>> lines = parse(input);
    vector<int> extrapolations;

    for (int i = 0; i < (int)lines.size(); i++) {
        vector<int> line = lines[i];
        vector<int> last_diffs = { line.back() };
        bool continue_loop = true;

        while (continue_loop) {
            vector<int> diffs;

            for (int j = 0; j < (int)line.size() - 1; j++) {
                diffs.push_back(line[j + 1] - line[j]);
            }

            last_diffs.push_back(diffs.back());

            continue_loop = !check_all_zero(diffs);
            
            line = diffs;
        }

        int extrapolation = accumulate(last_diffs.begin(), last_diffs.end(), 0);
        extrapolations.push_back(extrapolation);
    }

    return accumulate(extrapolations.begin(), extrapolations.end(), 0);
}


int part2(string& input) {

    vector<vector<int>> lines = parse(input);
    vector<int> extrapolations;

    for (int i = 0; i < (int)lines.size(); i++) {
        vector<int> line = lines[i];
        vector<int> last_diffs = { line.front() };
        bool continue_loop = true;

        while (continue_loop) {
            vector<int> diffs;

            for (int j = 0; j < (int)line.size() - 1; j++) {
                diffs.push_back(line[j + 1] - line[j]);
            }

            last_diffs.push_back(diffs.front());

            continue_loop = !check_all_zero(diffs);

            line = diffs;

        }
        
        int extrapolation = 0;
        for (int j = last_diffs.size() - 1; j >= 0; j--) {
            extrapolation = last_diffs[j] - extrapolation;
        }
        extrapolations.push_back(extrapolation);
    }

    return accumulate(extrapolations.begin(), extrapolations.end(), 0);
}