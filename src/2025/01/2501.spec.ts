import { getZeroTouches, solvePart1, solvePart2, turn } from './2501';

const exampleInput = [
  'L68',
  'L30',
  'R48',
  'L5',
  'R60',
  'L55',
  'L1',
  'L99',
  'R14',
  'L82',
].join('\n');

describe('2025 Day 1', () => {
  it('should rotate', () => {
    expect(turn({ currentPos: 50, line: 'L10' })).toEqual(40);
    expect(turn({ currentPos: 50, line: 'R10' })).toEqual(60);
    expect(turn({ currentPos: 99, line: 'R1' })).toEqual(0);
    expect(turn({ currentPos: 0, line: 'L1' })).toEqual(99);
    expect(turn({ currentPos: 99, line: 'R51' })).toEqual(50);
    expect(turn({ currentPos: 0, line: 'L50' })).toEqual(50);
    expect(turn({ currentPos: 13, line: 'R300' })).toEqual(13);
    expect(turn({ currentPos: 13, line: 'L300' })).toEqual(13);
  });

  it('should count overflows', () => {
    expect(getZeroTouches(50, 'L10')).toEqual(0);
    expect(getZeroTouches(50, 'R10')).toEqual(0);
    expect(getZeroTouches(99, 'R1')).toEqual(1);
    expect(getZeroTouches(0, 'L1')).toEqual(0);

    expect(getZeroTouches(99, 'R51')).toEqual(1);
    expect(getZeroTouches(0, 'L50')).toEqual(0);

    expect(getZeroTouches(13, 'R100')).toEqual(1);
    expect(getZeroTouches(13, 'R200')).toEqual(2);
    expect(getZeroTouches(13, 'R300')).toEqual(3);
    expect(getZeroTouches(13, 'L100')).toEqual(1);
    expect(getZeroTouches(13, 'L200')).toEqual(2);
    expect(getZeroTouches(13, 'L300')).toEqual(3);

    expect(getZeroTouches(50, 'L68')).toEqual(1);
    expect(getZeroTouches(82, 'L30')).toEqual(0);
    expect(getZeroTouches(52, 'R48')).toEqual(1);
    expect(getZeroTouches(0, 'L5')).toEqual(0);
    expect(getZeroTouches(95, 'R60')).toEqual(1);
    expect(getZeroTouches(35, 'L55')).toEqual(1);
    expect(getZeroTouches(0, 'L1')).toEqual(0);
    expect(getZeroTouches(99, 'L99')).toEqual(1);
  });

  it('should solve part 1', () => {
    expect(solvePart1(exampleInput)).toEqual(3);
  });

  it('should solve part 1', () => {
    expect(solvePart2(exampleInput)).toEqual(6);
  });
});
