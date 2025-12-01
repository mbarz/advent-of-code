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
    expect(turn(50, 'L10')).toEqual(40);
    expect(turn(50, 'R10')).toEqual(60);
    expect(turn(99, 'R1')).toEqual(0);
    expect(turn(0, 'L1')).toEqual(99);

    expect(turn(99, 'R51')).toEqual(50);
    expect(turn(0, 'L50')).toEqual(50);

    expect(turn(13, 'R300')).toEqual(13);
    expect(turn(13, 'L300')).toEqual(13);
  });

  it('should count overflows', () => {
    expect(getZeroTouches(50, 'L10')).toEqual(0);
    expect(getZeroTouches(50, 'R10')).toEqual(0);
    expect(getZeroTouches(99, 'R1')).toEqual(1);
    expect(getZeroTouches(0, 'L1')).toEqual(0);

    expect(getZeroTouches(99, 'R51')).toEqual(1);
    expect(getZeroTouches(0, 'L50')).toEqual(0);

    expect(getZeroTouches(13, 'R300')).toEqual(3);
    expect(getZeroTouches(13, 'L300')).toEqual(3);
  });

  it('should solve part 1', () => {
    expect(solvePart1(exampleInput)).toEqual(3);
  });

  it('should solve part 1', () => {
    expect(solvePart2(exampleInput)).toEqual(6);
  });
});
