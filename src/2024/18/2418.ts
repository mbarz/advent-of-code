type Point = { x: number; y: number };
function isSame(a: Point, b: Point) {
  return a.y === b.y && a.x === b.x;
}
function isInBounds(p: Point, size: number) {
  return p.x >= 0 && p.x < size && p.y >= 0 && p.y < size;
}
function hash(p: Point) {
  return `${p.y},${p.x}`;
}

export function solve(given: {
  size: number;
  obstacles: { y: number; x: number }[];
}): Set<string> | null {
  const { size, obstacles } = given;
  const os = new Set(obstacles.map((o) => hash(o)));
  const start = { x: 0, y: 0 };
  const end = { x: size - 1, y: size - 1 };
  const queue: { pos: Point; score: number; path: string[] }[] = [
    { pos: start, score: 0, path: [] },
  ];
  let counter = 0;
  const seen = new Set<string>();

  while (queue.length) {
    if (counter++ > 100000) throw new Error('Too many iterations');
    const { pos, score, path } = queue.shift()!;
    if (seen.has(hash(pos))) continue;
    seen.add(hash(pos));
    if (isSame(pos, end)) {
      return new Set(path);
    }
    const { y, x } = pos;
    const options = [
      { pos: { x: x + 1, y }, score: score + 1 },
      { pos: { x: x - 1, y }, score: score + 1 },
      { pos: { x, y: y + 1 }, score: score + 1 },
      { pos: { x, y: y - 1 }, score: score + 1 },
    ]
      .filter((o) => isInBounds(o.pos, size) && !os.has(hash(o.pos)))
      .map((o) => ({ ...o, path: [...path, hash(pos)] }));
    queue.push(...options);
  }

  return null;
}

export function parseInput(input: string) {
  const lines = input.split('\n');
  const numArrays = lines.map((l) => l.match(/(\d+)/g)!.map(Number));
  return numArrays.map(([x, y]) => ({ x, y }));
}

export function solvePart1(input: string, size = 71, obstacles = 1024) {
  const falling = parseInput(input);
  const path = solve({ size, obstacles: falling.slice(0, obstacles) });
  return path?.size ?? Number.POSITIVE_INFINITY;
}

export function solvePart2(input: string, size = 71) {
  const falling = parseInput(input);
  let path = solve({ size, obstacles: [] });
  for (let i = 0; i < falling.length; i++) {
    const o = falling[i];
    if (path!.has(hash(o))) {
      const obstacles = falling.slice(0, i + 1);
      path = solve({ size, obstacles });
      if (path == null) return `${o.x},${o.y}`;
    }
  }
  return null;
}

export function print(size: number, obstacles: Point[], seen: Set<string>) {
  const os = new Set(obstacles.map((o) => hash(o)));
  let out = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (os.has(hash({ x, y }))) {
        out += '#';
      } else if (seen.has(hash({ x, y }))) {
        out += 'o';
      } else {
        out += '.';
      }
    }
    out += '\n';
  }
  console.log(out);
}
