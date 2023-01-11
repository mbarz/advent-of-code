export function resolve7Segment(digits: string[]): string[] {
  const res: string[] = Array(10).fill('');
  let remaining = [...digits];
  const set = (i: number, fn: (d: string) => boolean) => {
    res[i] = remaining.find((d) => fn(d)) as string;
    remaining = remaining.filter((r) => r !== res[i]);
  };
  set(1, (d) => d.length === 2);
  set(4, (d) => d.length === 4);
  set(7, (d) => d.length === 3);
  set(8, (d) => d.length === 7);
  set(6, (d) => d.length === 6 && !includesSegments(d, res[1]));
  set(3, (d) => d.length === 5 && includesSegments(d, res[1]));
  set(9, (d) => d.length === 6 && includesSegments(d, res[3]));
  set(5, (d) => d.length === 5 && includesSegments(res[9], d));
  set(2, (d) => d.length === 5);
  set(0, () => true);
  return res;
}

function includesSegments(a: string, b: string): boolean {
  const all = a.split('');
  const sub = b.split('');
  const includes = sub.find((c) => !all.includes(c)) == null;
  return includes;
}

export function resolveEntry(e: string) {
  const [input, output] = e.split('|').map((s) => {
    const lists = s.trim().split(' ');
    return lists.map((d) => sortDigitSegments(d));
  });
  const resolved = resolve7Segment(input);
  return +output.map((d) => resolved.indexOf(d)).join('');
}
function sortDigitSegments(d: string): string {
  const segments = d.split('');
  segments.sort((a, b) => a.localeCompare(b));
  return segments.join('');
}
