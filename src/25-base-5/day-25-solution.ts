import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../util/sum';
import { fromSnafu, toSnafu } from './snafu';

const exampleInput = [
  '1=-0-2',
  '12111',
  '2=0=',
  '21',
  '2=01',
  '111',
  '20012',
  '112',
  '1=-1=',
  '1-12',
  '12',
  '1=',
  '122',
].join('\n');

const puzzleInput = readFileSync(
  join(__dirname, 'day-25-puzzle-input.txt'),
  'utf-8'
);

const solve = true;

const input = solve ? puzzleInput : exampleInput;

const numbers = input.split('\n');
const decimal = numbers.map((n) => fromSnafu(n));
const sumDec = sum(decimal);
const solution = toSnafu(sumDec);
console.log(`decimal: ${sumDec}`);
console.log(`SNAFU:   ${solution}`);
// it is 2-0-01==0-1=2212=100
