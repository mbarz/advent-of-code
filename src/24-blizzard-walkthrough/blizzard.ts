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
