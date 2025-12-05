import { isOverlapping, mergeRanges, solvePart1, solvePart2 } from './2505';

const input = [
  '3-5',
  '10-14',
  '16-20',
  '12-18',
  '',
  '1',
  '5',
  '8',
  '11',
  '17',
  '32',
].join('\n');

describe('2025 Day 5', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(3);
  });

  it('should check for overlapping ranges', () => {
    expect(isOverlapping({ start: 3, end: 5 }, { start: 10, end: 14 })).toBe(
      false,
    );
    expect(isOverlapping({ start: 10, end: 14 }, { start: 12, end: 18 })).toBe(
      true,
    );

    expect(
      isOverlapping(
        { start: 71822914111739, end: 78486465652574 },
        { start: 74843767516526, end: 77443282419030 },
      ),
    ).toBe(true);
  });

  it('should merge ranges', () => {
    expect(mergeRanges({ start: 10, end: 14 }, { start: 12, end: 18 })).toEqual(
      { start: 10, end: 18 },
    );
    expect(mergeRanges({ start: 16, end: 20 }, { start: 12, end: 18 })).toEqual(
      { start: 12, end: 20 },
    );
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(14);
  });
});
