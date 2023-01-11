import { sum } from '../../util/sum';

const example = [3, 4, 3, 1, 2];
const puzzle = [
  4, 5, 3, 2, 3, 3, 2, 4, 2, 1, 2, 4, 5, 2, 2, 2, 4, 1, 1, 1, 5, 1, 1, 2, 5, 2,
  1, 1, 4, 4, 5, 5, 1, 2, 1, 1, 5, 3, 5, 2, 4, 3, 2, 4, 5, 3, 2, 1, 4, 1, 3, 1,
  2, 4, 1, 1, 4, 1, 4, 2, 5, 1, 4, 3, 5, 2, 4, 5, 4, 2, 2, 5, 1, 1, 2, 4, 1, 4,
  4, 1, 1, 3, 1, 2, 3, 2, 5, 5, 1, 1, 5, 2, 4, 2, 2, 4, 1, 1, 1, 4, 2, 2, 3, 1,
  2, 4, 5, 4, 5, 4, 2, 3, 1, 4, 1, 3, 1, 2, 3, 3, 2, 4, 3, 3, 3, 1, 4, 2, 3, 4,
  2, 1, 5, 4, 2, 4, 4, 3, 2, 1, 5, 3, 1, 4, 1, 1, 5, 4, 2, 4, 2, 2, 4, 4, 4, 1,
  4, 2, 4, 1, 1, 3, 5, 1, 5, 5, 1, 3, 2, 2, 3, 5, 3, 1, 1, 4, 4, 1, 3, 3, 3, 5,
  1, 1, 2, 5, 5, 5, 2, 4, 1, 5, 1, 2, 1, 1, 1, 4, 3, 1, 5, 2, 3, 1, 3, 1, 4, 1,
  3, 5, 4, 5, 1, 3, 4, 2, 1, 5, 1, 3, 4, 5, 5, 2, 1, 2, 1, 1, 1, 4, 3, 1, 4, 2,
  3, 1, 3, 5, 1, 4, 5, 3, 1, 3, 3, 2, 2, 1, 5, 5, 4, 3, 2, 1, 5, 1, 3, 1, 3, 5,
  1, 1, 2, 1, 1, 1, 5, 2, 1, 1, 3, 2, 1, 5, 5, 5, 1, 1, 5, 1, 4, 1, 5, 4, 2, 4,
  5, 2, 4, 3, 2, 5, 4, 1, 1, 2, 4, 3, 2, 1,
];

const cache: Record<string, number> = {};
function calc(n: number, cycles: number): number {
  const key = [n, cycles].join(',');
  let res = 1;
  if (cache[key]) {
    return cache[key];
  } else if (cycles <= n) {
    res = 1;
  } else if (n === 0) {
    res = calc(6, cycles - 1) + calc(8, cycles - 1);
  } else {
    res = calc(n - 1, cycles - 1);
  }
  cache[key] = res;
  return res;
}

function solve(name: string, arr: number[], cycles: number) {
  const key = `${name} for ${cycles} days`;
  console.time(key);
  const res = sum(arr.map((n) => calc(n, cycles)));
  console.timeEnd(key);
  console.log(res);
}

solve('Example', example, 18);
solve('Puzzle', puzzle, 80);
solve('Example', example, 256);
solve('Puzzle', puzzle, 256);
