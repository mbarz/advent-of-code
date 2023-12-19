import { readFileSync } from 'fs';
import { AdventOfCode2023Day03 } from './2023-03-gear-ratios';

describe('2023 - Day 3', () => {
  let solver: AdventOfCode2023Day03;

  beforeEach(() => {
    solver = new AdventOfCode2023Day03(
      readFileSync(__dirname + '/input-03.test.txt', 'utf-8')
    );
  });

  it('should solve part 1 for test input', () => {
    expect(solver.solvePart1()).toEqual(4361);
  });

  it('should get numbers', () => {
    const numbers = solver.getNumbers();
    expect(numbers.length).toEqual(10);
    const [a, b, c] = numbers;
    expect(a).toEqual({ value: 467, row: 0, column: 0 });
    expect(b).toEqual({ value: 114, row: 0, column: 5 });
    expect(c).toEqual({ value: 35, row: 2, column: 2 });
  });

  it('should check surroundings', () => {
    expect(
      solver.hasSpecialCharacterNearby({ value: 467, row: 0, column: 0 })
    ).toBe(true);
    expect(
      solver.hasSpecialCharacterNearby({ value: 114, row: 0, column: 5 })
    ).toBe(false);
  });

  it('should find gears', () => {
    const gears = solver.getGears();
    expect(gears.length).toEqual(2);
    expect(gears.map((g) => g.ratio)).toEqual([16345, 451490]);
  });

  it('should solve part 2 for test input', () => {
    expect(solver.solvePart2()).toEqual(467835);
  });
});
