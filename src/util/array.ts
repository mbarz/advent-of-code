export function range(start: number, end: number, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

export function repeat<T>(e: T, times: number): T[] {
  return Array(times).fill(e);
}

export function findLastIndex<T>(
  array: T[],
  fn: (element: T, index: number, array: T[]) => boolean,
) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (fn(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

export function findLast<T>(
  array: T[],
  fn: (element: T, index: number, array: T[]) => boolean,
): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (fn(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

export function swap<T>(array: T[], i: number, j: number) {
  [array[i], array[j]] = [array[j], array[i]];
}

export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export function atIndex<T>(arr: T[], i: number) {
  return arr[arr.length - 1 - i];
}
