import itertools
from copy import deepcopy
from enum import Enum
from timeit import default_timer as timer
import os

class Wire:
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def __lt__(self, other):
        return self.name < other.name

class WireDictionary:
    def __init__(self):
        self.wires = {}

    def addWire(self, wire):
        self.wires[wire.name] = wire

    def getWire(self, name):
        return self.wires.get(name, None)

    def __getitem__(self, item):
        return self.wires.get(item, None)

    def __str__(self):
        return "\n".join(f"{wire.name}: {wire.value}" for wire in self.wires.values())

    def __repr__(self):
        return self.__str__()

class LogicGate(Enum):
    AND = "AND"
    OR = "OR"
    XOR = "XOR"

class LogicAssertion:
    def __init__(self, wireName1 : str, wireName2 : str, wireResult : str, gate: LogicGate):
        self.wireName1 = wireName1
        self.wireName2 = wireName2
        self.gate = gate

        self.wireResult = wireResult

        self.resolved = False
        self.result = None

    def __str__(self):
        return f"{self.wireName1} {self.gate.value} {self.wireName2} -> {self.wireResult}"

    def __repr__(self):
        return self.__str__()

class Resolver:

    def __init__(self, wireDict: WireDictionary, logicAssertions: list[LogicAssertion]):
        self.wireDict = wireDict
        self.logicAssertions = logicAssertions

        self.augmentedWireDict = deepcopy(self.wireDict)
        self.remainingAssertions = [assertion for assertion in self.logicAssertions if not assertion.resolved]

    def resolve(self) -> WireDictionary:
        while self.remainingAssertions:
            for assertion in self.remainingAssertions:
                wire1 = self.augmentedWireDict.getWire(assertion.wireName1)
                wire2 = self.augmentedWireDict.getWire(assertion.wireName2)

                if wire1 is None or wire2 is None:
                    continue

                if assertion.gate == LogicGate.AND:
                    result_value = wire1.value & wire2.value
                elif assertion.gate == LogicGate.OR:
                    result_value = wire1.value | wire2.value
                elif assertion.gate == LogicGate.XOR:
                    result_value = wire1.value ^ wire2.value
                else:
                    raise ValueError(f"Unknown gate: {assertion.gate}")

                result_wire = Wire(assertion.wireResult, result_value)
                self.augmentedWireDict.addWire(result_wire)
                assertion.resolved = True
                assertion.result = result_value

            self.remainingAssertions = [a for a in self.remainingAssertions if not a.resolved]

        return self.augmentedWireDict


def parse_input(file_path):
    with open(file_path, 'r') as file:
        isWireParsing = True
        wireDict = WireDictionary()
        logicAssertions = []
        for line in file.readlines():
            line = line.strip()

            if line == "":
                isWireParsing = False
                continue

            if isWireParsing:
                parts = line.split(": ")
                wireDict.addWire(Wire(parts[0], int(parts[1])))
            else:
                parts = line.split(" -> ")
                wireResult = parts[1]
                gateParts = parts[0].split(" ")
                logicAssertions.append(LogicAssertion(wireName1=gateParts[0], wireName2=gateParts[2], gate=LogicGate(gateParts[1]), wireResult=wireResult))

    return wireDict, logicAssertions

def getSolution(wireDict: WireDictionary) -> int:
    allZWires = [wire for wire in wireDict.wires.values() if wire.name.startswith("z")]
    allZWires.sort()
    values = [wire.value for wire in allZWires]
    decimalValue = sum([2**i * value for i, value in enumerate(values)])
    return decimalValue


def part1(file_path):
    wireDict, logicAssertions = parse_input(file_path)
    resolver = Resolver(wireDict, logicAssertions)

    resolvedDict = resolver.resolve()

    solution = getSolution(resolvedDict)

    return solution




if __name__ == '__main__':
    day = "24"
    input_file = f'2024/days/day{day}/input.txt'
    example_file = f'2024/days/day{day}/example.txt'

    print("\n --- Part 1 --- ")
    for file in [example_file, input_file]:
        if not os.path.exists(file):
            print("File not found:", file)
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part1(file), end="          | ")
        print("Time: ", timer() - begin)
