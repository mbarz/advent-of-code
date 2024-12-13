type Machine = {
  a: [number, number];
  b: [number, number];
  p: [number, number];
};

export function parse(input: string): Machine[] {
  const machines: Machine[] = [];
  const lines = input.split('\n');
  const parseLine = (i: number) =>
    lines[i].match(/(\d+)/g)!.map(Number) as [number, number];
  for (let i = 0; i < lines.length; i += 4) {
    machines.push({
      a: parseLine(i),
      b: parseLine(i + 1),
      p: parseLine(i + 2),
    });
  }
  return machines;
}

export function solveMachine(m: Machine, offset = 0): number | null {
  const [xa, ya] = m.a;
  const [xb, yb] = m.b;
  const [xp, yp] = m.p.map((n) => n + offset);

  const ma = ya / xa;
  const mb = yb / xb;

  const x = ma === mb ? 0 : (yp - mb * xp) / (ma - mb);

  // round and check afterwards instead of checking for integer to avoid floating point errors
  const a = Math.round(x / xa);
  const b = Math.round((xp - x) / xb);
  const isValid = a * xa + b * xb === xp && a * ya + b * yb === yp;
  return isValid ? a * 3 + b : null;
}

export function solveWithOffset(input: string, offset: number) {
  const machines = parse(input);
  const solutions = machines.map((m) => solveMachine(m, offset));
  return solutions.reduce((prev, curr) => (prev ?? 0) + curr!, 0);
}

export function solvePart1(input: string) {
  return solveWithOffset(input, 0);
}

export function solvePart2(input: string) {
  return solveWithOffset(input, 10000000000000);
}
