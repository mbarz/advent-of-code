export type DropletMap = Map<string, boolean>;

export type Point3D = [number, number, number];

export class DropletScanner {
  droplets: Point3D[] = [];
  map: DropletMap = new Map();

  scan(input: string): void {
    this.droplets = this.parseDroplets(input);
    this.buildMap(this.droplets);
  }

  private parseDroplets(input: string): Point3D[] {
    return (this.droplets = input
      .split(/\s/)
      .map(
        (line) =>
          line.split(',').map((n) => Number(n)) as [number, number, number]
      ));
  }

  buildMap(droplets: Point3D[]) {
    this.map.clear();
    droplets.forEach((droplet) => this.map.set(droplet.join(','), true));
  }

  getMaxValues(): Point3D {
    let [maxX, maxY, maxZ] = [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ];
    this.droplets.forEach(([x, y, z]) => {
      maxX = Math.max(x, maxX);
      maxY = Math.max(y, maxY);
      maxZ = Math.max(z, maxZ);
    });
    return [maxX, maxY, maxZ];
  }

  build3DModel(): string[][][] {
    const [maxX, maxY, maxZ] = this.getMaxValues();
    const block = Array.from({ length: maxX + 2 }, () =>
      Array.from({ length: maxY + 2 }, () =>
        Array.from({ length: maxZ + 2 }, () => 'A')
      )
    );
    this.droplets.forEach(([x, y, z]) => (block[x][y][z] = 'S'));

    return block;
  }

  dunk3DModelInWater(block: string[][][]): void {
    let newWater: Point3D[] = [[0, 0, 0]];
    block[0][0][0] = 'W';
    while (newWater.length) {
      const source = [...newWater];
      newWater = [];
      const tryToFill = ([x, y, z]: Point3D) => {
        if (x < 0 || y < 0 || z < 0) return;
        if (x >= block.length) return;
        if (y >= block[x].length) return;
        if (z >= block[x][y].length) return;
        if (block[x][y][z] === 'A') {
          block[x][y][z] = 'W';
          newWater.push([x, y, z]);
        }
      };
      source.forEach(([x, y, z]) => {
        tryToFill([x + 1, y, z]);
        tryToFill([x - 1, y, z]);
        tryToFill([x, y + 1, z]);
        tryToFill([x, y - 1, z]);
        tryToFill([x, y, z + 1]);
        tryToFill([x, y, z - 1]);
      });
    }
  }

  isDropletAt(point: Point3D): boolean {
    return this.map.has(point.join(','));
  }

  getDropletSurface(): number {
    if (this.droplets.length < 1) return 0;

    let surface = 0;
    this.droplets.forEach(([x, y, z]) => {
      let s = 6;
      if (this.isDropletAt([x + 1, y, z])) s--;
      if (this.isDropletAt([x - 1, y, z])) s--;
      if (this.isDropletAt([x, y + 1, z])) s--;
      if (this.isDropletAt([x, y - 1, z])) s--;
      if (this.isDropletAt([x, y, z + 1])) s--;
      if (this.isDropletAt([x, y, z - 1])) s--;
      surface += s;
    });
    return surface;
  }

  getExteriorSurface(): number {
    const model = this.build3DModel();
    this.dunk3DModelInWater(model);
    let surface = 0;
    for (let x = 0; x < model.length; ++x) {
      for (let y = 0; y < model[x].length; ++y) {
        for (let z = 0; z < model[x][y].length; ++z) {
          if (model[x][y][z] === 'S') {
            if (model[x + 1][y][z] === 'W') surface++;
            if (model[x - 1][y][z] === 'W') surface++;
            if (model[x][y + 1][z] === 'W') surface++;
            if (model[x][y - 1][z] === 'W') surface++;
            if (model[x][y][z + 1] === 'W') surface++;
            if (model[x][y][z - 1] === 'W') surface++;
          }
        }
      }
    }

    return surface;
  }
}
