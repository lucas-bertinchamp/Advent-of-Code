from timeit import default_timer as timer
import os
import random

def parse_input(file_path):
    graph = {}
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            n1, n2 = line.split('-')

            graph[n1] = graph.get(n1, set()) | {n2}
            graph[n2] = graph.get(n2, set()) | {n1}

    return graph


# ==================== Part 1 ====================

def get_cycles(graph, node):
    neighbors = graph.get(node)
    all_cycles = set()

    for nei in neighbors:
        nei_neighbors = graph.get(nei)
        for nei_nei in nei_neighbors:
            if nei_nei == node:
                continue
            elif node in graph.get(nei_nei, set()):
                all_cycles.add(tuple(sorted([node, nei, nei_nei])))

    return all_cycles

def part1(file_path):
    graph = parse_input(file_path)
    all_cycles = set()
    for node in graph:
        cycles = get_cycles(graph, node)
        all_cycles.update(cycles)

    count = 0
    for cycle in all_cycles:
        for node in cycle:
            if node.startswith('t'):
                count += 1
                break

    return count

# ==================== Part 2 ====================

def local_search(graph, max_steps=2500):

    nodes = list(graph.keys())

    current = {random.choice(list(graph.keys()))}
    best = set(current)

    for step in range(max_steps):

        # 1) Ajouter un sommet
        outside = [v for v in nodes if v not in current]
        add_candidates = [
            v for v in outside
            if all(v in graph[u] for u in current)
        ]

        if add_candidates:
            v = random.choice(add_candidates)
            current.add(v)
            if len(current) > len(best):
                best = set(current)
            continue

        # 2) Pas de sommet disponible
        current = {random.choice(list(graph.keys()))}
        continue

    return best


def part2(file_path):
    # On veut trouver la plus grande clique du graphe par recherche locale (pas de garantie d'avoir la solution optimale)
    graph = parse_input(file_path)
    max_clique = local_search(graph)
    return ",".join(sorted(list(max_clique)))

# ==================== Testing ====================

if __name__ == '__main__':
    day = "23"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'
    
    
    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
    
    print("\n --- Part 2 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)