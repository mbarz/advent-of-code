export function solvePart1(input: string) {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    const [target, ...nums] = line.match(/(\d+)/g)?.slice(0).map(Number) ?? [];
    if (isSolvable(target, nums)) sum += target;
  }
  return sum;
}

export function solvePart2(input: string) {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    const [target, ...nums] = line.match(/(\d+)/g)?.slice(0).map(Number) ?? [];
    if (isSolvable2(target, nums)) sum += target;
  }
  return sum;
}

export function isSolvable(target: number, nums: number[]): boolean {
  if (nums.length === 1) return nums[0] === target;
  return (
    isSolvable(target, [nums[0] * nums[1], ...nums.slice(2)]) ||
    isSolvable(target, [nums[0] + nums[1], ...nums.slice(2)])
  );
}

export function isSolvable2(target: number, nums: number[]): boolean {
  if (nums.length === 1) return nums[0] === target;
  return (
    isSolvable2(target, [
      Number([nums[0], nums[1]].join('')),
      ...nums.slice(2),
    ]) ||
    isSolvable2(target, [nums[0] * nums[1], ...nums.slice(2)]) ||
    isSolvable2(target, [nums[0] + nums[1], ...nums.slice(2)])
  );
}
