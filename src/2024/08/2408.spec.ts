import { solvePart1, solvePart2 } from './2408';

const input = [
  '............',
  '........0...',
  '.....0......',
  '.......0....',
  '....0.......',
  '......A.....',
  '............',
  '............',
  '........A...',
  '.........A..',
  '............',
  '............',
].join('\n');

describe('2024 Day 08', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(14);
  });

  it('should solve part 2', () => {
    expect(solvePart2(input)).toEqual(34);
  });
});
