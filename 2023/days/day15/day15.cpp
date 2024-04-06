#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day15.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <algorithm>

using namespace std;

vector<string> parse(string& filename) {

    ifstream file(filename);
    vector<string> lines;
    string line;

    while (getline(file, line)) {
        int index = line.find(",");
        while (index != (int)string::npos) {
            lines.push_back(line.substr(0, index));
            line = line.substr(index + 1);
            index = line.find(",");
        }
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

int hashing(string& input) {

    int value = 0;
    for (int j = 0; j < (int)input.size(); j++) {
        value += input[j];
        value *= 17;
        value %= 256;
    }

    return value;
}

int part1(string& input) {

    vector<string> lines = parse(input);
    vector<int> values;

    for (int i = 0; i < (int)lines.size(); i++) {
        values.push_back(hashing(lines[i]));
    }

    return accumulate(values.begin(), values.end(), 0);
}

int part2(string& input) {

    vector<string> lines = parse(input);

    // Hash value (box) -> Label -> (index, value)
    // Index is used to keep the order of insertion
    map<int, map<string, tuple<int, int>>> boxes;
    map<string, int> labels;

    for (int i = 0; i < (int)lines.size(); i++) {

        int index = lines[i].find("=");

        // If there is an equal sign
        if (index != (int)string::npos) {
            
            string label = lines[i].substr(0, index);
            int value = stoi(lines[i].substr(index + 1));
            int hash_value = hashing(label);

            if (boxes[hash_value].find(label) == boxes[hash_value].end()) {
                boxes[hashing(label)][label] = make_tuple(i, value);
            } else {
                boxes[hashing(label)][label] = make_tuple(get<0>(boxes[hashing(label)][label]), value);
            }

            labels[label] = hashing(label);

        // If there is a minus sign
        } else {

            index = lines[i].find("-");
            string label = lines[i].substr(0, index);

            if (labels.find(label) != labels.end()) {
                boxes[labels[label]].erase(label);
                labels.erase(label);
            }
        }
    }
    
    int total = 0;
    for (auto& box : boxes) {

        auto& labels = box.second;
        vector<tuple<int, int>> values;

        for (auto& label : labels) {
            values.push_back(label.second);
        }

        sort(values.begin(), values.end(), [](tuple<int, int>& a, tuple<int, int>& b) {
            return get<0>(a) < get<0>(b);
        });

        for (int i = 0; i < (int)values.size(); i++) {
            total += (box.first+1) * (i+1) * get<1>(values[i]);
        }
    }

    return total;
}