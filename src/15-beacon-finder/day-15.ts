import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../util/sum';

export function parseFile(s: string) {
  const input = readFileSync(join(__dirname, `day-15-${s}-input.txt`), 'utf-8');
  return parse(input);
}

type Point = {
  x: number;
  y: number;
};

type Sensor = {
  position: Point;
  closestBeacon: Point;
};

export function parse(input: string): {
  sensors: Sensor[];
} {
  return {
    sensors: input.split('\n').map((s) => {
      const m = s.match(/x=(.*), y=(.*):.*x=(.*), y=(.*)/);
      if (m == null) throw new Error('invalid line');
      const [sx, sy, bx, by] = m.slice(1).map((n) => Number(n));
      return { position: { x: sx, y: sy }, closestBeacon: { x: bx, y: by } };
    }),
  };
}

type Range = { start: number; end: number };

export function getFieldsInRowFromSensor(
  sensor: Sensor,
  y: number
): Range | undefined {
  const { x: sx, y: sy } = sensor.position;
  const { x: bx, y: by } = sensor.closestBeacon;

  const bdy = Math.abs(by - sy);
  const bdx = Math.abs(bx - sx);
  const reach = bdx + bdy;
  const dy = Math.abs(sy - y);
  const n = reach - dy;
  const count = 1 + n * 2;
  if (count < 0) return undefined;
  const start = sx - n;
  const end = sx + n;
  return { start, end };
}

export function mergeRanges(ranges: Range[]) {
  const copy = [...ranges];
  copy.sort((a, b) => a.start - b.start);
  return copy.reduce((p, c) => {
    const last = p.pop();
    const o =
      last == null
        ? [c]
        : last != null && last.end >= c.start - 1
        ? [{ start: last.start, end: Math.max(c.end, last.end) }]
        : [last, c];
    return [...p, ...o];
  }, [] as Range[]);
}

export function getCoveredFieldsInRow(
  sensors: Sensor[],
  y: number
): { ranges: string[]; beacons: number[]; count: number } {
  const beacons = Array.from(
    new Set(
      sensors
        .filter((s) => s.closestBeacon.y === y)
        .map((s) => s.closestBeacon.x)
    )
  );
  const merged = getCoveredRanges(sensors, y);

  const count = sum(merged.map((r) => r.end - r.start + 1)) - beacons.length;

  return {
    ranges: merged.map((s) => `${s.start} - ${s.end}`),
    beacons,
    count,
  };
}

function getCoveredRanges(sensors: Sensor[], y: number): Range[] {
  const all = sensors
    .map((s) => getFieldsInRowFromSensor(s, y))
    .filter((r): r is { start: number; end: number } => r != null);
  return mergeRanges(all);
}

export function findBeacon(
  sensors: Sensor[],
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): Point | undefined {
  for (let y = minY; y < maxY; y++) {
    const ranges = getCoveredRanges(sensors, y);
    const range = ranges.find((r) => r.end < maxX);
    if (range) {
      return { x: range.end + 1, y };
    }
  }
  return undefined;
}
