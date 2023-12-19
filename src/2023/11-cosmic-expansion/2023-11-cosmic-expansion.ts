import { sum } from '../../util/sum';
import { Solver } from '../util/solver';

export class AdventOfCode2023Day11 implements Solver {
  constructor(private readonly input: string) {}

  solvePart1(): number {
    return this.solvePart2(2);
  }

  solvePart2(growRate = 1000000): number {
    const map = this.input.split('\n').map((line) => line.split(''));
    const expanded = this.markExpanding(map);
    const galaxies = this.getGalaxies(expanded);
    const pairs = galaxies.flatMap((a, i) =>
      galaxies.slice(i + 1).map((b) => [a, b])
    );
    const distances = pairs.map(([a, b]) => {
      const [x1, x2] = [a.x, b.x].sort((n1, n2) => n1 - n2);
      const [y1, y2] = [a.y, b.y].sort((n1, n2) => n1 - n2);
      let distance = 0;
      for (let x = x1; x < x2; x++) {
        const grown = expanded[y1][x] === 'e';
        distance += grown ? growRate : 1;
      }
      for (let y = y1; y < y2; y++) {
        distance += expanded[y][x1] === 'e' ? growRate : 1;
      }
      return distance;
    });
    return sum(distances);
  }

  getGalaxies(map: string[][]): { y: number; x: number }[] {
    const list: { y: number; x: number }[] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === '#') list.push({ y, x });
      }
    }
    return list;
  }

  markExpanding(map: string[][]): string[][] {
    let expanded = map;

    for (let c = 0; c < expanded[0].length; c++) {
      if (!getColumn(expanded, c).includes('#')) {
        expanded = markColumn(expanded, c);
      }
    }
    for (let r = 0; r < expanded.length; r++) {
      if (!expanded[r].includes('#')) {
        expanded = markRow(expanded, r);
      }
    }
    return expanded;
  }
}

function getColumn(map: string[][], c: number): string[] {
  return Array(map.length)
    .fill('')
    .map((_, r) => map[r][c]);
}

function markColumn(map: string[][], c: number): string[][] {
  return map.map((row) => [...row.slice(0, c), 'e', ...row.slice(c + 1)]);
}

function markRow(map: string[][], r: number): string[][] {
  return [
    ...map.slice(0, r),
    Array(map[0].length).fill('e'),
    ...map.slice(r + 1),
  ];
}
