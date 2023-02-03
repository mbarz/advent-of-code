import chalk from 'chalk';

export function parseChitonCave(input: string): number[][] {
  return input.split('\n').map((line) => line.split('').map((c) => Number(c)));
}

type Point2D = { x: number; y: number };

export function findShortestWayThroughChitonCave(map: number[][]): {
  risk: number;
  path: Point2D[];
} {
  const start = { x: 0, y: 0 };
  const end = { x: map[0].length - 1, y: map.length - 1 };
  const queue: { position: Point2D; risk: number; path: Point2D[] }[] = [
    { position: start, risk: 0, path: [start] },
  ];
  const processed: Record<string, number> = {};
  while (queue.length) {
    queue.sort((a, b) => {
      const c = b.risk - a.risk;
      return c || distance(b.position, end) - distance(a.position, end);
    });
    const current = queue.pop()!;
    const key = [current.position.y, current.position.x].join(',');
    if (processed[key] <= current.risk) {
      continue;
    }
    processed[key] = current.risk;
    if (isSamePoint(current.position, end)) {
      return current;
    } else {
      const options = getOptions(current.position, map, current.path);
      queue.push(
        ...options
          .map((o) => ({
            position: o,
            risk: current.risk + map[o.y][o.x],
            path: [...current.path, o],
          }))
          .filter((o) => {
            const q = queue.find((queued) =>
              isSamePoint(queued.position, o.position)
            );
            if (q == null) return true;
            return q.risk > o.risk;
          })
      );
    }
  }
  return { risk: Number.POSITIVE_INFINITY, path: [] };
}

const isSamePoint = (a: Point2D, b: Point2D) => distance(a, b) === 0;
const distance = (a: Point2D, b: Point2D) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

function getOptions(
  current: Point2D,
  map: number[][],
  history: Point2D[]
): Point2D[] {
  return [
    { x: current.x - 1, y: current.y },
    { x: current.x + 1, y: current.y },
    { x: current.x, y: current.y + 1 },
    { x: current.x, y: current.y - 1 },
  ]
    .filter((p) => p.x >= 0 && p.y >= 0)
    .filter((p) => p.x < map[0].length && p.y < map.length)
    .filter((p) => history.find((visited) => isSamePoint(visited, p)) == null);
}

export function print(map: number[][], path: Point2D[]) {
  const hist = path.map((p) => [p.x, p.y].join(','));
  console.log(
    map
      .map((row, y) =>
        row
          .map((cell, x) =>
            hist.includes([x, y].join(',')) ? chalk.green(cell) : cell
          )
          .join('')
      )
      .join('\n')
  );
}
