const DIRS: Record<string, [number, number]> = {
  'v': [1, 0],
  '^': [-1, 0],
  '>': [0, 1],
  '<': [0, -1],
};

export function solvePart1(input: string) {
  const { map, instructions } = parse(input);
  for (const instruction of instructions) {
    next(map, instruction);
  }
  return score(map);
}

export function solvePart2(input: string) {
  const { map, instructions } = parse(input);
  const expanded = expand(map);
  for (const instruction of instructions) {
    next(expanded, instruction);
  }
  return score(expanded);
}

function score(map: string[][]) {
  let score = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const c = map[y][x];
      if (c === 'O' || c === '[') {
        score += 100 * y + x;
      }
    }
  }
  return score;
}

export function parse(input: string) {
  const blank = input.indexOf('\n\n');
  const map = input
    .slice(0, blank)
    .split('\n')
    .map((l) => l.split(''));
  const instructions = input
    .slice(blank + 2)
    .replace(/\n\s*/g, '')
    .split('');
  return { map, instructions };
}

export function expand(map: string[][]): string[][] {
  return map.map((l) =>
    l
      .join('')
      .replace(/\./g, '..')
      .replace(/O/g, '[]')
      .replace(/#/g, '##')
      .replace('@', '@.')
      .split(''),
  );
}

export function next(map: string[][], instruction: string) {
  const y = map.findIndex((row) => row.includes('@'));
  const x = map[y].indexOf('@');
  const d = DIRS[instruction];
  moveIfPossible(map, [y, x], d);
}

export function moveIfPossible(
  map: string[][],
  e: [number, number],
  d: [number, number],
): boolean {
  const t: [number, number] = [e[0] + d[0], e[1] + d[1]];
  const tc = map[t[0]][t[1]];

  if (tc === '.') {
    move(map, e, t);
    return true;
  } else if (tc === 'O' || ((tc === ']' || tc === '[') && !d[0])) {
    const nextMoved = moveIfPossible(map, t, d);
    if (nextMoved) move(map, e, t);
    return nextMoved;
  } else if (d[0] && (tc === '[' || tc === ']')) {
    const t2: [number, number] =
      tc === '[' ? [t[0], t[1] + 1] : [t[0], t[1] - 1];

    if (canMove(map, t, d) && canMove(map, t2, d)) {
      moveIfPossible(map, t, d);
      moveIfPossible(map, t2, d);
      move(map, e, t);
      return true;
    }
  }
  return false;
}

export function canMove(
  map: string[][],
  e: [number, number],
  d: [number, number],
): boolean {
  const t1: [number, number] = [e[0] + d[0], e[1] + d[1]];
  const tc1 = map[t1[0]][t1[1]];
  if (tc1 === '#') return false;
  if (tc1 === '.') return true;
  if (tc1 === '0' || !d[0]) return canMove(map, t1, d);

  const t2: [number, number] = [...t1];
  t2[1] += tc1 === '[' ? 1 : -1;
  return canMove(map, t1, d) && canMove(map, t2, d);
}

function move(map: string[][], e: [number, number], t: [number, number]) {
  const ec = map[e[0]][e[1]];
  map[e[0]][e[1]] = '.';
  map[t[0]][t[1]] = ec;
}
