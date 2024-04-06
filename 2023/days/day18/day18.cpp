#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day18.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <algorithm>

using namespace std;

vector<tuple<tuple<char, int>, string>> parse(string& filename) {

    ifstream file(filename);
    vector<tuple<tuple<char, int>, string>> lines;
    string line;

    while (getline(file, line)) {
        char direction = line[0];
        line = line.substr(2);
        int distance = stoi(line.substr(0, line.find(' ')));
        line = line.substr(line.find(' ') + 3);
        lines.push_back(make_tuple(make_tuple(direction, distance), line.substr(0, 6)));
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

long shoelace(vector<vector<long>>& points) {

    int n = points.size();

    long sum1 = 0;
    long sum2 = 0;

    for (int i = 0; i < n - 1; i++) {
        sum1 += points[i][0] * points[i + 1][1];
        sum2 += points[i][1] * points[i + 1][0];
    }

    return abs(sum1 - sum2) / 2;
}

long calculate_border(vector<vector<long>>& points, vector<char>& directions) {

    long exterior = 0;
    long turns = 0;

    for (int i = 0; i < points.size() - 1; i++) {
        exterior += abs(points[i][0] - points[i + 1][0]) + abs(points[i][1] - points[i + 1][1]) - 1;
        char direction = directions[i];
        char next_direction = directions[i + 1];
        if (direction == 'U' && next_direction == 'R' || direction == 'L' && next_direction == 'U' || direction == 'D' && next_direction == 'L' || direction == 'R' && next_direction == 'D') {
            turns++;
        }
    }

    return exterior / 2 + turns;
}

int part1(string& input) {

    vector<tuple<tuple<char, int>, string>> lines = parse(input);

    vector<char> directions_vector;
    vector<vector<long>> points = { {0, 0} };
    vector<long> previous = { 0, 0 };

    map<char, vector<long>> directions_map = { {'U', {-1, 0}}, {'D', {1, 0}}, {'L', {0, -1}}, {'R', {0, 1}} };

    for (auto line : lines) {
        char direction = get<0>(get<0>(line));
        long distance = get<1>(get<0>(line));
        directions_vector.push_back(direction);

        vector<long> direction_vector = directions_map[direction];
        vector<long> new_point = { previous[0] + distance * direction_vector[0], previous[1] + distance * direction_vector[1] };
        points.push_back(new_point);
        previous = new_point;
    }

    long interior = shoelace(points);
    long exterior = calculate_border(points, directions_vector);

    return interior + exterior - 1;
}

long part2(string& input) {

    vector<tuple<tuple<char, int>, string>> lines = parse(input);

    vector<char> directions_vector;
    vector<vector<long>> points = { {0, 0} };
    vector<long> previous = { 0, 0 };

    map<char, vector<long>> directions_map = { {'U', {-1, 0}}, {'D', {1, 0}}, {'L', {0, -1}}, {'R', {0, 1}} };
    map<int, char> directions = { {0, 'R'}, {1, 'D'}, {2, 'L'}, {3, 'U'} };

    for (auto line : lines) {
        string hexa = get<1>(line);

        char direction = directions[hexa[hexa.size() - 1] - '0'];
        int distance = stoi(hexa.substr(0, 5), nullptr, 16);

        directions_vector.push_back(direction);

        vector<long> direction_vector = directions_map[direction];
        vector<long> new_point = { previous[0] + distance * direction_vector[0], previous[1] + distance * direction_vector[1] };
        points.push_back(new_point);
        previous = new_point;
    }

    long interior = shoelace(points);
    long exterior = calculate_border(points, directions_vector);

    return interior + exterior;
}