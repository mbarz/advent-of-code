import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'puzzle-input.txt'), 'utf-8');

const lines = input.split('\n');
const numbers = lines.map((l) => parseInt(l, 2));

const bits = lines[0].length;

function majorityBit(numbers: number[], index: number): boolean {
  const mask = 1 << (bits - index - 1);
  const numbersWithBit = numbers.filter((n) => n & mask);
  return numbersWithBit.length >= numbers.length / 2;
}
const gamma = Array(bits)
  .fill(0)
  .map((_, i) => (majorityBit(numbers, i) ? 1 : 0))
  .reverse()
  .reduce((prev, curr, i) => prev + (curr << i), 0 as number);

const flipBits = (v: number, digits: number) => ~v & (Math.pow(2, digits) - 1);

const epsilon = flipBits(gamma, bits);

console.log(gamma * epsilon);

function findRating(list: number[], majority: boolean): number {
  let candidates = [...list];
  for (let i = 0; i < bits; i++) {
    let bit = majorityBit(candidates, i) ? 1 : 0;
    if (!majority) bit = !bit ? 1 : 0;
    const mask = 1 << (bits - i - 1);
    candidates = candidates.filter((c) => {
      const masked = c & mask;
      return bit ? masked > 0 : masked === 0;
    });
    if (candidates.length === 1) return candidates[0];
  }
  return -1;
}

const a = findRating(numbers, true);
const b = findRating(numbers, false);
console.log(a * b);
