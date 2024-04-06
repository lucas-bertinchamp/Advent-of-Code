#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day08.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <pthread.h>
#include <numeric>
#include <algorithm>
#include <regex>

using namespace std;

tuple<string, map<string, vector<string>>> parse(string& filename) {
    ifstream file(filename);
    vector<tuple<string, int>> lines;
    string line;

    map<string, vector<string>> network;
    string directions;

    int i = 0;
    while (getline(file, line)) {
        if (i == 0 and line != "") {
            directions = line;
        } else if (line == "") {
            i++;
        } else {
            int equal = line.find("=");
            string key = line.substr(0, equal - 1);
            string value = line.substr(equal + 2, line.size());

            int comma = value.find(",");
            string value1 = value.substr(1, comma - 1);
            string value2 = value.substr(comma + 2, 3);

            network[key] = {value1, value2};
        }
    }

    return make_tuple(directions, network);
}

int main() {

    int test = 0;
    string input;
    
    if (test) {
        input = "../example1.txt";
    } else {
        input = "../input.txt";
    }

    int begin = clock();
    cout << "Answer part 1 : " << part1(input) << endl;
    int end = clock();
    cout << "Time part 1 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    if (test) {
        input = "../example2.txt";
    }

    begin = clock();
    cout << "Answer part 2 : " << part2_2(input) << endl;
    end = clock();
    cout << "Time part 2 : " << double(end - begin) / CLOCKS_PER_SEC << " sec" << endl;

    return 0;
}

int part1(string& input) {

    tuple<string, map<string, vector<string>>> parsed = parse(input);
    string directions = get<0>(parsed);
    map<string, vector<string>> network = get<1>(parsed);

    string current = "AAA";
    int current_index = 0;

    map<char, int> left_right;
    left_right['L'] = 0;
    left_right['R'] = 1;

    while (current != "ZZZ") {
        vector<string> next_couple = network[current];
        char direction = directions[current_index % directions.size()];
        current = next_couple[left_right[direction]];
        current_index++;
    }

    return current_index;
}

vector<string> step(vector<string> &current, map<string, vector<string>> &network, int &direction) {

    vector<string> next;

    for (string &key : current) {
        vector<string> next_couple = network[key];
        next.push_back(next_couple[direction]);
    }

    return next;
}


long long pgcd(long long a, long long b) {
    while (b != 0) {
        unsigned long long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

long long ppcm(long long a, long long b) {
    return (a * b) / pgcd(a, b);
}

long long int part2(string& input) {

    tuple<string, map<string, vector<string>>> parsed = parse(input);

    string directions = get<0>(parsed);
    map<string, vector<string>> network = get<1>(parsed);

    vector<string> current;

    for (auto it = network.begin(); it != network.end(); it++) {
        if (it->first[2] == 'A') {
            current.push_back(it->first);
        }
    }

    map<char, int> left_right;
    left_right['L'] = 0;
    left_right['R'] = 1;

    int current_index = 0;
    bool finished = false;

    // First_z[i] is the current_index when the i-th element has visited a Z for the first time
    // I have noticied during the development that second_z[i] = first_z[i] * 2, for all i
    // So I only need to find the first time each element has visited a Z
    vector<int> first_z;
    vector<int> time_visited;

    for (int i = 0; i < (int)current.size(); i++) {
        first_z.push_back(0);
        time_visited.push_back(0);
    }

    while (!finished) {

        char direction = directions[current_index % directions.size()];

        int direction_index = left_right[direction];
        current = step(current, network, direction_index);
        current_index++;

        for (int i = 0; i < (int)current.size(); i++) {
            if (current[i][2] == 'Z') {
                if (time_visited[i] == 0) {
                    first_z[i] = current_index;
                    time_visited[i] = 1;
                }
            }
        }

        if (find(first_z.begin(), first_z.end(), 0) == first_z.end()) {
            finished = true;
        }

    }

    // We have to find the ppcm of all the first_z
    unsigned long long int result = 1;
    for (int i = 0; i < (int)current.size(); i++) {
        result = ppcm(result, first_z[i]);
    }

    return result;
}

struct thread_data {
    map<string, vector<string>> network;
    string directions;
    string current;
    vector<int>* first_z_vector;
};

void *pthread_function(void *threadarg) {

    struct thread_data *my_data;
    my_data = (struct thread_data *) threadarg;

    map<string, vector<string>> network = my_data->network;
    string directions = my_data->directions;
    string current = my_data->current;
    vector<int>* first_z_vector = my_data->first_z_vector;


    int current_index = 0;

    map<char, int> left_right;
    left_right['L'] = 0;
    left_right['R'] = 1;

    while (current[2] != 'Z') {
        vector<string> next_couple = network[current];
        char direction = directions[current_index % directions.size()];
        current = next_couple[left_right[direction]];
        current_index++;
    }

    (*first_z_vector).push_back(current_index);

    pthread_exit(NULL);
}

long long part2_2(string& input) {

    tuple<string, map<string, vector<string>>> parsed = parse(input);

    string directions = get<0>(parsed);
    map<string, vector<string>> network = get<1>(parsed);

    vector<string> current;

    for (auto it = network.begin(); it != network.end(); it++) {
        if (it->first[2] == 'A') {
            current.push_back(it->first);
        }
    }

    vector<int> first_z_vector;

    struct thread_data thread_data;
    thread_data.network = network;
    thread_data.directions = directions;
    thread_data.first_z_vector = &first_z_vector;

    // Creation of the threads
    vector<pthread_t> threads;
    for (int i = 0; i < (int)current.size(); i++) {
        thread_data.current = current[i];
        pthread_t thread;
        int a = pthread_create(&thread, NULL, pthread_function, (void *)&thread_data);
        if (a) {
            cout << "Error:unable to create thread," << a << endl;
            exit(-1);
        }
        threads.push_back(thread);
    }

    // Joining the threads
    for (int i = 0; i < (int)threads.size(); i++) {
        pthread_join(threads[i], NULL);
    }

    // We have to find the ppcm of all the first_z
    unsigned long long int result = 1;
    for (int i = 0; i < (int)current.size(); i++) {
        result = ppcm(result, first_z_vector[i]);
    }

    return result;
}