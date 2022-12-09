type Point = {
  x: number;
  y: number;
};

type State = {
  head: Point;
  tail: Point;
  visitedByTail: Point[];
};

export function state(initial: Partial<State> = {}): State {
  const start = { x: 0, y: 0 };
  const head = initial.head || start;
  const tail = initial.tail || start;
  const visitedByTail = initial.visitedByTail || [tail];
  return { head, tail, visitedByTail };
}

type Direction = 'U' | 'D' | 'L' | 'R';

export function moveMultiple(state: State, directions: Direction[]) {
  return directions.reduce((state, direction) => move(state, direction), state);
}

export function move(state: State, direction: Direction): State {
  const head = movePoint(state.head, direction);
  const tail = moveTail(state.tail, head);
  const visitedByTail = state.visitedByTail;
  if (!visitedByTail.find((v) => v.x === tail.x && v.y === tail.y)) {
    visitedByTail.push(tail);
  }
  return { head, tail, visitedByTail };
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

export function moveTail(tail: Readonly<Point>, head: Readonly<Point>): Point {
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
