import { AdventOfCode2023Day11 } from './2023-11-cosmic-expansion';

describe('2023 - Day 11 - Cosmic Expansion', () => {
  it('should solve part 1', () => {
    expect(createSolver().solvePart1()).toEqual(374);
  });

  it('should solve part 2', () => {
    const solver = createSolver();
    expect(solver.solvePart2(10)).toEqual(1030);
    expect(solver.solvePart2(100)).toEqual(8410);
  });
});

function createSolver() {
  return new AdventOfCode2023Day11(
    [
      '...#......',
      '.......#..',
      '#.........',
      '..........',
      '......#...',
      '.#........',
      '.........#',
      '..........',
      '.......#..',
      '#...#.....',
    ].join('\n')
  );
}
