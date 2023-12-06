#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day02.hpp"
#include <map>
#include <ctime>   

using namespace std;

vector<string> parse(string& filename) {
    ifstream file(filename);
    vector<string> games;
    string line;
    while (getline(file, line)) {
        int semicolon = line.find(":");
        string sets = line.substr(semicolon + 2, line.length());
        games.push_back(sets);
    }
    return games;
}

vector<string> split(string& line, char delimiter) {
    vector<string> result;
    int start = 0;
    int end = line.find(delimiter);
    while (end != int(string::npos)) {
        result.push_back(line.substr(start, end - start));
        start = end + 2;
        end = line.find(delimiter, start);
    }
    result.push_back(line.substr(start, end - start));
    return result;
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

    vector<string> games = parse(input);

    int max_blue = 14;
    int max_green = 13;
    int max_red = 12;
    map<string, int> max_colors = {{"red", max_red}, {"green", max_green}, {"blue", max_blue}};
    
    int total = 0;

    for (int i = 0; i < int(games.size()); i++) {
        string game = games[i];
        bool possible = true;

        vector<string> sets = split(game, ';');
        for (string s : sets) {
            vector<string> colors = split(s, ',');
            for (string c : colors) {
                int space = c.find(" ");
                int color = stoi(c.substr(0, space));
                string color_name = c.substr(space + 1, c.length());
                if (color > max_colors[color_name]) {
                    possible = false;
                    break;
                }
            }
            if (!possible) {
                break;
            }
        }
        if (possible) {
            total += i + 1;
        }
    }

    return total;
}

int part2(string& input) {

    vector<string> games = parse(input);

    int total = 0;

    for (int i = 0; i < int(games.size()); i++) {
        vector<string> sets = split(games[i], ';');
        map<string, int> count_colors = {{"red", 0}, {"green", 0}, {"blue", 0}};
        for (string s : sets) {
            vector<string> colors = split(s, ',');
            for (string c : colors) {
                int space = c.find(" ");
                int color = stoi(c.substr(0, space));
                string color_name = c.substr(space + 1, c.length());
                count_colors[color_name] = max(count_colors[color_name], color);
            }
        }
        total += count_colors["red"] * count_colors["green"] * count_colors["blue"];
    }
    return total;
}