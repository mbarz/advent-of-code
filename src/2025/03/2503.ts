export function solvePart1(input: string) {
  const batteries = input
    .split('\n')
    .map((line) => line.split('').map((s) => +s));
  const joltages = batteries.map((b) => maxJoltageForBattery(b, 2));
  return joltages.reduce((sum, j) => sum + j, 0);
}

function maxJoltageForBattery(battery: number[], count = 2) {
  const selected: number[] = [];

  let lastIndex = -1;
  for (let i = 0; i < count; ++i) {
    const start = lastIndex + 1;
    const keep = count - (i + 1);
    const end = battery.length - keep;
    const available = battery.slice(start, end);
    const max = Math.max(...available);
    lastIndex = lastIndex + 1 + available.indexOf(max);
    selected.push(max);
  }

  return +selected.join('');
}

export function solvePart2(input: string) {
  const batteries = input
    .split('\n')
    .map((line) => line.split('').map((s) => +s));
  const joltages = batteries.map((b) => maxJoltageForBattery(b, 12));
  return joltages.reduce((sum, j) => sum + j, 0);
}
