import { AdventOfCode2023Day16 } from './2023-16-the-floor-will-be-lava';

describe('2023 - Day 16 - The Floor Will Be Lava', () => {
  it('should iterate', () => {
    const s = createSolver();
    expect(s.beamKeys).toEqual(['0;-1;R;.']);
    s.iterate();
    expect(s.beamKeys).toEqual(['0;0;R;.']);
    expect(s.energy).toEqual(1);
  });

  it('should iterate x times', () => {
    const s = createSolver();
    const known = [
      ['0;0;R;.'],
      ['0;1;U;|', '0;1;D;|'],
      ['1;1;D;.'],
      ['2;1;D;.'],
      ['3;1;D;.'],
      ['4;1;D;.'],
      ['5;1;D;.'],
      ['6;1;D;.'],
      ['7;1;L;-', '7;1;R;-'],
      ['7;0;L;.', '7;2;R;.'],
      ['7;3;R;-'],
      ['7;4;U;/'],
      ['6;4;R;/'],
      ['6;5;R;.'],
      ['6;6;D;\\'],
    ];
    for (const step of known) {
      s.iterate();
      expect(s.beamKeys).toEqual(step);
    }
  });

  it('should solve part 1', () => {
    const solver = createSolver();
    const solution = solver.solvePart1();
    expect(solver.beams).toHaveLength(0);
    expect(solution).toEqual(46);
  });

  it('should solve part 2', () => {
    expect(createSolver().solvePart2()).toEqual(51);
    // for puzzle it's 7513
  });
});

function createSolver() {
  return new AdventOfCode2023Day16(
    [
      '.|...\\....',
      '|.-.\\.....',
      '.....|-...',
      '........|.',
      '..........',
      '.........\\',
      '..../.\\\\..',
      '.-.-/..|..',
      '.|....-|.\\',
      '..//.|....',
    ].join('\n'),
  );
}
