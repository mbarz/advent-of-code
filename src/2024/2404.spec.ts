import * as D04 from './2404';

describe('2024-12-04', () => {
  const input = [
    'MMMSXXMASM',
    'MSAMXMSMSA',
    'AMXSXMAAMM',
    'MSAMASMSMX',
    'XMASAMXAMM',
    'XXAMMXXAMA',
    'SMSMSASXSS',
    'SAXAMASAAA',
    'MAMMMXMMMM',
    'MXMXAXMASX',
  ].join('\n');

  it('should solve 1', () => {
    expect(D04.solvePart1(input)).toEqual(18);
  });

  it('should solve 2', () => {
    expect(D04.solvePart2(input)).toEqual(9);
  });
});
