import { readFileSync } from 'fs';
import { AdventOfCode2023Day15 } from './2023-15-lens-library';

describe('2023 - Day 15 - Lens Library', () => {
  it('should hash', () => {
    expect(createSolver().hash('HASH')).toEqual(52);
  });

  it('should solve part 1 for example input', () => {
    expect(createSolver().solvePart1()).toEqual(1320);
  });

  it('should solve part 1 for puzzle input', () => {
    const fileContent = readFileSync(__dirname + '/input-15.txt', 'utf-8');
    expect(createSolver(fileContent).solvePart1()).toEqual(503154);
  });

  it('should pack boxes', () => {
    expect(createSolver().boxes).toEqual({
      0: [
        { label: 'rn', focalLength: 1 },
        { label: 'cm', focalLength: 2 },
      ],
      3: [
        { label: 'ot', focalLength: 7 },
        { label: 'ab', focalLength: 5 },
        { label: 'pc', focalLength: 6 },
      ],
    });
  });

  it('should solve part 2 for example input', () => {
    expect(createSolver().solvePart2()).toEqual(145);
  });

  it('should solve part 2 for puzzle input', () => {
    const fileContent = readFileSync(__dirname + '/input-15.txt', 'utf-8');
    expect(createSolver(fileContent).solvePart2()).toEqual(251353);
  });
});

function createSolver(input?: string) {
  return new AdventOfCode2023Day15(
    input ?? 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7',
  );
}
