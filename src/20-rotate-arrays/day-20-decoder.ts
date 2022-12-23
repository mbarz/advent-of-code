import { sum } from '../util/sum';

export function moveArrayItemRelative(
  given: number[],
  index: number,
  rel: number
): number[] {
  const arr = [...given];

  // don't make it complicated with multiple rounds.
  if (Math.abs(rel) >= given.length - 1) {
    rel = rel % (given.length - 1);
  }
  if (rel === 0) return arr;

  let target = index + rel;

  if (target >= arr.length) target -= arr.length - 1;
  if (target <= 0) target += arr.length - 1;

  const item = arr.splice(index, 1);
  arr.splice(target, 0, ...item);
  return arr;
}

export function mixArray(given: number[], times = 1): number[] {
  // create an array of refs and just push this one around
  let refs = given.map((_n, i) => i);
  const size = given.length;
  for (let t = 0; t < times * size; t++) {
    const i = t % size;
    const n = given[i];
    const from = refs.indexOf(i);
    refs = moveArrayItemRelative(refs, from, n);
  }
  // now map the mixed refs to the original values
  return refs.map((i) => given[i]);
}

export function atIndex(arr: number[], index: number) {
  return arr[index % arr.length];
}

const magicNumber = 811589153;
const relevantIndices = [1000, 2000, 3000];

export function solveDay20Part1(numbers: number[]) {
  const mixed = mixArray(numbers);
  const nullIndex = mixed.indexOf(0);
  const results = relevantIndices
    .map((i) => i + nullIndex)
    .map((i) => atIndex(mixed, i));
  return sum(results);
}

export function solveDay20Part2(numbers: number[]) {
  const multiplied = numbers.map((n) => n * magicNumber);
  const mixed = mixArray(multiplied, 10);
  const nullIndex = mixed.indexOf(0);
  const results = relevantIndices
    .map((i) => i + nullIndex)
    .map((i) => atIndex(mixed, i));
  return sum(results);
}
