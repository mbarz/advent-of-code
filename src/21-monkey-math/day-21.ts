import { readFileSync } from 'fs';
import { join } from 'path';
import { MonkeyMathLib } from './monkey-math';

const puzzleInput = readFileSync(
  join(__dirname, 'day-21-puzzle-input.txt'),
  'utf-8'
);

const lib = new MonkeyMathLib();
lib.parse(puzzleInput);
const root = lib.getValueOf('root');
console.log(root);
