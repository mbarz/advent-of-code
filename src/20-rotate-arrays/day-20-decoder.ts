import { sum } from '../util/sum';

export function mix(given: number[]): number[] {
  const map = given.map((_n, i) => i);
  function move(arr: number[], index: number, rel: number) {
    let target = index + rel;
    if (rel < 0) target--;
    while (target < 0) target += arr.length;
    while (target >= arr.length) target -= arr.length - 1;
    if (target > index) {
      for (let i = index; i < target; i++) {
        const tmp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = tmp;
      }
    }
    if (target < index) {
      for (let i = index; i > target; i--) {
        const tmp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = tmp;
      }
    }
    return void 0;
  }

  for (let i = 0; i < given.length; i++) {
    const n = given[i];
    move(map, map.indexOf(i), n);
  }

  return map.map((i) => given[i]);
}

export function atIndex(arr: number[], index: number) {
  return arr[index % arr.length];
}

export function solveDay20Part1(numbers: number[]) {
  const mixed = mix(numbers);
  const nullIndex = mixed.indexOf(0);
  return sum(
    [1000, 2000, 3000].map((i) => i + nullIndex).map((i) => atIndex(mixed, i))
  );
}
