import { readFileSync } from 'fs';

export type FoldInstruction = { x: number } | { y: number };
type Point2D = { x: number; y: number };

function isVertical(instr: FoldInstruction): instr is { y: number } {
  return Object.keys(instr).includes('y');
}

export function parse(file: string): {
  points: Point2D[];
  instructions: FoldInstruction[];
} {
  const input = readFileSync(`res/${file}-input-2021-13.txt`, 'utf-8');
  const lines = input.split('\n').filter((l) => !!l);
  const points = lines
    .filter((l) => !l.startsWith('fold'))
    .map((l) => l.split(',').map((n) => Number(n)))
    .map(([x, y]) => ({ x, y }));
  const instructions = lines
    .filter((l) => l.startsWith('fold'))
    .map((l) => {
      const m = l.match(/(\w)=(\d+)$/);
      if (m == null) throw new Error('invalid line');
      const n = Number(m[2]);
      return m[1] === 'x' ? { x: n } : { y: n };
    });
  return { points, instructions };
}

export function fold(
  points: Point2D[],
  instruction: FoldInstruction
): Point2D[] {
  return uniquePoints(
    isVertical(instruction)
      ? foldVertical(points, instruction.y)
      : foldHorizontal(points, instruction.x)
  );
}

function uniquePoints(points: Point2D[]) {
  return points.reduce(
    (p, c) => (p.find((o) => isSamePoint(c, o)) != null ? p : [...p, c]),
    [] as Point2D[]
  );
}

function isSamePoint(a: Point2D, b: Point2D) {
  return a.x === b.x && a.y === b.y;
}

export function foldVertical(points: Point2D[], y: number): Point2D[] {
  return [
    ...points.filter((p) => p.y < y),
    ...points.filter((p) => p.y > y).map((p) => ({ x: p.x, y: 2 * y - p.y })),
  ];
}

export function foldHorizontal(points: Point2D[], x: number): Point2D[] {
  return [
    ...points.filter((p) => p.x < x),
    ...points.filter((p) => p.x > x).map((p) => ({ x: 2 * x - p.x, y: p.y })),
  ];
}

export function print(points: Point2D[]) {
  const xMax = Math.max(...points.map((p) => p.x));
  const yMax = Math.max(...points.map((p) => p.y));
  const map = Array(yMax + 1)
    .fill([])
    .map(() => Array(xMax + 1).fill('.'));
  points.forEach((p) => (map[p.y][p.x] = '#'));
  console.log(map.map((row) => row.join('')).join('\n'));
}
