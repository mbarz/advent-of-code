class Point {
  y: number;
  x: number;

  constructor(coords: { y: number; x: number }) {
    this.y = coords.y;
    this.x = coords.x;
  }

  hash() {
    return `${this.y},${this.x}`;
  }
  copy() {
    return new Point({ y: this.y, x: this.x });
  }
  mov(d: { y?: number; x?: number }) {
    return new Point({ y: this.y + (d.y ?? 0), x: this.x + (d.x ?? 0) });
  }
  equals(p: Point) {
    return this.y === p.y && this.x === p.x;
  }
  distance(p: Point) {
    return Math.abs(this.y - p.y) + Math.abs(this.x - p.x);
  }
}

type Cheat = {
  from: Point;
  to: Point;
  diff: number;
};

export class Day2420 {
  maze: string[][] = [];
  height = 0;
  width = 0;
  start = new Point({ y: 0, x: 0 });
  end = new Point({ y: 0, x: 0 });
  cache = new Map<string, number>();
  cheats: Cheat[] = [];

  constructor(
    input: string,
    public cheatLength = 2,
  ) {
    this.analyze(input);
  }

  analyze(input: string) {
    this.parseInput(input);

    let pos = this.start.copy();

    let counter = 0;
    this.cache.set(pos.hash(), counter);
    const path: Point[] = [];
    while (counter++ < 100000) {
      path.push(pos);
      if (pos.equals(this.end)) {
        break;
      }
      pos = this.next(pos);
      this.cache.set(pos.hash(), counter);
    }

    for (let i = 0; i < path.length; ++i) {
      pos = path[i];
      this.cheats.push(...this.cheatOptions(pos));
    }
  }

  private next(p: Point): Point {
    const options = [
      p.mov({ y: 1 }),
      p.mov({ y: -1 }),
      p.mov({ x: 1 }),
      p.mov({ x: -1 }),
    ].filter((o) => this.at(o) !== '#' && !this.cache.has(o.hash()));
    if (options.length < 1) {
      throw new Error('not possible');
    }
    if (options.length > 1) {
      throw new Error('Multiple options @' + p.hash());
    }

    return options[0];
  }

  private cheatOptions(p: Point): Cheat[] {
    const currentScore = this.cache.get(p.hash()) ?? 0;

    const options: Point[] = [];
    for (let dy = -this.cheatLength; dy <= this.cheatLength; ++dy) {
      for (let dx = -this.cheatLength; dx <= this.cheatLength; ++dx) {
        const dist = Math.abs(dy) + Math.abs(dx);
        if (dist > 1 && dist <= this.cheatLength) {
          const o = p.mov({ y: dy, x: dx });
          if (this.contains(o) && this.at(o) !== '#') {
            options.push(o);
          }
        }
      }
    }

    return options
      .map((o) => {
        const score = this.cache.get(o.hash()) ?? 0;
        const dist = o.distance(p);
        return { from: p, to: o, diff: score - (currentScore + dist) };
      })
      .filter((o) => o.diff > 0);
  }

  private contains({ y, x }: Point) {
    return y >= 0 && y < this.height && x >= 0 && x < this.width;
  }

  private at(p: Point) {
    return this.maze[p.y][p.x];
  }

  private parseInput(input: string) {
    this.maze = input.split('\n').map((l) => l.trim().split(''));
    this.height = this.maze.length;
    this.width = this.maze[0].length;
    const startIndex = input.indexOf('S');
    this.start = new Point({
      x: startIndex % (this.width + 1),
      y: Math.floor(startIndex / this.width),
    });
    const endIndex = input.indexOf('E');
    this.end = new Point({
      x: endIndex % (this.width + 1),
      y: Math.floor(endIndex / this.width),
    });
  }
}

export function solvePart1(input: string, min = 100) {
  const d = new Day2420(input);
  return d.cheats.filter((c) => c.diff >= min).length;
}

export function solvePart2(input: string, min = 100) {
  const d = new Day2420(input, 20);
  return d.cheats.filter((c) => c.diff >= min).length;
}
