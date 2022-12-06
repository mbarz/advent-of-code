export function highestCalories(input: string) {
  return top(input, 1);
}

export function top(input: string, n = 3) {
  return getElves(input)
    .sort((a, b) => b - a)
    .slice(0, n)
    .reduce((a, b) => a + b, 0);
}

function getElves(input: string) {
  const elves: number[] = [];
  let index = 0;
  const lines = input.split('\n').map((l) => l.trim());
  lines.forEach((line) => {
    if (line === '') index++;
    else {
      elves[index] = (elves[index] || 0) + Number(line);
    }
  });
  return elves;
}
