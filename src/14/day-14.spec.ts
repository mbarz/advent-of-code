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
    expect(Object.keys(cave.map)).toHaveLength(21);
    expect(cave.map['500,8']).toEqual('o');
  });

  it('should drop more sand into cave', () => {
    const cave = exampleCave;
    const outlet = 500;
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    dropSandIntoCave(cave, outlet);
    expect(Object.keys(cave.map)).toHaveLength(25);
    expect(
      Object.entries(cave.map)
        .filter(([, value]) => value === 'o')
        .map(([key]) => key)
    ).toEqual(['500,8', '499,8', '501,8', '500,7', '498,8']);
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
