import { readFileSync } from 'fs';
import { sum } from '../../util/sum';
import { collectSignalStrengthAt, CPU, interestingCycles } from './cpu';
import { CRT } from './crt';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

let cpu = new CPU();
cpu.push(...input.split('\n'));

const res1 = collectSignalStrengthAt(cpu, interestingCycles);
console.log(sum(res1));

cpu = new CPU();
cpu.push(...input.split('\n'));
const crt = new CRT(cpu);
crt.char = '█';
console.log(crt.draw());
