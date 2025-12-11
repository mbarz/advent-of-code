import { solvePart1, solvePart2 } from './2506';

const input = [
  '123 328  51 64 ',
  ' 45 64  387 23 ',
  '  6 98  215 314',
  '*   +   *   +  ',
].join('\n');

describe('2025 Day 6', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(4277556);
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(3263827);
  });
});
