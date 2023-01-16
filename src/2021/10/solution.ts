import { readFileSync } from 'fs';
import {
  getTotalAutoCompleteScore,
  getTotalSyntaxErrorScore,
} from './bracket-checker';

const input = readFileSync('res/puzzle-input-2021-10.txt', 'utf-8');

console.log(getTotalSyntaxErrorScore(input));
console.log(getTotalAutoCompleteScore(input));
