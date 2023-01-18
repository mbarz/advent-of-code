import { readFileSync } from 'fs';
import { OctoFlash } from './flashing-octos';

const input = readFileSync('res/puzzle-input-2021-11.txt', 'utf-8');
const grid = input.split('\n').map((l) => l.split('').map((n) => +n));
const of = new OctoFlash(grid);
of.executeSteps(100);
console.log(of.flashCount);
of.grid = grid;
console.log(of.findSyncStep());
