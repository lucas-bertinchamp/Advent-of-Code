#ifndef DAY08_HPP_INCLUDED
#define DAY08_HPP_INCLUDED

#include <vector>
#include <string>
#include <map>
#include <set>

using namespace std;

int part1(string& input);
long long int part2(string& input);

tuple<string, map<string, vector<string>>> parse(string& path);
vector<string> step(vector<string> &current, map<string, vector<string>> &network, int &direction);
long long pgcd(long long a, long long b);
long long ppcm(long long a, long long b);
long long part2_2(string& input);

#endif