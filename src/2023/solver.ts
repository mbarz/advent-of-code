import { readTextFileLines } from './util';

export abstract class Solver {
  protected lines: string[];

  constructor(private day: number, sub?: string) {
    this.lines = readTextFileLines(day, sub);
  }

  run() {
    console.log(`Welcome to Advent of Code 2023 - Day ${this.day}\n`);
    console.log('Solving part 1...');
    console.time('Part1');
    const part1 = this.solvePart1();
    console.timeEnd('Part1');
    console.log(`Solution: ${part1}`);
    console.log('Solving part 2...');
    console.time('Part2');
    const part2 = this.solvePart2();
    console.timeEnd('Part2');
    console.log(`Solution: ${part2}`);
  }

  abstract solvePart1(): number;

  abstract solvePart2(): number;
}
