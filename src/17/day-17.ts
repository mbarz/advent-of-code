export const SHAPES = [
  [0b1111],
  [0b010, 0b111, 0b010],
  [0b001, 0b001, 0b111],
  [1, 1, 1, 1],
  [0b11, 0b11],
];

export const TETRIS = {
  shapes: [
    ['####'],
    ['.#.', '###', '.#.'],
    ['..#', '..#', '###'],
    ['#', '#', '#', '#'],
    ['##', '##'],
  ].map((s) => s.join('\n')),
  examplePattern: '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>',
};

export type GameState = {
  field: number[];
  shape: number[];
  ground: number;
  placedShapes: number;
};

export function createGame(): GameState {
  return {
    field: [0b1111111],
    shape: [0b0000000],
    ground: 0,
    placedShapes: 0,
  };
}

function buildKey(state: GameState, move: number) {
  return [
    move,
    state.field.join(','),
    state.shape.join(','),
    state.placedShapes % SHAPES.length,
  ].join(';');
}

export class Game {
  state: GameState;
  moves: string[];
  moveIndex = 0;

  states: Map<
    string,
    {
      placed: number;
      ground: number;
    }
  > = new Map();

  constructor(moves: string) {
    this.state = createGame();
    this.moves = moves.split('');
  }

  rotateMoves(): string {
    const move = this.moves[this.moveIndex];
    this.moveIndex++;
    if (this.moveIndex >= this.moves.length) this.moveIndex = 0;
    return move;
  }

  getHeight() {
    const { ground, field: bField } = this.state;
    return ground + bField.length - 1;
  }

  tick(n = 1) {
    for (let i = 0; i < n; i++) {
      const move = this.rotateMoves();
      this.state = advanceGame(this.state, move === '>' ? 1 : -1);
    }
  }

  place(n: number) {
    let forwarded = false;
    const wanted = this.state.placedShapes + n;
    while (this.state.placedShapes < wanted) {
      const key = buildKey(this.state, this.moveIndex);
      if (this.states.has(key) && forwarded === false) {
        const stored = this.states.get(key);
        if (stored != null) {
          const currentlyPlaced = this.state.placedShapes;
          const diffGround = this.state.ground - stored.ground;
          const diffPlaced = currentlyPlaced - stored.placed;
          const iterations = Math.floor(
            (wanted - currentlyPlaced) / diffPlaced
          );
          const updatedGround = this.state.ground + iterations * diffGround;
          const updatedPlaced = currentlyPlaced + iterations * diffPlaced;
          this.state = {
            ...this.state,
            ground: updatedGround,
            placedShapes: updatedPlaced,
          };
          forwarded = true;
        }
      } else {
        this.tick();
        this.states.set(key, {
          ground: this.state.ground,
          placed: this.state.placedShapes,
        });
      }
    }
  }
}

export function advanceGame(game: GameState, move: number): GameState {
  if (game.shape.find((ln) => ln !== 0) == null) {
    game = addNextShapeToGame(game);
  }
  if (move === 1 && canMoveRight(game)) game = moveShapeRight(game);
  if (move === -1 && canMoveLeft(game)) game = moveShapeLeft(game);
  if (canMoveDown(game)) {
    game = moveShapeDown(game);
  } else {
    game = placeShape(game);
  }
  game = removeEmptyLinesOnTop(game);
  game = cutGround(game);
  return game;
}

export function cutGround(game: GameState): GameState {
  const lineIndex = findGround(game);
  if (lineIndex === game.field.length - 1) return game;
  else {
    const ground = (game.ground += game.field.length - lineIndex - 1);
    return {
      ...game,
      ground: ground,
      shape: game.shape.slice(0, lineIndex + 1),
      field: game.field.slice(0, lineIndex + 1),
    };
  }
}

function placeShape(game: GameState): GameState {
  const bField = game.field.map((n, i) => n | game.shape[i]);
  const bShape = game.shape.map(() => 0);
  return {
    ...game,
    field: bField,
    shape: bShape,
    placedShapes: game.placedShapes + 1,
  };
}

function removeEmptyLinesOnTop(game: GameState): GameState {
  const bShape = [...game.shape];
  const bField = [...game.field];
  const index = game.shape.findIndex((ln, i) => (ln | game.field[i]) !== 0);
  if (index >= 0) {
    bShape.splice(0, index);
    bField.splice(0, index);
  }
  return { ...game, field: bField, shape: bShape };
}

function canMoveLeft(game: GameState): boolean {
  const shape = game.shape.map((ln) => ln << 1);
  const field = game.field;
  if (shape.find((ln) => ln > 127)) return false;
  for (let i = 0; i < shape.length; i++) {
    if ((shape[i] & field[i]) !== 0) return false;
  }
  return true;
}

function canMoveRight(game: GameState): boolean {
  if (game.shape.find((ln) => ln & 1)) return false;
  const shape = game.shape.map((ln) => ln >> 1);
  const field = game.field;
  for (let i = 0; i < shape.length; i++) {
    if ((shape[i] & field[i]) !== 0) return false;
  }
  return true;
}

function canMoveDown(game: GameState): boolean {
  const bShape = [...game.shape];
  bShape.pop();
  bShape.unshift(0);
  for (let i = 0; i < bShape.length; i++) {
    if ((bShape[i] & game.field[i]) !== 0) return false;
  }
  return true;
}

export function moveShapeRight(game: GameState): GameState {
  if (!canMoveRight(game)) return game;

  const bShape = game.shape.map((ln) => ln >> 1);

  return { ...game, shape: bShape };
}

export function moveShapeDown(game: GameState): GameState {
  const bShape = [...game.shape];
  bShape.pop();
  bShape.unshift(0);

  return { ...game, shape: bShape };
}

export function moveShapeLeft(game: GameState): GameState {
  const bShape = game.shape.map((ln) => ln << 1);

  if (!canMoveLeft(game)) return game;
  return {
    ...game,
    shape: bShape,
  };
}

function addNextShapeToGame(game: GameState): GameState {
  const shape = SHAPES[game.placedShapes % SHAPES.length];
  const shift = 5 - Math.max(...shape.map((n) => n.toString(2).length));
  const shifted = shape.map((n) => n << shift);
  const bShape = [...shifted, 0, 0, 0, ...game.field.map(() => 0)];
  const bField = [...Array(shape.length + 3).fill(0), ...game.field];
  return { ...game, field: bField, shape: bShape };
}

export function findGround(game: GameState): number {
  let row = 0;
  const lines = [...game.field];
  for (let i = 0; i < lines.length - 3; i++) {
    row = lines[i] | lines[i + 1] | lines[i + 2];
    if (row === 127) {
      return i + 2;
    }
  }
  return game.field.length - 1;
}

export function drawGame(game: GameState): string {
  const height = game.field.length;
  const lines: string[] = [];
  for (let r = 0; r < height; r++) {
    let line = '';
    for (let c = 0; c < 7; c++) {
      let char = '.';
      if (game.field[r] & (1 << c)) char = '#';
      if (game.shape[r] & (1 << c)) char = '@';
      line = char + line;
    }
    const h = game.ground + height - r - 1;
    lines.push(`${String(h).padStart(2, '0')}: ${line}`);
  }

  return lines.join('\n');
}
