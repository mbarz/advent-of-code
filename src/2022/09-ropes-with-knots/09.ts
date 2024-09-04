import { Logger } from '../../util/logger';

type Point = {
  x: number;
  y: number;
};

type State = {
  start: Point;
  head: Point;
  knots: Point[];
  visitedByTail: Point[];
};

const logger = new Logger('', 'warn');

export function state(
  opts: {
    start?: Point;
    knotCount?: number;
  } = {},
): State {
  const { start = { x: 0, y: 0 }, knotCount = 2 } = opts;
  const head = start;
  const knots = Array(knotCount - 1).fill(start);
  const visitedByTail = [knots[knots.length - 1]];
  return { start, head, knots, visitedByTail };
}

type Direction = 'U' | 'D' | 'L' | 'R';

export function moveMultiple(state: State, directions: Direction[]) {
  return directions.reduce((state, direction) => move(state, direction), state);
}

export function move(state: State, direction: Direction): State {
  const head = movePoint(state.head, direction);
  let prev = head;
  const knots = state.knots.map((current) => {
    prev = moveKnot(current, prev);
    return prev;
  });
  const tail = knots[knots.length - 1];
  const visitedByTail = state.visitedByTail;
  if (!visitedByTail.find((v) => v.x === tail.x && v.y === tail.y)) {
    visitedByTail.push(tail);
  }
  return { ...state, head, knots, visitedByTail };
}

export function movePoint(p: Point, direction: Direction): Point {
  let x = p.x;
  let y = p.y;
  if (direction === 'U') y++;
  if (direction === 'D') y--;
  if (direction === 'R') x++;
  if (direction === 'L') x--;
  return { x, y };
}

export function moveKnot(tail: Readonly<Point>, head: Readonly<Point>): Point {
  const yDiff = head.y - tail.y;
  const xDiff = head.x - tail.x;
  const xDir = xDiff > 0 ? 1 : -1;
  const yDir = yDiff > 0 ? 1 : -1;
  const axDiff = Math.abs(xDiff);
  const ayDiff = Math.abs(yDiff);
  if (axDiff < 2 && ayDiff < 2) return { ...tail };
  return {
    x: tail.x + (axDiff >= 2 ? xDir : xDiff),
    y: tail.y + (ayDiff >= 2 ? yDir : yDiff),
  };
}

export function parseInstructions(input: string): Direction[] {
  const instructions: Direction[] = [];

  input.split('\n').forEach((line) => {
    const direction = line.substring(0, 1) as Direction;
    const count = Number(line.substring(2));
    for (let i = 0; i < count; ++i) {
      instructions.push(direction);
    }
  });
  return instructions;
}

export function paintState(state: State, [w, h]: [number, number]) {
  const map = Array(h)
    .fill([])
    .map(() => Array(w).fill('.'));

  const knots = [...state.knots].reverse();
  knots.forEach((k, i) => {
    map[k.y][k.x] = `${knots.length - i}`;
  });
  map[state.start.y][state.start.x] = 's';
  map[state.head.y][state.head.x] = 'H';
  logger.log(
    map
      .map((line) => line.join(''))
      .reverse()
      .join('\n'),
  );
}

export function paintVisitedByTail(state: State) {
  const maxX = Math.max(...state.visitedByTail.map((v) => v.x));
  const minX = Math.min(...state.visitedByTail.map((v) => v.x));
  const maxY = Math.max(...state.visitedByTail.map((v) => v.y));
  const minY = Math.min(...state.visitedByTail.map((v) => v.y));

  const h = maxY - minY + 1;
  const w = maxX - minX + 1;

  const map = Array(h)
    .fill([])
    .map(() => Array(w).fill('.'));

  function paintPoint(p: Point, char: string) {
    map[p.y - minY][p.x - minX] = char;
  }

  state.visitedByTail.forEach((p) => paintPoint(p, '#'));
  logger.log(
    map
      .map((line) => line.join(''))
      .reverse()
      .join('\n'),
  );
}
