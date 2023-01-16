import { fillBasin, getLowpoints, parseHeightMapFile } from './lava-height-map';

describe('2021 - Day 09 - Lava Height Map', () => {
  it('should get lowpoints', () => {
    const map = parseHeightMapFile('example');
    const lowpoints = getLowpoints(map);
    expect(lowpoints.map((l) => l.toString()).join(', ')).toEqual(
      '1;0, 9;0, 2;2, 6;4'
    );
  });

  it('should fill basin', () => {
    const map = parseHeightMapFile('example');
    const lowpoints = getLowpoints(map);

    const basins = lowpoints.map((p) => fillBasin(map, p));
    expect(basins.map((b) => b.length)).toEqual([3, 9, 14, 9]);
  });
});
