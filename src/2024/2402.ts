export const parseInput = (input: string) => {
  return input.split('\n').map((line) => line.split(' ').map(Number));
};

export function isSafe(arr: number[]): boolean {
  const inc = arr[1] > arr[0];
  return arr.every((n, i) => {
    const diff = n - arr[i - 1];
    if (Math.abs(diff) < 1) return false;
    if (Math.abs(diff) > 3) return false;

    if (inc && diff < 0) return false;
    if (!inc && diff > 0) return false;
    return true;
  });
}

const withoutIndex = (arr: number[], index: number) =>
  arr.filter((_, i) => i !== index);

export function isSafeWithDampener(arr: number[]): boolean {
  return arr.find((_, i) => isSafe(withoutIndex(arr, i))) != null;
}

export const solvePart1 = (input: string) => {
  return parseInput(input).filter(isSafe).length;
};

export const solvePart2 = (input: string) => {
  return parseInput(input).filter(isSafeWithDampener).length;
};
