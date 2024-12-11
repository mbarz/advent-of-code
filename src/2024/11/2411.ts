let cache: Record<string, number> = {};

export function solvePart1(input: string) {
  return solveForBlinks(input, 25);
}

export function solvePart2(input: string) {
  return solveForBlinks(input, 75);
}

export function solveForBlinks(input: string, n: number) {
  cache = {};
  const stones = (input.match(/\d+/g) ?? []).map(Number);
  return stones.reduce(
    (prev, curr) => prev + countOfStonesAfterBlinks(curr, n),
    0,
  );
}

export function countOfStonesAfterBlinks(stone: number, n: number): number {
  if (n === 0) return 1;
  if (cache[`${stone}-${n}`]) return cache[`${stone}-${n}`];
  let res = 0;
  const afterBlink = blinkOnce([stone]);
  for (const s of afterBlink) {
    res += countOfStonesAfterBlinks(s, n - 1);
  }
  cache[`${stone}-${n}`] = res;
  return res;
}

export function blinkOnce(stones: number[]): number[] {
  const updatedStones: number[] = [];
  for (const stone of stones) {
    const s = String(stone);
    if (stone === 0) {
      updatedStones.push(1);
    } else if (s.length % 2 === 0) {
      const left = Number(s.slice(0, s.length / 2));
      const right = Number(s.slice(s.length / 2));
      updatedStones.push(left, right);
    } else {
      updatedStones.push(stone * 2024);
    }
  }
  return updatedStones;
}
