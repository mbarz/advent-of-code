import { readFileSync, readdirSync } from 'fs';
import { AdventOfCode2023Day01 } from './01-trebuchet/2023-01-trebuchet';
import { AdventOfCode2023Day02 } from './02-cube-conundrum/2023-02-cube-conundrum';
import { AdventOfCode2023Day03 } from './03-gear-ratios/2023-03-gear-ratios';
import { AdventOfCode2023Day04 } from './04-scratchcards/2023-04-scratchcards';
import { AdventOfCode2023Day05 } from './05-fertilizer/2023-05-fertilizer';
import { AdventOfCode2023Day06 } from './06-wait-for-it/2023-06-wait-for-it';
import { AdventOfCode2023Day07 } from './07-camel-cards/2023-07-camel-cards';
import { AdventOfCode2023Day08 } from './08-haunted-wastelands/2023-08-haunted-wasteland';
import { AdventOfCode2023Day09 } from './09-mirage-maintenance/2023-09-mirage-maintenance';
import { AdventOfCode2023Day10 } from './10-pipe-maze/2023-10-pipe-maze';
import { AdventOfCode2023Day11 } from './11-cosmic-expansion/2023-11-cosmic-expansion';
import { AdventOfCode2023Day12 } from './12-hot-springs/2023-12-hot-springs';
import { AdventOfCode2023Day13 } from './13-point-of-indipendence/2023-13-point-of-indi';
import { AdventOfCode2023Day14 } from './14-parabolic-reflector-dish/2023-14-parabolic-reflector-dish';
import { AdventOfCode2023Day15 } from './15-lens-library/2023-15-lens-library';
import { AdventOfCode2023Day16 } from './16-the-floor-will-be-lava/2023-16-the-floor-will-be-lava';
import { getArg } from './util/solver';

const file = (n: number) => {
  const dirs = readdirSync(__dirname);
  const day = String(n).padStart(2, '0');
  const dir = dirs.find((d) => d.startsWith(day))!;
  const file = `input-${day}.txt`;
  return readFileSync(`${__dirname}/${dir}/${file}`, 'utf-8');
};

const summary = (n: number) => {
  const dirs = readdirSync(__dirname);
  const day = String(n).padStart(2, '0');
  const dir = dirs.find((d) => d.startsWith(day))!;
  const parts = dir.split('-');
  parts.shift();
  return parts.map((p) => p.toUpperCase()).join(' ');
};

const solvers = [
  () => new AdventOfCode2023Day01(file(1)),
  () => new AdventOfCode2023Day02(file(2)),
  () => new AdventOfCode2023Day03(file(3)),
  () => new AdventOfCode2023Day04(file(4)),
  () => new AdventOfCode2023Day05(file(5)),
  () => new AdventOfCode2023Day06(file(6)),
  () => new AdventOfCode2023Day07(file(7)),
  () => new AdventOfCode2023Day08(file(8)),
  () => new AdventOfCode2023Day09(file(9)),
  () => new AdventOfCode2023Day10(file(10)),
  () => new AdventOfCode2023Day11(file(11)),
  () => new AdventOfCode2023Day12(file(12)),
  () => new AdventOfCode2023Day13(file(13)),
  () => new AdventOfCode2023Day14(file(14)),
  () => new AdventOfCode2023Day15(file(15)),
  () => new AdventOfCode2023Day16(file(16)),
];

run(getArg('-d') ?? solvers.length);

export function run(day: number) {
  const solver = solvers[day - 1]();
  const HR = Array(40).fill('-').join('');
  console.log(
    `${HR}\nWelcome to Advent of Code 2023\nDay ${day} - ${summary(
      day,
    )}\n${HR}\n`,
  );
  console.log('Solving part 1...');
  console.time('Part1');
  const part1 = solver.solvePart1();
  console.timeEnd('Part1');
  console.log(`Solution: ${part1}`);
  console.log('Solving part 2...');
  console.time('Part2');
  const part2 = solver.solvePart2();
  console.timeEnd('Part2');
  console.log(`Solution: ${part2}`);
}
