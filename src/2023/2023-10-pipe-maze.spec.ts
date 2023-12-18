import { AdventOfCode2023Day10 } from './2023-10-pipe-maze';

describe('2023 - Day 10 - Pipe Maze', () => {
  it('should solve part 1', () => {
    const solver = new AdventOfCode2023Day10('test');
    expect(solver.solvePart1()).toEqual(4);
  });
  it('should solve part 1 for test 2', () => {
    const solver = new AdventOfCode2023Day10('test2');
    expect(solver.solvePart1()).toEqual(8);
  });

  it('should solve part 2 for test 3', () => {
    const solver = new AdventOfCode2023Day10('test3');
    expect(solver.solvePart2()).toEqual(4);
  });

  it('should solve part 2 for test 4', () => {
    const solver = new AdventOfCode2023Day10('test4');
    expect(solver.solvePart2()).toEqual(8);
  });
});
