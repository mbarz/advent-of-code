import { isSolvable, solvePart1, solvePart2 } from './2407';

const input = [
  '190: 10 19',
  '3267: 81 40 27',
  '83: 17 5',
  '156: 15 6',
  '7290: 6 8 6 15',
  '161011: 16 10 13',
  '192: 17 8 14',
  '21037: 9 7 18 13',
  '292: 11 6 16 20',
].join('\n');

describe('2407', () => {
  it('should check', () => {
    expect(isSolvable(3, [3])).toBe(true);
    expect(isSolvable(3, [3, 1])).toBe(true);
    expect(isSolvable(190, [10, 19])).toBe(true);
    expect(isSolvable(3267, [81, 40, 27])).toBe(true);
  });

  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(3749);
  });
  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(11387);
  });
});
