export function findCoords<T>(
  value: T,
  map: T[][],
): { y: number; x: number } | null {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === value) {
        return { y, x };
      }
    }
  }
  return null;
}
