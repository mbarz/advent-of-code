export const solvePart1 = (input: string) => {
  const m = input.match(/mul\(\d+,\d+\)/g) ?? [];
  return m
    .map((p) => {
      const [x, y] = p
        .match(/mul\((\d+),(\d+)\)/)!
        .slice(1)
        .map(Number);
      return x * y;
    })
    .reduce((prev, curr) => prev + curr, 0);
};

export const solvePart2 = (input: string) => {
  let enabled = true;
  let sum = 0;
  for (let i = 0; i < input.length; ++i) {
    if (enabled && input.substring(i).match(/^mul\(\d+,\d+\)/)) {
      const [x, y] = input
        .substring(i)
        .match(/mul\((\d+),(\d+)\)/)!
        .slice(1)
        .map(Number);
      sum += x * y;
    }
    if (input.substring(i).match(/^do()/)) {
      enabled = true;
    }
    if (input.substring(i).match(/^don't()/)) {
      enabled = false;
    }
  }
  return sum;
};
