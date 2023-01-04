import { readFileSync } from 'fs';
import { findStartKeys, parse, shortestPath } from './day12';

const input = readFileSync(__dirname + '/day12-puzzle-input.txt', 'utf-8');

console.log('part 1');
const { start, end, graph, map } = parse(input);
const { shortestDistance } = shortestPath(start, end, graph);
console.log(shortestDistance);

console.log('part 2');
const shortest = findStartKeys(map)
  .map((key) => shortestPath(key, end, graph).shortestDistance)
  .filter((d) => d > 0)
  .reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);

console.log(shortest);
