import {
  findBeacon,
  getCoveredFieldsInRow,
  getFieldsInRowFromSensor,
  mergeRanges,
  parseFile,
} from './day-15';

describe('Day 15', () => {
  it('should parse', () => {
    const res = parseFile('example');
    expect(res.sensors).toHaveLength(14);
    expect(res.sensors[6].position).toEqual({ x: 8, y: 7 });
    expect(res.sensors[6].closestBeacon).toEqual({ x: 2, y: 10 });
  });

  function range(s: number, e: number, opts: { exclude?: number[] } = {}) {
    const exclude = opts.exclude || [];
    return Array.from({ length: e - s + 1 }, (_, i) => s + i).filter(
      (n) => !exclude.includes(n)
    );
  }

  it('should get fields in row from sensor', () => {
    const sensors = parseFile('example').sensors;
    expect(getFieldsInRowFromSensor(sensors[6], -4)).toEqual(undefined);
    expect(getFieldsInRowFromSensor(sensors[6], -3)).toEqual(undefined);
    expect(getFieldsInRowFromSensor(sensors[6], -2)).toEqual({
      start: 8,
      end: 8,
    });
    expect(getFieldsInRowFromSensor(sensors[6], -1)).toEqual({
      start: 7,
      end: 9,
    });
    expect(getFieldsInRowFromSensor(sensors[6], 7)).toEqual({
      start: -1,
      end: 17,
    });
    expect(getFieldsInRowFromSensor(sensors[6], 8)).toEqual({
      start: 0,
      end: 16,
    });
    expect(getFieldsInRowFromSensor(sensors[6], 15)).toEqual({
      start: 7,
      end: 9,
    });
  });

  it.each([
    [
      [
        { start: 0, end: 2 },
        { start: 1, end: 3 },
      ],
      [{ start: 0, end: 3 }],
    ],
    [
      [
        { start: 0, end: 2 },
        { start: 2, end: 3 },
      ],
      [{ start: 0, end: 3 }],
    ],
    [
      [
        { start: 0, end: 2 },
        { start: 3, end: 4 },
      ],
      [{ start: 0, end: 4 }],
    ],
    [
      [
        { start: 0, end: 10 },
        { start: 3, end: 4 },
      ],
      [{ start: 0, end: 10 }],
    ],
  ])('should merge ranges', (ranges, result) => {
    expect(mergeRanges(ranges)).toEqual(result);
  });

  it('should solve example', () => {
    const sensors = parseFile('example').sensors;
    const res = getCoveredFieldsInRow(sensors, 10);
    expect(res.ranges).toEqual(['-2 - 24']);
    expect(res.beacons).toEqual([2]);
    expect(res.count).toEqual(26);
  });

  it('should solve puzzle', () => {
    console.log('test');
    const sensors = parseFile('puzzle').sensors;
    const res = getCoveredFieldsInRow(sensors, 2000000);
    expect(res.ranges).toEqual(['-229697 - 5334320']);
    expect(res.beacons).toEqual([2528182]);
    expect(res.count).toEqual(5564017);
  }, 1000);

  it('should find beacon in example', () => {
    const sensors = parseFile('example').sensors;
    const beacon = findBeacon(sensors, 0, 0, 20, 20);
    expect(beacon).toEqual({ x: 14, y: 11 });
    if (beacon) {
      expect(beacon.x * 4000000 + beacon.y).toEqual(56000011);
    }
  });
});
