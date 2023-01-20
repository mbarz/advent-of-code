import { readFileSync } from 'fs';
import { CaveExplorer } from './cave-explorer';

const fileContent = readFileSync('res/puzzle-input-2021-12.txt', 'utf-8');
const inputs = fileContent.split('\n\n').map((input) => {
  const lines = input.split('\n');
  return { name: lines.shift(), lines };
});

const explorer = new CaveExplorer();

inputs.forEach(({ name, lines }) => {
  const solution = explorer.findAllRoutes(lines);
  console.log(name);
  console.log(`Part1: ${solution.part1}`);
  console.log(`Part2: ${solution.part2}`);
  console.log('');
});
