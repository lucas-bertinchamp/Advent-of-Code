#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <map>
#include <numeric>
#include <ctime>
#include "./day01.hpp"

using namespace std;

int main(){

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

vector<string> parse(string& path){
    ifstream file;
    file.open(path, ios::in);
    vector<string> lines;
    lines.reserve(1000);
    string line;
    while(getline(file, line)){
        lines.push_back(line);
    }
    file.close();
    return lines;
}

int part1(string& input) {
    const vector<string> lines = parse(input);
    int sum = 0;
    for (const string& line : lines){
        int first = -1, last = -1;
        for (int j = 0; j < int(line.size()); j++){
            if (isdigit(line[j])) {
                first = line[j] - '0';
                break;
            }
        }
        for (int j = int(line.size()) - 1; j >= 0; j--){
            if (isdigit(line[j])) {
                last = line[j] - '0';
                break;
            }
        }
        sum += 10 * first + last;
    }
    return sum;
}

int part2(string& input) {
    const vector<string> lines = parse(input);

    // Create a dictionary with the numbers in letters
    map<string, char> numbers_dict = {
        {"zero", '0'}, {"one", '1'}, {"two", '2'}, {"three", '3'},
        {"four", '4'}, {"five", '5'}, {"six", '6'}, {"seven", '7'},
        {"eight", '8'}, {"nine", '9'}
    };

    vector<int> numbers = {};
    for (string line : lines){
        vector<string> letters = {};
        vector<char> data = {};
        for (int j = 0; j < int(line.size()); j++){
            if (isdigit(line[j])) {
                data.push_back(line[j]);
                letters = {};
            } else {
                for (int k = 0; k < int(letters.size()); k++){
                    letters[k] += line[j];
                }

                letters.push_back(string(1, line[j]));

                for (int k = 0; k < int(letters.size()); k++){
                    if (numbers_dict.find(letters[k]) != numbers_dict.end()){
                        data.push_back(numbers_dict[letters[k]]);
                        break;
                    }
                }
            }
        }
        numbers.push_back(10 * (data[0] - '0') + data[data.size()-1] - '0');
    }
    return accumulate(numbers.begin(), numbers.end(), 0);
}
