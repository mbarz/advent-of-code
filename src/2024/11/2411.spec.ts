import { blinkOnce, solvePart1, solvePart2 } from './2411';

describe('2024 Day 11', () => {
  it('should blink', () => {
    expect(blinkOnce([125, 17])).toEqual([253000, 1, 7]);
  });

  it('should solve part 1', () => {
    expect(solvePart1('125 17')).toEqual(55312);
  });

  it('should solve part 2', () => {
    expect(solvePart2('125 17')).toEqual(65601038650482);
  });
});
