import { readFileSync } from 'fs';
import {
  buildBigChitonCave,
  findShortestWayThroughChitonCave,
  parseChitonCave,
  print,
} from './chiton';

const input = readFileSync('res/puzzle-input-2021-15.txt', 'utf-8');

const cave = parseChitonCave(input);
console.time('Part1');
const shortest = findShortestWayThroughChitonCave(cave);
console.timeEnd('Part1');

console.log(shortest.risk);
print(cave, shortest.path);

const bigCave = buildBigChitonCave(cave);

console.time('Part2');
const shortest2 = findShortestWayThroughChitonCave(bigCave);
console.timeEnd('Part2');
console.log(shortest2.risk);
