import { readFileSync } from 'fs';
import {
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
