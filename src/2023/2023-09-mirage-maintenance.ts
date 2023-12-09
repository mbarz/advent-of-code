import { sum } from '../util/sum';
import { Solver } from './solver';
import { parseNumbers } from './util';

export class AdventOfCode2023Day09 extends Solver {
  constructor(sub?: string) {
    super(9, sub);
  }
  solvePart1(): number {
    const given = this.lines.map((line) => parseNumbers(line));
    const next = given.map((seq) => this.findNextForSeq(seq));
    return sum(next);
  }

  findNextForSeq(seq: number[]): number {
    const diffs = seq.slice(0, -1).map((n, i) => {
      return seq[i + 1] - n;
    });
    const last = seq[seq.length - 1];
    const lastDiff = diffs[diffs.length - 1];
    if (new Set(diffs).size === 1) return last + lastDiff;
    return last + this.findNextForSeq(diffs);
  }

  solvePart2(): number {
    return 0;
  }
}
