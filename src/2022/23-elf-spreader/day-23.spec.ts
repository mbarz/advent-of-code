import { createElvesMap, ElfSpreader } from './elf-spreader';

const smallExampleInput = [
  '.....',
  '..##.',
  '..#..',
  '.....',
  '..##.',
  '.....',
].join('\n');

const exampleInput = [
  '....#..',
  '..###.#',
  '#...#.#',
  '.#...##',
  '#.###..',
  '##.#.##',
  '.#..#..',
].join('\n');

describe('Day 23: Unstable diffusion', () => {
  it('should parse', () => {
    const s1 = new ElfSpreader(' # ');
    expect(s1.elves).toEqual([{ x: 1, y: 0 }]);
    const s2 = new ElfSpreader(smallExampleInput);
    const exampleElves = s2.elves;
    expect(exampleElves).toHaveLength(5);
    expect(exampleElves[0]).toEqual({ x: 2, y: 1 });
    expect(createElvesMap(exampleElves)).toEqual(
      ['....', '..##', '..#.', '....', '..##'].join('\n')
    );
  });

  it('should check in direction', () => {
    const s = new ElfSpreader(smallExampleInput);
    expect(s.isElfInDirection({ x: 0, y: 0 }, { x: 0, y: -1 })).toBe(false);
    expect(s.isElfInDirection({ x: 2, y: 1 }, { x: 0, y: 1 })).toBe(true);
  });

  it('should collect proposals', () => {
    const s = new ElfSpreader(smallExampleInput);

    const proposals = s.getProposals();
    expect(proposals).toHaveLength(5);
    expect(proposals).toEqual([
      { from: { x: 2, y: 1 }, to: { x: 2, y: 0 } },
      { from: { x: 3, y: 1 }, to: { x: 3, y: 0 } },
      { from: { x: 2, y: 2 }, to: { x: 2, y: 3 } },
      { from: { x: 2, y: 4 }, to: { x: 2, y: 3 } },
      { from: { x: 3, y: 4 }, to: { x: 3, y: 3 } },
    ]);
    expect(s.getMoves()).toEqual([
      { from: { x: 2, y: 1 }, to: { x: 2, y: 0 } },
      { from: { x: 3, y: 1 }, to: { x: 3, y: 0 } },
      { from: { x: 3, y: 4 }, to: { x: 3, y: 3 } },
    ]);
  });

  it('should spread elves', () => {
    const s = new ElfSpreader(smallExampleInput);
    expect(createElvesMap(s.elves)).toEqual(
      ['....', '..##', '..#.', '....', '..##'].join('\n')
    );
    s.spreadElves(1);
    expect(s.elves).toEqual([
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 3 },
    ]);
    s.spreadElves(9);
    expect(s.elves).toEqual([
      { x: 2, y: 0 },
      { x: 4, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 5 },
      { x: 4, y: 3 },
    ]);
  });

  it('should spread for 10 rounds', () => {
    const s = new ElfSpreader(exampleInput);
    s.spreadElves(0);
    expect(createElvesMap(s.elves)).toEqual(
      [
        '....#..',
        '..###.#',
        '#...#.#',
        '.#...##',
        '#.###..',
        '##.#.##',
        '.#..#..',
      ].join('\n')
    );
    s.spreadElves(1);
    expect(createElvesMap(s.elves)).toEqual(
      [
        '.....#...',
        '...#...#.',
        '.#..#.#..',
        '.....#..#',
        '..#.#.##.',
        '#..#.#...',
        '#.#.#.##.',
        '.........',
        '..#..#...',
      ].join('\n')
    );
    s.spreadElves(9);
    expect(s.calcEmptyTilesBetweenElves()).toEqual(110);
  });

  it('should spread until no moves left', () => {
    const s = new ElfSpreader(exampleInput);
    const count = s.spreadElves();
    expect(count).toEqual(20);
  });
});
