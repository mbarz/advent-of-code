import {
  buildBigChitonCave,
  findShortestWayThroughChitonCave,
  parseChitonCave,
} from './chiton';

const exampleCave = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

describe('2021 - Day 15 - Chiton', () => {
  it('should parse chiton cave', () => {
    const cave = parseChitonCave(exampleCave);
    expect(cave).toHaveLength(10);
    expect(cave[0]).toHaveLength(10);
  });

  it('should find shortest way', () => {
    const cave = [
      [1, 3],
      [2, 1],
    ];
    const shortest = findShortestWayThroughChitonCave(cave);
    expect(shortest.risk).toEqual(3);
  });

  it('should find shortest way', () => {
    const cave = parseChitonCave(exampleCave);
    const shortest = findShortestWayThroughChitonCave(cave);
    expect(shortest.risk).toEqual(40);
  });

  it('should build big map', () => {
    const cave = parseChitonCave(exampleCave);
    const big = buildBigChitonCave(cave);
    expect(big[0]).toHaveLength(50);
    expect(big).toHaveLength(50);
    expect(big[0].join('')).toEqual(
      '11637517422274862853338597396444961841755517295286'
    );
    expect(big[49].join('')).toEqual(
      '67554889357866599146897761125791887223681299833479'
    );
  });
});
