#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day11.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

vector<vector<long long>> parse(string& filename, int& expansion) {

    ifstream file(filename);
    vector<string> lines;
    string line;

    while (getline(file, line)) {
        lines.push_back(line);
    }

    map<int, long long> line_planet;
    long long line_offset = 0;

    for (int i = 0; i < (int)lines.size(); i++) {
        bool symbol = false;
        for (int j = 0; j < (int)lines[i].size(); j++) {
            if (lines[i][j] == '#') {
                line_planet[i] = line_offset + i;
                symbol = true;
                break;
            }
        }
        if (!symbol) {
            line_offset += expansion - 1;
        }
    }

    vector<vector<long long>> planets;

    long long col_offset = 0;

    for (int col = 0; col < (int)lines[0].size(); col++) {
        bool symbol = false;
        for (int line = 0; line < (int)lines.size(); line++) {
            if (lines[line][col] == '#') {
                planets.push_back({line_planet[line], (long long)col + col_offset});
                symbol = true;
            }
        }
        if (!symbol) {
            col_offset += expansion - 1;
        }
    }
    
    return planets;
}

int main() {

    int test = 0;
    string input;
    int expand;

    if (test) {
        input = "../example.txt";
        expand = 10;
    } else {
        input = "../input.txt";
        expand = 1000000;
    }

    int begin = clock();
    cout << "Answer part 1 : " << part1(input) << endl;
    int end = clock();
    cout << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    begin = clock();
    cout << "Answer part 2 : " << part2(input, expand) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

int part1(string& input) {

    int expansion = 2;
    vector<vector<long long>> planet = parse(input, expansion);
    
    vector<int> distances;

    for (int i = 0; i < (int)planet.size(); i++) {
        for (int j = i+1; j < (int)planet.size(); j++) {
            distances.push_back(abs(planet[i][0] - planet[j][0]) + abs(planet[i][1] - planet[j][1]));
        }
    }

    long somme = 0;
    for (auto& distance : distances) {
        somme += distance;
    }

    return somme;
}

long long part2(string& input, int& expansion) {

    vector<vector<long long>> planets = parse(input, expansion);

    vector<long long> distances;

    for (int i = 0; i < (int)planets.size(); i++) {
        for (int j = i+1; j < (int)planets.size(); j++) {
            distances.push_back(abs(planets[i][0] - planets[j][0]) + abs(planets[i][1] - planets[j][1]));
        }
    }

    long somme = 0;
    for (auto& distance : distances) {
        somme += distance;
    }

    return somme;
}