import { readFileSync } from 'fs';
import { levelOfMonkeyBusiness } from './day11';

const exampleInput = readFileSync(
  __dirname + '/day11-example-input.txt',
  'utf-8'
);
const puzzleInput = readFileSync(
  __dirname + '/day11-puzzle-input.txt',
  'utf-8'
);

console.time('part 1 example');
const part1e = levelOfMonkeyBusiness(exampleInput, 20, 1);
console.timeEnd('part 1 example');
console.log(part1e);

console.time('part 1');
const part1 = levelOfMonkeyBusiness(puzzleInput, 20, 1);
console.timeEnd('part 1');
console.log(part1);

console.time('part 2 example');
const part2e = levelOfMonkeyBusiness(exampleInput, 10000, 2);
console.timeEnd('part 2 example');
console.log(part2e);

console.time('part 2');
const part2 = levelOfMonkeyBusiness(puzzleInput, 10000, 2);
console.timeEnd('part 2');
console.log(part2);
