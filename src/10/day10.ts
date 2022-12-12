import { readFileSync } from 'fs';
import { sum } from '../util/sum';
import { collectSignalStrengthAt, CPU, interestingCycles } from './cpu';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const cpu = new CPU();
cpu.push(...input.split('\n'));

const res1 = collectSignalStrengthAt(cpu, interestingCycles);
console.log(sum(res1));
