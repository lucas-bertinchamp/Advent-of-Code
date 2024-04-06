#ifndef DAY12_HPP_INCLUDED
#define DAY12_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
long part2(string& input);

vector<tuple<string, vector<int>>> parse(string& path, int part);


#endif