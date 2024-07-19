import { Solver } from '../util/solver';

export class AdventOfCode2023Day14 implements Solver {
  platform: string[][];

  constructor(input: string) {
    this.platform = input.split('\n').map((line) => line.split(''));
  }

  tilt(_direction: 'N') {
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

  calcLoad(_direction: 'N'): number {
    const height = this.platform.length;
    return this.platform
      .map((line, i) => line.filter((e) => e === 'O').map(() => height - i))
      .reduce((p, c) => [...p, ...c], [])
      .reduce((p, c) => p + c, 0);
  }

  solvePart1(): number {
    this.tilt('N');
    return this.calcLoad('N');
  }

  solvePart2(): number {
    return 0;
  }
}
