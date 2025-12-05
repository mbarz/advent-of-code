function rangeIncludes(range: { start: number; end: number }, n: number) {
  return range.start <= n && n <= range.end;
}

export function solvePart1(input: string) {
  const lines = input.split('\n');
  const ranges = lines
    .filter((l) => l.includes('-'))
    .map((l) => l.split('-').map(Number))
    .map(([a, b]) => ({ start: a, end: b }));
  const ingredents = lines
    .filter((l) => new RegExp(/^\d+$/).test(l))
    .map(Number);

  const fresh = ingredents.filter((ing) =>
    ranges.some((r) => rangeIncludes(r, ing)),
  );

  return fresh.length;
}

type Range = { start: number; end: number };

export function isOverlapping(a: Range, b: Range) {
  return (
    (a.start >= b.start && a.start <= b.end) ||
    (a.end >= b.start && a.end <= b.end) ||
    (b.start >= a.start && b.start <= a.end) ||
    (b.end >= a.start && b.end <= a.end)
  );
}

export function mergeRanges(a: Range, b: Range): Range {
  return { start: Math.min(a.start, b.start), end: Math.max(a.end, b.end) };
}

function minimizeRanges(ranges: Range[]): Range[] {
  const res: Range[] = [];
  for (const range of ranges) {
    const overlapping = res.find((r) => isOverlapping(r, range));
    if (overlapping) {
      const merged = mergeRanges(overlapping, range);
      overlapping.start = merged.start;
      overlapping.end = merged.end;
    } else {
      res.push(range);
    }
  }
  if (res.length !== ranges.length) return minimizeRanges(res);
  return res;
}

function rangeLength(range: Range) {
  return range.end - range.start + 1;
}

/**
 * < 361128476327670
 */
export function solvePart2(input: string) {
  const lines = input.split('\n');
  const ranges = lines
    .filter((l) => l.includes('-'))
    .map((l) => l.split('-').map(Number))
    .map(([a, b]) => ({ start: a, end: b }));

  const minimizedRanges = minimizeRanges(ranges);
  minimizedRanges.sort((a, b) => a.start - b.start);

  return minimizedRanges.reduce((sum, r) => sum + rangeLength(r), 0);
}
