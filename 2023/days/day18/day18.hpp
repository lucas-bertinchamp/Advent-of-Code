#ifndef DAY18_HPP_INCLUDED
#define DAY18_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
long part2(string& input);

vector<tuple<tuple<char, int>, string>> parse(string& path);


#endif