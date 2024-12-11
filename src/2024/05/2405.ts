import { sum } from '../util/sum';

type Rule = [number, number];
type Update = number[];

export function parseInput(input: string): {
  rules: Rule[];
  updates: Update[];
} {
  const rules: [number, number][] = [];
  const updates: number[][] = [];
  const lines = input.split('\n');
  let updatesStarted = false;
  for (const line of lines) {
    if (line === '') {
      updatesStarted = true;
      continue;
    }
    if (updatesStarted) {
      updates.push(line.split(',').map(Number));
    } else {
      const [left, right] = line.split('|').map(Number);
      rules.push([left, right]);
    }
  }
  return { rules, updates };
}

export function isValidUpdate(update: Update, rules: Rule[]) {
  return update.join(',') === fixUpdate(update, rules).join(',');
}

function fixUpdate(update: Update, rules: Rule[]) {
  const copy = [...update];
  copy.sort((a, b) => {
    if (
      rules.find(([left, right]) => {
        return left === a && right === b;
      })
    ) {
      return -1;
    }
    if (
      rules.find(([left, right]) => {
        return left === a && right === b;
      })
    ) {
      return 1;
    }
    return 0;
  });
  return copy;
}

export function getMiddleNumber(nums: number[]) {
  return nums[Math.floor(nums.length / 2)];
}

export function solvePart1(input: string) {
  const { rules, updates } = parseInput(input);
  const validUpdates = updates.filter((update) => isValidUpdate(update, rules));
  return sum(validUpdates.map((update) => getMiddleNumber(update)));
}

export function solvePart2(input: string) {
  const { rules, updates } = parseInput(input);
  const invalidUpdates = updates.filter(
    (update) => !isValidUpdate(update, rules),
  );
  const fixedUpdates = invalidUpdates.map((update) => fixUpdate(update, rules));
  return sum(fixedUpdates.map((update) => getMiddleNumber(update)));
}
