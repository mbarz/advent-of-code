export type Point2D = Readonly<{ x: number; y: number }>;
export type Blizzard = Readonly<{ position: Point2D; direction: Point2D }>;

export function parseBlizzardMap(input: string): {
  blizzards: Blizzard[];
  dimensions: MapDimensions;
} {
  const blizzards: Blizzard[] = [];
  const lines = input.split('\n');
  lines.map((line, ln) => {
    const chars = line.split('');
    chars.forEach((char, col) => {
      if (char === '.' || char === '#') return;
      const direction = { x: 0, y: 0 };
      if (char === '>') direction.x = 1;
      if (char === '<') direction.x = -1;
      if (char === 'v') direction.y = 1;
      if (char === '^') direction.y = -1;
      const position = { x: col, y: ln };
      blizzards.push({ position: position, direction });
    });
  });
  return {
    blizzards,
    dimensions: { width: lines[0].length, height: lines.length },
  };
}

export type MapDimensions = { width: number; height: number };

export function moveBlizzards(
  blizzards: Blizzard[],
  mapDimensions: MapDimensions
): Blizzard[] {
  return blizzards.map((b) => {
    let x = b.position.x + b.direction.x;
    let y = b.position.y + b.direction.y;

    if (x === 0) x = mapDimensions.width - 2;
    if (y === 0) y = mapDimensions.height - 2;

    if (x === mapDimensions.width - 1) x = 1;
    if (y === mapDimensions.height - 1) y = 1;

    return { position: { x, y }, direction: b.direction };
  });
}

function getBlizzardKey(blizzards: Blizzard[]): string {
  return blizzards
    .map(({ position, direction }) =>
      [position.x, position.y, direction.x, direction.y].join(',')
    )
    .sort((a, b) => a.localeCompare(b))
    .join(';');
}

export function getBlizzardsOverTime(
  blizzards: Blizzard[],
  dimensions: MapDimensions
): boolean[][][] {
  const all: boolean[][][] = [];
  const startKey = getBlizzardKey(blizzards);
  for (let i = 0; i < 1000; i++) {
    const currentMap = Array.from({ length: dimensions.height }, () =>
      Array.from({ length: dimensions.width }, () => false)
    );
    blizzards.forEach((b) => (currentMap[b.position.y][b.position.x] = true));
    all.push(currentMap);

    blizzards = moveBlizzards(blizzards, dimensions);
    const key = getBlizzardKey(blizzards);
    if (key === startKey) break;
  }
  return all;
}

function buildKey(cycle: number, point: Point2D) {
  return [cycle, point.x, point.y].join(';');
}

export function blizzardBFS(
  startCycle: number,
  from: Point2D,
  to: Point2D,
  blizzards: Blizzard[],
  dimensions: MapDimensions
): number {
  const blizzardMap = getBlizzardsOverTime(blizzards, dimensions);
  const visited = new Set<string>();
  type QueueItem = {
    cycle: number;
    x: number;
    y: number;
  };
  const queue: QueueItem[] = [];
  const history: QueueItem[] = [];
  queue.push({ cycle: startCycle, ...from });
  visited.add(buildKey(startCycle, from));
  while (queue.length > 0) {
    const current = queue.shift() as QueueItem;
    history.push(current);

    if (current.x === to.x && Math.abs(current.y - to.y) === 1) {
      return current.cycle + 1;
    }
    const t = (current.cycle + 1) % blizzardMap.length;
    const blocked = blizzardMap[t];
    const options = getOptions(current, dimensions, blocked);
    for (const option of options) {
      const nextKey = buildKey(t, option);
      if (!visited.has(nextKey)) {
        queue.push({ cycle: current.cycle + 1, ...option });
        visited.add(nextKey);
      }
    }
  }

  return Number.POSITIVE_INFINITY;
}

function getOptions(
  from: Point2D,
  dimensions: MapDimensions,
  blocked: boolean[][]
) {
  const directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
  ];
  const possibleNextPositions = directions
    .map(({ x, y }) => ({
      x: from.x + x,
      y: from.y + y,
    }))
    .filter(({ x, y }) => {
      if (x === from.x && y === from.y) return true;
      const w = dimensions.width;
      const h = dimensions.height;
      return x > 0 && y > 0 && x < w - 1 && y < h - 1;
    })
    .filter((p) => blocked[p.y][p.x] === false);
  return possibleNextPositions;
}
