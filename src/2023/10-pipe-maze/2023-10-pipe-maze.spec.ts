import { readFileSync } from 'fs';
import { AdventOfCode2023Day10 } from './2023-10-pipe-maze';

describe('2023 - Day 10 - Pipe Maze', () => {
  it('should solve part 1', () => {
    const solver = createSolver('test');
    expect(solver.solvePart1()).toEqual(4);
  });
  it('should solve part 1 for test 2', () => {
    const solver = createSolver('test2');
    expect(solver.solvePart1()).toEqual(8);
  });

  it('should solve part 2 for test 3', () => {
    const solver = createSolver('test3');
    expect(solver.solvePart2()).toEqual(4);
  });

  it('should solve part 2 for test 4', () => {
    const solver = createSolver('test4');
    expect(solver.solvePart2()).toEqual(8);
  });
});
function createSolver(input: string) {
  return new AdventOfCode2023Day10(
    readFileSync(__dirname + `/input-10.${input}.txt`, 'utf8')
  );
}
