import { Day2419, solvePart1, solvePart2 } from './2419';

const e1 = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe('2024 Day 19', () => {
  const d = new Day2419(e1);

  it('should parse', () => {
    const { designs, patterns } = d;
    expect(patterns.length).toEqual(8);
    expect(designs.length).toEqual(8);
    expect(patterns[2]).toEqual('b');
    expect(designs[2]).toEqual('gbbr');
  });

  it('should get all variants for "gbbr"', () => {
    expect(d.getDesignVariants('bbr')).toEqual(2);
    expect(d.getDesignVariants('gbbr')).toEqual(4);
    expect(d.getDesignVariants('rrbgbr')).toEqual(6);
  });

  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual(6);
  });

  it('should solve part 2', () => {
    expect(solvePart2(e1)).toEqual(16);
  });
});
