import { OctoFlash } from './flashing-octos';

function parse(s: string) {
  return s.split('\n').map((l) => l.split('').map((n) => +n));
}

const smallExample = parse(`11111
19991
19191
19991
11111`);

const bigExample = parse(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);

describe('2021 - Day 11 - Flashing Octos', () => {
  it('should increase all', () => {
    const of = new OctoFlash(smallExample);
    of.increaseAll();
    expect(of.grid[0]).toEqual([2, 2, 2, 2, 2]);
  });

  it('should flash all', () => {
    const of = new OctoFlash(smallExample);
    of.flashAll();
    expect(of.grid[2].join('')).toEqual('19191');
    of.increaseAll();
    of.flashAll();
    expect(of.grid.map((r) => r.join(''))).toEqual([
      '34543',
      '40004',
      '50005',
      '40004',
      '34543',
    ]);
  });

  it('should count flashes', () => {
    const of = new OctoFlash(bigExample);
    of.executeSteps(100);
    expect(of.flashCount).toEqual(1656);
  });

  it('should find sync point', () => {
    const of = new OctoFlash(bigExample);
    const step = of.findSyncStep();
    expect(step).toEqual(195);
  });
});
