import { solvePart1, solvePart2 } from '../2410';

const input = [
  '89010123',
  '78121874',
  '87430965',
  '96549874',
  '45678903',
  '32019012',
  '01329801',
  '10456732',
].join('\n');

describe('2024 Day 10', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(36);
  }, 500);

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(81);
  }, 500);
});
