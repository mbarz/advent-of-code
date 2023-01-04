import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../../util/sum';
import { solveDay20Part1, solveDay20Part2 } from './day-20-decoder';

const puzzleInput = readFileSync(
  join(__dirname, 'day-20-puzzle-input.txt'),
  'utf-8'
);
const exampleInput = readFileSync(
  join(__dirname, 'day-20-example-input.txt'),
  'utf-8'
);

const solvePart1 = true;
const solvePart2 = true;

const example = false;
const input = example ? exampleInput : puzzleInput;

const numbers = input.split('\n').map((n) => Number(n));

if (solvePart1) {
  console.time('Part1');
  const solution = solveDay20Part1(numbers);
  console.timeEnd('Part1');
  console.log(solution);
  console.log(
    (!example && solution === 9866) || (example && solution === 3)
      ? 'SUCCESS'
      : 'FAILURE'
  );
}

if (solvePart2) {
  console.time('Part2');

  const solution = solveDay20Part2(numbers);
  console.timeEnd('Part2');
  console.log(solution);

  if (example) {
    const givenParts = [811589153, 2434767459, -1623178306];
    const correct = solution === sum(givenParts);
    console.log(correct ? 'SUCCESS' : 'FAILURE');
  } else {
    const correct = solution === 12374299815791;
    console.log(correct ? 'SUCCESS' : 'FAILURE');
  }
}
