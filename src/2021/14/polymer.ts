type InsertionRule = {
  pair: string;
  next: string[];
};

export function parsePolymerPuzzleInput(input: string): {
  polymer: string;
  rules: InsertionRule[];
} {
  const lines = input.split('\n');
  const polymer = String(lines.shift());
  lines.shift();
  const rules = lines.map((l) => {
    const [pair, insert] = l.split(' -> ');
    return { pair, next: [pair[0] + insert, insert + pair[1]] };
  });

  return { polymer, rules };
}

export function solveAOC2021Day14(
  polymer: string,
  rules: InsertionRule[],
  steps: number
): number {
  const resultPairs = getElementOccurencesAfterSteps(polymer, rules, steps);
  return diffMostAndLeastCommon(resultPairs);
}

export function getElementOccurencesAfterSteps(
  polymer: string,
  rules: InsertionRule[],
  steps: number
): Record<string, number> {
  let pairs = countPolymerPairs(polymer);
  for (let i = 0; i < steps; i++) {
    pairs = developPolymerPairs(pairs, rules);
  }
  const elements: Record<string, number> = {};
  Object.entries(pairs).forEach(([key, count]) =>
    increaseCount(elements, key[1], count)
  );
  increaseCount(elements, polymer[0], 1);
  return elements;
}

export function countPolymerPairs(polymer: string): Record<string, number> {
  const result: Record<string, number> = {};
  const pairs = splitPolymer(polymer);
  pairs.forEach((pair) => increaseCount(result, pair, 1));
  return result;
}

export function developPolymerPairs(
  given: Record<string, number>,
  rules: InsertionRule[],
  times = 1
): Record<string, number> {
  let result: Record<string, number> = { ...given };
  for (let i = 0; i < times; ++i) {
    const before = { ...result };
    result = {};
    Object.entries(before)
      .map(([key, count]) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rule: rules.find((rule) => rule.pair === key)!,
        count: count,
      }))
      .forEach(({ rule, count }) =>
        rule.next.forEach((n) => increaseCount(result, n, count))
      );
  }
  return result;
}

function increaseCount(
  given: Record<string, number>,
  key: string,
  count: number
) {
  given[key] = (given[key] ?? 0) + count;
}

export function splitPolymer(polymer: string): string[] {
  const pairs: string[] = [];
  for (let i = 0; i < polymer.length - 1; ++i) {
    pairs.push(polymer.substring(i, i + 2));
  }
  return pairs;
}

function diffMostAndLeastCommon(counts: Record<string, number>) {
  const entries = Object.entries(counts);
  entries.sort(([, a], [, b]) => a - b);
  const first = entries.shift();
  const last = entries.pop();
  return Number(last?.[1]) - Number(first?.[1]);
}
