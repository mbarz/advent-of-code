import { Logger } from '../../util/logger';

export type Solid = {
  kind: 'stone' | 'sand';
  x: number;
  y: number;
};

export type Cave = {
  map: Record<string, string>;
  floor: number;
};

const logger = new Logger();
logger.logLevel = 'warn';

export function scanCave(input: string): Cave {
  const lines = input.split('\n');
  const solids: Solid[] = [];
  for (const line of lines) {
    const points =
      line.match(/\d+,\d+/g)?.map((m) => m.split(',').map((n) => Number(n))) ||
      [];
    for (let i = 0; i < points.length - 1; ++i) {
      const x1 = points[i][0];
      const y1 = points[i][1];
      const x2 = points[i + 1][0];
      const y2 = points[i + 1][1];
      const startX = Math.min(x1, x2);
      const startY = Math.min(y1, y2);
      const endX = Math.max(x1, x2);
      const endY = Math.max(y1, y2);
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          if (!solids.find((s) => s.x === x && s.y === y)) {
            solids.push({ kind: 'stone', x, y });
          }
        }
      }
    }
  }
  const map: Record<string, string> = {};
  solids.forEach((s) => (map[[s.x, s.y].join(',')] = '#'));
  const floor = Math.max(...solids.map((s) => s.y));
  return { map, floor };
}

function getCaveElement(cave: Cave, x: number, y: number): string {
  return cave.map[sKey(x, y)] || '.';
}

export function sKey(x: number, y: number) {
  return [x, y].join(',');
}

export function dropSandIntoCave(cave: Cave, x: number) {
  const pos = { x, y: 0 };
  let moved = true;

  do {
    moved = false;
    const below = getCaveElement(cave, pos.x, pos.y + 1);
    const left = getCaveElement(cave, pos.x - 1, pos.y + 1);
    const right = getCaveElement(cave, pos.x + 1, pos.y + 1);
    if (below === '.') {
      pos.y++;
      moved = true;
    } else if (left === '.') {
      pos.y++;
      pos.x--;
      moved = true;
    } else if (right === '.') {
      pos.y++;
      pos.x++;
      moved = true;
    }
  } while (moved && pos.y < cave.floor + 1);

  cave.map[sKey(pos.x, pos.y)] = 'o';
  return pos;
}

export function drawCave(cave: Cave) {
  const minY = 0;
  const xCoords = Object.keys(cave.map)
    .map((k) => k.split(',')[0])
    .map((n) => Number(n));
  let minX = Math.min(...xCoords);
  const maxY = cave.floor;
  let maxX = Math.max(...xCoords);

  const cut = maxX - minX - 100;
  if (cut > 0) {
    minX += cut / 2;
    maxX -= cut / 2;
  }

  const map = Array.from({ length: maxY - minY + 1 }, (_row, y) =>
    Array.from({ length: maxX - minX + 1 }, (_col, x) =>
      getCaveElement(cave, minX + x, minY + y),
    ),
  );

  logger.log(map.map((l) => l.join('')).join('\n'));
}

export function fillUntilAbyss(cave: Cave, x: number) {
  let count = 0;
  let stop = false;
  do {
    const last = dropSandIntoCave(cave, x);
    stop = last.y > cave.floor;
    count++;
  } while (count < 100000 && !stop);
  return count - 1;
}

export function fillUntilEnd(cave: Cave, x: number) {
  let count = 0;
  let stop = false;
  do {
    const last = dropSandIntoCave(cave, x);
    stop = last.y === 0;
    count++;
  } while (count < 100000 && !stop);
  return count;
}
