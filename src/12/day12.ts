function height(char: string): number {
  if (char === 'S') return height('a');
  if (char === 'E') return height('z');
  return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

type Graph = Record<string, string[]>;

export function findStartKeys(map: string[][]) {
  return map
    .map((row, y) =>
      row
        .map((c, x) => ({ c, x }))
        .filter(({ c }) => c === 'a' || c === 'S')
        .map(({ x }) => [y, x].join(';'))
    )
    .reduce((a, b) => [...a, ...b], []);
}

export function parse(input: string): {
  map: string[][];
  graph: Graph;
  start: string;
  end: string;
} {
  const graph: Record<string, string[]> = {};
  let start = '0;0';
  let end = '0;0';

  const lines = input.split('\n');
  const map = lines.map((line) => line.split(''));
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    const chars = line.split('');
    for (let col = 0; col < chars.length; col++) {
      const key = [row, col].join(';');
      const value = chars[col];
      if (value === 'S') start = key;
      if (value === 'E') end = key;
      const options = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]
        .filter(
          (opt) =>
            opt[0] >= 0 &&
            opt[1] >= 0 &&
            opt[0] < lines.length &&
            opt[1] < chars.length
        )
        .filter((opt) => {
          const optionValue = lines[opt[0]].charAt(opt[1]);
          const diff = height(optionValue) - height(value);
          return diff <= 1;
        })
        .map((opt) => opt.join(';'));
      graph[key] = options;
    }
  }

  return { graph, start, end, map };
}

// since I have very little experience in graph theory, I needed some help:
// https://betterprogramming.pub/5-ways-to-find-the-shortest-path-in-a-graph-88cfefd0030f
export const shortestPath = (
  startNode: string,
  stopNode: string,
  graph: Graph
): { shortestDistance: number } => {
  const visited = new Set<string>();
  const queue: { node: string; dist: number }[] = [];
  queue.push({ node: startNode, dist: 0 });
  visited.add(startNode);
  while (queue.length > 0) {
    const { node, dist } = queue.shift() as { node: string; dist: number };
    if (node === stopNode) return { shortestDistance: dist };
    for (const neighbour of graph[node]) {
      if (!visited.has(neighbour)) {
        queue.push({ node: neighbour, dist: dist + 1 });
        visited.add(neighbour);
      }
    }
  }
  return { shortestDistance: -1 };
};
