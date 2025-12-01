export function turn(props: {
  currentPos: number;
  line: string;
  onZeroTouch?: () => void;
}): number {
  const { currentPos, line, onZeroTouch } = props;
  let pos = currentPos;
  const dir = line.startsWith('R') ? 1 : -1;
  const dist = Number(line.slice(1));
  for (let i = 0; i < dist; ++i) {
    pos += dir;
    if (pos < 0) pos = 99;
    if (pos > 99) pos = 0;
    if (pos === 0 && onZeroTouch) onZeroTouch();
  }
  return pos;
}

export function getZeroTouches(pos: number, line: string): number {
  let counter = 0;
  turn({ currentPos: pos, line, onZeroTouch: () => counter++ });
  return counter;
}

/**
 *  It's 1118
 */
export function solvePart1(input: string) {
  let pos = 50;
  const lines = input.split('\n');
  let counter = 0;
  for (const line of lines) {
    pos = turn({ currentPos: pos, line });
    if (pos === 0) counter++;
  }

  return counter;
}

/**
 *  It's 6289
 */
export function solvePart2(input: string) {
  let pos = 50;
  const lines = input.split('\n');
  let counter = 0;
  for (const line of lines) {
    pos = turn({ currentPos: pos, line, onZeroTouch: () => counter++ });
  }

  return counter;
}
