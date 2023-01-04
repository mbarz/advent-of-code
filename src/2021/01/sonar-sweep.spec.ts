import { readFileSync } from 'fs';
import {
  countIncreases,
  parseSonarSweepReport,
  sumMeasurements,
} from './sonar-sweep';

describe('2021 - Day 01: Sonar Sweep', () => {
  let exampleInput: string;

  beforeAll(() => {
    exampleInput = readFileSync(
      __dirname + '/example-sonar-sweep-report.txt',
      'utf-8'
    );
  });

  it('should parse inputs', () => {
    expect(parseSonarSweepReport('')).toEqual([]);
    expect(parseSonarSweepReport(exampleInput)).toHaveLength(10);
  });

  it('should count increases', () => {
    const measurements = parseSonarSweepReport(exampleInput);
    expect(countIncreases(measurements)).toEqual(7);
  });

  it('should sum up three measurements', () => {
    const measurements = parseSonarSweepReport(exampleInput);
    expect(sumMeasurements([1, 2, 3, 4, 5], 3)).toEqual([6, 9, 12]);
    expect(sumMeasurements(measurements, 3)).toEqual([
      607, 618, 618, 617, 647, 716, 769, 792,
    ]);
  });
});
