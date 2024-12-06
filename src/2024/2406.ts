type Direction = 'up' | 'right' | 'down' | 'left';
type Position = Readonly<{ x: number; y: number }>;

export function solvePart1(input: string): number {
  const lines = input.split('\n');
  const pos: Position = {
    x: lines.find((l) => l.includes('^'))!.indexOf('^'),
    y: lines.findIndex((l) => l.includes('^')),
  };
  return getVisited(lines, pos, 'up');
}

function getVisited(
  lines: string[],
  pos: Position,
  direction: Direction,
  visitedBefore: string[] = [],
): number {
  const visited: string[] = [...visitedBefore];
  for (let i = 0; i < 100000; ++i) {
    const key = `${pos.x},${pos.y},${direction}`;
    if (!visited.includes(key)) visited.push(key);
    else {
      return Number.POSITIVE_INFINITY;
    }
    const next = move(pos, direction);
    if (!lines[next.y]?.[next.x]) {
      break;
    } else if (lines[next.y][next.x] === '#') {
      direction = rotate(direction);
    } else {
      pos = next;
    }
  }
  return new Set(
    visited.map((v) => {
      const [y, x] = v.split(',');
      return [y, x].join(',');
    }),
  ).size;
}

export function isLoop(
  lines: string[],
  start: Position,
  direction: Direction,
  visitedBefore: string[] = [],
): boolean {
  return (
    getVisited(lines, start, direction, visitedBefore) ===
    Number.POSITIVE_INFINITY
  );
}

export function solvePart2(input: string): number {
  return findObstaclesForLoop(input).length;
}

export function findObstaclesForLoop(input: string): string[] {
  const visited: string[] = [];
  const checked: string[] = [];
  const lines = input.split('\n');
  const findings: string[] = [];
  const start: Position = {
    x: lines.find((l) => l.includes('^'))!.indexOf('^'),
    y: lines.findIndex((l) => l.includes('^')),
  };
  let direction: Direction = 'up';
  let pos = { ...start };
  for (let i = 0; i < 100000; ++i) {
    if (i % 100 === 0 && i > 0) console.log(i);

    const next = move(pos, direction);
    const target = lines[next.y]?.[next.x];
    if (!target) break;
    if (target === '#') {
      direction = rotate(direction);
      continue;
    }

    // check for potential loop
    const altMap = addObstacle(lines, next);
    if (
      !checked.includes(`${next.x},${next.y}`) &&
      isLoop(altMap, start, 'up', [])
    ) {
      findings.push(`${next.x},${next.y}`);
    }
    checked.push(`${next.x},${next.y}`);
    const key = `${pos.x},${pos.y},${direction}`;
    if (!visited.includes(key)) visited.push(key);
    pos = next;
  }
  if (new Set(findings).size !== findings.length) {
    throw new Error('Duplicates found');
  }
  return findings;
}

export function addObstacle(lines: string[], pos: Position): string[] {
  const copy = lines.map((l) => '' + l);
  copy[pos.y] =
    copy[pos.y].substring(0, pos.x) + '#' + copy[pos.y].substring(pos.x + 1);
  return copy;
}

function rotate(direction: Direction): Direction {
  if (direction === 'up') return 'right';
  if (direction === 'right') return 'down';
  if (direction === 'down') return 'left';
  return 'up';
}

function move({ x, y }: Position, direction: Direction): Position {
  if (direction === 'up') return { y: y - 1, x };
  if (direction === 'down') return { y: y + 1, x };
  if (direction === 'right') return { y, x: x + 1 };
  if (direction === 'left') return { y, x: x - 1 };
  return { x, y };
}
