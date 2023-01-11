export type Point2D = { x: number; y: number };

export type LineSegment = number[];

export function parseVentLineSegments(input: string): LineSegment[] {
  return input.split('\n').map((line, index) => {
    const m = line.match(/\d+/g);
    if (m == null) throw new Error(`Invalid line ${index} ${line}`);
    const [x1, y1, x2, y2] = m.map((n) => +n);
    return [x1, y1, x2, y2];
  });
}

export function filterSimpleLineSegments(segments: LineSegment[]) {
  return segments.filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2);
}

export function getLineSegmentPoints([x1, y1, x2, y2]: LineSegment): string[] {
  const points = [];
  const diffx = x2 - x1;
  const diffy = y2 - y1;
  const dx = diffx < 0 ? -1 : diffx === 0 ? 0 : 1;
  const dy = diffy < 0 ? -1 : diffy === 0 ? 0 : 1;
  const n = Math.max(Math.abs(diffx), Math.abs(diffy));
  for (let i = 0; i <= n; ++i) {
    const x = x1 + i * dx;
    const y = y1 + i * dy;
    points.push([x, y].join(','));
  }
  return points;
}

export function getPointMap(segments: LineSegment[]): Map<string, number> {
  const map = new Map<string, number>();
  segments
    .map((s) => getLineSegmentPoints(s))
    .forEach((points) =>
      points.forEach((point) => {
        map.set(point, (map.get(point) || 0) + 1);
      })
    );
  return map;
}

export function countOverlaps(segments: LineSegment[]): number {
  return Array.from(getPointMap(segments).values()).filter((n) => n > 1).length;
}
