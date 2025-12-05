import { solvePart1, solvePart2 } from './2503';

const input = [
  '987654321111111',
  '811111111111119',
  '234234234234278',
  '818181911112111',
].join('\n');

describe('2025 Day 3', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(357);
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(3121910778619);
  });
});
