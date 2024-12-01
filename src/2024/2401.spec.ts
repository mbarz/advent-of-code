import * as m2401 from './2401';

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('2024-01', () => {
  it('should solve part 1', () => {
    expect(m2401.solvePart1(exampleInput)).toEqual(11);
  });

  it('should solve part 2', () => {
    expect(m2401.solvePart2(exampleInput)).toEqual(31);
  });
});
