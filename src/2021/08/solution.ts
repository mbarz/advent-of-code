import { readFileSync } from 'fs';
import { sum } from '../../util/sum';
import { resolveEntry } from './7-segment-resolver';

const uniqueSegmentCounts = [2, 4, 3, 7];

function solvePart1(name: string) {
  const protocol = readFileSync(`res/${name}-input-2021-08.txt`, 'utf-8');
  const entries = protocol
    .split('\n')
    .map((line) => line.split('|').map((s) => s.trim().split(' ')))
    .map(([input, output]) => ({ input, output }));

  const interestingOutputValues = entries
    .map((e) => e.output)
    .reduce((p, c) => [...p, ...c], [])
    .filter((n) => uniqueSegmentCounts.includes(n.length)).length;
  console.log(`== Solve ${name} ==`);
  console.log(`Ouputs that would be easy to map ${interestingOutputValues}`);
  const outputs = protocol.split('\n').map((e) => resolveEntry(e));
  const result = sum(outputs);
  console.log(`Sum of all outputs: ${result}`);
}

solvePart1('example');
solvePart1('puzzle');
