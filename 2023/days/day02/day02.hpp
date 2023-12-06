#ifndef DAY02_HPP_INCLUDED
#define DAY02_HPP_INCLUDED

#include <vector>
#include <string>

using namespace std;

int part1(string& input);
int part2(string& input);

vector<string> parse(string& path);
vector<string> split(string& line, char delimiter);

#endif