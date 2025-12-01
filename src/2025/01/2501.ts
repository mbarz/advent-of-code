export function turn(pos: number, line: string): number {
  const dir = line[0];
  let dist = Number(line.slice(1));
  if (dir === 'L') dist = -dist;
  pos = pos + dist;
  while (pos < 0) pos += 100;
  while (pos >= 100) pos -= 100;
  return pos;
}

export function exectuteTurnOperation(
  pos: number,
  line: string,
): { pos: number; zeroTouches: number } {
  let zeroTouches = 0;
  const dir = line[0];
  let dist = Number(line.slice(1));
  if (dir === 'L') dist = -dist;
  pos = pos + dist;
  while (pos < 0) {
    pos += 100;
    zeroTouches++;
  }
  while (pos >= 100) {
    pos -= 100;
    zeroTouches++;
  }
  return { pos, zeroTouches };
}

export function getZeroTouches(pos: number, line: string): number {
  const res = exectuteTurnOperation(pos, line).zeroTouches;
  return pos === 0 ? res - 1 : res;
}

/**
 *  It's 1118
 */
export function solvePart1(input: string) {
  let pos = 50;
  const lines = input.split('\n');
  let counter = 0;
  for (const line of lines) {
    pos = turn(pos, line);
    if (pos === 0) counter++;
  }

  return counter;
}

/**
 *  6357 is too high
 */
export function solvePart2(input: string) {
  let pos = 50;
  const lines = input.split('\n');
  let counter = 0;
  for (const line of lines) {
    const rotationResult = exectuteTurnOperation(pos, line);
    pos = rotationResult.pos;
    counter += rotationResult.zeroTouches;
  }

  return counter;
}
