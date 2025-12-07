from timeit import default_timer as timer
import os

def parse_input(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        a = int(lines[0].strip().split(": ")[1])
        b = int(lines[1].strip().split(": ")[1])
        c = int(lines[2].strip().split(": ")[1])
        commands = lines[4].strip().split(": ")[1].split(",")
        commands = [int(command) for command in commands]
        return a, b, c, commands

class Console:

    def __init__(self, a, b, c, part2=False):

        self.initial_b = b
        self.initial_c = c

        self.a = a
        self.b = b
        self.c = c

        self.pointer = 0
        self.output_memory = []

        self.part2 = part2
        self.stop_execution = False

    def get_combo_operand(self, operand):
        if operand in range(0, 4):
            return operand
        elif operand == 4:
            return self.a
        elif operand == 5:
            return self.b
        elif operand == 6:
            return self.c
        
    def move_pointer(self):
        self.pointer += 2

    def run_command(self, opcode, operand):
        literal_operand = operand
        combo_operand = self.get_combo_operand(literal_operand)
        if opcode == 0:
            self.adv(combo_operand)
        elif opcode == 1:
            self.bxl(literal_operand)
        elif opcode == 2:
            self.bst(combo_operand)
        elif opcode == 3:
            self.jnz(literal_operand)
        elif opcode == 4:
            self.bxc()
        elif opcode == 5:
            self.out(combo_operand)
        elif opcode == 6:
            self.bdv(combo_operand)
        elif opcode == 7:
            self.cdv(combo_operand)

    def run_program(self, commands):
        counter = 0
        self.commands = commands
        while self.pointer < len(commands):
            opcode, operand = commands[self.pointer], commands[self.pointer + 1]
            counter += 1
            self.run_command(opcode, operand)
            if self.stop_execution:
                break
        return ",".join([str(output) for output in self.output_memory])
    
    def one_iteration(self, commands):
        opcode, operand = commands[self.pointer], commands[self.pointer + 1]
        while opcode != 5:
            opcode, operand = commands[self.pointer], commands[self.pointer + 1]
            self.run_command(opcode, operand)
        return self.output_memory[-1]
    
    def adv(self, combo_operand):
        self.a = int(self.a / (2**combo_operand))
        self.move_pointer()

    def bxl(self, literal_operand):
        self.b = self.b ^ literal_operand
        self.move_pointer()

    def bst(self, combo_operand):
        self.b = combo_operand % 8
        self.move_pointer()

    def jnz(self, literal_operand):
        if self.a != 0:
            self.pointer = literal_operand
        else:
            self.move_pointer()

    def bxc(self):
        self.b = self.b ^ self.c
        self.move_pointer()

    def out(self, combo_operand):
        self.output_memory.append(combo_operand % 8)
        if self.part2:
            if self.output_memory[-1] != self.commands[len(self.output_memory) - 1]:
                self.stop_execution = True
        self.move_pointer()

    def bdv(self, combo_operand):
        self.b = int(self.a / (2**combo_operand))
        self.move_pointer()

    def cdv(self, combo_operand):
        self.c = int(self.a / (2**combo_operand))
        self.move_pointer()

    def reset(self):
        self.a = 0
        self.b = self.initial_b
        self.c = self.initial_c
        self.pointer = 0
        self.output_memory = []

    def find_a(self, commands):
        interval = [0, 7]
        for i in range(0, len(commands)):
            expected = commands[len(commands) - i - 1]
            for a in range(interval[0], interval[1] + 1):
                self.reset()
                self.a = a
                value = self.one_iteration(commands)
                if value == expected:
                    interval = [8*a, 8*a+8]
                    break
        self.reset()
        self.a = a
        return a


# ==================== Part 1 ====================

def part1(file_path):
    a, b, c, commands = parse_input(file_path)
    console = Console(a, b, c)
    return console.run_program(commands)

# ==================== Part 2 ====================
def part2(file_path):
    a, b, c, commands = parse_input(file_path)
    console = Console(a, b, c)
    return console.find_a(commands)

# ==================== Testing ====================

if __name__ == '__main__':
    day = "17"
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
    for file in [input_file]:
        if not os.path.exists(input_file):
            continue
        begin = timer()
        print("File: ", file, end=" -> ")
        print(part2(file), end="          | ")
        print("Time: ", timer() - begin)