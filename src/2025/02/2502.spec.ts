import { isRepeatingPattern, solvePart1, solvePart2 } from './2502';

const example = [
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224',
  '1698522-1698528,446443-446449,38593856-38593862,565653-565659',
  '824824821-824824827,2121212118-2121212124',
].join(',');

describe('2025 Day 2', () => {
  it('should solve part 1', () => {
    expect(solvePart1(example)).toEqual(1227775554);
  });

  it('should detect repeating patterns', () => {
    expect(isRepeatingPattern(112)).toEqual(false);
    expect(isRepeatingPattern(111)).toEqual(true);
  });

  it('should solve part 2', () => {
    expect(solvePart2(example)).toEqual(4174379265);
  });
});
