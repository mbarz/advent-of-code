import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const year = 2025;
const yy = String(year).slice(-2);

type Solver = {
  solvePart1: (input: string) => number;
  solvePart2?: (input: string) => number;
};

const days = readdirSync(__dirname)
  .filter((f) => f.match(/^\d{2}$/))
  .map(Number);

const date = Math.max(...days);
solveDate(date);

async function solveDate(date: number) {
  const day = date.toString().padStart(2, '0');
  const solver: Solver = await import(`./${day}/${yy}${day}`);
  const input = readFileSync(
    join(__dirname, `${day}/${yy}${day}-puzzle-input.txt`),
    'utf-8',
  );

  const start1 = Date.now();

  const res1 = solver.solvePart1(input);
  console.log(`Day ${day}: Part 1: ${yellow(res1)} (${Date.now() - start1}ms)`);

  if (solver.solvePart2 != null) {
    const start2 = Date.now();
    console.log(
      `Day ${day}: Part 2: ${yellow(solver.solvePart2(input))} (${
        Date.now() - start2
      }ms)`,
    );
  }
}

function yellow(s: string | number) {
  return `\x1b[33m${s}\x1b[0m`;
}
