import { readFileSync } from 'fs';
import { parseInstructions, moveMultiple, state } from './09';

const input = readFileSync(__dirname + '/09.txt', 'utf-8');
const instructions = parseInstructions(input);
const s = moveMultiple(state(), instructions);
console.log(s.visitedByTail.length);
