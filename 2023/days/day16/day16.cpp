#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include "day16.hpp"
#include <map>
#include <ctime>   
#include <tuple>
#include <set>
#include <math.h>
#include <numeric>

using namespace std;

vector<string> parse(string& filename) {

    ifstream file(filename);
    vector<string> lines;
    string line;

    while (getline(file, line)) {
        lines.push_back(line);
    }

    return lines;
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

class Beam {
    public:
        int line;
        int column;
        // 0 = up, 1 = right, 2 = down, 3 = left
        int orientation;
        int len;
};

int move(Beam& beam) {
    
    int orientation = beam.orientation;

    if (orientation == 0) {
        beam.line--;
    } else if (orientation == 1) {
        beam.column++;
    } else if (orientation == 2) {
        beam.line++;
    } else if (orientation == 3) {
        beam.column--;
    }

    beam.len++;

    return 0;
}

void forward(Beam beam, vector<string>& lines, set<pair<int, int>>& visited, vector<pair<int, int>>& already_split, vector<Beam>& beams) {

    int line = beam.line;
    int column = beam.column;
    int orientation = beam.orientation;

    char current = lines[line][column];
    vector<Beam> new_beams;

    // Check the current position
    if (current == '.') {
        move(beam);
    } else if (current == '-') {
        if (orientation == 1 || orientation == 3) {
            move(beam);
        } else {
            for (auto p : already_split) {
                if (p.first == line && p.second == column) {
                    return;
                }
            }
            already_split.push_back({line, column});

            beam.orientation = 1;
            Beam new_beam = {beam.line, beam.column, 3, beam.len};
            move(beam);
            move(new_beam);
            new_beams.push_back(new_beam);
        }
    } else if (current == '|') {
        if (orientation == 0 || orientation == 2) {
            move(beam);
        } else {
            for (auto p : already_split) {
                if (p.first == line && p.second == column) {
                    return;
                }
            }
            already_split.push_back({line, column});

            beam.orientation = 0;
            Beam new_beam = {line, column, 2, beam.len};
            move(beam);
            move(new_beam);
            new_beams.push_back(new_beam);
        }

    } else if (current == '/') {
        if (orientation == 0) {
            beam.orientation = 1;
            move(beam);
        } else if (orientation == 1) {
            beam.orientation = 0;
            move(beam);
        } else if (orientation == 2) {
            beam.orientation = 3;
            move(beam);
        } else if (orientation == 3) {
            beam.orientation = 2;
            move(beam);
        }

    } else if (current == '\\') {
        if (orientation == 0) {
            beam.orientation = 3;
            move(beam);
        } else if (orientation == 1) {
            beam.orientation = 2;
            move(beam);
        } else if (orientation == 2) {
            beam.orientation = 1;
            move(beam);
        } else if (orientation == 3) {
            beam.orientation = 0;
            move(beam);
        }
    }

    // Create the output
    new_beams.push_back(beam);

    // Check if the new beams are valid
    vector<int> to_erase;
    for (int i = 0; i < (int)new_beams.size(); i++) {
        Beam b = new_beams[i];
        if (b.line < 0 || b.line >= (int)lines.size() || b.column < 0 || b.column >= (int)lines[0].size() || beam.len > 110 * 110) {
            to_erase.push_back(i);
        }
    }

    // Erase the invalid beams
    for (int i = to_erase.size() - 1; i >= 0; i--) {
        new_beams.erase(new_beams.begin() + to_erase[i]);
    }

    for (Beam b : new_beams) {
        visited.insert({b.line, b.column});
    }

    // Insert the new positions in the visited set
    for (Beam b : new_beams) {
        beams.push_back(b);
    }

}

int calculate_energy(Beam first_beam, vector<string>& lines) {

    vector<Beam> beams;
    set<pair<int, int>> visited = {{first_beam.line, first_beam.column}};
    beams.push_back(first_beam);
    vector<pair<int, int>> already_split = {};

    while (beams.size() > 0) {
        Beam beam = beams.back();
        beams.pop_back();
        forward(beam, lines, visited, already_split, beams);
    }

    return visited.size();
}

int part1(string& input) {

    vector<string> lines = parse(input);
    Beam firstBeam = {0, 0, 1, 1};
    return calculate_energy(firstBeam, lines);

}

int part2(string& input) {

    vector<string> lines = parse(input);
    
    int max = 0;

    for (int i = 0; i < (int)lines.size(); i++) {
        for (int j = 0; j < (int)lines[0].size(); j++) {

            if (i != 0 && j != 0 && i != (int)lines.size() - 1 && j != (int)lines[0].size() - 1) {
                continue;
            }

            if (i == 0 && j == 0) {
                max = std::max(max, calculate_energy({0, 0, 1, 1}, lines));
                max = std::max(max, calculate_energy({0, 0, 2, 1}, lines));
            } else if (i ==(int)lines.size() - 1 && j == 0) {
                max = std::max(max, calculate_energy({(int)lines.size() - 1, 0, 1, 1}, lines));
                max = std::max(max, calculate_energy({(int)lines.size() - 1, 0, 3, 1}, lines));
            } else if (i == 0 && j ==(int)lines[0].size() - 1) {
                max = std::max(max, calculate_energy({0, (int)lines[0].size() - 1, 0, 1}, lines));
                max = std::max(max, calculate_energy({0, (int)lines[0].size() - 1, 2, 1}, lines));
            } else if (i ==(int)lines.size() - 1 && j ==(int)lines[0].size() - 1) {
                max = std::max(max, calculate_energy({(int)lines.size() - 1, (int)lines[0].size() - 1, 0, 1}, lines));
                max = std::max(max, calculate_energy({(int)lines.size() - 1, (int)lines[0].size() - 1, 3, 1}, lines));
            } else if (i == 0) {
                max = std::max(max, calculate_energy({0, j, 2, 1}, lines));
            } else if (i ==(int)lines.size() - 1) {
                max = std::max(max, calculate_energy({i, j, 0, 1}, lines));
            } else if (j == 0) {
                max = std::max(max, calculate_energy({i, 0, 1, 1}, lines));
            } else if (j ==(int)lines[0].size() - 1) {
                max = std::max(max, calculate_energy({i, j, 3, 1}, lines));
            } 

        }
    }
    
    return max;
}