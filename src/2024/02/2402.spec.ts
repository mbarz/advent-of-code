import * as solver from './2402';

const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('2024-12-02', () => {
  [
    ['7 6 4 2 1', 'Safe'],
    ['1 2 7 8 9', 'Unsafe'],
    ['9 7 6 2 1', 'Unsafe'],
    ['1 3 2 4 5', 'Unsafe'],
    ['8 6 4 4 1', 'Unsafe'],
    ['1 3 6 7 9', 'Safe'],
    ['1 2 3 4 8', 'Unsafe'],
    ['8 7 6 5 1', 'Unsafe'],
    ['73 73 76', 'Unsafe'],
    ['52 56 57 59 61', 'Unsafe'],
  ].forEach(([s, expected]) => {
    it(`should validate ${s} as ${expected}`, () => {
      const list = s.split(' ').map(Number);
      expect(solver.isSafe(list)).toBe(expected === 'Safe');
    });
  });

  [
    ['7 6 4 2 1', 'Safe'],
    ['1 2 7 8 9', 'Unsafe'],
    ['9 7 6 2 1', 'Unsafe'],
    ['1 3 2 4 5', 'Safe'],
    ['8 6 4 4 1', 'Safe'],
    ['1 3 6 7 9', 'Safe'],
  ].forEach(([s, expected]) => {
    it(`should validate ${s} as ${expected}`, () => {
      const list = s.split(' ').map(Number);
      expect(solver.isSafeWithDampener(list)).toBe(expected === 'Safe');
    });
  });

  it('should solve part 1', () => {
    expect(solver.solvePart1(exampleInput)).toEqual(2);
  });

  it('should solve part 2', () => {
    expect(solver.solvePart2(exampleInput)).toEqual(4);
  });
});
