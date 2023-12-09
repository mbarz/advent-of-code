import { sum } from '../util/sum';
import { Solver } from './solver';
import { parseNumbers } from './util';

export class AdventOfCode2023Day09 extends Solver {
  constructor(sub?: string) {
    super(9, sub);
  }

  solvePart1(): number {
    return sum(
      this.lines.map((l) => parseNumbers(l)).map((s) => this.findNextForSeq(s))
    );
  }

  findNextForSeq(seq: number[]): number {
    const diffs = seq.slice(0, -1).map((n, i) => seq[i + 1] - n);
    const last = seq[seq.length - 1];
    const lastDiff = diffs[diffs.length - 1];
    const done = new Set(diffs).size === 1;
    return last + (done ? lastDiff : this.findNextForSeq(diffs));
  }

  solvePart2(): number {
    return sum(
      this.lines
        .map((l) => parseNumbers(l))
        .map((s) => this.findNextForSeq(s.reverse()))
    );
  }
}
