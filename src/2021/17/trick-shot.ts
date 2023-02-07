type TargetArea = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export function parseInput(input: string): TargetArea {
  const m = input.match(/x=(\d+)..(\d+), y=(-\d+)..(-\d+)/);
  if (m == null) throw new Error('Invalid string');
  m.shift();
  const [minX, maxX, minY, maxY] = m.map((n) => Number(n));
  return { minX, maxX, minY, maxY };
}

type Hit = { x: number; y: number; h: number; t: number };

export function getTrickshotStartVelocity(target: TargetArea): Hit {
  const hits = getPossibleHits(target);
  hits.sort((a, b) => b.h - a.h);
  return hits[0];
}

export function getPossibleYHits(
  target: TargetArea
): { y: number; t: number; h: number }[] {
  const ay = -1;
  const hits: { y: number; t: number; h: number }[] = [];

  const yMax = Math.max(Math.abs(target.minY), Math.abs(target.maxY));
  for (let vy0 = target.minY; vy0 < yMax; vy0++) {
    let sy = 0;
    let maxY = 0;
    for (let t = 1; t < 1000; ++t) {
      const vy = vy0 + (t - 1) * ay;
      sy += vy;
      maxY = Math.max(maxY, sy);
      if (sy < target.minY) break;
      if (sy >= target.minY && sy <= target.maxY) {
        hits.push({ y: vy0, t, h: maxY });
      }
    }
  }
  return hits;
}

export function getPossibleXHits(
  target: TargetArea
): { x: number; t: number }[] {
  const ay = -1;
  const hits: { x: number; t: number }[] = [];

  for (let vx0 = 1; vx0 <= target.maxX; vx0++) {
    let sx = 0;
    for (let t = 1; t < 200; ++t) {
      let vx = vx0 + (t - 1) * ay;
      if (vx < 0) vx = 0;
      sx += vx;
      if (sx > target.maxX) break;
      if (sx >= target.minX && sx <= target.maxX) {
        hits.push({ x: vx0, t });
      }
    }
  }
  return hits;
}

export function countUniqueHitVelocities(target: TargetArea): number {
  const hits = getPossibleHits(target);
  return new Set(hits.map((h) => [h.x, h.y].join(','))).size;
}

export function getPossibleHits(target: TargetArea): Hit[] {
  const yHits = getPossibleYHits(target);
  const xHits = getPossibleXHits(target);
  return yHits
    .map((yh) =>
      xHits.filter((xh) => xh.t === yh.t).map((xh) => ({ ...xh, ...yh }))
    )
    .reduce((p, c) => [...p, ...c], []);
}
