import {
  Cave,
  drawCave,
  dropSandIntoCave,
  fillUntilAbyss,
  getMaxY,
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
  });

  it('should drop sand into cave', () => {
    const cave = exampleCave;
    dropSandIntoCave(cave, { x: 500, y: 0 });
    expect(cave.solids).toHaveLength(21);
    expect(cave.solids[20]).toEqual({ kind: 'sand', x: 500, y: 8 });
  });

  it('should drop more sand into cave', () => {
    const cave = exampleCave;
    dropSandIntoCave(cave, { x: 500, y: 0 });
    dropSandIntoCave(cave, { x: 500, y: 0 });
    dropSandIntoCave(cave, { x: 500, y: 0 });
    dropSandIntoCave(cave, { x: 500, y: 0 });
    dropSandIntoCave(cave, { x: 500, y: 0 });
    expect(cave.solids).toHaveLength(25);
    expect(cave.solids[20]).toEqual({ kind: 'sand', x: 500, y: 8 });
    expect(cave.solids[21]).toEqual({ kind: 'sand', x: 499, y: 8 });
    expect(cave.solids[22]).toEqual({ kind: 'sand', x: 501, y: 8 });
    expect(cave.solids[23]).toEqual({ kind: 'sand', x: 500, y: 7 });
    expect(cave.solids[24]).toEqual({ kind: 'sand', x: 498, y: 8 });
  });

  it('should drop till abyss', () => {
    const cave = exampleCave;
    const count = fillUntilAbyss(cave, { x: 500, y: 0 });
    drawCave(cave);
    expect(count).toEqual(24);
  });
});
