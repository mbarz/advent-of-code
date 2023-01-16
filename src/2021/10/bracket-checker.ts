export type BracketError = {
  type: 'error';
  character: string;
  points: number;
  message: string;
};
export type BracketFix = {
  type: 'fix';
  characters: string;
  points: number;
};

const OPENING = ['(', '[', '{', '<'];
const CLOSING = [')', ']', '}', '>'];
const POINTS = [3, 57, 1197, 25137];

export function checkLine(s: string): BracketError | BracketFix {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s.at(i) as string;
    if (OPENING.includes(c)) {
      stack.push(c);
    }
    if (CLOSING.includes(c)) {
      const opener = stack.pop() as string;
      const closeIndex = CLOSING.indexOf(c);
      const openIndex = OPENING.indexOf(opener);
      const expected = CLOSING[openIndex];
      if (c !== expected) {
        return {
          type: 'error',
          character: c,
          points: POINTS[closeIndex],
          message: `Expected ${expected}, but found ${c} instead`,
        };
      }
    }
  }

  const tail = [...stack].reverse().map((c) => CLOSING[OPENING.indexOf(c)]);
  return {
    type: 'fix',
    characters: tail.join(''),
    points: tail
      .map((c) => CLOSING.indexOf(c) + 1)
      .reduce((p, c) => p * 5 + c, 0),
  };
}

export function getTotalSyntaxErrorScore(lines: string) {
  return lines
    .split('\n')
    .map((line) => checkLine(line))
    .filter((e) => e.type === 'error')
    .map((e) => e.points || 0)
    .reduce((p, c) => p + c, 0);
}

export function getTotalAutoCompleteScore(lines: string) {
  const scores = lines
    .split('\n')
    .map((line) => checkLine(line))
    .filter((e) => e.type === 'fix')
    .map((e) => e.points || 0);
  scores.sort((a, b) => a - b);
  const mid = (scores.length - 1) / 2;
  return scores[mid];
}
