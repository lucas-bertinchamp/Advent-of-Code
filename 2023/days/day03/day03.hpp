#ifndef DAY03_HPP_INCLUDED
#define DAY03_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
int part2(string& input);

vector<string> parse(string& path);
bool check_around(vector<vector<int>> positions, vector<string> lines);
map<vector<int>, set<int>> check_around_2(vector<tuple<int, vector<vector<int>>>>& numbers, vector<string>& lines);
vector<tuple<int , vector<vector<int>>>> find_numbers(vector<string> lines);

#endif