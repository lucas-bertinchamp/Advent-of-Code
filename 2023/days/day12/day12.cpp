#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day12.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

vector<tuple<string, vector<int>>> parse(string& filename) {

    ifstream file(filename);
    vector<tuple<string, vector<int>>> lines;
    string line;

    while (getline(file, line)) {
        int index = line.find(' ');
        string name = line.substr(0, index);
        string numbers_string = line.substr(index + 1, line.size() - index - 1);

        vector<int> numbers;

        while (numbers_string.find(',') != string::npos) {
            int index_comma = numbers_string.find(',');
            numbers.push_back(stoi(numbers_string.substr(0, index_comma)));
            numbers_string = numbers_string.substr(index_comma + 1, numbers_string.size() - index_comma - 1);
        }

        numbers.push_back(stoi(numbers_string));

        lines.push_back(make_tuple(name, numbers));
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

int max(vector<int>& numbers) {

    if (numbers.size() == 0) {
        return -1;
    }

    int max = numbers[0];

    for (int i = 1; i < (int)numbers.size(); i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }

    return max;
}

bool is_allowed(string arr, vector<int> numbers, bool final, int max_length) {

    vector<int> groups_length = {};
    vector<int> group_finished = {};
    int n_hashtag = 0;
    int hashtag_wanted = accumulate(numbers.begin(), numbers.end(), 0);

    // Create groups and check if they are finished
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == '#') {
            int j = i;
            while (j < (int)arr.size() && arr[j] == '#') {
                n_hashtag++;
                j++;
            }
            groups_length.push_back(j - i);
            i = j;

            if (j < (int)arr.size() && arr[j] != '#') {
                group_finished.push_back(1);
            } else {
                group_finished.push_back(0);
            }
        }
    }

    // If the arr is complete, check if the groups are correct
    if (final) {
        if (groups_length.size() != numbers.size()) {
            return false;
        } else {
            for (int i = 0; i < (int)groups_length.size(); i++) {
                if (groups_length[i] != numbers[i]) {
                    return false;
                }
            }
            return true;
        }

    // If there are no groups, return true
    } else if (groups_length.size() == 0) {
        return true;
    
    // If there are groups
    } else {
        if (n_hashtag > hashtag_wanted) {
            return false;
        } 
        for (int i = 0; i < (int)groups_length.size(); i++) {
            // If the group is finished, check if it is correct
            if (group_finished[i] == 1) {
                if (groups_length[i] != numbers[i]) {
                    return false;
                }
            // If the group is not finished, check if it is possible
            } else {
                if (groups_length[i] > numbers[i]) {
                    return false;
                }
            }
        }
        return true;
    }
}

long process_line(tuple<string, vector<int>>& line) {

    string springs = get<0>(line);
    vector<int> numbers = get<1>(line);
    string initial_arr = "";
    vector<string> arr = { initial_arr };
    bool final = false;
    int max_length = springs.size();

    for (int i = 0; i < (int)springs.size(); i++) {
        if (i == (int)springs.size() - 1) {
            final = true;
        }
        if (springs[i] == '.' || springs[i] == '#') {
            vector<string> new_arr = {};
            for (string a : arr) {
                if (is_allowed(a + springs[i], numbers, final, max_length)) {
                    new_arr.push_back(a + springs[i]);
                }
            }
            arr = new_arr;
        } else {
            vector<string> new_arr;
            for (string& a : arr) {
                string first = a + '.';
                string second = a + '#';
                if (is_allowed(first, numbers, final, max_length)) {
                    new_arr.push_back(first);
                }
                if (is_allowed(second, numbers, final, max_length)) {
                    new_arr.push_back(second);
                }
            }
            arr = new_arr;
        }
    }

    return (long)arr.size();
}

int part1(string& input) {

    vector<tuple<string, vector<int>>> lines = parse(input);

    int total = 0;
    for (int i = 0; i < (int)lines.size(); i++) {
        tuple<string, vector<int>> line = lines[i];
        int n_arr = process_line(line);
        total += n_arr;
    }

    return total;
}

vector<tuple<string, vector<int>>> parse2(string& filename) {

    ifstream file(filename);
    vector<tuple<string, vector<int>>> lines;
    string line;

    while (getline(file, line)) {
        int index = line.find(' ');
        string name = line.substr(0, index);
        string numbers_string = line.substr(index + 1, line.size() - index - 1);

        vector<int> numbers;

        while (numbers_string.find(',') != string::npos) {
            int index_comma = numbers_string.find(',');
            numbers.push_back(stoi(numbers_string.substr(0, index_comma)));
            numbers_string = numbers_string.substr(index_comma + 1, numbers_string.size() - index_comma - 1);
        }

        numbers.push_back(stoi(numbers_string));

        string new_name = "";
        vector<int> new_numbers = {};
        for (int i = 0; i < 4; i++) {
            new_name += name;
            new_name += "?";
        }
        new_name += name;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < (int)numbers.size(); j++) {
                new_numbers.push_back(numbers[j]);
            }
        }

        lines.push_back(make_tuple(new_name, new_numbers));
    }

    return lines;
}

long process_line2(tuple<string, vector<int>>& line) {

    cout << "Processing line : " << get<0>(line) << endl;
    if (get<0>(line) == "??????????????????????????????????????????????????????"){
        return 0;
    }

    string springs = get<0>(line);
    vector<int> numbers = get<1>(line);
    string initial_arr = "";

    map<int, vector<int>> blocks = {};

    vector<tuple<int, int>> final_blocks = {};
    vector<tuple<int, int>> current_blocks = {};
    vector<tuple<int, int>> new_blocks = {};

    bool in_block = false;
    for (int i = 0; i < (int)springs.size(); i++) {
        if (springs[i] == '?' || springs[i] == '#') {
            if (!in_block) {
                in_block = true;
            }
            for (auto block : current_blocks) {
                new_blocks.push_back(block);
                new_blocks.push_back(make_tuple(get<0>(block), get<1>(block) + 1));
            }
            current_blocks = new_blocks;
            current_blocks.push_back(make_tuple(i, 1));
            new_blocks = {};
        } else {
            if (in_block) {
                in_block = false;
                for (auto block : current_blocks) {
                    final_blocks.push_back(block);
                }
                current_blocks = {};
            }
        }
    }

    return 0;
}

long part2(string& input) {

    vector<tuple<string, vector<int>>> lines = parse2(input);

    long total = 0;
    for (int i = 0; i < (int)lines.size(); i++) {
        tuple<string, vector<int>> line = lines[i];
        long n_arr = process_line(line);
        total += n_arr;
    }

    cout << "Total : " << total << endl;

    return total;
}