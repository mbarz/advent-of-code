import { readFileSync } from 'fs';
import { join } from 'path';
import { MonkeyCube } from './monkey-cube';
import { Edge, exampleEdges, exampleMapInput, MonkeyBoard } from './monkey-map';

const puzzleInput = readFileSync(
  join(__dirname, 'day-22-puzzle-input.txt'),
  'utf-8'
);

const puzzleEdges: Edge[] = [
  ['1L', '4L'],
  ['1U', '6L'],
  ['1R', '2L'],
  ['1D', '3U'],
  ['5L', '4R'],
  ['5U', '3D'],
  ['5R', '2R'],
  ['5D', '6R'],
  ['4U', '3L'],
  ['3R', '2D'],
  ['2U', '6D'],
  ['6U', '4D'],
];

const solve = true;

const input = solve ? puzzleInput : exampleMapInput;

const edges = solve ? puzzleEdges : exampleEdges;

const b = new MonkeyBoard();
b.parse(input);

const password = b.getPassword();
console.log(`Password from Part 1: ${password}`);
// 165094

const c = new MonkeyCube();
c.parse(input, edges);

const password2 = c.getPassword();

console.log(`Password from Part 2: ${password2}`);
// 95316
