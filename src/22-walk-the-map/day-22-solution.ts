import { readFileSync } from 'fs';
import { join } from 'path';
import { exampleMapInput, MonkeyBoard } from './monkey-map';

const puzzleInput = readFileSync(
  join(__dirname, 'day-22-puzzle-input.txt'),
  'utf-8'
);

const solve = true;

const input = solve ? puzzleInput : exampleMapInput;

const b = new MonkeyBoard();
b.parse(input);

const password = b.getPassword();
console.log(`Password from Part 1: ${password}`);

// solution 1 is 165094
