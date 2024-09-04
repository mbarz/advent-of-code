import { readFileSync } from 'fs';
import {
  AdventOfCode2023Day13,
  findHorizontalMirror,
  findVerticalMirror,
  isLineMirroredAt,
  isPatternHorizontallyMirroredAt,
  rotatePattern,
} from './2023-13-point-of-indi';

describe('2023 Day 13: Point of Incidence', () => {
  const testInput = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  let solver = new AdventOfCode2023Day13(testInput);

  beforeEach(() => {
    solver = new AdventOfCode2023Day13(testInput);
  });

  it('should parse patterns', () => {
    const patterns = solver.parsePatterns(testInput);
    expect(patterns).toHaveLength(2);
    expect(patterns[0][0]).toEqual('#.##..##.');
  });

  it('should check mirror on line', () => {
    expect(isLineMirroredAt('#.##..##', 1)).toEqual(false);
    expect(isLineMirroredAt('#.##..##', 2)).toEqual(false);
    expect(isLineMirroredAt('#.##..##', 5)).toEqual(true);
    expect(isLineMirroredAt('#.##..##', 7)).toEqual(true);

    expect(isLineMirroredAt('.#...##..', '.#...##..'.length - 1)).toEqual(true);

    expect(isLineMirroredAt('##..########.', 3)).toEqual(true);
  });

  it('should check mirror on pattern', () => {
    const patterns = solver.parsePatterns(testInput);
    expect(isPatternHorizontallyMirroredAt(patterns[0], 3)).toEqual(false);
    expect(isPatternHorizontallyMirroredAt(patterns[0], 5)).toEqual(true);
  });

  it('should solve part 1 for example', () => {
    const result = solver.solvePart1();
    expect(result).toEqual(405);
  });

  it('should toggle pixel', () => {
    expect(solver.togglePixel(['##', '##'], 0)).toEqual(['.#', '##']);
    expect(solver.togglePixel(['##', '##'], 1)).toEqual(['#.', '##']);
    expect(solver.togglePixel(['##', '##'], 2)).toEqual(['##', '.#']);
    expect(solver.togglePixel(['##', '##'], 3)).toEqual(['##', '#.']);
  });

  it.skip('should rotate', () => {
    const pattern = [
      '..##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ];

    expect(rotatePattern(pattern)).toEqual([
      '#..##..',
      '...##..',
      '###..##',
      '.#....#',
      '#.#..#.',
      '#.#..#.',
      '.#....#',
      '###..##',
      '...##..',
    ]);
  });

  it('should find mirrors', () => {
    const pattern = [
      '..##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ];

    expect(findHorizontalMirror(pattern)).toEqual(5);
    expect(findVerticalMirror(pattern)).toEqual(3);
  });

  it('should get values for pattern', () => {
    expect(
      solver.getReflectionValues([
        '..##..##.',
        '..#.##.#.',
        '##......#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
        '#.#.##.#.',
      ]),
    ).toEqual([5, 300]);
  });

  it('should get value without smudge for first pattern in example', () => {
    const value = solver.getRealReflectionValue(solver.patterns[0]);
    expect(value).toEqual(300);
  });

  it('should get value without smudge for specific pattern', () => {
    const pattern = rotatePattern(
      [
        '####..######.',
        '....#.......#',
        '.##.#........',
        '####.########',
        '#####.##..##.',
        '....#.#....#.',
        '#..#....##...',
      ],
      'clockwise',
    );
    const withSmudge = solver.getReflectionValue(pattern);
    const value = solver.getRealReflectionValue(pattern);
    expect(withSmudge).toEqual(200);
    expect(value).toEqual(900);
  });

  it('should solve part 2 for example', () => {
    const result = solver.solvePart2();
    expect(result).toEqual(400);
  });

  it('should solve part 1 from puzzle', () => {
    const fileContent = readFileSync(__dirname + '/input-13.txt', 'utf-8');
    const result = new AdventOfCode2023Day13(fileContent).solvePart1();
    expect(result).toEqual(37113);
  });

  it.skip('should solve part 2 from puzzle', () => {
    const fileContent = readFileSync(__dirname + '/input-13.txt', 'utf-8');
    const result = new AdventOfCode2023Day13(fileContent).solvePart2();
    expect(result).toEqual(30449);
  });
});
