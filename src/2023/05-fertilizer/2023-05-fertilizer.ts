import { Solver } from '../util/solver';

type Range = {
  start: number;
  size: number;
};

type AlmanachRange = {
  sourceStart: number;
  destinationStart: number;
  range: number;
};

type Almanach = {
  seeds: number[];
  maps: {
    source: string;
    destination: string;
    ranges: AlmanachRange[];
  }[];
};

export class AdventOfCode2023Day05 implements Solver {
  lines: string[];
  almanach: Almanach;

  constructor(input: string) {
    this.lines = input.split('\n');
    this.almanach = this.readAlmanach();
  }

  solvePart1() {
    console.log(`${this.almanach.seeds.length} Seeds to be planted`);
    const locations = this.almanach.seeds.map((seed) =>
      this.map('seed', seed, 'location')
    );
    return Math.min(...locations);
  }

  solvePart2() {
    const seeds = this.almanach.seeds;
    const ranges: Range[] = [];
    for (let i = 0; i < seeds.length; i += 2) {
      ranges.push({ start: seeds[i], size: seeds[i + 1] });
    }
    const all = this.mapRanges('seed', ranges, 'location');
    console.log(all.length);
    // 60294664
    return Math.min(...all.map((r) => r.start));
  }

  private readAlmanach(): Almanach {
    const almanach: Almanach = { maps: [], seeds: [] };

    const mapLineRegex = /(\w+)-to-(\w+) map:/;
    const mappingRegex = /^(\d+)\s(\d+)\s(\d+)$/;

    for (const line of this.lines) {
      if (line.startsWith('seeds')) {
        almanach.seeds = Array.from(line.matchAll(/\d+/g)).map((m) => +m[0]);
      }
      if (line.match(mapLineRegex)) {
        const [, source, destination] = line.match(
          mapLineRegex
        ) as RegExpMatchArray;
        almanach.maps.push({ source, destination, ranges: [] });
      }
      if (line.match(mappingRegex)) {
        const m = line.match(mappingRegex) as RegExpMatchArray;
        almanach.maps[almanach.maps.length - 1].ranges.push({
          destinationStart: +m[1],
          sourceStart: +m[2],
          range: +m[3],
        });
      }
    }
    almanach.maps.forEach((map) => {
      map.ranges.sort((a, b) => a.sourceStart - b.sourceStart);
    });
    return almanach;
  }

  map(source: string, n: number, destination: string): number {
    const map = this.almanach.maps.find((m) => m.source === source);
    if (map == null) throw new Error(`Can not map ${source}`);

    const range = map.ranges.find((r) => rangeIncludes(r, n));
    const mapped = range ? n - range.sourceStart + range.destinationStart : n;
    return map.destination === destination
      ? mapped
      : this.map(map.destination, mapped, destination);
  }

  mapRange(source: string, range: Range, destination: string): Range[] {
    const end = range.start + range.size - 1;
    const { ranges, destination: currentDestination } =
      this.getAllRanges(source);
    let pos = range.start;
    const res: Range[] = [];
    let counter = 0;
    while (pos < range.start + range.size && counter < 10) {
      const current = ranges.find((r) =>
        rangeIncludes(r, pos)
      ) as AlmanachRange;
      const sourceStart = Math.max(pos, current.sourceStart);
      const destinationStart =
        sourceStart + current.destinationStart - current.sourceStart;
      const remaining = current.sourceStart + current.range - sourceStart;
      const step = Math.min(end - pos + 1, remaining);
      res.push({ start: destinationStart, size: step });
      pos += step;
      counter++;
    }
    if (currentDestination === destination) return res;
    else return this.mapRanges(currentDestination, res, destination);
  }

  mapRanges(source: string, ranges: Range[], destination: string): Range[] {
    const all = ranges.map((r) => this.mapRange(source, r, destination));
    return this.joinRanges(all);
  }

  joinRanges(ranges: Range[][]): Range[] {
    return ranges
      .reduce((p, c) => [...p, ...c])
      .sort((a, b) => a.start - b.start)
      .reduce((prev, curr) => {
        const last = prev[prev.length - 1];
        if (last != null && last.start + last.size === curr.start) {
          return [
            ...prev.slice(0, -1),
            { start: last.start, size: last.size + curr.size },
          ];
        }
        return [...prev, curr];
      }, [] as Range[]);
  }

  getAllRanges(source: string): {
    destination: string;
    ranges: AlmanachRange[];
  } {
    const map = this.almanach.maps.find((m) => m.source === source);
    if (map == null) throw new Error(`Can not map ${source}`);

    const copy = [...map.ranges];
    copy.sort((a, b) => a.sourceStart - b.sourceStart);
    let pos = 0;
    const res: AlmanachRange[] = [];
    for (const range of copy) {
      if (pos < range.sourceStart) {
        res.push({
          sourceStart: pos,
          destinationStart: pos,
          range: range.sourceStart,
        });
      }
      res.push(range);
      pos = range.sourceStart + range.range;
    }
    res.push({
      sourceStart: pos,
      destinationStart: pos,
      range: Number.POSITIVE_INFINITY,
    });
    return { destination: map.destination, ranges: res };
  }
}

function rangeIncludes(r: AlmanachRange, n: number) {
  return r.sourceStart <= n && r.sourceStart + r.range - 1 >= n;
}
