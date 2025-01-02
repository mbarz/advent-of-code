/** numeric
 * +---+---+---+
 * | 7 | 8 | 9 |
 * +---+---+---+
 * | 4 | 5 | 6 |
 * +---+---+---+
 * | 1 | 2 | 3 |
 * +---+---+---+
 *     | 0 | A |
 *     +---+---+
 */

import { findCoords } from '../../util/xy';

/** directional
 *     +---+---+
 *     | ^ | A |
 * +---+---+---+
 * | < | v | > |
 * +---+---+---+
 */

export const NUMPAD = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [' ', '0', 'A'],
];

export const NAVPAD = [
  [' ', '^', 'A'],
  ['<', 'v', '>'],
];

export function getShortestInput(out: string, layout: string[][]): string {
  let instructions = '';
  const digits = out.split('');
  let pos = findCoords('A', layout)!;
  while (digits.length) {
    const target = digits.shift()!;
    const to = findCoords(target, layout)!;
    const dx = to.x - pos.x;
    const dy = to.y - pos.y;
    const avoidBlank = layout[pos.y][pos.x + dx] === ' ';
    if (avoidBlank && dy < 0) instructions += '^'.repeat(-dy);
    if (dx < 0) instructions += '<'.repeat(-dx);
    if (dx > 0) instructions += '>'.repeat(dx);
    if (dy > 0) instructions += 'v'.repeat(dy);
    if (!avoidBlank && dy < 0) instructions += '^'.repeat(-dy);
    instructions += 'A';
    pos = to;
  }

  return instructions;
}

export function getScore(n: string): number {
  const num = Number(n.substring(0, n.length - 1));
  const a = getShortestInput(n, NUMPAD);
  const b = getShortestInput(a, NAVPAD);
  const c = getShortestInput(b, NAVPAD);
  const l = c.length;
  return l * num;
}

export function solvePart1(input: string): number {
  return input.split('\n').reduce((acc, line) => acc + getScore(line), 0);
}
