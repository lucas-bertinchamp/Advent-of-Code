#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day07.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>
#include <algorithm>
#include <regex>

using namespace std;

vector<tuple<string, int>> parse(string& filename) {
    ifstream file(filename);
    vector<tuple<string, int>> lines;
    string line;

    while (getline(file, line)) {
        int index = line.find(" ");
        string hand = line.substr(0, index);
        int bid = stoi(line.substr(index + 1));
        lines.push_back(make_tuple(hand, bid));
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

vector<tuple<string, int>> merge_sort(vector<tuple<string, int>> &vec, int &part) {

    if (vec.size() <= 1) {
        return vec;
    }

    vector<tuple<string, int>> left, right, result;
    left = vector<tuple<string, int>>(vec.begin(), vec.begin() + vec.size()/2);
    right = vector<tuple<string, int>>(vec.begin() + vec.size()/2, vec.end());

    left = merge_sort(left, part);
    right = merge_sort(right, part);
    result = merge(left, right, part);

    return result;
}

vector<tuple<string, int>> merge(vector<tuple<string, int>> &left, vector<tuple<string, int>> &right, int &part) {

    vector<tuple<string, int>> result;

    while ((int)left.size() > 0 || (int)right.size() > 0) {
        if ((int)left.size() > 0 && (int)right.size() > 0) {
            tuple<string, int> to_push = compare(left.front(), right.front(), part);
            result.push_back(to_push);
            if (to_push == left.front()) {
                left.erase(left.begin());
            }
            else {
                right.erase(right.begin());
            }
        }
        else if ((int)left.size() > 0) {
            result.insert(result.end(), left.begin(), left.end());
            break;
        }
        else if ((int)right.size() > 0) {
            result.insert(result.end(), right.begin(), right.end());
            break;
        }
    }
    return result;
}

int calculate_hand_order(string hand) {
    map<char, int> letters = {
        {'2', 2}, {'3', 3}, {'4', 4},
        {'5', 5}, {'6', 6}, {'7', 7},
        {'8', 8}, {'9', 9}, {'T', 10},
        {'J', 11}, {'Q', 12}, {'K', 13},
        {'A', 14}
    };

    /*vector<int> values_list;
    values_list.reserve(letters.size());

    for (int i = 0; i < (int)hand.size(); i++) {
        values_list[letters[hand[i]] - 2] += 1;
    }*/

    map<char, int> hand_map;

    for (char const& x : hand) {
        hand_map[x] += 1;
    }

    vector<int> values;

    for (auto const& x : hand_map) {
        values.push_back(x.second);
    }

    sort(values.begin(), values.end(), greater<int>());

    int result = 0;

    if (values[0] == 5) {
        result = 6;
    } else if (values[0] == 4) {
        result = 5;
    } else if (values[0] == 3 && values[1] == 2) {
        result = 4;
    } else if (values[0] == 3) {
        result = 3;
    } else if (values[0] == 2 && values[1] == 2) {
        result = 2;
    } else if (values[0] == 2) {
        result = 1;
    } else {
        result = 0;
    }

    return result;
}

tuple<string, int> compare(tuple<string, int> &left, tuple<string, int> &right, int &part) {
    string left_hand = get<0>(left);
    string right_hand = get<0>(right);
    map<char, int> letters;

    if (part == 1) {
        letters = {
        {'2', 2}, {'3', 3}, {'4', 4},
        {'5', 5}, {'6', 6}, {'7', 7},
        {'8', 8}, {'9', 9}, {'T', 10},
        {'J', 11}, {'Q', 12}, {'K', 13},
        {'A', 14}
    };
    } else {
        letters = {
        {'2', 2}, {'3', 3}, {'4', 4},
        {'5', 5}, {'6', 6}, {'7', 7},
        {'8', 8}, {'9', 9}, {'T', 10},
        {'J', 1}, {'Q', 12}, {'K', 13},
        {'A', 14}
    }; 
    }

    int left_score;
    int right_score;

    if (part == 1) {
        left_score = calculate_hand_order(left_hand);
        right_score = calculate_hand_order(right_hand);
    } else if (part == 2) {
        left_score = transform_hand(left_hand);
        right_score = transform_hand(right_hand);
    }

    if (left_score > right_score) {
        return right;
    } else if (left_score < right_score) {
        return left;
    } else {
        for (int i = 0; i < (int)left_hand.size(); i++) {
            if (letters[left_hand[i]] > letters[right_hand[i]]) {
                return right;
            } else if (letters[left_hand[i]] < letters[right_hand[i]]) {
                return left;
            }
        } 
    }
}

int part1(string& input) {

    int part = 1;

    vector<tuple<string, int>> lines = parse(input);

    // Merge sort on the vector
    vector<tuple<string, int>> sorted = merge_sort(lines, part);

    int result = 0;
    for (int i = 0; i < (int)sorted.size(); i++) {
        result += get<1>(sorted[i]) * (i+1);
    }

    return result;
}

// Function to give the best possible hand considering the jokers
int transform_hand(string &hand) {

    // If the hand is already a five, return 6
    if (hand == "JJJJJ") {
        return 6;
    // If there is no joker, return the value of the hand
    } else if (find(hand.begin(), hand.end(), 'J') == hand.end()) {
        return calculate_hand_order(hand);
    }

    // If there is a joker, create all possible combinations of hands and find the best one
    set<char> letters_used;
    int n_j = 0;

    for (int i = 0; i < (int)hand.size(); i++) {
        if (hand[i] != 'J') {
            letters_used.insert(hand[i]);
        } else {
            n_j += 1;
        }
    }

    vector<string> temp_combinations = {hand};
    vector<string> combinations = {};

    while (temp_combinations.size() > 0) {
        string current = temp_combinations.back();
        temp_combinations.pop_back();
        for (auto const& x : letters_used) {
            int index = current.find('J');
            string new_hand = current.substr(0, index) + x + current.substr(index + 1);

            if (find(new_hand.begin(), new_hand.end(), 'J') != new_hand.end()) {
                temp_combinations.push_back(new_hand);
            } else {
                combinations.push_back(new_hand);
            }
        }
    }
    vector<int> scores;
    for (int i = 0; i < (int)combinations.size(); i++) {
        scores.push_back(calculate_hand_order(combinations[i]));
    }

    int max_score = *max_element(scores.begin(), scores.end());
    return max_score;
}

int part2(string& input) {

    int part = 2;

    vector<tuple<string, int>> lines = parse(input);

    vector<tuple<string, int>> sorted = merge_sort(lines, part);

    int result = 0;
    for (int i = 0; i < (int)sorted.size(); i++) {
        result += get<1>(sorted[i]) * (i+1);
    }

    return result;
}