#ifndef DAY05_HPP_INCLUDED
#define DAY05_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

double part1(string& input);
double part2(string& input);

tuple<map<string, vector<vector<double>>>, vector<double>> parse(string& path);


#endif