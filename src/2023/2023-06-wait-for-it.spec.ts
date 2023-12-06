import { AdventOfCode2023Day06 } from './2023-06-wait-for-it';

describe('2023 - Day 6 - Wait for it', () => {
  it('should solve part 1', () => {
    expect(new AdventOfCode2023Day06('test').solvePart1()).toEqual(288);
  });

  it('should count ways to beat a race', () => {
    const solver = new AdventOfCode2023Day06('test');
    expect(solver.countWaysToBeat({ time: 7, record: 9 })).toEqual(4);
    expect(solver.countWaysToBeat({ time: 15, record: 40 })).toEqual(8);
  });

  it('should solve part 2', () => {
    expect(new AdventOfCode2023Day06('test').solvePart2()).toEqual(71503);
  });

  it('should solve part 2 for puzzle input', () => {
    expect(new AdventOfCode2023Day06().solvePart2()).toEqual(36530883);
  });
});
