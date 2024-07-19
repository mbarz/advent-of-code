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
    s.tiltNorth();
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
    s.tiltNorth();
    expect(s.calcLoadOnNorthBeams()).toEqual(136);
  });

  it('should solve part 1', () => {
    expect(createSolver().solvePart1()).toEqual(136);
  });

  it('should rotate', () => {
    /**
     * 123    741
     * 456 -> 852
     * 789    963
     */
    const s = createSolver(['123', '456', '789']);
    s.rotate90Deg();

    expect(s.platform.map((l) => l.join(''))).toEqual(['741', '852', '963']);
  });

  it('should execute spin cycle', () => {
    const s = createSolver();
    s.spinCycle();
    expect(s.platform.map((l) => l.join(''))).toEqual([
      '.....#....',
      '....#...O#',
      '...OO##...',
      '.OO#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#....',
      '......OOOO',
      '#...O###..',
      '#..OO#....',
    ]);
  });

  it('should solve part 2', () => {
    expect(createSolver().solvePart2()).toEqual(64);
  });
});

function createSolver(input?: string[]) {
  return new AdventOfCode2023Day14((input ?? exampleInput).join('\n'));
}
