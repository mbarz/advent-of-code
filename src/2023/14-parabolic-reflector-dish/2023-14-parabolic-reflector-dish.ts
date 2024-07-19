import { Solver } from '../util/solver';
import { rotate2D } from '../util/util';

export class AdventOfCode2023Day14 implements Solver {
  platform: string[][];

  constructor(input: string) {
    this.platform = input.split('\n').map((line) => line.split(''));
  }

  rotate90Deg() {
    this.platform = rotate2D(this.platform);
  }

  spinCycle() {
    for (let i = 0; i < 4; ++i) {
      this.tiltNorth();
      this.rotate90Deg();
    }
  }

  spinCycles(n: number) {
    const history: string[] = [];
    for (let i = 0; i < n; ++i) {
      this.spinCycle();
      const current = this.platform.map((l) => l.join('')).join('\n');

      const seenAt = history.indexOf(current);
      if (seenAt >= 0) {
        console.log();
        const loopLength = i - seenAt;
        const remaining = n - i;
        const rest = remaining % loopLength;
        console.log(
          `already saw ${i} at ${seenAt}`,
          `loop length = ${loopLength}`,
          `remaining ${remaining}, so the result is current + ${rest}`,
        );
        this.spinCycles(rest - 1);
        return;
      } else {
        history.push(current);
      }
    }
  }

  tiltNorth() {
    let moved = false;
    let counter = 0;
    do {
      moved = false;
      for (let row = 1; row < this.platform.length; ++row) {
        for (let col = 0; col < this.platform[0].length; ++col) {
          if (
            this.platform[row][col] === 'O' &&
            this.platform[row - 1][col] === '.'
          ) {
            moved = true;
            this.platform[row][col] = '.';
            this.platform[row - 1][col] = 'O';
          }
        }
      }
      counter++;
    } while (moved && counter < 1000000);
  }

  calcLoadOnNorthBeams(): number {
    const height = this.platform.length;
    return this.platform
      .map((line, i) => line.filter((e) => e === 'O').map(() => height - i))
      .reduce((p, c) => [...p, ...c], [])
      .reduce((p, c) => p + c, 0);
  }

  solvePart1(): number {
    this.tiltNorth();
    return this.calcLoadOnNorthBeams();
  }

  solvePart2(): number {
    this.spinCycles(1000000000);
    return this.calcLoadOnNorthBeams();
  }
}
