import { Solver } from '../util/solver';

type Direction = 'U' | 'D' | 'L' | 'R';
type Beam = Position & {
  direction: Direction;
};

type Position = {
  row: number;
  col: number;
};

export class AdventOfCode2023Day16 implements Solver {
  beams: Beam[] = [];
  map: string[][] = [];
  energyMap: boolean[][] = [];
  loopIndicators: string[] = [];

  get width() {
    return this.map[0].length;
  }
  get height() {
    return this.map.length;
  }

  get beamKeys() {
    return this.beams.map((b) => this.keyOf(b));
  }

  getField(pos: Position) {
    if (this.isOutside(pos)) return '.';
    return this.map[pos.row][pos.col];
  }

  energize(pos: Position) {
    if (!this.isOutside(pos)) this.energyMap[pos.row][pos.col] = true;
  }

  get energy() {
    return this.energyMap
      .map((l) =>
        l
          .filter((f) => f === true)
          .map(() => '#')
          .join(''),
      )
      .join('').length;
  }

  constructor(public readonly input: string) {
    this.map = input.split('\n').map((l) => l.split(''));
    this.beams = [{ row: 0, col: -1, direction: 'R' }];
    this.clear();
  }

  clear() {
    this.energyMap = this.map.map((l) => Array(l.length).fill(false));
  }

  isOutside({ row, col }: Position) {
    return row < 0 || col < 0 || row > this.height - 1 || col > this.width - 1;
  }

  iterate(steps = 1) {
    const toCreate: Beam[] = [];
    const toDelete: Beam[] = [];
    for (const beam of this.beams) {
      if (beam.direction === 'L') beam.col -= 1;
      if (beam.direction === 'R') beam.col += 1;
      if (beam.direction === 'U') beam.row -= 1;
      if (beam.direction === 'D') beam.row += 1;
      const key = this.keyOf(beam);
      const horizontal = beam.direction === 'L' || beam.direction === 'R';
      const vertical = !horizontal;
      const field = this.getField(beam);
      if (this.loopIndicators.includes(key)) {
        toDelete.push(beam);
        break;
      }
      this.loopIndicators.push(key);
      if (this.isOutside(beam)) {
        toDelete.push(beam);
      } else if (field === '|' && horizontal) {
        beam.direction = 'U';
        toCreate.push({ ...beam, direction: 'D' });
      } else if (field === '-' && vertical) {
        beam.direction = 'L';
        toCreate.push({ ...beam, direction: 'R' });
      } else if (field === '/') {
        if (beam.direction === 'R') beam.direction = 'U';
        else if (beam.direction === 'L') beam.direction = 'D';
        else if (beam.direction === 'U') beam.direction = 'R';
        else if (beam.direction === 'D') beam.direction = 'L';
      } else if (field === '\\') {
        if (beam.direction === 'R') beam.direction = 'D';
        else if (beam.direction === 'L') beam.direction = 'U';
        else if (beam.direction === 'U') beam.direction = 'L';
        else if (beam.direction === 'D') beam.direction = 'R';
      }
    }
    toCreate.forEach((b) => this.beams.push(b));
    this.beams = this.beams.filter((b) => !toDelete.includes(b));
    this.beams.forEach((b) => this.energize(b));
    if (steps > 1) this.iterate(steps - 1);
  }

  private keyOf(beam: Beam) {
    return [beam.row, beam.col, beam.direction, this.getField(beam)].join(';');
  }

  solvePart1(): number {
    let counter = 0;
    while (this.beams.length) {
      if (counter++ > 1000) throw new Error('LOOP TO LONG');
      this.iterate();
    }
    return this.energy;
  }

  solvePart2(): number {
    let max = 0;
    for (let col = 0; col < this.width; ++col) {
      this.loopIndicators = [];
      this.beams = [{ col, row: -1, direction: 'D' }];
      this.clear();
      max = Math.max(max, this.solvePart1());
    }
    for (let col = 0; col < this.width; ++col) {
      this.loopIndicators = [];
      this.beams = [{ col, row: this.height, direction: 'U' }];
      this.clear();
      max = Math.max(max, this.solvePart1());
    }
    for (let row = 0; row < this.height; ++row) {
      this.loopIndicators = [];
      this.beams = [{ col: -1, row, direction: 'R' }];
      this.clear();
      max = Math.max(max, this.solvePart1());
    }
    for (let row = 0; row < this.height; ++row) {
      this.loopIndicators = [];
      this.beams = [{ col: this.width, row, direction: 'L' }];
      this.clear();
      max = Math.max(max, this.solvePart1());
    }
    return max;
  }
}
