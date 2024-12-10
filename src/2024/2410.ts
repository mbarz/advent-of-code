import { sum } from '../util/sum';

function coordsOf(arr: number[][]): { y: number; x: number }[] {
  return arr
    .map((line, y) => line.map((_n, x) => ({ y, x })))
    .reduce((prev, curr) => [...prev, ...curr], []);
}

export function solvePart1(input: string) {
  return solve(input).score;
}

export function solvePart2(input: string) {
  return solve(input).rating;
}

export function solve(input: string) {
  const digits = input.split('\n').map((l) => l.match(/(\d)/g)!.map(Number));
  const h = digits.length;
  const w = digits[0].length;

  const cache: Record<string, { rating: number; tops: string[] }> = {};
  const queue: { x: number; y: number; c: number }[] = [];

  const keyOf = (p: { x: number; y: number }) =>
    `${digits[p.y][p.x]}:${p.y};${p.x}`;

  for (const { x, y } of coordsOf(digits)) {
    if (digits[y][x] === 0) {
      queue.push({ x, y, c: 0 });
    }
  }

  for (let i = 0; i < 100000; ++i) {
    queue.sort((a, b) => b.c - a.c);
    const curr = queue.shift();
    if (curr == null) break;

    const key = keyOf(curr);
    if (cache[key] != null) continue;

    const ch = digits[curr.y][curr.x];
    if (ch === 9) {
      cache[key] = { tops: [key], rating: 1 };
      continue;
    }
    const options = [
      { x: curr.x + 1, y: curr.y },
      { x: curr.x - 1, y: curr.y },
      { x: curr.x, y: curr.y + 1 },
      { x: curr.x, y: curr.y - 1 },
    ].filter(
      (o) =>
        o.x >= 0 &&
        o.x < w &&
        o.y >= 0 &&
        o.y < h &&
        digits[o.y][o.x] - ch === 1,
    );

    if (!options.length) cache[key] = { tops: [], rating: 0 };

    const cached = options.map((o) => cache[keyOf(o)]);

    if (cached.every((c) => c != null)) {
      const tops = cached.reduce((prev, curr) => {
        return [...curr.tops.filter((t) => !prev.includes(t)), ...prev];
      }, [] as string[]);
      const rating = cached.reduce((prev, curr) => prev + curr.rating, 0);
      cache[key] = { tops, rating };
    } else {
      for (const o of options.filter((o) => cache[keyOf(o)] == null)) {
        if (!queue.find((q) => q.y === o.y && q.x === o.x)) {
          queue.unshift({ ...o, c: digits[o.y][o.x] });
        }
      }
      queue.push(curr);
    }
  }

  const starts = Object.entries(cache)
    .filter(([key]) => key.startsWith('0:'))
    .map(([, v]) => v);
  const score = sum(starts.map((s) => s.tops.length));
  const rating = sum(starts.map((s) => s.rating));
  return { score, rating };
}
