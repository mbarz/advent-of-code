const out = process.stdout;

const TIMEOUT = 100;
const ALIVE = '#';
const DEAD = '.';
const RANDOM = true;
const TORUS = true;

const w = out.columns;
const h = out.rows;

let game = Array(h - 1)
  .fill(0)
  .map(() => Array(w).fill(false));

const wm = Math.floor(w / 2);
const hm = Math.floor(h / 2);
placePentomino(wm, hm);

if (RANDOM) randomize(game);

function placeGlider(x: number, y: number) {
  game[y - 1][x] = true;
  game[y][x + 1] = true;
  game[y + 1][x - 1] = true;
  game[y + 1][x] = true;
  game[y + 1][x + 1] = true;
}

function placePentomino(x: number, y: number) {
  game[y - 1][x] = true;
  game[y - 1][x + 1] = true;
  game[y][x - 1] = true;
  game[y][x] = true;
  game[y + 1][x] = true;
}

function randomize(game: boolean[][]) {
  for (let y = 0; y < game.length; y++)
    for (let x = 0; x < game[y].length; x++) game[y][x] = Math.random() > 0.7;
}

const interval = setInterval(() => {
  drawGol(game);
  const before = game;
  game = iterateGol(game);
  if (isSameGol(before, game)) clearInterval(interval);
}, TIMEOUT);

function isSameGol(a: boolean[][], b: boolean[][]) {
  return (
    a.map((r) => r.join('')).join('') === b.map((r) => r.join('')).join('')
  );
}

let drawCache: boolean[][] | undefined;
function drawGol(game: boolean[][]) {
  for (let y = 0; y < game.length; y++) {
    const row = game[y];
    for (let x = 0; x < row.length; x++) {
      const alive = game[y][x];
      if (drawCache == null || alive != drawCache[y][x]) {
        out.cursorTo(x, y + 1);
        out.write(alive ? ALIVE : DEAD);
      }
    }
  }
  drawCache = game;
  out.cursorTo(0, 0);
}

function iterateGol(game: boolean[][]) {
  const clone = game.map((row) => [...row]);
  for (let y = 0; y < game.length; y++) {
    const row = game[y];
    for (let x = 0; x < row.length; x++) {
      const n = neighbors(game, [x, y]);
      if (game[y][x]) {
        clone[y][x] = n === 2 || n === 3;
      } else {
        clone[y][x] = n === 3;
      }
    }
  }
  return clone;
}

function neighbors(game: boolean[][], pos: number[]) {
  return [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
    .map(([x, y]) => [pos[0] + x, pos[1] + y])
    .map(([x, y]) => {
      if (!TORUS) return [x, y];
      return [
        x < 0 ? game[0].length - 1 : x >= game[0].length ? 0 : x,
        y < 0 ? game.length - 1 : y >= game.length ? 0 : y,
      ];
    })
    .filter(
      ([x, y]) => x >= 0 && y >= 0 && x < game[0].length && y < game.length
    )
    .map(([x, y]) => game[y][x])
    .filter((b) => !!b).length;
}
