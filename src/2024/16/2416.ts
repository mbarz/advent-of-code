export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = { x: number; y: number; d: Direction };
const directions: Direction[] = ['N', 'E', 'S', 'W'];
export const ror = (pos: Position) => {
  let d = directions.indexOf(pos.d) + 1;
  if (d > 3) d = 0;
  return { ...pos, d: directions[d] };
};
export const rol = (pos: Position) => {
  let d = directions.indexOf(pos.d) - 1;
  if (d < 0) d = 3;
  return { ...pos, d: directions[d] };
};
export const mov = (pos: Position) => ({
  ...pos,
  x: pos.x + (pos.d === 'E' ? 1 : pos.d === 'W' ? -1 : 0),
  y: pos.y + (pos.d === 'S' ? 1 : pos.d === 'N' ? -1 : 0),
});

const hash = (p: Position) => `${p.x},${p.y},${p.d}`;
export function solvePart1(input: string) {
  const map = input.split('\n').map((l) => l.split(''));

  const letter = 'S';
  const start: Position = { ...find(map, letter), d: 'E' };

  return solve(map, start);
}

function find(map: string[][], letter: string) {
  const y = map.findIndex((l) => l.includes(letter));
  const x = map[y].indexOf(letter);
  return { x, y };
}

class SortedArray<T> {
  constructor(
    public array: T[],
    public compare: (a: T, b: T) => number,
  ) {
    array.sort(compare);
  }

  push(element: T) {
    const index = this.array.findIndex((e) => this.compare(e, element) < 0);
    this.array.splice(index, 0, element);
  }

  pop(): T | undefined {
    return this.array.pop();
  }

  get length() {
    return this.array.length;
  }
}

export function solve(map: string[][], start: Position): number {
  const queue = new SortedArray<{ score: number; position: Position }>(
    [{ score: 0, position: start }],
    (a, b) => a.score - b.score,
  );
  const seen = new Set<string>();
  const t = find(map, 'E');
  const at = (p: Position) => map[p.y][p.x];

  while (queue.length) {
    const current = queue.pop()!;
    const position = current.position;
    if (position.x === t.x && position.y === t.y) return current.score;
    if (seen.has(hash(position))) continue;
    seen.add(hash(position));
    const m = mov(position);
    if (at(m) !== '#') queue.push({ score: current.score + 1, position: m });
    queue.push({ score: current.score + 1000, position: rol(position) });
    queue.push({ score: current.score + 1000, position: ror(position) });
  }
  return Number.POSITIVE_INFINITY;
}

export function solvePart2(input: string) {
  return input.length;
}
