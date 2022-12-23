import { sum } from '../util/sum';

export function moveArrayItemRelative(
  given: number[],
  index: number,
  rel: number
): number[] {
  const arr = [...given];

  if (Math.abs(rel) >= given.length - 1) {
    return moveArrayItemRelative(given, index, rel % (given.length - 1));
  }

  let target = index + rel;

  if (rel === 0) return arr;

  // this is new
  if (rel > 0) {
    if (target < arr.length) {
      const item = arr.splice(index, 1);
      arr.splice(target, 0, ...item);
      return arr;
    } else {
      target = target - arr.length + 1;
      const item = arr.splice(index, 1);
      arr.splice(target, 0, ...item);
      return arr;
    }
  } else if (rel < 0) {
    if (target > 0) {
      const item = arr.splice(index, 1);
      arr.splice(target, 0, ...item);
      return arr;
    } else {
      target = arr.length + (target - 1);
      const item = arr.splice(index, 1);
      arr.splice(target, 0, ...item);
      return arr;
    }
  }
  return arr;
}

export function mixArray(
  given: number[],
  o: { stopAt?: number; times?: number } = {}
): number[] {
  let map = given.map((_n, i) => i);
  const stopAt = o.stopAt == null ? given.length : o.stopAt;
  const times = o.times == null ? 1 : o.times;

  for (let t = 0; t < times; t++) {
    for (let i = 0; i < stopAt; i++) {
      const n = given[i];
      const from = map.indexOf(i);
      map = moveArrayItemRelative(map, from, n);
    }
  }

  return map.map((i) => given[i]);
}

export function atIndex(arr: number[], index: number) {
  return arr[index % arr.length];
}

export function solveDay20Part1(numbers: number[]) {
  const mixed = mixArray(numbers);
  const nullIndex = mixed.indexOf(0);
  return sum(
    [1000, 2000, 3000].map((i) => i + nullIndex).map((i) => atIndex(mixed, i))
  );
}

export function solveDay20Part2(numbers: number[]) {
  const mixed = mixArray(
    numbers.map((n) => n * 811589153),
    { times: 10 }
  );
  const nullIndex = mixed.indexOf(0);
  const results = [1000, 2000, 3000]
    .map((i) => i + nullIndex)
    .map((i) => atIndex(mixed, i));
  return results;
}
