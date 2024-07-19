import * as fs from 'fs';

export function readTextFile(filePath: string): string[] {
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}

export function writeTextFileLines(
  day: number,
  sub: string | undefined,
  lines: string[],
) {
  const name = `input-${String(day).padStart(2, '0')}`;
  const ext = 'txt';
  const fileName = [name, sub, ext].filter((n) => !!n).join('.');
  return fs.writeFileSync(
    `${__dirname}/${fileName}`,
    lines.join('\n'),
    'utf-8',
  );
}

export function calcSum(values: number[]) {
  return values.reduce((p, c) => p + c, 0);
}

export function parseNumbers(
  given: string,
  seperator: string | RegExp = /\s+/,
) {
  return given.split(seperator).map((s) => +s);
}

export function rotate2D<D = unknown>(given: D[][]): D[][] {
  const w = given[0].length;
  const h = given.length;

  const target: D[][] = Array(w)
    .fill(0)
    .map(() => Array(h).fill(undefined));
  for (let x = 0; x < w; ++x) {
    for (let y = 0; y < h; ++y) {
      target[x][y] = given[h - y - 1][x];
    }
  }
  return target;
}
