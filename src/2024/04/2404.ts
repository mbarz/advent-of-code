const getChar = (m: string[], y: number, x: number) => m[y]?.[x] ?? '.';
const getWord = (
  m: string[],
  y: number,
  x: number,
  dy: number,
  dx: number,
  length: number,
) => {
  let res = '';
  for (let i = 0; i < length; i++) {
    res += getChar(m, y + i * dy, x + i * dx);
  }
  return res;
};

export const solvePart1 = (input: string) => {
  const m = input.split('\n');
  let count = 0;
  const w = (y: number, x: number, dx: number, dy: number) =>
    getWord(m, y, x, dx, dy, 4);
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      const char = m[y][x];
      if (char === 'X') {
        const words = [
          w(y, x, 0, 1),
          w(y, x, 1, 1),
          w(y, x, 1, 0),
          w(y, x, 1, -1),
          w(y, x, 0, -1),
          w(y, x, -1, -1),
          w(y, x, -1, 0),
          w(y, x, -1, 1),
        ];
        count += words.filter((w) => w === 'XMAS').length;
      }
    }
  }
  return count;
};

export const solvePart2 = (input: string) => {
  const m = input.split('\n');
  let count = 0;
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      const char = m[y][x];
      if (char === 'A') {
        const d1 = getWord(m, y - 1, x - 1, 1, 1, 3);
        const d2 = getWord(m, y + 1, x - 1, -1, 1, 3);
        const isXmas =
          ['MAS', 'SAM'].includes(d1) && ['MAS', 'SAM'].includes(d2);
        count += isXmas ? 1 : 0;
      }
    }
  }
  return count;
};
