import { readFileSync } from 'fs';
import { join } from 'path';
import * as D01 from './2401';

// SOLUTIONS:
// 01 - Part 1: 1938424
// 01 - Part 2: 22014209

const input = readFileSync(join(__dirname, '2401-puzzle-input.txt'), 'utf-8');
console.log('Day 01: Part 1');
console.log(D01.solvePart1(input));
console.log('Day 01: Part 2');
console.log(D01.solvePart2(input));
