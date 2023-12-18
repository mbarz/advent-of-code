import { Solver } from './solver';

const DIRECTIONS = ['L', 'R', 'T', 'B'] as const;
type Side = (typeof DIRECTIONS)[number];

const pipes: Record<string, Side[]> = {
  '-': ['L', 'R'],
  '|': ['T', 'B'],
  '┗': ['T', 'R'],
  '┓': ['L', 'B'],
  '┏': ['R', 'B'],
  '┛': ['L', 'T'],
};

export class AdventOfCode2023Day10 extends Solver {
  constructor(suffix?: string) {
    super(10, suffix);
    this.lines = this.lines.map((l) =>
      l
        .replace(/J/g, '┛')
        .replace(/L/g, '┗')
        .replace(/F/g, '┏')
        .replace(/7/g, '┓')
    );
  }

  solvePart1(): number {
    const loop = this.getLoop();

    return Math.floor(loop.length / 2);
  }

  private getCleanedLines() {
    const loop = this.getLoop();
    return this.lines.map((line, row) =>
      line
        .split('')
        .map((char, col) =>
          loop.find((p) => p.col === col && p.row === row)
            ? this.char(row, col)
            : '.'
        )
        .join('')
    );
  }

  getLoop(): { row: number; col: number }[] {
    const startRow = this.lines.findIndex((l) => l.includes('S'))!;
    const startCol = this.lines[startRow].indexOf('S')!;
    let current: { col: number; row: number; from?: Side } = {
      row: startRow,
      col: startCol,
    };
    const loop: { row: number; col: number }[] = [];

    const maxCounter = this.lines.length * this.lines[0].length;
    for (let i = 0; i < maxCounter; ++i) {
      current = this.getNext(current);
      loop.push({ row: current.row, col: current.col });
      if (current.col === startCol && current.row === startRow) {
        return loop;
      }
    }
    return [];
  }

  getNext({ col, row, from }: { col: number; row: number; from?: Side }): {
    row: number;
    col: number;
    from: Side;
  } {
    const pipe = this.pipe(row, col);
    const direction = pipe.find((s) => s != from);
    if (direction == null) throw new Error('Nowhere left to go');
    return this.go({ row, col, direction });
  }

  go({ row, col, direction }: { row: number; col: number; direction: Side }): {
    row: number;
    col: number;
    from: Side;
  } {
    return {
      R: { row, col: col + 1, from: 'L' as Side },
      L: { row, col: col - 1, from: 'R' as Side },
      T: { row: row - 1, col, from: 'B' as Side },
      B: { row: row + 1, col, from: 'T' as Side },
    }[direction];
  }

  pipe(row: number, col: number) {
    const char = this.char(row, col);
    return pipes[char] || [];
  }

  char(row: number, col: number): string {
    const c = this.lines[row]?.[col] || '.';
    if (c === 'S') {
      const dirs = DIRECTIONS.filter((direction) => {
        const next = this.go({ row, col, direction });
        return this.pipe(next.row, next.col).includes(next.from);
      });
      return Object.keys(pipes).find((key) => includesAll(pipes[key], dirs))!;
    }
    return c;
  }

  solvePart2(): number {
    const solved = this.getCleanedLines();

    const expanded: string[] = Array(solved.length * 3).fill('');

    const expandMap: Record<string, string> = {
      '.': '...\n...\n...',
      '|': '.x.\n.x.\n.x.',
      '-': '...\nxxx\n...',
      '┏': '...\n.xx\n.x.',
      '┗': '.x.\n.xx\n...',
      '┓': '...\nxx.\n.x.',
      '┛': '.x.\nxx.\n...',
    };

    solved.forEach((line, row) => {
      line.split('').forEach((char) => {
        const [a, b, c] = expandMap[char].split('\n');
        expanded[row * 3] += a;
        expanded[row * 3 + 1] += b;
        expanded[row * 3 + 2] += c;
      });
    });

    const flooded = flood(
      expanded.map((l) => l.split('')),
      '.',
      'O'
    ).map((l) => l.join(''));

    const shrinked = Array(solved.length).fill('');
    for (let r = 0; r < flooded.length; r += 3) {
      for (let col = 0; col < flooded[0].length; col += 3) {
        const a = flooded[r].slice(col, col + 3);
        const b = flooded[r + 1].slice(col, col + 3);
        const c = flooded[r + 2].slice(col, col + 3);
        const s = [a, b, c].join('');
        shrinked[r / 3] += s.includes('x') ? 'X' : s.includes('O') ? '.' : 'I';
      }
    }
    return shrinked
      .join('')
      .split('')
      .filter((c) => c === 'I').length;
  }
}

function flood(map: string[][], empty: string, fillChar: string): string[][] {
  map[0][0] = fillChar;
  const filled: [number, number][] = [[0, 0]];
  while (filled.length) {
    const [y, x] = filled.pop()!;
    const fillNext: [number, number][] = [
      [y - 1, x] as [number, number],
      [y + 1, x] as [number, number],
      [y, x - 1] as [number, number],
      [y, x + 1] as [number, number],
    ].filter(
      (n) =>
        n[0] >= 0 &&
        n[0] < map.length &&
        n[1] >= 0 &&
        n[1] < map[0].length &&
        map[n[0]][n[1]] === empty
    );
    fillNext.forEach((n) => (map[n[0]][n[1]] = fillChar));
    filled.push(...fillNext);
  }
  return map;
}

function includesAll<T>(a: T[], b: T[]): boolean {
  for (const e of b) {
    if (!a.includes(e)) return false;
  }
  return true;
}
