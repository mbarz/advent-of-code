export const exampleMapInput = [
  '        ...#    ',
  '        .#..    ',
  '        #...    ',
  '        ....    ',
  '...#.......#    ',
  '........#...    ',
  '..#....#....    ',
  '..........#.    ',
  '        ...#....',
  '        .....#..',
  '        .#......',
  '        ......#.',
  '                ',
  '10R5L5R10L4R5L5 ',
].join('\n');

export type Edge = [string, string];

export const exampleEdges: Edge[] = [
  ['1L', '3U'],
  ['1U', '2U'],
  ['1D', '4U'],
  ['1R', '6R'],
  ['5L', '3D'],
  ['5U', '4D'],
  ['5D', '2D'],
  ['5R', '6L'],
  ['6U', '4R'],
  ['6D', '2L'],
  ['3R', '4L'],
  ['3L', '2R'],
];

export class MonkeyBoard {
  board: string[] = [];
  position: [number, number] = [0, 0];
  instructions: (string | number)[] = [];
  direction = 'R';

  teleports: Map<string, [number, number]> = new Map();

  parse(input: string) {
    const lines = input.split('\n');
    const instructionsString = lines.pop()?.trim() as string;
    this.instructions = (instructionsString.match(/(\d+)|([A-Z])/g) || []).map(
      (s) => (s.match(/\d+/) ? Number(s) : String(s))
    );
    lines.pop();
    this.board = [...lines];
    const x = lines[0].indexOf('.');
    this.position = [x, 0];
    this.direction = 'R';

    this.teleports.clear();
    this.board.forEach((line, y) => {
      const first = line.split('').findIndex((c) => c !== ' ');
      const last =
        line.length -
        line
          .split('')
          .reverse()
          .findIndex((c) => c !== ' ');
      this.teleports.set(['L', first - 1, y].join(','), [last - 1, y]);
      this.teleports.set(['R', last, y].join(','), [first, y]);
    });
    const width = Math.max(...this.board.map((line) => line.length));
    for (let x = 0; x < width; x++) {
      const row = this.board.map((line) => line[x]);
      let first = row.length - 1;
      let last = 0;
      for (let y = 0; y < row.length; y++) {
        if (row[y] != null && row[y] !== ' ') {
          first = Math.min(first, y);
          last = Math.max(last, y);
        }
      }
      this.teleports.set(['U', x, first - 1].join(','), [x, last]);
      this.teleports.set(['D', x, last + 1].join(','), [x, first]);
    }
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
            [x, y] = teleport;
          }
        }
        if (this.board[y][x] === '.') this.position = [x, y];
      }
    } else {
      const moves: Record<string, Record<string, string>> = {
        R: { R: 'D', D: 'L', L: 'U', U: 'R' },
        L: { R: 'U', U: 'L', L: 'D', D: 'R' },
      };
      this.direction = moves[instruction][this.direction];
    }
  }

  drawMap() {
    let lines = [...this.board];
    const emptyLine = Array(lines[0].length).fill(' ').join('');
    lines.push(emptyLine);
    lines.unshift(emptyLine);
    lines = lines.map((l) => ` ${l} `);

    const drawTeleports: string[] = ['D', 'U'];
    if (drawTeleports.length) {
      Array.from(this.teleports.keys())
        .filter((key) => drawTeleports.includes(key.charAt(0)))
        .forEach((key) => {
          const [x, y] = key
            .split(',')
            .slice(1)
            .map((n) => Number(n));
          const chars = lines[y + 1].split('');
          chars[x + 1] = key.charAt(0);
          lines[y + 1] = chars.join('');
        });
    }
    console.log(lines.join('\n'));
  }

  getPassword() {
    while (this.instructions.length) {
      this.executeNextInstruction();
    }
    const [x, y] = this.position;
    const facing = ['R', 'D', 'L', 'U'].indexOf(this.direction);
    return 1000 * (y + 1) + 4 * (x + 1) + facing;
  }
}

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
}

function opp(s: string) {
  if (s === 'L') return 'R';
  if (s === 'R') return 'L';
  if (s === 'U') return 'D';
  if (s === 'D') return 'U';
  return s;
}