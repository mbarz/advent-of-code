import { Solver } from '../util/solver';
import { calcSum } from '../util/util';

type SearchTerm = {
  s: string;
  n: number;
};

export class AdventOfCode2023Day01 implements Solver {
  private lines: string[];
  constructor(input: string) {
    this.lines = input.split('\n');
  }

  solvePart2() {
    const calibrationValues = this.lines.map((line) =>
      this.getPart2CalibrationValueForLine(line)
    );
    // this.logValues(calibrationValues);
    return calcSum(calibrationValues);
  }

  solvePart1() {
    const calibrationValues = this.lines.map((line) =>
      this.getPart1CalibrationValueForLine(line)
    );
    // this.logValues(calibrationValues);
    return calcSum(calibrationValues);
  }

  logValues(calibrationValues: number[]) {
    console.log(
      'Calibration values: ' +
        calibrationValues.slice(0, 5).join(', ') +
        (calibrationValues.length > 5 ? '...' : '')
    );
  }

  getPart1CalibrationValueForLine(line: string): number {
    const digits = line.split('').filter((c) => c.match(/\d/));
    const first = digits[0];
    const last = digits.pop();
    return Number([first, last].join(''));
  }

  findFirst(target: string): SearchTerm | null {
    for (let i = 0; i < target.length; i++) {
      const term = this.getTermTheSliceStartsWith(target, i);
      if (term) return term;
    }
    return null;
  }
  findLast(target: string): SearchTerm | null {
    for (let i = target.length; i >= 0; i--) {
      const term = this.getTermTheSliceStartsWith(target, i);
      if (term) return term;
    }
    return null;
  }

  getTermTheSliceStartsWith(target: string, start: number): SearchTerm | null {
    const slice = target.slice(start);
    for (const term of this.searchTerms) {
      if (slice.startsWith(term.s)) {
        return term;
      }
    }
    return null;
  }

  searchTerms: SearchTerm[] = [
    ...[
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ].map((s, i) => ({ s, n: i + 1 })),
    ...Array(9)
      .fill(0)
      .map((_, i) => ({ s: String(i + 1), n: i + 1 })),
  ];

  getPart2CalibrationValueForLine(line: string): number {
    const first = this.findFirst(line)?.n;
    const last = this.findLast(line)?.n;
    return Number([first, last].join(''));
  }
}
