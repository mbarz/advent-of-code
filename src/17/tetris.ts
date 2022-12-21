export const TETRIS = {
  shapes: [
    ['####'],
    ['.#.', '###', '.#.'],
    ['..#', '..#', '###'],
    ['#', '#', '#', '#'],
    ['##', '##'],
  ].map((s) => s.join('\n')),
  examplePattern: '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>',
  chamber: {
    width: 7,
  },
  rules: { paddingLeft: 2, paddingBottom: 3 },
};

export type GameState = {
  shapeQueue: string[];
  moveQueue: string[];
  field: string;
};

export function createGame(shapes: string[], moves: string): GameState {
  return {
    field: Array(TETRIS.chamber.width).fill('-').join(''),
    shapeQueue: [...shapes],
    moveQueue: moves.split(''),
  };
}

export class Game {
  state: GameState;

  constructor(shapes: string[], moves: string) {
    this.state = createGame(shapes, moves);
  }

  tick(n = 1) {
    for (let i = 0; i < n; i++) this.state = advanceGame(this.state);
  }
}

export function advanceGame(game: GameState): GameState {
  if (game.field.includes('@')) {
    const [move, ...rest] = game.moveQueue;
    if (move === '>' && canMoveRight(game)) game = moveShapeRight(game);
    if (move === '<' && canMoveLeft(game)) game = moveShapeLeft(game);
    if (canMoveDown(game)) {
      game = moveShapeDown(game);
      game = removeEmptyLinesOnTop(game);
    } else {
      game = { ...game, field: game.field.replace(/@/g, '#') };
    }
    return { ...game, moveQueue: [...rest, move] };
  } else {
    return addNextShapeToGame(game);
  }
}

function removeEmptyLinesOnTop(game: GameState): GameState {
  const lines = game.field.split('\n');
  const emptyLine = Array(TETRIS.chamber.width).fill('.').join('');
  const index = lines.findIndex((ln) => ln !== emptyLine);
  if (index >= 0) {
    lines.splice(0, index);
  }
  return { ...game, field: lines.join('\n') };
}

function canMoveLeft(game: GameState): boolean {
  return (
    game.field.split('\n').find((line) => {
      const index = line.indexOf('@');
      if (index < 0) return false;
      if (index === 0) return true;
      return line.charAt(index - 1) != '.';
    }) == null
  );
}

function canMoveRight(game: GameState): boolean {
  return (
    game.field.split('\n').find((line) => {
      const index = line.lastIndexOf('@');
      if (index < 0) return false;
      if (index >= line.length - 1) return true;
      return line.charAt(index + 1) != '.';
    }) == null
  );
}

function canMoveDown(game: GameState): boolean {
  const lines = game.field.split('\n');

  for (let l = 0; l < lines.length - 1; l++) {
    const currentLine = lines[l];
    const nextLine = lines[l + 1];
    const isBlocked =
      currentLine
        .split('')
        .find(
          (c, index) => c === '@' && !['@', '.'].includes(nextLine[index])
        ) != null;
    if (isBlocked) return false;
  }
  return true;
}

export function moveShapeRight(game: GameState): GameState {
  if (!canMoveRight(game)) return game;
  return {
    ...game,
    field: game.field
      .split('\n')
      .map((line) => {
        const index = line.indexOf('@');
        if (index < 0) {
          return line;
        } else
          return [
            line.substring(0, index),
            '.',
            line.substring(index, line.length - 1),
          ].join('');
      })
      .join('\n'),
  };
}

export function moveShapeDown(game: GameState): GameState {
  const field = game.field
    .split('\n')
    .reverse()
    .map((currentLine, l, arr) => {
      const nextLine = arr[l + 1];
      const res = currentLine
        .split('')
        .map((c, i) => {
          const replaceChar = nextLine ? nextLine.charAt(i) : '.';
          return replaceChar === '@' || c === '@' ? replaceChar : c;
        })
        .join('');
      return res;
    })
    .reverse()
    .join('\n');

  return { ...game, field };
}

export function moveShapeLeft(game: GameState): GameState {
  if (!canMoveLeft(game)) return game;
  return {
    ...game,
    field: game.field
      .split('\n')
      .map((line) => {
        const index = line.indexOf('@');
        const lastIndex = line.lastIndexOf('@');
        if (index < 0) {
          return line;
        } else {
          return [
            line.substring(0, index - 1),
            line.substring(index, lastIndex + 1),
            '.',
            line.substring(lastIndex + 1),
          ].join('');
        }
      })
      .join('\n'),
  };
}

function addNextShapeToGame(game: GameState): GameState {
  const [next, ...rest] = game.shapeQueue;
  return { ...addShapeToGame(game, next), shapeQueue: [...rest, next] };
}

export function addShapeToGame(game: GameState, shape: string) {
  const moving = shape.replace(/#/g, '@');
  const shapeLines = moving
    .split('\n')
    .map((ln) => ('..' + ln).padEnd(TETRIS.chamber.width, '.'));

  const emptyLines = Array(3)
    .fill('')
    .map(() => Array(TETRIS.chamber.width).fill('.').join(''));
  const field = [...shapeLines, ...emptyLines, game.field].join('\n');
  return { ...game, field };
}
