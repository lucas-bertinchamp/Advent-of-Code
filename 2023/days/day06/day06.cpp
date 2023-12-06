#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day06.hpp"
#include <ctime>   
#include <tuple>
#include <regex>
#include <cmath>

using namespace std;

tuple<vector<int>, vector<int>> parse(string& filename) {

    ifstream file(filename);
    vector<vector<int>> lines;
    string line;

    vector<int> time;
    vector<int> distance;

    regex regex_pattern = regex("[0-9]+");
    smatch match;

    int i = 0;
    while (getline(file, line)) {
        while (regex_search(line, match, regex(regex_pattern))){
            i == 0 ? time.push_back(stoi(match.str())) : distance.push_back(stoi(match.str()));
            line = match.suffix().str();
        };
        i++;
    }

    return make_tuple(time, distance);
}

int main() {
    string input = "../input.txt";

    double begin = clock();
    cout << "Answer part 1 : " << part1(input) << endl;
    double end = clock();
    cout << fixed << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    begin = clock();
    cout << "Answer part 2 : " << part2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}


int part1(string& input) {

    tuple<vector<int>, vector<int>> all_data = parse(input);

    vector<int>& time = get<0>(all_data);
    vector<int>& distance = get<1>(all_data);

    int answer = 1;

    for (int i = 0; i < int(time.size()); i++) {
        int t = time[i];
        int d = distance[i];

        int beat = 0;

        for (int hold = 0; hold < t; hold++) {
            
            int time_remaining = t - hold;
            int score = time_remaining * hold;
            if (score > d) {
                beat++;
            }
        }
        answer *= beat;
    }
    return answer;
}

int part2(string& input) {

    tuple<vector<int>, vector<int>> all_data = parse(input);

    vector<int>& time = get<0>(all_data);
    vector<int>& distance = get<1>(all_data);

    double t = 0;
    double d = 0;

    for (int i = 0; i < int(time.size()); i++) {
        t = t * pow(10, int(log10(time[i])) + 1) + time[i];
        d = d * pow(10, int(log10(distance[i])) + 1) + distance[i];
    }

    // We look for the minimum and maximum hold time that beats the distance record
    // It's a simple optimization which divides the execution time by almost 3
    double min = 0;
    for (double hold = 0; hold < t; hold++) {
        double time_remaining = t - hold;
        double score = time_remaining * hold;
        if (score > d) {
            min = hold;
            break;
        }
    }
    double max = 0;
    for (double hold = t; hold > 0; hold--) {
        double time_remaining = t - hold;
        double score = time_remaining * hold;
        if (score > d) {
            max = hold;
            break;
        }
    }

    return int(max - min + 1);
}