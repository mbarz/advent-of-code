export interface Solver {
  solvePart1(): number;
  solvePart2(): number;
}

export function getArg(key: string): number | null {
  const index = process.argv.indexOf(key);
  if (index >= 0) return +process.argv[index + 1];
  else return null;
}
