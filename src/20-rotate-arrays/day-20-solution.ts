import { readFileSync } from 'fs';
import { join } from 'path';
import { solveDay20Part1 } from './day-20-decoder';

const puzzleInput = readFileSync(
  join(__dirname, 'day-20-puzzle-input.txt'),
  'utf-8'
);
const exampleInput = readFileSync(
  join(__dirname, 'day-20-example-input.txt'),
  'utf-8'
);

const example = false;
const input = example ? exampleInput : puzzleInput;

const numbers = input.split('\n').map((n) => Number(n));

console.log(solveDay20Part1(numbers));
