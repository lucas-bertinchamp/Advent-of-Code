#ifndef DAY10_HPP_INCLUDED
#define DAY10_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
int part2(string& input);

vector<string> parse(string& path);
tuple<char, vector<int>> next_symbol_fun(vector<string>& lines, char& symbol, int& posX, int& posY, int& prevX, int& prevY);


#endif