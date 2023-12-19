import { Solver } from '../util/solver';
import { parseNumbers } from '../util/util';

type Race = { time: number; record: number };

export class AdventOfCode2023Day06 implements Solver {
  lines: string[];
  constructor(input: string) {
    this.lines = input.split('\n');
  }
  solvePart1(): number {
    const [times, distances] = this.lines.map((l) =>
      parseNumbers(l.slice(11).trim())
    );
    const races: Race[] = times.map((t, i) => ({
      time: t,
      record: distances[i],
    }));
    return races.reduce((prev, curr) => prev * this.countWaysToBeat(curr), 1);
  }

  countWaysToBeat(race: Race) {
    const p = -race.time;
    const q = race.record + 1;
    const a = -p / 2;
    const b = Math.sqrt(Math.pow(p / 2, 2) - q);
    const x1 = Math.floor(a + b);
    const x2 = Math.ceil(a - b);
    return Math.abs(x1 - x2) + 1;
  }

  solvePart2(): number {
    const [time, record] = this.lines.map(
      (l) => +l.slice(11).replace(/\s+/g, '')
    );
    return this.countWaysToBeat({ time, record: record });
  }
}
