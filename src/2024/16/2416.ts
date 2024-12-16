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
  return getBestPathScore(map);
}

export function solvePart2(input: string): number {
  const map = input.split('\n').map((l) => l.split(''));
  const best = getBestPathScore(map);
  return getAllWithMaxScore(map, best).tiles.length;
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

export function getBestPathScore(map: string[][], start?: Position): number {
  const bestPaths: { score: number; path: Position[] }[] = [];

  if (start == null) start = { ...find(map, 'S'), d: 'E' };
  const queue = new SortedArray<{
    score: number;
    position: Position;
  }>([{ score: 0, position: start }], (a, b) => a.score - b.score);

  const seen = new Set<string>();
  const t = find(map, 'E');
  const at = (p: Position) => map[p.y][p.x];

  while (queue.length) {
    const current = queue.pop()!;
    const position = current.position;

    if (position.x === t.x && position.y === t.y) {
      return current.score;
    }
    if (bestPaths.length && bestPaths[0].score < current.score) {
      continue;
    }
    if (seen.has(hash(position))) {
      continue;
    }
    seen.add(hash(position));
    const m = mov(position);

    if (at(m) !== '#') {
      queue.push({ score: current.score + 1, position: m });
    }
    queue.push({ score: current.score + 1000, position: rol(position) });
    queue.push({ score: current.score + 1000, position: ror(position) });
  }

  const tiles = new Set<string>();
  for (const path of bestPaths) {
    path.path.forEach((p) => tiles.add(`${p.y},${p.x}`));
  }
  return Number.POSITIVE_INFINITY;
}

export function getAllWithMaxScore(
  map: string[][],
  maxScore: number,
): { tiles: string[] } {
  const start: Position = { ...find(map, 'S'), d: 'E' };
  const queue = new SortedArray<{
    score: number;
    position: Position;
    path: Position[];
  }>([{ score: 0, position: start, path: [] }], (a, b) => a.score - b.score);

  const seen = new Map<string, number>();
  const t = find(map, 'E');
  const at = (p: Position) => map[p.y][p.x];
  const tiles = new Set<string>();

  while (queue.length) {
    const current = queue.pop()!;
    const position = current.position;

    const path = [...current.path, current.position];
    if (position.x === t.x && position.y === t.y) {
      path.forEach((p) => tiles.add(`${p.y},${p.x}`));
      continue;
    }
    if (current.score >= maxScore) {
      continue;
    }
    if (seen.has(hash(position))) {
      if (seen.get(hash(position))! < current.score) continue;
    }
    seen.set(hash(position), current.score);
    const m = mov(position);

    if (at(m) !== '#') {
      queue.push({ score: current.score + 1, position: m, path });
    }
    queue.push({ score: current.score + 1000, position: rol(position), path });
    queue.push({ score: current.score + 1000, position: ror(position), path });
  }

  return {
    tiles: Array.from(tiles),
  };
}

export function print(map: string[][], tiles: string[]) {
  const t = new Set(tiles);
  const copy = map.map((l, r) =>
    l.map((s, c) => (t.has(`${r},${c}`) ? 'O' : s)),
  );
  return copy.map((l) => l.join(''));
}
