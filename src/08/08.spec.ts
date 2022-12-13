import { readFileSync } from 'fs';

const exampleInput = ['30373', '25512', '65332', '33549', '35390'].join('\n');

type TreeMap = number[][];

function parse(input: string): TreeMap {
  return input.split('\n').map((line, index) => {
    const m = line.match(/\d/g);
    if (m == null) throw new Error(`ln ${index} is invalid`);
    return m.map((n) => Number(n));
  });
}

function visibilityMap(map: TreeMap): TreeMap {
  const h = map.length;
  const w = map[0].length;
  const res = Array(h)
    .fill([])
    .map(() => Array(w).fill(0));

  let max = -1;
  for (let r = 0; r < h; ++r) {
    max = -1;
    for (let c = 0; c < w; ++c) {
      const t = map[r][c];
      if (t > max) res[r][c] = 1;
      max = Math.max(max, t);
    }
    max = -1;
    for (let c = w - 1; c >= 0; --c) {
      const t = map[r][c];
      if (t > max) res[r][c] = 1;
      max = Math.max(max, t);
    }
  }

  for (let c = 0; c < w; ++c) {
    max = -1;
    for (let r = 0; r < h; ++r) {
      const t = map[r][c];
      if (t > max) res[r][c] = 1;
      max = Math.max(max, t);
    }
    max = -1;
    for (let r = h - 1; r >= 0; --r) {
      const t = map[r][c];
      if (t > max) res[r][c] = 1;
      max = Math.max(max, t);
    }
  }

  return res;
}

function countVisibleTrees(input: string) {
  const map = parse(input);
  return visibilityMap(map)
    .reduce((a, b) => [...a, ...b], [])
    .filter((v) => !!v).length;
}

function scoreTree(map: TreeMap, tree: { r: number; c: number }): number {
  const row = map[tree.r];
  const col = map.map((r) => r[tree.c]);
  const h = map[tree.r][tree.c];

  function distance(arr: number[]) {
    const index = arr.findIndex((t) => t >= h);
    return index < 0 ? arr.length : index + 1;
  }
  const left = distance(row.slice(0, tree.c).reverse());
  const right = distance(row.slice(tree.c + 1));
  const top = distance(col.slice(0, tree.r).reverse());
  const bottom = distance(col.slice(tree.r + 1));
  return left * right * top * bottom;
}

describe.skip('Day 8', () => {
  it('should parse', () => {
    expect(parse('12\n34')).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('should build visibility matrix', () => {
    const map = parse(exampleInput);
    const vm = visibilityMap(map).map((r) => r.join(''));
    expect(vm[0]).toEqual('11111');
    expect(vm[1]).toEqual('11101');
    expect(vm[2]).toEqual('11011');
    expect(vm[3]).toEqual('10101');
    expect(vm[4]).toEqual('11111');
  });

  it('should count visible trees', () => {
    expect(countVisibleTrees(exampleInput)).toEqual(21);
  });

  it('should count visible trees in file', () => {
    expect(countVisibleTrees(readFile())).toEqual(1816);
  });

  it('should score tree', () => {
    const map = parse(exampleInput);
    expect(scoreTree(map, { r: 1, c: 2 })).toEqual(4);
    expect(scoreTree(map, { r: 3, c: 2 })).toEqual(8);
  });

  it('should score all example trees', () => {
    const map = parse(exampleInput);
    expect(getHighscore(map)).toEqual(8);
  });

  it('should score all example trees in file', () => {
    expect(getHighscore(parse(readFile()))).toEqual(383520);
  });

  function readFile() {
    return readFileSync(__dirname + '/forest.txt', 'utf-8');
  }
});
function getHighscore(map: TreeMap) {
  const allScores = map
    .map((_r, r) => _r.map((_c, c) => scoreTree(map, { r, c })))
    .reduce((a, b) => [...a, ...b], []);
  const higScore = Math.max(...allScores);
  return higScore;
}
