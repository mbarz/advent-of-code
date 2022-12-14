import {
  Cave,
  drawCave,
  dropSandIntoCave,
  fillUntilAbyss,
  fillUntilEnd,
  scanCave,
} from './day-14';

describe('Day 14', () => {
  let exampleCave: Cave;

  beforeEach(() => {
    const input = [
      '498,4 -> 498,6 -> 496,6',
      '503,4 -> 502,4 -> 502,9 -> 494,9',
    ].join('\n');
    exampleCave = scanCave(input);
  });

  it('should scan', () => {
    const cave = exampleCave;
    drawCave(cave);
    expect(cave.solids).toHaveLength(20);
    expect(Object.keys(cave.map)).toHaveLength(20);
    expect(Object.keys(cave.map)).toEqual([
      '498,4',
      '498,5',
      '498,6',
      '496,6',
      '497,6',
      '502,4',
      '503,4',
      '502,5',
      '502,6',
      '502,7',
      '502,8',
      '502,9',
      '494,9',
      '495,9',
      '496,9',
      '497,9',
      '498,9',
      '499,9',
      '500,9',
      '501,9',
    ]);
  });

  it('should drop sand into cave', () => {
    const cave = exampleCave;
    dropSandIntoCave(cave, 500);
    expect(cave.solids).toHaveLength(21);
    expect(cave.solids[20]).toEqual({ kind: 'sand', x: 500, y: 8 });
  });

  it('should drop more sand into cave', () => {
    const cave = exampleCave;
    const outlet = 500;
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    expect(cave.solids).toHaveLength(25);
    expect(cave.solids[20]).toEqual({ kind: 'sand', x: 500, y: 8 });
    expect(cave.solids[21]).toEqual({ kind: 'sand', x: 499, y: 8 });
    expect(cave.solids[22]).toEqual({ kind: 'sand', x: 501, y: 8 });
    expect(cave.solids[23]).toEqual({ kind: 'sand', x: 500, y: 7 });
    expect(cave.solids[24]).toEqual({ kind: 'sand', x: 498, y: 8 });
  });

  it('should drop till abyss', () => {
    const cave = exampleCave;
    const count = fillUntilAbyss(cave, 500);
    drawCave(cave);
    expect(count).toEqual(24);
  });

  it('should drop till blocking the entry', () => {
    const cave = exampleCave;
    const count = fillUntilEnd(cave, 500);
    drawCave(cave);
    expect(count).toEqual(93);
  });
});
