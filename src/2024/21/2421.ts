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

const [U, D, L, R, E, A] = ['^', 'v', '<', '>', ' ', 'A'];

export const NAVPAD = [
  [E, U, A],
  [L, D, R],
];

export function getShortestInput(out: string, layout: string[][]): string {
  let instructions = '';
  const digits = out.split('');
  let pos = findCoords(A, layout)!;
  while (digits.length) {
    const target = digits.shift()!;
    const to = findCoords(target, layout)!;
    const dx = to.x - pos.x;
    const dy = to.y - pos.y;
    const verticalFirst = layout[pos.y][pos.x + dx] === E;
    const horizontalFirst = layout[pos.y + dy][pos.x] === E;
    if (verticalFirst) {
      instructions += (dy < 0 ? U : D).repeat(Math.abs(dy));
      instructions += (dx < 0 ? L : R).repeat(Math.abs(dx));
    } else if (horizontalFirst) {
      instructions += (dx < 0 ? L : R).repeat(Math.abs(dx));
      instructions += (dy < 0 ? U : D).repeat(Math.abs(dy));
    } else {
      instructions += (dx < 0 ? L : R).repeat(Math.abs(dx));
      instructions += (dy < 0 ? U : D).repeat(Math.abs(dy));
    }
    instructions += A;
    pos = to;
  }
  return instructions;
}

export function getPossibleInputs(out: string, layout: string[][]): string[] {
  let inputs = [''];
  const digits = out.split('');
  let pos = findCoords(A, layout)!;
  while (digits.length) {
    const target = digits.shift()!;
    const to = findCoords(target, layout)!;
    const dx = to.x - pos.x;
    const dy = to.y - pos.y;
    const verticalFirst = layout[pos.y][pos.x + dx] === E;
    const horizontalFirst = layout[pos.y + dy][pos.x] === E;
    if (verticalFirst || !dx || !dy) {
      inputs.forEach((input, i) => {
        input += (dy < 0 ? U : D).repeat(Math.abs(dy));
        input += (dx < 0 ? L : R).repeat(Math.abs(dx));
        inputs[i] = input;
      });
    } else if (horizontalFirst) {
      inputs.forEach((input, i) => {
        input += (dx < 0 ? L : R).repeat(Math.abs(dx));
        input += (dy < 0 ? U : D).repeat(Math.abs(dy));
        inputs[i] = input;
      });
    } else {
      inputs = inputs.reduce((prev, input) => {
        let a = input;
        let b = input;
        a += (dy < 0 ? U : D).repeat(Math.abs(dy));
        a += (dx < 0 ? L : R).repeat(Math.abs(dx));
        b += (dx < 0 ? L : R).repeat(Math.abs(dx));
        b += (dy < 0 ? U : D).repeat(Math.abs(dy));
        return [...prev, a, b];
      }, [] as string[]);
    }
    inputs.forEach((input, i) => {
      inputs[i] = input + A;
    });

    pos = to;
  }
  return inputs;
}

export function getScore(n: string, navpads = 3): number {
  const num = Number(n.substring(0, n.length - 1));
  const ways = getPossibleInputs(n, NUMPAD);
  let min = Infinity;
  for (const way of ways) {
    const l = iterate(way, navpads - 1);
    if (l * num < min) min = l * num;
  }
  return min;
}

const cache: Map<string, number> = new Map();

export function iterate(instructions: string, navpads = 1): number {
  if (navpads <= 0) return instructions.length;
  if (navpads === 1) {
    const possible = getPossibleInputs(instructions, NAVPAD);
    return Math.min(...possible.map((p) => p.length));
  }

  const key = [instructions, navpads].join(':');
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const variants = getPossibleInputs(instructions, NAVPAD);
  let min = Infinity;
  for (const variant of variants) {
    const parts = variant.split('A').map((p) => p + 'A');
    const res = parts
      .slice(0, -1)
      .map((part) => iterate(part, navpads - 1))
      .reduce((acc, l) => acc + l, 0);
    if (res < min) min = res;
  }
  const res = min;
  cache.set(key, res);
  return res;
}

export function solve(input: string, inputs: number): number {
  cache.clear();
  return input
    .split('\n')
    .reduce((acc, line) => acc + getScore(line, inputs), 0);
}

export function solvePart1(input: string): number {
  return solve(input, 3);
}

export function solvePart2(input: string): number {
  return solve(input, 26);
}
