export type Solid = {
  kind: 'stone' | 'sand';
  x: number;
  y: number;
};

export type Cave = {
  solids: Solid[];
  map: Record<string, string>;
};

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
  return { solids, map };
}

function getCaveElement(cave: Cave, x: number, y: number): string {
  return cave.map[sKey(x, y)] || '.';
}

export function getMaxY(cave: Cave): number {
  return Math.max(
    ...cave.solids.filter((s) => s.kind === 'stone').map((s) => s.y)
  );
}

export function sKey(x: number, y: number) {
  return [x, y].join(',');
}

export function dropSandIntoCave(cave: Cave, x: number) {
  const pos = { x, y: 0 };
  let moved = true;
  const bottom = getMaxY(cave);
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
  } while (moved && pos.y < bottom + 1);

  cave.solids.push({ kind: 'sand', x: pos.x, y: pos.y });
  cave.map[sKey(pos.x, pos.y)] = 'o';
}

export function drawCave(cave: Cave) {
  const minY = Math.min(...cave.solids.map((s) => s.y));
  let minX = Math.min(...cave.solids.map((s) => s.x));
  const maxY = Math.max(...cave.solids.map((s) => s.y));
  let maxX = Math.max(...cave.solids.map((s) => s.x));

  const cut = maxX - minX - 100;
  if (cut > 0) {
    minX += cut / 2;
    maxX -= cut / 2;
  }

  const map = Array.from({ length: maxY - minY + 1 }, () =>
    Array.from({ length: maxX - minX + 1 }, () => '.')
  );
  cave.solids
    .filter((s) => s.x <= maxX && s.x >= minX)
    .forEach((solid) => {
      map[solid.y - minY][solid.x - minX] = solid.kind === 'sand' ? 'o' : '#';
    });
  console.log(map.map((l) => l.join('')).join('\n'));
}

export function fillUntilAbyss(cave: Cave, x: number) {
  const maxY = getMaxY(cave);
  let count = 0;
  let stop = false;
  do {
    dropSandIntoCave(cave, x);
    const last = cave.solids[cave.solids.length - 1];
    stop = last.y > maxY;
    count++;
  } while (count < 100000 && !stop);
  return count - 1;
}

export function fillUntilEnd(cave: Cave, x: number) {
  let count = 0;
  let stop = false;
  do {
    dropSandIntoCave(cave, x);
    const last = cave.solids[cave.solids.length - 1];
    stop = last.y === 0;
    count++;
  } while (count < 100000 && !stop);
  return count;
}
