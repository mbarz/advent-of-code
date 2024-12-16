import { Position, rol, ror, solve, solvePart1, solvePart2 } from './2416';

const e1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const e2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

describe('2024 Day 16', () => {
  it('should rotate', () => {
    const pos: Position = { x: 0, y: 0, d: 'E' };
    expect(rol(pos).d).toEqual('N');
    expect(rol(rol(pos)).d).toEqual('W');
    expect(rol(rol(rol(pos))).d).toEqual('S');
    expect(rol(rol(rol(rol(pos)))).d).toEqual('E');
    expect(ror(pos).d).toEqual('S');
    expect(ror(ror(pos)).d).toEqual('W');
    expect(ror(ror(ror(pos))).d).toEqual('N');
    expect(ror(ror(ror(ror(pos)))).d).toEqual('E');
  });

  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual(7036);
    expect(solvePart1(e2)).toEqual(11048);
  });

  it('should solve from point', () => {
    const map = e1.split('\n').map((l) => l.split(''));
    expect(solve(map, { x: 13, y: 1, d: 'E' })).toEqual(0);
    expect(solve(map, { x: 12, y: 1, d: 'E' })).toEqual(1);
    expect(solve(map, { x: 11, y: 1, d: 'E' })).toEqual(2);
    expect(solve(map, { x: 12, y: 1, d: 'N' })).toEqual(1001);
    expect(solve(map, { x: 9, y: 1, d: 'N' })).toEqual(1004);

    expect(solve(map, { x: 13, y: 2, d: 'N' })).toEqual(1);
    expect(solve(map, { x: 13, y: 3, d: 'N' })).toEqual(2);
    expect(solve(map, { x: 13, y: 13, d: 'N' })).toEqual(12);
    expect(solve(map, { x: 13, y: 13, d: 'E' })).toEqual(1012);
    expect(solve(map, { x: 11, y: 13, d: 'E' })).toEqual(1014);
    expect(solve(map, { x: 11, y: 13, d: 'S' })).toEqual(2014);
    expect(solve(map, { x: 11, y: 7, d: 'S' })).toEqual(2020);
    expect(solve(map, { x: 11, y: 7, d: 'E' })).toEqual(3020);
    expect(solve(map, { x: 9, y: 7, d: 'E' })).toEqual(3022);
    expect(solve(map, { x: 3, y: 7, d: 'E' })).toEqual(3028);
    expect(solve(map, { x: 4, y: 7, d: 'E' })).toEqual(3027);
    expect(solve(map, { x: 3, y: 7, d: 'N' })).toEqual(4028);
  });

  it('should solve part 2', () => {
    expect(solvePart2('')).toEqual(0);
  });
});
