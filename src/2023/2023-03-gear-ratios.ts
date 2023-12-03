import { calcSum } from './util';

export class AdventOfCode2023Day03 {
  width: number;
  height: number;

  constructor(private readonly lines: string[]) {
    this.width = lines[0].length;
    this.height = lines.length;
  }

  run() {
    console.log('Welcome to Advent of Code 2023 - Day 3\n');
    this.solvePart1();
    this.solvePart2();
  }

  solvePart1() {
    console.log('Solving part 1...');
    const all = this.getNumbers()
      .filter((n) => this.hasSpecialCharacterNearby(n))
      .map((n) => n.value);
    const solution = calcSum(all);
    console.log(
      `Sum of all numbers with special character nearby: ${solution}`
    );
    return solution;
  }

  getNumbers(): { value: number; row: number; column: number }[] {
    return this.findCoordsByRegex(/\d+/g).map((c) => ({
      ...c,
      value: +c.value,
    }));
  }

  findCoordsByRegex(regex: RegExp): {
    value: string;
    row: number;
    column: number;
  }[] {
    return this.lines
      .map((line, row) => {
        return Array.from(line.matchAll(regex)).map((f) => ({
          value: String(f[0]),
          row,
          column: Number(f.index),
        }));
      })
      .reduce((p, c) => [...p, ...c], []);
  }

  hasSpecialCharacterNearby(n: { value: number; row: number; column: number }) {
    const startX = Math.max(n.column - 1, 0);
    const endX = Math.min(this.width - 1, startX + String(n.value).length + 1);
    const startY = Math.max(n.row - 1, 0);
    const endY = Math.min(n.row + 1, this.height - 1);
    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const char = this.lines[y][x];
        if (char.match(/[^\d\.]/)) return true;
      }
    }
    return false;
  }

  solvePart2() {
    console.log('Solving part 2...');
    const solution = calcSum(this.getGears().map((g) => g.ratio));
    console.log(
      `Sum of all numbers with special character nearby: ${solution}`
    );
    return solution;
  }

  getGears(): {
    row: number;
    column: number;
    ratio: number;
  }[] {
    const numbers = this.getNumbers();
    return this.findCoordsByRegex(/\*/g)
      .map((finding) => ({
        ...finding,
        neighbors: this.getNumbersNextTo(numbers, finding),
      }))
      .filter(({ neighbors }) => neighbors.length === 2)
      .map((g) => ({
        ...g,
        ratio: g.neighbors[0].value * g.neighbors[1].value,
      }));
  }

  private getNumbersNextTo(
    numbers: { value: number; row: number; column: number }[],
    finding: { row: number; column: number }
  ) {
    // only works because all numbers are max 3 digits
    return numbers.filter((n) => {
      const closeRow = Math.abs(n.row - finding.row) <= 1;
      const startAtCloseCol = Math.abs(n.column - finding.column) <= 1;
      const end = n.column + String(n.value).length - 1;
      const endAtCloseCol = Math.abs(end - finding.column) <= 1;
      return closeRow && (startAtCloseCol || endAtCloseCol);
    });
  }
}
