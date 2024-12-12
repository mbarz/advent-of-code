type PlantArea = {
  type: string;
  area: number;
  sides: number;
  perimeter: number;
};

type Point = { row: number; col: number };
type Direction = 'U' | 'D' | 'L' | 'R';
type Edge = Point & { dir: Direction };

export function solvePart1(input: string) {
  const areas = new Analyzer(input).getAllAreas();
  return areas.reduce((acc, a) => acc + a.area * a.perimeter, 0);
}

export function solvePart2(input: string) {
  const areas = new Analyzer(input).getAllAreas();
  return areas.reduce((acc, a) => acc + a.area * a.sides, 0);
}

export class Analyzer {
  seen: Set<string> = new Set();
  private garden: string[];

  hash(p: Point) {
    return `${this.getPlantAt(p)}:${p.row},${p.col}`;
  }

  hashEdge(e: Edge) {
    return `${e.row},${e.col}:${e.dir}`;
  }

  constructor(input: string) {
    this.garden = input.split('\n').map((ln) => ln.trim());
  }

  getPlantAt(point: Point) {
    return this.garden[point.row]?.[point.col];
  }

  getAllAreas() {
    const areas: PlantArea[] = [];
    const h = this.garden.length;
    const w = this.garden[0].length;
    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        if (this.seen.has(this.hash({ row, col }))) continue;
        areas.push(this.getAreaFromStartPoint({ row, col }));
      }
    }
    return areas;
  }

  getAreaFromStartPoint(start: Point): PlantArea {
    const garden = this.garden;
    const type = this.getPlantAt(start);
    let area = 0;
    let perimeter = 0;
    const queue: { row: number; col: number }[] = [
      { row: start.row, col: start.col },
    ];
    // flood area to get area, perimeter and edges
    const edges = new Set<Edge>();
    for (let i = 0; i < garden.length * garden[0].length; ++i) {
      const current = queue.shift();
      if (current == null) break;
      if (this.seen.has(this.hash(current))) continue;
      area++;
      this.seen.add(this.hash(current));
      const next = neighbors(current);
      for (const n of next) {
        if (this.getPlantAt(n) === type) {
          if (!this.seen.has(this.hash(n))) {
            queue.push(n);
          }
        } else {
          const dir = n.dir;
          edges.add({ ...current, dir });
          perimeter++;
        }
      }
    }

    const eArr = Array.from(edges);
    sortEdges(eArr);

    const sides = eArr.filter(({ row: r, col: c, dir: d }, i) => {
      if (i === 0) return true;
      const { row: pr, col: pc, dir: pd } = eArr[i - 1];
      const dist = Math.abs(c - pc) + Math.abs(r - pr);
      return d !== pd || dist > 1;
    }).length;

    return { type, area, perimeter, sides };
  }
}

function sortEdges(eArr: Edge[]) {
  eArr.sort((a, b) => {
    const sideDiff = a.dir.localeCompare(b.dir);
    if (sideDiff) return sideDiff;
    return a.dir === 'D' || a.dir === 'U'
      ? a.row - b.row || a.col - b.col
      : a.col - b.col || a.row - b.row;
  });
}

function neighbors({ row, col }: Point): (Point & { dir: Direction })[] {
  return [
    { dir: 'U', row: row - 1, col },
    { dir: 'D', row: row + 1, col },
    { dir: 'L', row, col: col - 1 },
    { dir: 'R', row, col: col + 1 },
  ];
}
