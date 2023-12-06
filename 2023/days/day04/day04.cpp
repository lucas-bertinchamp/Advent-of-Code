#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day04.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

vector<tuple<vector<int>, vector<int>>> parse(string& filename) {
    ifstream file(filename);
    vector<tuple<vector<int>, vector<int>>> cards;
    string card;
    while (getline(file, card)) {
        int index = card.find(":");
        card = card.substr(index + 2);

        index = card.find("|");

        string win_numbers = card.substr(0, index-1);
        string own_numbers = card.substr(index + 2);

        vector<int> win_numbers_vec;
        vector<int> own_numbers_vec;


        for (int i = 0; i < int((win_numbers.size() + 1) / 3); i++) {
            string n = win_numbers.substr(i * 3, i*3 + 2);
            if (n[0] == ' ') {
                n = n.substr(1);
            }
            string n2 = own_numbers.substr(i * 3, i*3 + 2);
            if (n2[0] == ' ') {
                n2 = n2.substr(1);
            }
            own_numbers_vec.push_back(stoi(n2));
            win_numbers_vec.push_back(stoi(n));
        }

        for (int i = int((win_numbers.size() + 1) / 3); i < int((own_numbers.size() + 1 )/3); i++) {
            string n = own_numbers.substr(i * 3, i*3 + 2);
            if (n[0] == ' ') {
                n = n.substr(1);
            }
            own_numbers_vec.push_back(stoi(n));
        }

        cards.push_back(make_tuple(win_numbers_vec, own_numbers_vec));
    }
    
    return cards;
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

    vector<tuple<vector<int>, vector<int>>> cards = parse(input);

    int result = 0;
    for (tuple<vector<int>, vector<int>> card : cards) {
        set<int> win_numbers_set;
        for (int n : get<0>(card)) {
            win_numbers_set.insert(n);
        }

        set<int> own_numbers_set;
        for (int n : get<1>(card)) {
            own_numbers_set.insert(n);
        }

        int count = 0;
        for (int n : own_numbers_set) {
            if (win_numbers_set.find(n) != win_numbers_set.end()) {
                count++;
            }
        }

        if (count == 1) {
            result++;
        } else if (count != 0){
            result += 1 * pow(2, count - 1);
        }
        
    }
    
    return result;
}

int part2(string& input) {

    vector<tuple<vector<int>, vector<int>>> cards = parse(input);
    vector<int> number_of_cards;
    for (int i = 0; i < int(cards.size()); i++) {
        number_of_cards.push_back(1);
    }

    for (int i = 0; i < int(cards.size()); i++) {
        tuple<vector<int>, vector<int>> card = cards[i];
        set<int> win_numbers_set;
        for (int n : get<0>(card)) {
            win_numbers_set.insert(n);
        }

        set<int> own_numbers_set;
        for (int n : get<1>(card)) {
            own_numbers_set.insert(n);
        }

        int count = 0;
        for (int n : own_numbers_set) {
            if (win_numbers_set.find(n) != win_numbers_set.end()) {
                count++;
            }
        }

        if (count >= 1) {
            for (int j = 1; j <= count; j++) {
                number_of_cards[i + j] += number_of_cards[i];
            }
        }  
    }

    return accumulate(number_of_cards.begin(), number_of_cards.end(), 0);
}