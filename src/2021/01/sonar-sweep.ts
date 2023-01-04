import { sum } from '../../util/sum';

export const parseSonarSweepReport = (report: string) =>
  report
    .split('\n')
    .filter((line) => !!line)
    .map((line) => Number(line));

export const countIncreases = (list: number[]) =>
  list.reduce((n, count, i) => (i > 0 && count > list[i - 1] ? n + 1 : n), 0);

export const sumMeasurements = (l: number[], n: number) =>
  l.slice(0, l.length - n + 1).map((_, i) => sum(l.slice(i, i + n)));
