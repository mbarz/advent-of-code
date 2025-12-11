import { range } from '../../util/array';

function rotateGrid<T>(grid: T[][]): T[][] {
  return grid[0].map((_t, i) => range(0, grid.length).map((j) => grid[j][i]));
}

function sum(numbers: number[]) {
  return numbers.reduce((prev, curr) => prev + curr, 0);
}

function calculateColumn(column: string[]): number {
  const operation = column.pop();
  const numbers = column.map((v) => Number(v.trim()));
  if (operation === '*') {
    return numbers.reduce((prev, curr) => prev * curr, 1);
  }
  if (operation === '+') {
    return sum(numbers);
  }
  throw new Error('Invalid opearation');
}

export function solvePart1(input: string) {
  const tokens = input.split('\n').map((line) => line.trim().split(/\s+/));
  const columns = rotateGrid(tokens);

  return sum(columns.map((c) => calculateColumn(c)));
}

export function solvePart2(input: string) {
  const lines = input.split('\n');
  const operations = lines.pop()!.trim().split(/\s+/).reverse();
  const rotated = rotateGrid(lines.map((l) => l.split('')))
    .map((l) => l.join('').trim())
    .reverse();

  const columns = rotated
    .join(',')
    .split(',,')
    .map((c, i) => [...c.split(','), operations[i]]);

  return sum(columns.map((c) => calculateColumn(c)));
}
