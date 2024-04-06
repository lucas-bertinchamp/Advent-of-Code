#ifndef DAY07_HPP_INCLUDED
#define DAY07_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
int part2(string& input);

vector<tuple<string, int>> parse(string& path);
vector<tuple<string, int>> merge_sort(vector<tuple<string, int>> &vec, int &part);
vector<tuple<string, int>> merge(vector<tuple<string, int>> &left, vector<tuple<string, int>> &right, int &part);
tuple<string, int> compare(tuple<string, int> &left, tuple<string, int> &right, int &part);
int transform_hand(string &hand);


#endif