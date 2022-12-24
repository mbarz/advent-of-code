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
    function buildEdge(
      offset: [number, number],
      side: string,
      size: number
    ): [number, number][] {
      const res: [number, number][] = [];
      for (let i = 0; i < size; i++) {
        let [x, y] = offset;
        if (side === 'D') y += size - 1;
        if (side === 'R') x += size - 1;
        if (side === 'L' || side === 'R') y += i;
        if (side === 'U' || side === 'D') x += i;
        res.push([x, y]);
      }
      if (side === 'R' || side === 'D') res.reverse();
      return res;
    }

    const [a, b] = edge
      .sort((a, b) => a.localeCompare(b))
      .map((s) => s.split(''));
    const square1 = this.squares[Number(a[0]) - 1];
    const square2 = this.squares[Number(b[0]) - 1];
    const side1 = a[1];
    const side2 = b[1];

    if (side1 === opp(side2) && Math.abs(Number(a[0]) - Number(b[0])) <= 3) {
      return;
    }

    const edge1 = buildEdge(square1, side1, this.squareSize);
    const edge2 = buildEdge(square2, side2, this.squareSize);

    if (side1 === side2) edge2.reverse();

    edge1.forEach((p, i) => {
      let [x, y] = p;
      if (side1 === 'L') x--;
      if (side1 === 'R') x++;
      if (side1 === 'U') y--;
      if (side1 === 'D') y++;

      const key = [side1, x, y].join(',');
      this.teleports.set(key, [opp(side2), edge2[i][0], edge2[i][1]]);
    });

    edge2.forEach((p, i) => {
      let [x, y] = p;
      if (side2 === 'L') x--;
      if (side2 === 'R') x++;
      if (side2 === 'U') y--;
      if (side2 === 'D') y++;

      const key = [side2, x, y].join(',');
      this.teleports.set(key, [opp(side1), edge1[i][0], edge1[i][1]]);
    });
  }

  executeNextInstruction() {
    const instruction = this.instructions.shift();
    console.log(instruction);
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
              console.log(
                `teleport to ${x},${y} and rotate to ${this.direction}`
              );
            }
          }
        } else {
          if (this.board[y][x] === '.') {
            this.position = [x, y];
            console.log(`go to ${x},${y}`);
          }
        }
      }
    } else {
      const moves: Record<string, Record<string, string>> = {
        R: { R: 'D', D: 'L', L: 'U', U: 'R' },
        L: { R: 'U', U: 'L', L: 'D', D: 'R' },
      };
      this.direction = moves[instruction][this.direction];
      console.log(`rotate to ${this.direction}`);
    }
  }

  getPassword() {
    while (this.instructions.length) {
      this.executeNextInstruction();
    }
    const [x, y] = this.position;
    console.log(x, y, this.direction);
    const facing = ['R', 'D', 'L', 'U'].indexOf(this.direction);
    const password = 1000 * (y + 1) + 4 * (x + 1) + facing;
    console.log(`1000 * ${y + 1} + 4 * ${x + 1} + ${facing} = ${password}`);
    return password;
  }

  drawTeleporterMap(direction: string) {
    let lines = [...this.board];

    this.squares.forEach((sq, si) => {
      for (let y = sq[1]; y < sq[1] + this.squareSize; ++y) {
        for (let x = sq[0]; x < sq[0] + this.squareSize; ++x) {
          const line = lines[y].split('');
          line[x] = String(si + 1);
          lines[y] = line.join('');
        }
      }
    });

    const emptyLine = Array(lines[0].length).fill(' ').join('');
    lines.push(emptyLine);
    lines.unshift(emptyLine);
    lines = lines.map((l) => ` ${l} `);

    const map = lines.map((line) => line.split(''));

    Array.from(this.teleports.keys())
      .filter((key) => key.charAt(0) === direction)
      .forEach((key, i) => {
        const [x, y] = key
          .split(',')
          .slice(1)
          .map((n) => Number(n));
        const [, x2, y2] = this.teleports.get(key) as any;

        map[y + 1][x + 1] = String.fromCharCode(65 + i);
        map[y2 + 1][x2 + 1] = String.fromCharCode(65 + i);
      });
    console.log(map.map((line) => line.join('')).join('\n'));
  }

  drawTeleporters() {
    let lines = [...this.board];

    this.squares.forEach((sq, si) => {
      for (let y = sq[1]; y < sq[1] + this.squareSize; ++y) {
        for (let x = sq[0]; x < sq[0] + this.squareSize; ++x) {
          const line = lines[y].split('');
          line[x] = String(si + 1);
          lines[y] = line.join('');
        }
      }
    });

    const emptyLine = Array(lines[0].length).fill(' ').join('');
    lines.push(emptyLine);
    lines.unshift(emptyLine);
    lines = lines.map((l) => ` ${l} `);

    const map = lines.map((line) => line.split(''));

    Array.from(this.teleports.keys()).forEach((key, i) => {
      const [x, y] = key
        .split(',')
        .slice(1)
        .map((n) => Number(n));
      const [, x2, y2] = this.teleports.get(key) as any;

      map[y + 1][x + 1] = 'o';
      map[y2 + 1][x2 + 1] = 'x';
    });
    console.log(map.map((line) => line.join('')).join('\n'));
  }

  calcEdgeCoordinates(square: [number, number], direction: string) {
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

  return [];
}

function opp(s: string) {
  if (s === 'L') return 'R';
  if (s === 'R') return 'L';
  if (s === 'U') return 'D';
  if (s === 'D') return 'U';
  return s;
}
