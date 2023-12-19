import { sum } from '../../util/sum';
import { Solver } from '../util/solver';

type SpringRecord = {
  record: string;
  groups: number[];
};

export class AdventOfCode2023Day12 implements Solver {
  records: SpringRecord[];
  constructor(input: string) {
    this.records = input.split('\n').map((line) => {
      const [record, g] = line.split(' ');
      return { record, groups: g.split(',').map((n) => +n) };
    });
  }

  solvePart1(): number {
    return sum(this.records.map((r) => this.getArrs(r.record, r.groups)));
  }

  cache: Record<string, number> = {};

  getArrs(
    input: string,
    groups: number[],
    i = 0,
    groupIndex = 0,
    currentCounter = 0,
  ): number {
    if (i === 0) this.cache = {};

    const key = [i, groupIndex, currentCounter].join(';');
    if (this.cache[key] != null) return this.cache[key];

    if (i === input.length) {
      return (groupIndex === groups.length && currentCounter === 0) ||
        (groupIndex === groups.length - 1 &&
          groups[groupIndex] === currentCounter)
        ? 1
        : 0;
    }
    let ans = 0;
    const current = input[i];
    if (['?', '.'].includes(current)) {
      if (currentCounter === 0) {
        ans += this.getArrs(input, groups, i + 1, groupIndex, 0);
      } else if (groups[groupIndex] === currentCounter) {
        ans += this.getArrs(input, groups, i + 1, groupIndex + 1, 0);
      }
    }
    if (['?', '#'].includes(current)) {
      ans += this.getArrs(input, groups, i + 1, groupIndex, currentCounter + 1);
    }
    this.cache[key] = ans;
    return ans;
  }

  solvePart2(): number {
    return sum(
      this.records.map((r) =>
        this.getArrs(
          Array(5).fill(r.record).join('?'),
          Array(5)
            .fill(r.groups)
            .reduce((prev, curr) => [...prev, ...curr]),
        ),
      ),
    );
  }
}
