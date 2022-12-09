import { readFileSync } from 'fs';
import { moveMultiple, parseInstructions, state } from './09';

console.time('init');
const input = readFileSync(__dirname + '/09.txt', 'utf-8');
const instructions = parseInstructions(input);
console.timeEnd('init');

console.time('Part1');
const s = moveMultiple(state(), instructions);
console.timeEnd('Part1');
console.log(s.visitedByTail.length);

console.time('Part2');
const s2 = moveMultiple(state({ knotCount: 10 }), instructions);
console.timeEnd('Part2');
console.log(s2.visitedByTail.length);

// paintVisitedByTail(s2);
