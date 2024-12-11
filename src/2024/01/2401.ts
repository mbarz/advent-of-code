export function solvePart1(input: string): number {
  const lists = parseInput(input);
  lists.forEach((l) => l.sort());
  const [a, b] = lists;
  return a.reduce((p, c, i) => p + Math.abs(c - b[i]), 0);
}

function parseInput(input: string): [number[], number[]] {
  const lines = input.split('\n');
  const a: number[] = [];
  const b: number[] = [];
  for (const line of lines) {
    const [n1, n2] = line.split(/\s+/).map(Number);
    a.push(n1);
    b.push(n2);
  }
  return [a, b];
}

export function solvePart2(input: string): number {
  const lists = parseInput(input);
  const [a, b] = lists;
  return a.reduce((p, c) => p + c * b.filter((n) => n === c).length, 0);
}
