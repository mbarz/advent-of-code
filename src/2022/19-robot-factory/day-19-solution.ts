import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../../util/sum';
import { RobotFactory } from './robot-factory';

const exampleInput = [
  'Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.',
  'Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.',
].join('\n');

const puzzleInput = readFileSync(
  join(__dirname, 'day-19-puzzle-input.txt'),
  'utf-8'
);
// 1681

const example = false;
const input = example ? exampleInput : puzzleInput;

const solvePart1 = true;
const solvePart2 = true;

if (solvePart1) {
  const f = new RobotFactory();
  f.parseBlueprints(input);
  console.time('Part 1');
  const qualityLevels = f.blueprints.map((_b, i) => {
    const res = (i + 1) * f.getMaxOutcome(i, [1, 0, 0, 0], [0, 0, 0, 0], 24);
    console.log(`calculated ${i + 1}/${f.blueprints.length}`);
    return res;
  });
  const solution = sum(qualityLevels);
  console.timeEnd('Part 1');
  console.log(`Quality Levels: ${qualityLevels}`);
  console.log(`Solution:       ${solution}`);
}

if (solvePart2) {
  console.time('Part 2');
  const f = new RobotFactory();
  f.parseBlueprints(input);
  const results = f.blueprints.slice(0, 3).map((_b, i, arr) => {
    const key = `${i + 1}/${arr.length}`;
    console.time(key);
    const res = f.getMaxOutcome(i, [1, 0, 0, 0], [0, 0, 0, 0], 32);
    console.timeEnd(key);
    return res;
  });
  const solution = results.reduce((a, b) => a * b, 1);
  console.timeEnd('Part 2');
  console.log(`Results:  ${results}`);
  console.log(`Solution: ${solution}`);
}
