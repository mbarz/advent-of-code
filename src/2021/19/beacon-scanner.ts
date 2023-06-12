export type Point3D = [number, number, number];

export function parseBeaconScannerInput(input: string) {
  const scan: Point3D[][] = [];
  input.split('\n').forEach((line) => {
    if (line.startsWith('---')) {
      scan.push([]);
    } else if (line.trim() !== '') {
      const [x, y, z] = line.split(',').map((n) => +n);
      scan[scan.length - 1].push([x, y, z]);
    }
  });
  return scan;
}

export function allPairs<T>(arr: T[]) {
  return arr
    .slice(0, arr.length - 1)
    .flatMap((a, i) => arr.slice(i + 1).map((b) => [a, b]));
}

export function calcBeaconDistances(scan: Point3D[]): number[] {
  return allPairs(scan).map(([a, b]) => calcDistance(a, b));
}

export function calcConnections(scan: Point3D[]): Point3D[] {
  return allPairs(scan).map(([a, b]) => getDiff(a, b));
}

export function couldOverlap(
  scanA: Point3D[],
  scanB: Point3D[],
  requiredMatches = 12
) {
  const distA = calcBeaconDistances(scanA);
  const distB = calcBeaconDistances(scanB);
  const same = distB.filter((d) => distA.includes(d)).length;
  const requiredDistanceMatches = (requiredMatches * (requiredMatches - 1)) / 2;
  return same >= requiredDistanceMatches;
}

export function sortBeacons(scan: Point3D[]): Point3D[] {
  return scan.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
}

export function countCommonDiffs(scanA: Point3D[], scanB: Point3D[]): number {
  const distA = calcConnections(sortBeacons([...scanA])).map((c) =>
    c.join(',')
  );
  const distB = calcConnections(sortBeacons([...scanB])).map((c) =>
    c.join(',')
  );
  return distB.filter((d) => distA.includes(d)).length;
}

type ResolvedScan = {
  index: number;
  beacons: Point3D[];
  scanner: Point3D;
};

export function pointVariant(p: Point3D, v: string) {
  const [x, y, z] = p;
  const m: Record<string, number> = { x, y, z };
  return v.split('').map((l) => m[l]) as Point3D;
}

function scanVariant(scan: Point3D[], v: string): Point3D[] {
  return scan.map((p) => pointVariant(p, v));
}

export function invertPoint(
  p: Point3D,
  matrix: [boolean, boolean, boolean]
): Point3D {
  const [x, y, z] = p;
  const [ix, iy, iz] = matrix;
  return [ix ? -x : x, iy ? -y : y, iz ? -z : z];
}

function invertScan(
  scan: Point3D[],
  matrix: [boolean, boolean, boolean]
): Point3D[] {
  return scan.map((p) => invertPoint(p, matrix));
}

function movePoint(p: Point3D, v: Point3D): Point3D {
  const [x, y, z] = p;
  const [dx, dy, dz] = v;
  return [x + dx, y + dy, z + dz];
}
export function moveScan(scan: Point3D[], v: Point3D): Point3D[] {
  return scan.map((p) => movePoint(p, v));
}

export function getDiff(p1: Point3D, p2: Point3D): Point3D {
  return [0, 1, 2].map((i) => p1[i] - p2[i]) as Point3D;
}

export function getOverlap(
  origin: { index: number; beacons: Point3D[] },
  scan: { index: number; beacons: Point3D[] },
  requiredMatches = 12
): ResolvedScan | undefined {
  if (!couldOverlap(origin.beacons, scan.beacons, requiredMatches))
    return undefined;

  const variants = ['xyz', 'xzy', 'yxz', 'yzx', 'zxy', 'zyx'];
  const directions = [0, 1, 2, 3, 4, 5, 6, 7].map(
    (n) => [4, 2, 1].map((d) => Boolean(n & d)) as [boolean, boolean, boolean]
  );
  for (const variant of variants) {
    const flipped = scanVariant(scan.beacons, variant);
    for (const direction of directions) {
      const inverted = invertScan(flipped, direction);
      const commonConnections = countCommonDiffs(inverted, origin.beacons);

      const requiredConnectionMatches =
        (requiredMatches * (requiredMatches - 1)) / 2;

      if (commonConnections < requiredConnectionMatches) continue;

      for (const b of origin.beacons) {
        for (const a of inverted) {
          const diff = getDiff(b, a);

          const moved = moveScan(inverted, diff);
          const common = countCommonPoints(moved, origin.beacons);

          if (common >= requiredMatches) {
            return { beacons: moved, scanner: diff, index: scan.index };
          }
        }
      }
    }
  }
  return undefined;
}

export function joinScans(scans: Point3D[][]) {
  const resolved: ResolvedScan[] = [
    { index: 0, beacons: scans[0], scanner: [0, 0, 0] },
  ];
  for (let i = 0; i < resolved.length; ++i) {
    const origin = resolved[i];
    scans
      .map((s, index) => ({ beacons: s, index }))
      .filter(({ index }) => !resolved.map((r) => r.index).includes(index))
      .map((s) => getOverlap(origin, s))
      .forEach((o) => (o != null ? resolved.push(o) : null));
  }

  return {
    beacons: uniqueBeacons(resolved.flatMap((r) => r.beacons)),
    resolved,
  };
}

function unique<T>(arr: T[], isSame: (a: T, b: T) => boolean) {
  return arr.reduce(
    (p, c) => (p.find((b) => isSame(b, c)) ? p : [c, ...p]),
    [] as T[]
  );
}

function uniqueBeacons(all: Point3D[]) {
  return unique(all, isSameBeacon);
}

function isSameBeacon(a: Point3D, b: Point3D) {
  return a.find((c, i) => c !== b[i]) == null;
}

export function countCommonPoints(a: Point3D[], b: Point3D[]): number {
  const flatA = a.map((p) => p.join(','));
  const flatB = b.map((p) => p.join(','));
  return flatA.filter((a) => flatB.includes(a)).length;
}

function calcDistance(b: Point3D, a: Point3D) {
  const coords = [0, 1, 2];
  const diffs = coords.map((i) => b[i] - a[i]);
  const sum = diffs.map((d) => d * d).reduce((p, c) => p + c);
  return Math.sqrt(sum);
}

export function manhattanDistance(a: Point3D, b: Point3D): number {
  return a.map((c, i) => Math.abs(b[i] - c)).reduce((p, c) => p + c, 0);
}
