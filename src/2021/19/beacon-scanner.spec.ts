import { readFileSync } from 'fs';
import {
  Point3D,
  allPairs,
  calcBeaconDistances,
  calcConnections,
  couldOverlap,
  countCommonPoints,
  getDiff,
  getOverlap,
  invertPoint,
  joinScans,
  manhattanDistance,
  moveScan,
  parseBeaconScannerInput,
  pointVariant,
  sortBeacons,
} from './beacon-scanner';

describe('2021 - Day 19 - Beacon Scanner', () => {
  let scans: Point3D[][] = [];
  beforeAll(() => {
    const input = readFileSync('res/example-input-2021-19.txt', 'utf-8');
    scans = parseBeaconScannerInput(input);
  });
  it('should have all the scanner results', () => {
    expect(scans.length).toEqual(5);
    expect(scans[0].length).toEqual(25);
    expect(scans[2].length).toEqual(26);
  });

  it('should get all pairs', () => {
    expect(allPairs(['A', 'B'])).toEqual([['A', 'B']]);
    expect(allPairs(['A', 'B', 'C'])).toEqual([
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'C'],
    ]);
    expect(allPairs(['A', 'B', 'C', 'D'])).toEqual([
      ['A', 'B'],
      ['A', 'C'],
      ['A', 'D'],
      ['B', 'C'],
      ['B', 'D'],
      ['C', 'D'],
    ]);
  });

  it('should calc distances', () => {
    expect(
      calcBeaconDistances([
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
      ])
    ).toEqual([Math.sqrt(3), Math.sqrt(12), Math.sqrt(3)]);
  });

  it('should detect potential overlap', () => {
    expect(couldOverlap(scans[0], scans[1])).toEqual(true);
    expect(couldOverlap(scans[1], scans[4])).toEqual(true);

    expect(couldOverlap(scans[0], scans[2])).toEqual(false);
    expect(couldOverlap(scans[1], scans[2])).toEqual(false);
    expect(couldOverlap(scans[2], scans[2])).toEqual(true);
    expect(couldOverlap(scans[3], scans[2])).toEqual(false);
    expect(couldOverlap(scans[4], scans[2])).toEqual(true);
  });

  it('should move scan', () => {
    expect(moveScan([[1, 2, 3]], [1, 1, 1])).toEqual([[2, 3, 4]]);
  });

  it('should get diff', () => {
    expect(getDiff([1, 2, 3], [3, 2, 1])).toEqual([-2, 0, 2]);
  });

  it('should count same points', () => {
    expect(
      countCommonPoints(
        [
          [1, 2, 3],
          [0, 0, 0],
        ],
        moveScan(
          [
            [3, 2, 1],
            [0, 0, 0],
          ],
          getDiff([1, 2, 3], [3, 2, 1])
        )
      )
    ).toEqual(1);
  });

  it('should sort', () => {
    const given: Point3D[] = [
      [2, 3, 4],
      [1, 2, 3],
    ];
    const sorted: Point3D[] = [
      [1, 2, 3],
      [2, 3, 4],
    ];
    expect(sortBeacons(given)).toEqual(sorted);
  });

  it('should flip', () => {
    expect(pointVariant([1, 2, 3], 'xyz')).toEqual([1, 2, 3]);
    expect(pointVariant([1, 2, 3], 'zxy')).toEqual([3, 1, 2]);
    expect(pointVariant([1, 2, 3], 'yzx')).toEqual([2, 3, 1]);
  });

  it('should invert', () => {
    expect(invertPoint([1, 2, 3], [false, false, false])).toEqual([1, 2, 3]);
    expect(invertPoint([1, 2, 3], [false, false, true])).toEqual([1, 2, -3]);
    expect(invertPoint([1, 2, 3], [false, true, false])).toEqual([1, -2, 3]);
    expect(invertPoint([1, 2, 3], [false, true, true])).toEqual([1, -2, -3]);
    expect(invertPoint([1, 2, 3], [true, false, false])).toEqual([-1, 2, 3]);
    expect(invertPoint([1, 2, 3], [true, false, true])).toEqual([-1, 2, -3]);
    expect(invertPoint([1, 2, 3], [true, true, false])).toEqual([-1, -2, 3]);
    expect(invertPoint([1, 2, 3], [true, true, true])).toEqual([-1, -2, -3]);
  });

  it('should get all connections', () => {
    const res = calcConnections([
      [1, 2, 3],
      [2, 3, 4],
    ]);
    expect(res).toEqual([[-1, -1, -1]]);
  });

  function getScan(index: number) {
    return { index, beacons: scans[index] };
  }

  it('should get overlap between 0 and 1', () => {
    const overlap = getOverlap(getScan(0), getScan(1));
    expect(overlap).toBeDefined();
    expect(overlap!.scanner).toEqual([68, -1246, -43]);
  });

  it('should get overlap between 4 and 2', () => {
    const overlap = getOverlap(getScan(4), getScan(2));
    expect(overlap).toBeDefined();
  }, 500);

  it('should join scanners', () => {
    const res = joinScans(scans);
    expect(res.beacons.length).toEqual(79);
  });

  it('should calc manhattan distance', () => {
    expect(manhattanDistance([1105, -1205, 1229], [-92, -2380, -20])).toEqual(
      3621
    );
  });
});
