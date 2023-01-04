import { Edge } from './monkey-map';

export class MonkeyCube {
  board: string[] = [];
  position: [number, number] = [0, 0];
  instructions: (string | number)[] = [];
  direction = 'R';
  squareSize = 0;
  squares: [number, number][] = [];

  teleports: Map<string, [string, number, number]> = new Map();

  parse(input: string, edges: Edge[]) {
    const lines = input.split('\n');

    const instructionsString = lines.pop()?.trim() as string;
    this.instructions = (instructionsString.match(/(\d+)|([A-Z])/g) || []).map(
      (s) => (s.match(/\d+/) ? Number(s) : String(s))
    );
    lines.pop();

    const characters = lines
      .join('')
      .split('')
      .filter((s) => s !== ' ');
    this.squareSize = Math.sqrt(characters.length / 6);

    this.board = [...lines];
    const x = lines[0].indexOf('.');
    this.position = [x, 0];
    this.direction = 'R';

    const boardWidth = Math.max(...this.board.map((l) => l.length));

    for (let y = 0; y < this.board.length; y += this.squareSize) {
      for (let x = 0; x < boardWidth; x += this.squareSize) {
        if (this.board[y][x]?.trim()) {
          this.squares.push([x, y]);
        }
      }
    }

    edges.forEach((edge) => this.buildTeleports(edge));
  }

  buildTeleports(edge: Edge) {
    const [a, b] = edge
      .sort((a, b) => a.localeCompare(b))
      .map((s) => s.split(''));
    const i1 = Number(a[0]) - 1;
    const i2 = Number(b[0]) - 1;
    const side1 = a[1];
    const side2 = b[1];

    if (side1 === opp(side2) && Math.abs(i1 - i2) <= 3) {
      return;
    }

    this.buildTeleportsFromEdge(
      { square: i1, edge: side1 },
      { square: i2, edge: side2 }
    );
    this.buildTeleportsFromEdge(
      { square: i2, edge: side2 },
      { square: i1, edge: side1 }
    );
  }

  buildTeleportsFromEdge(
    from: { square: number; edge: string },
    to: { square: number; edge: string }
  ) {
    const coords1 = shiftCoords(
      this.calcEdgeCoordinates(this.squares[from.square], from.edge),
      from.edge
    );
    const coords2 = this.calcEdgeCoordinates(
      this.squares[to.square],
      to.edge
    ).reverse();
    this.buildTeleportsFromTo(coords1, from.edge, coords2, opp(to.edge));
  }

  buildTeleportsFromTo(
    from: [number, number][],
    d1: string,
    to: [number, number][],
    d2: string
  ) {
    from.forEach((p1, i) => {
      const p2 = to[i];
      const key = [d1, p1[0], p1[1]].join(',');
      this.teleports.set(key, [d2, p2[0], p2[1]]);
    });
  }

  executeNextInstruction() {
    const instruction = this.instructions.shift();
    if (instruction == null) return;
    if (typeof instruction === 'number') {
      for (let i = 0; i < instruction; ++i) {
        let [x, y] = this.position;
        if (this.direction === 'R') x++;
        if (this.direction === 'L') x--;
        if (this.direction === 'U') y--;
        if (this.direction === 'D') y++;

        const key = [this.direction, x, y].join(',');
        if (this.teleports.has(key)) {
          const teleport = this.teleports.get(key);
          if (teleport != null) {
            [, x, y] = teleport;
            if (this.board[y][x] === '.') {
              this.position = [x, y];
              this.direction = teleport[0];
            }
          }
        } else {
          if (this.board[y][x] === '.') {
            this.position = [x, y];
          }
        }
      }
    } else {
      const moves: Record<string, Record<string, string>> = {
        R: { R: 'D', D: 'L', L: 'U', U: 'R' },
        L: { R: 'U', U: 'L', L: 'D', D: 'R' },
      };
      this.direction = moves[instruction][this.direction];
    }
  }

  getPassword() {
    while (this.instructions.length) {
      this.executeNextInstruction();
    }
    const [x, y] = this.position;
    const facing = ['R', 'D', 'L', 'U'].indexOf(this.direction);
    const password = 1000 * (y + 1) + 4 * (x + 1) + facing;
    return password;
  }

  calcEdgeCoordinates(
    square: [number, number],
    direction: string
  ): [number, number][] {
    const coords = calcEdgeCoordinates(direction, this.squareSize);
    return coords.map(([x, y]) => [square[0] + x, square[1] + y]);
  }
}

export function calcEdgeCoordinates(
  direction: string,
  n: number
): [number, number][] {
  const zero = Array(n).fill(0);

  if (direction === 'U') {
    return zero.map((_n, i) => [i, 0]);
  }
  if (direction === 'D') {
    return zero.map((_n, i) => [n - i - 1, n - 1]);
  }
  if (direction === 'L') {
    return zero.map((_n, i) => [0, n - i - 1]);
  }
  if (direction === 'R') {
    return zero.map((_n, i) => [n - 1, i]);
  }
  throw new Error('invalid direction');
}

function shiftCoords(
  coords: [number, number][],
  d: string
): [number, number][] {
  return coords.map(([x, y]) => {
    if (d === 'L') return [x - 1, y];
    if (d === 'R') return [x + 1, y];
    if (d === 'U') return [x, y - 1];
    if (d === 'D') return [x, y + 1];
    throw new Error('invalid direction');
  });
}

function opp(s: string) {
  if (s === 'L') return 'R';
  if (s === 'R') return 'L';
  if (s === 'U') return 'D';
  if (s === 'D') return 'U';
  throw new Error('invalid direction');
}
