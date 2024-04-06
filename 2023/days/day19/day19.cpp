#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day19.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

auto parse(string& filename) {

    ifstream file(filename);
    vector<string> lines;
    string line;

    map<string, vector<tuple<char, char, int, string>>> workflows;
    vector<map<char, int>> data;

    bool instructions = true;

    while (getline(file, line)) {
        if (line == "") {
            instructions = false;
            continue;

        } else if (instructions) {
            int index = line.find("{");
            string key = line.substr(0, index);
            line = line.substr(index + 1, line.size() - index - 1);

            vector<tuple<char, char, int, string>> workflow;
            while (line.find(",") != string::npos) {
                index = line.find(",");
                string sub = line.substr(0, index);
                line = line.substr(index + 1, line.size() - index - 1);

                char variable = sub[0];
                char op = sub[1];
                sub = sub.substr(2, sub.size() - 2);

                index = sub.find(":");
                int cost = stoi(sub.substr(0, index));
                sub = sub.substr(index + 1, sub.size() - index - 1);

                workflows[key].push_back(make_tuple(variable, op, cost, sub));
            }

            workflows[key].push_back(make_tuple(0, 0, 0, line.substr(0, line.size() - 1)));
            

        } else {
            map<char, int> line_data;
            line = line.substr(1, line.size() - 2);
            while (line.find(",") != string::npos) {
                int index = line.find(",");
                string sub = line.substr(0, index);
                line = line.substr(index + 1, line.size() - index - 1);

                index = sub.find("=");
                char key = sub.substr(0, index)[0];
                int value = stoi(sub.substr(index + 1, sub.size() - index - 1));

                line_data[key] = value;
            }
            line_data[line[0]] = stoi(line.substr(2, line.size() - 2));
            data.push_back(line_data);
        }
    }

    return make_tuple(workflows, data);
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

int part1(string& input) {

    auto parsed = parse(input);
    auto workflows = get<0>(parsed);
    auto data = get<1>(parsed);

    int total = 0;

    for (auto& line : data) {
        string current_workflow = "in";
        auto workflow = workflows[current_workflow];

        while (current_workflow != "A" && current_workflow != "R") {
            for (auto& step : workflow) {
                if (get<0>(step) == 0) {
                    current_workflow = get<3>(step);
                    workflow = workflows[current_workflow];
                    break;
                }
                char variable = get<0>(step);
                char op = get<1>(step);
                int cost = get<2>(step);
                string next_workflow = get<3>(step);
                if (op == '>') {
                    if (line[variable] > cost) {
                        current_workflow = next_workflow;
                        workflow = workflows[current_workflow];
                        break;
                    }
                } else if (op == '<') {
                    if (line[variable] < cost) {
                        current_workflow = next_workflow;
                        workflow = workflows[current_workflow];
                        break;
                    }
                }
            } 
        }

        if (current_workflow == "A") {
            total += line['x'] + line['m'] + line['a'] + line['s']; 
        }

    }

    return total;
}

int part2(string& input) {

    return 0;
}