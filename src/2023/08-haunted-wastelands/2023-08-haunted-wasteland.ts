import { Solver } from '../util/solver';

type Instruction = 'L' | 'R';

export class AdventOfCode2023Day08 implements Solver {
  instructions: Instruction[] = [];
  network: Record<string, { L: string; R: string }>;

  lines: string[];

  constructor(input: string) {
    this.lines = input.split('\n');
    const { instructions, network } = this.parseMap();
    this.instructions = instructions;
    this.network = network;
  }
  solvePart1(): number {
    return this.getDistanceToZ('AAA');
  }

  private parseMap() {
    const instructions = this.lines[0].split('') as ('L' | 'R')[];
    const network = this.lines
      .slice(2)
      .map((l) => l.match(/\w+/g) as RegExpMatchArray)
      .reduce(
        (prev, [N, L, R]) => ({ ...prev, [N]: { L, R } }),
        {} as Record<string, { L: string; R: string }>
      );
    return { instructions, network };
  }

  solvePart2(): number {
    const distances = Object.keys(this.network)
      .filter((n) => n.endsWith('A'))
      .map((n) => this.getDistanceToZ(n));
    return leastCommonMultiple(...distances);
  }

  getDistanceToZ(node: string): number {
    let { node: current, index } = this.next(node, 0);
    let counter = 1;
    while (!current.endsWith('Z')) {
      const next = this.next(current, index);
      current = next.node;
      index = next.index;
      counter++;
    }
    return counter;
  }

  next(current: string, i: number): { node: string; index: number } {
    const node = this.network[current][this.instructions[i]];
    const index = (i + 1) % this.instructions.length;
    return { node, index };
  }
}

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}
function leastCommonMultiple(...arr: number[]): number {
  if (arr.length === 2) {
    const [a, b] = arr;
    return (a / greatestCommonDivisor(a, b)) * b;
  } else {
    return arr.reduce((p, c) => leastCommonMultiple(p, c), 1);
  }
}
