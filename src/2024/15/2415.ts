const DIRS: Record<string, [number, number]> = {
  'v': [1, 0],
  '^': [-1, 0],
  '>': [0, 1],
  '<': [0, -1],
};

export function solvePart1(input: string) {
  const { map, instructions } = parse(input);

  const y = map.findIndex((row) => row.includes('@'));
  const x = map[y].indexOf('@');
  console.log(y, x);
  for (const instruction of instructions) {
    next(map, instruction);
  }

  return score(map);
}

function score(map: string[][]) {
  let score = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const c = map[i][j];
      if (c === 'O') {
        score += 100 * i + j;
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

function moveIfPossible(
  map: string[][],
  e: [number, number],
  d: [number, number],
): boolean {
  const t: [number, number] = [e[0] + d[0], e[1] + d[1]];
  // const ec = map[e[0]][e[1]];
  const tc = map[t[0]][t[1]];

  if (tc === '.') {
    move(map, e, t);
    return true;
  } else if (tc === 'O') {
    const nextMoved = moveIfPossible(map, t, d);
    if (nextMoved) move(map, e, t);
    return nextMoved;
  } else if (d[1] && (tc === '[' || tc === ']')) {
    const nextMoved = moveIfPossible(map, t, d);
    if (nextMoved) move(map, e, t);
    return nextMoved;
  }
  return false;
}

function move(map: string[][], e: [number, number], t: [number, number]) {
  const ec = map[e[0]][e[1]];
  map[e[0]][e[1]] = '.';
  map[t[0]][t[1]] = ec;
}

export function solvePart2(input: string) {
  return input.length;
}
