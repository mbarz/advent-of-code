import { readFileSync } from 'fs';

class Point2D {
  y: number;
  x: number;
  constructor({ y, x }: { y: number; x: number }) {
    this.y = y;
    this.x = x;
  }
  equals(o: Point2D) {
    return o.x === this.x && o.y === this.y;
  }
  toString() {
    return [this.x, this.y].join(';');
  }
}

export function parseHeightMapFile(file: string) {
  const fileContent = readFileSync(`res/${file}-input-2021-09.txt`, 'utf-8');
  return parseHeightMap(fileContent);
}

function parseHeightMap(input: string): number[][] {
  return input.split('\n').map((line) => line.split('').map((c) => +c));
}

export function getLowpoints(map: number[][]): Point2D[] {
  return map
    .map((r, y) => r.map((_c, x) => new Point2D({ y, x })))
    .reduce((a, b) => [...a, ...b], [])
    .filter((p) => isLowpoint(map, p));
}

function isLowpoint(map: number[][], { y, x }: Point2D): boolean {
  return (
    Math.min(...getNeighborHeights(map, new Point2D({ x, y }))) > map[y][x]
  );
}

function getNeighborHeights(map: number[][], p: Point2D): number[] {
  return getNeighbors(map, p).map(({ y, x }) => map[y][x]);
}

function getNeighbors(map: number[][], p: Point2D): Point2D[] {
  return [
    [p.y - 1, p.x],
    [p.y + 1, p.x],
    [p.y, p.x - 1],
    [p.y, p.x + 1],
  ]
    .filter(([y, x]) => y >= 0 && x >= 0 && y < map.length && x < map[y].length)
    .map(([y, x]) => new Point2D({ y, x }));
}

export function fillBasin(map: number[][], p: Point2D): Point2D[] {
  const basin: Point2D[] = [];
  const queue = [p];
  while (queue.length) {
    const current = queue.shift() as Point2D;
    basin.push(current);
    const neighbors = getNeighbors(map, current);
    queue.push(
      ...neighbors
        .filter((n) => basin.find((o) => o.equals(n)) == null)
        .filter((n) => queue.find((o) => o.equals(n)) == null)
        .filter((n) => height(map, n) >= height(map, current))
        .filter((n) => height(map, n) < 9)
    );
  }
  return basin;
}

function height(map: number[][], p: Point2D) {
  return map[p.y][p.x];
}
