import { readFileSync } from 'fs';
import { join } from 'path';
import { blizzardBFS, parseBlizzardMap } from './blizzard';

const exampleInput = [
  '#.######',
  '#>>.<^<#',
  '#.<..<<#',
  '#>v.><>#',
  '#<^v^^>#',
  '######.#',
].join('\n');

const puzzleInput = readFileSync(
  join(__dirname, 'day-24-puzzle-input.txt'),
  'utf-8'
);

const solve = true;

const input = solve ? puzzleInput : exampleInput;

const { blizzards, dimensions } = parseBlizzardMap(input);

const start = { x: 1, y: 0 };
const end = { x: dimensions.width - 2, y: dimensions.height - 1 };

const part1 = blizzardBFS(0, start, end, blizzards, dimensions);
console.log(`First time at end after ${part1}`);
// 266 it is
const part2 = blizzardBFS(part1, end, start, blizzards, dimensions);
console.log(`Back at start after ${part2}`);
const part3 = blizzardBFS(part2, start, end, blizzards, dimensions);
console.log(`Finally reached the end again at ${part3}`);
