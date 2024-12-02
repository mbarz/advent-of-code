import { readFileSync } from 'fs';
import { join } from 'path';

type Solver = {
  solvePart1: (input: string) => number;
  solvePart2?: (input: string) => number;
};

// SOLUTIONS:
// 01 - Part 1: 1938424
// 01 - Part 2: 22014209
// 02 - Part 1: 369
// 02 - Part 2: 428

const date = new Date().getDate();
solveDate(date);

async function solveDate(date: number) {
  const solver: Solver = await import(
    `./24${date.toString().padStart(2, '0')}`
  );
  const day = String(date).padStart(2, '0');
  const input = readFileSync(
    join(__dirname, `24${day}-puzzle-input.txt`),
    'utf-8',
  );
  console.log(`Day ${day}: Part 1`);
  console.log(solver.solvePart1(input));
  if (solver.solvePart2 != null) {
    console.log(`Day ${day}: Part 2`);
    console.log(solver.solvePart2(input));
  }
}
