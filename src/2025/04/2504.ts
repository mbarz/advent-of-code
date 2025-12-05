function score(grid: string[][], point: { x: number; y: number }) {
  let counter = 0;
  const { x, y } = point;
  for (let r = Math.max(0, y - 1); r < Math.min(grid.length, y + 2); r++) {
    for (let c = Math.max(0, x - 1); c < Math.min(grid[0].length, x + 2); c++) {
      if (grid[r][c] === '@') counter++;
    }
  }
  return counter;
}

function isAccessible(grid: string[][], point: { x: number; y: number }) {
  return score(grid, point) <= 4;
}

function getRemovablePoints(grid: string[][]) {
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell !== '@') continue;
      if (isAccessible(grid, { x, y })) points.push({ x, y });
    }
  }
  return points;
}

export function solvePart1(input: string) {
  const grid = input.split('\n').map((line) => line.split(''));
  return getRemovablePoints(grid).length;
}

/**
 * 18359 is too high :(
 */
export function solvePart2(input: string) {
  const grid = input.split('\n').map((line) => line.split(''));
  let counter = 0;
  let hasRemoved = false;
  do {
    const removable = getRemovablePoints(grid);
    for (const point of removable) {
      grid[point.y][point.x] = '.';
      counter++;
    }
    hasRemoved = removable.length > 0;
  } while (hasRemoved);
  return counter;
}
