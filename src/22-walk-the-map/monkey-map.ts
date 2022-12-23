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
