import { AdventOfCode2023Day09 } from './2023-09-mirage-maintenance';

describe('2023 - Day 9 - Mirage Maintenance', () => {
  it('should solve part 1', () => {
    expect(createSolver('test').solvePart1()).toEqual(114);
  });

  it('should solve part 2', () => {
    expect(createSolver('test').solvePart2()).toEqual(0);
  });

  it('should get next z for position', () => {});
});

function createSolver(input?: string) {
  return new AdventOfCode2023Day09(input);
}
