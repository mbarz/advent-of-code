export class OctoFlash {
  public flashCount = 0;
  public grid: number[][];
  constructor(grid: number[][]) {
    this.grid = grid.map((row) => row.map((v) => v));
  }

  set([y, x]: [number, number], value: number) {
    this.grid[y][x] = value;
  }
  get([y, x]: [number, number]): number {
    return this.grid[y][x];
  }

  public executeSteps(n: number) {
    Array(n)
      .fill(0)
      .forEach(() => this.step());
  }

  public findSyncStep(): number {
    let c = 0;
    const allFlashed = () => {
      return this.grid.find((row) => row.find((value) => value > 0)) == null;
    };
    while (c++ < 100000 && !allFlashed()) this.step();
    return c - 1;
  }

  public step() {
    this.increaseAll();
    this.flashAll();
  }

  public increaseAll() {
    this.cells().forEach(([y, x, v]) => this.set([y, x], v + 1));
  }

  public flashAll() {
    while (this.grid.find((row) => row.find((n) => n > 9))) {
      this.cells()
        .filter(([, , v]) => v > 9)
        .forEach(([y, x]) => this.flash([y, x]));
    }
  }

  private cells() {
    return this.grid
      .map((row, y) => row.map((value, x) => [y, x, value]))
      .reduce((p, c) => [...p, ...c], []);
  }

  private flash([y, x]: [number, number]) {
    this.set([y, x], 0);
    this.getNeighbors([y, x])
      .filter(([, , v]) => v > 0)
      .forEach(([ny, nx, v]) => this.set([ny, nx], v + 1));
    this.flashCount++;
  }

  private getNeighbors([y, x]: [number, number]): number[][] {
    return getNeighbors(this.grid, y, x).map(([y, x]) => [
      y,
      x,
      this.get([y, x]),
    ]);
  }
}

function getNeighbors(map: number[][], y: number, x: number): number[][] {
  return [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ].filter(([y, x]) => y >= 0 && x >= 0 && y < map.length && x < map[y].length);
}
