export function solvePart1(input: string) {
  return solve(input, { min: 1, max: 2 });
}

export function solvePart2(input: string) {
  return solve(input, { min: 0, max: 10000 });
}

function solve(input: string, options: { min: number; max: number }) {
  const lines = input.split('\n');
  const antinodes: string[] = [];
  const h = lines.length;
  const w = lines[0].length;
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const c = lines[y][x];
      if (c !== '.') {
        const others = findLocations({ c, lines }).filter(
          (o) => o.x !== x && o.y !== y,
        );
        for (const other of others) {
          const dy = other.y - y;
          const dx = other.x - x;
          for (let i = options.min; i < options.max; ++i) {
            const antinode = { y: other.y + dy * i, x: other.x + dx * i };
            const key = `${antinode.x};${antinode.y}`;
            if (
              antinode.x >= 0 &&
              antinode.x < w &&
              antinode.y >= 0 &&
              antinode.y < h
            ) {
              if (!antinodes.includes(key)) {
                antinodes.push(key);
              }
            } else {
              break;
            }
          }
        }
      }
    }
  }

  return antinodes.length;
}

function findLocations(given: {
  c: string;
  lines: string[];
}): { x: number; y: number }[] {
  const { lines } = given;
  const h = lines.length;
  const w = lines[0].length;
  const findings: { x: number; y: number }[] = [];
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (given.lines[y][x] === given.c) {
        findings.push({ x, y });
      }
    }
  }
  return findings;
}


