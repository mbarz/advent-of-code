import { defrag, parseInput, print, solvePart1, solvePart2 } from './2409';

const input = '2333133121414131402';

describe('2024 Day 09', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toBe(1928);
  });

  it('should defrag 1', () => {
    const parsed = parseInput(input, { splitFiles: true });
    expect(print(defrag(parsed))).toEqual(
      '0099811188827773336446555566..............',
    );
  });

  it('should defrag 2', () => {
    const parsed = parseInput(input, { splitFiles: false });
    expect(print(defrag(parsed))).toEqual(
      '00992111777.44.333....5555.6666.....8888..',
    );
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toBe(2858);
  });
});
