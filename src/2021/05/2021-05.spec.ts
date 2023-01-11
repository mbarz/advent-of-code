import {
  countOverlaps,
  filterSimpleLineSegments,
  getLineSegmentPoints,
  getPointMap,
  parseVentLineSegments,
} from './2021-05';

const exampleInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe('2021 - Day 05', () => {
  it('should parse', () => {
    const segments = parseVentLineSegments(exampleInput);
    expect(segments).toHaveLength(10);
    expect(segments[0]).toEqual([0, 9, 5, 9]);
  });

  it('should filter horizontal lines', () => {
    const segments = parseVentLineSegments(exampleInput);
    const simple = filterSimpleLineSegments(segments);
    expect(simple).toHaveLength(6);
    expect(simple[1]).toEqual([9, 4, 3, 4]);
  });

  it('should get points from segment', () => {
    const segments = parseVentLineSegments(exampleInput);
    const simple = filterSimpleLineSegments(segments);
    expect(getLineSegmentPoints(simple[0])).toEqual([
      '0,9',
      '1,9',
      '2,9',
      '3,9',
      '4,9',
      '5,9',
    ]);
    expect(getLineSegmentPoints([9, 4, 3, 4])).toEqual([
      '9,4',
      '8,4',
      '7,4',
      '6,4',
      '5,4',
      '4,4',
      '3,4',
    ]);
    expect(getLineSegmentPoints([8, 0, 0, 8])).toEqual([
      '8,0',
      '7,1',
      '6,2',
      '5,3',
      '4,4',
      '3,5',
      '2,6',
      '1,7',
      '0,8',
    ]);
  });

  it('should count points', () => {
    const segments = parseVentLineSegments(exampleInput);
    const simple = filterSimpleLineSegments(segments);
    const m = getPointMap(simple);
    expect(Array.from(m.values())).toContain(2);
    expect(m.get('2,1')).toEqual(1);
    expect(m.get('2,1')).toEqual(1);
    expect(m.get('3,4')).toEqual(2);
  });

  it('should count overlaps of simple lines', () => {
    const segments = parseVentLineSegments(exampleInput);
    const simple = filterSimpleLineSegments(segments);
    expect(countOverlaps(simple)).toEqual(5);
  });
});
