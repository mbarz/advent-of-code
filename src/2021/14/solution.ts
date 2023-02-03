import { readFileSync } from 'fs';
import { parsePolymerPuzzleInput, solveAOC2021Day14 } from './polymer';

const input = readFileSync('res/puzzle-input-2021-14.txt', 'utf-8');

const { polymer, rules } = parsePolymerPuzzleInput(input);
console.time('Part1');
const part1 = solveAOC2021Day14(polymer, rules, 10);
console.timeEnd('Part1');
console.log(part1);
console.time('Part2');
const part2 = solveAOC2021Day14(polymer, rules, 40);
console.timeEnd('Part2');
console.log(part2);
