import { readFileSync } from 'fs';
import { AdventOfCode2023Day06 } from './2023-06-wait-for-it';

describe('2023 - Day 6 - Wait for it', () => {
  const testSolver = new AdventOfCode2023Day06(
    readFileSync(__dirname + '/input-06.test.txt', 'utf-8')
  );
  it('should solve part 1', () => {
    expect(testSolver.solvePart1()).toEqual(288);
  });

  it('should count ways to beat a race', () => {
    expect(testSolver.countWaysToBeat({ time: 7, record: 9 })).toEqual(4);
    expect(testSolver.countWaysToBeat({ time: 15, record: 40 })).toEqual(8);
  });

  it('should solve part 2', () => {
    expect(testSolver.solvePart2()).toEqual(71503);
  });

  it('should solve part 2 for puzzle input', () => {
    const input = readFileSync(__dirname + '/input-06.txt', 'utf-8');
    expect(new AdventOfCode2023Day06(input).solvePart2()).toEqual(36530883);
  });
});
