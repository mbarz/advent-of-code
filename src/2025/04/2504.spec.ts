import { solvePart1, solvePart2 } from './2504';

const input = [
  '..@@.@@@@.',
  '@@@.@.@.@@',
  '@@@@@.@.@@',
  '@.@@@@..@.',
  '@@.@@@@.@@',
  '.@@@@@@@.@',
  '.@.@.@.@@@',
  '@.@@@.@@@@',
  '.@@@@@@@@.',
  '@.@.@@@.@.',
].join('\n');

describe('2025 Day 4', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(13);
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(43);
  });
});
