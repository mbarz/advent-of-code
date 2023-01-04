type Point2D = { x: number; y: number };
type Elf = Point2D;

const defaultOrder = ['N', 'S', 'W', 'E'];

export class ElfSpreader {
  elves: Elf[] = [];

  order = [...defaultOrder];

  constructor(input: string) {
    this.elves = parseElves(input);
  }

  spreadElves(times = 10000): number {
    for (let i = 0; i < times; i++) {
      const moves = this.getMoves();
      if (moves.length < 1) return i + 1;
      moves.forEach((move) => {
        const elf = this.elves.find((e) => equals(e, move.from));
        if (elf) {
          elf.x = move.to.x;
          elf.y = move.to.y;
        }
      });
      rol(this.order);
    }
    return times;
  }

  getMoves(): ElfMoveProposal[] {
    return filterProposals(this.getProposals());
  }

  getProposals(): ElfMoveProposal[] {
    const proposals: { from: Point2D; to: Point2D }[] = [];
    this.elves.forEach((elf) => {
      const p = this.getProposal(elf);
      if (p != null) proposals.push(p);
    });
    return proposals;
  }

  getProposal(elf: Elf): ElfMoveProposal | undefined {
    const map: Record<string, Point2D[]> = {
      N: [NW, N, NE],
      E: [NE, E, SE],
      S: [SW, S, SE],
      W: [SW, W, NW],
    };

    const checkedMap: Record<string, boolean[]> = {
      N: [NW, N, NE].map((d) => this.isElfInDirection(elf, d)),
      E: [NE, E, SE].map((d) => this.isElfInDirection(elf, d)),
      S: [SW, S, SE].map((d) => this.isElfInDirection(elf, d)),
      W: [SW, W, NW].map((d) => this.isElfInDirection(elf, d)),
    };

    const all = Object.values(checkedMap).reduce((p, c) => [...p, ...c], []);
    const free = !all.includes(true);
    if (free) return undefined;

    for (const d of this.order) {
      const directions = map[d];
      const noElf =
        directions.find((d) => this.isElfInDirection(elf, d)) == null;
      if (noElf) return { from: elf, to: add(elf, directions[1]) };
    }
    return undefined;
  }

  isElfInDirection(current: Point2D, direction: Point2D): boolean {
    const target = add(current, direction);
    return this.elves.find((e) => equals(e, target)) != null;
  }

  calcEmptyTilesBetweenElves() {
    const minX = Math.min(...this.elves.map((e) => e.x));
    const maxX = Math.max(...this.elves.map((e) => e.x));
    const minY = Math.min(...this.elves.map((e) => e.y));
    const maxY = Math.max(...this.elves.map((e) => e.y));

    const h = maxY - minY + 1;
    const w = maxX - minX + 1;
    const tiles = h * w;

    return tiles - this.elves.length;
  }
}

function parseElves(input: string): Elf[] {
  return input
    .split('\n')
    .map((line, ln) => {
      return line
        .split('')
        .map((char, col) => ({ char, ln, col }))
        .filter(({ char }) => char === '#')
        .map(({ ln, col }) => ({ x: col, y: ln }));
    })
    .reduce((a, b) => [...a, ...b], []);
}

const [NW, N, NE, E, SE, S, SW, W] = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
];

function add(a: Point2D, b: Point2D): Point2D {
  return { x: a.x + b.x, y: a.y + b.y };
}
function equals(a: Point2D, b: Point2D): boolean {
  return a.x === b.x && a.y === b.y;
}

type ElfMoveProposal = {
  from: Point2D;
  to: Point2D;
};

function filterProposals(proposals: ElfMoveProposal[]): ElfMoveProposal[] {
  const countMap = new Map<string, number>();
  proposals.forEach((p) => {
    const key = [p.to.x, p.to.y].join(',');
    countMap.set(key, (countMap.get(key) || 0) + 1);
  });

  return proposals.filter((p) => {
    const key = [p.to.x, p.to.y].join(',');
    return countMap.get(key) === 1;
  });
}

function rol<T>(arr: T[]) {
  const item = arr.shift();
  if (item != null) arr.push(item);
}

export function createElvesMap(
  elves: Elf[],
  opts: { minX: number; minY: number; maxX: number; maxY: number } = {
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  }
) {
  const minX = Math.min(...elves.map((e) => e.x), opts.minX);
  const maxX = Math.max(...elves.map((e) => e.x), opts.maxX);
  const minY = Math.min(...elves.map((e) => e.y), opts.minY);
  const maxY = Math.max(...elves.map((e) => e.y), opts.maxY);

  const map = Array(maxY - minY + 1)
    .fill([])
    .map(() => Array(maxX - minX + 1).fill('.'));

  elves.forEach((e) => (map[e.y - minY][e.x - minX] = '#'));

  return map.map((ln) => ln.join('')).join('\n');
}
