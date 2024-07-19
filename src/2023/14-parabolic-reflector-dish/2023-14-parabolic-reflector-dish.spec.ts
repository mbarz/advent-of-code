import { AdventOfCode2023Day14 } from './2023-14-parabolic-reflector-dish';

const exampleInput = [
  'O....#....',
  'O.OO#....#',
  '.....##...',
  'OO.#O....O',
  '.O.....O#.',
  'O.#..O.#.#',
  '..O..#O..O',
  '.......O..',
  '#....###..',
  '#OO..#....',
];

describe('2023 - Day 14 - Parabolic Reflector Dish', () => {
  it('should tilt north', () => {
    const s = createSolver();
    s.tilt('N');
    expect(s.platform.map((l) => l.join(''))).toEqual([
      'OOOO.#.O..',
      'OO..#....#',
      'OO..O##..O',
      'O..#.OO...',
      '........#.',
      '..#....#.#',
      '..O..#.O.O',
      '..O.......',
      '#....###..',
      '#....#....',
    ]);
  });

  it('should calc load', () => {
    const s = createSolver();
    s.tilt('N');
    expect(s.calcLoad('N')).toEqual(136);
  });

  it('should solve part 1', () => {
    expect(createSolver().solvePart1()).toEqual(136);
  });

  it('should solve part 2', () => {
    expect(createSolver().solvePart2()).toEqual(0);
  });
});

function createSolver(input?: string[]) {
  return new AdventOfCode2023Day14((input ?? exampleInput).join('\n'));
}
