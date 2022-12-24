import { readFileSync } from 'fs';
import { join } from 'path';
import { ElfSpreader } from './elf-spreader';

const puzzleInput = readFileSync(
  join(__dirname, 'day-23-puzzle-input.txt'),
  'utf-8'
);

const input = puzzleInput;

const s = new ElfSpreader(input);

console.log(`${s.elves.length} elves need to be spreaded`);

s.spreadElves(10);
const space = s.calcEmptyTilesBetweenElves();

console.log(`Part 1 Solution: ${space}`);
// 3940

const rounds = 10 + s.spreadElves();

console.log(`Part 2 Solution: ${rounds}`);
// 990
