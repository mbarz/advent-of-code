import * as fs from 'fs';

export function readTextFileLines(day: number, sub?: string): string[] {
  const name = `input-${String(day).padStart(2, '0')}`;
  const ext = 'txt';
  const fileName = [name, sub, ext].filter((n) => !!n).join('.');
  return fs.readFileSync(`${__dirname}/${fileName}`, 'utf-8').split('\n');
}

export function calcSum(values: number[]) {
  return values.reduce((p, c) => p + c, 0);
}
