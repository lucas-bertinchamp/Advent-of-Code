#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day05.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

tuple<map<string, vector<vector<double>>>, vector<double>> parse(string& filename) {

    ifstream file(filename);
    vector<tuple<vector<double>, vector<double>>> lines;
    string line;

    double category = 0;
    vector<double> seeds;
    vector<vector<double>> seed2soil;
    vector<vector<double>> soil2fertilizer;
    vector<vector<double>> fertilizer2water;
    vector<vector<double>> water2light;
    vector<vector<double>> light2temperature;
    vector<vector<double>> temperature2humidity;
    vector<vector<double>> humidity2location;

    map<string, vector<vector<double>>> data;
    data["seed2soil"] = seed2soil;
    data["soil2fertilizer"] = soil2fertilizer;
    data["fertilizer2water"] = fertilizer2water;
    data["water2light"] = water2light;
    data["light2temperature"] = light2temperature;
    data["temperature2humidity"] = temperature2humidity;
    data["humidity2location"] = humidity2location;

    vector<string> cat2name = {"", "seed2soil", "soil2fertilizer", "fertilizer2water", "water2light", "light2temperature", "temperature2humidity", "humidity2location"};

    while (getline(file, line)) {
        if (line == "") {
            category++;
            continue;

        } else if (!isdigit(line[0]) && category != 0) {
            continue;

        } else if (category == 0) {
            line = line.substr(7, line.size() - 1);

            while (line.find(" ") != string::npos) {
                seeds.push_back(stol(line.substr(0, line.find(" "))));
                line = line.substr(line.find(" ") + 1, line.size() - 1);
            }
            seeds.push_back(stol(line));

        } else {
            vector<double> temp;
            while(line.find(" ") != string::npos) {
                temp.push_back(stol(line.substr(0, line.find(" "))));
                line = line.substr(line.find(" ") + 1, line.size() - 1);
            }
            temp.push_back(stol(line));
            data[cat2name[category]].push_back(temp);
        } 
    }

    return make_tuple(data, seeds);
}

int main() {
    string input = "../input.txt";

    double begin = clock();
    cout << fixed << "Answer part 1 : " << part1(input) << endl;
    double end = clock();
    cout << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    begin = clock();
    cout << "Answer part 2 : " << part2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

double find_value(double begin, string tag, map<string, vector<vector<double>>> data) {
    vector<vector<double>> values = data[tag];
    for (vector<double> value : values) {
        if (begin >= value[1] && begin <= value[1] + value[2]) {
            return value[0] + (begin - value[1]);
        }
    }
    return begin;
}

double part1(string& input) {

    tuple<map<string, vector<vector<double>>>, vector<double>> all_data = parse(input);

    map<string, vector<vector<double>>> data = get<0>(all_data);
    vector<double> seeds = get<1>(all_data);

    vector<string> tags = {"seed2soil", "soil2fertilizer", "fertilizer2water", "water2light", "light2temperature", "temperature2humidity", "humidity2location"};
    
    vector<double> locations;

    for (double seed : seeds) {
        for (string tag : tags) {
            seed = find_value(seed, tag, data);
        }
        locations.push_back(seed);
    }

    double min = locations[0];
    for (double location : locations) {
        if (location < min) {
            min = location;
        }
    }
    
    return min;
}

vector<vector<double>> find_value2(vector<vector<double>> intervals, string tag, map<string, vector<vector<double>>> data) {

    vector<vector<double>> values = data[tag];
    vector<vector<double>> new_intervals;

    while (intervals.size() != 0) {
        vector<double> interval = intervals[0];
        intervals.erase(intervals.begin());
        
        for (vector<double> value : values) {
            if (interval[0] >= value[1] && interval[0] < value[1] + value[2]) {
                if (interval[1] >= value[1] && interval[1] < value[1] + value[2]) {
                    vector<double> new_interval = {value[0] + (interval[0] - value[1]), value[0] + (interval[1] - value[1])};
                    new_intervals.push_back(new_interval);
                    interval[0] = interval[1];
                    break;

                } else if (interval[1] >= value[1] + value[2]){
                    vector<double> new_interval = {value[0] + (interval[0] - value[1]), value[0] + value[2] - 1};
                    new_intervals.push_back(new_interval);
                    interval[0] = value[1] + value[2];
                }

            } else if (interval[0] < value[1]) {
                if (interval[1] >= value[1] && interval[1] < value[1] + value[2]) {
                    vector<double> new_interval = {value[0], value[0] + (interval[1] - value[1])};
                    new_intervals.push_back(new_interval);
                    interval[1] = value[1] - 1;

                } else if (interval[1] >= value[1] + value[2]) {
                    vector<double> new_interval = {value[0], value[0] + value[2] - 1};
                    new_intervals.push_back(new_interval);
                    intervals.push_back({value[1] + value[2], interval[1]});

                    interval[1] = value[1] - 1;
                }
            }
        }
        
        if (interval[0] != interval[1]) {
            new_intervals.push_back(interval);
        }
    }
    return new_intervals;
}

double part2(string& input) {

    tuple<map<string, vector<vector<double>>>, vector<double>> all_data = parse(input);

    map<string, vector<vector<double>>> data = get<0>(all_data);
    vector<double> seeds = get<1>(all_data);

    vector<string> tags = {"seed2soil", "soil2fertilizer", "fertilizer2water", "water2light", "light2temperature", "temperature2humidity", "humidity2location"};
    
    vector<double> locations = {};

    vector<double> all_seeds;

    double min = INFINITY;

    for (double i = 0; i < seeds.size(); i+=2) {
        double seed1 = seeds[i];
        double seed2 = seeds[i] + seeds[i + 1] - 1;

        vector<vector<double>> intervals = {{seed1, seed2}};
        vector<vector<double>> new_intervals = {};

        for (string tag : tags) {
            new_intervals = find_value2(intervals, tag, data);
            intervals = new_intervals;
        }

        for (vector<double> interval : intervals) {
            if (interval[0] < min) {
                min = interval[0];
            }
        }
    }

    return min;
}