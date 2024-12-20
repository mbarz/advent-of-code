import { Day2420, solvePart1, solvePart2 } from './2420';

const maze = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe('2024 Day 20', () => {
  it('should analyze the maze', () => {
    const d = new Day2420(maze);
    expect(d.start).toEqual({ y: 3, x: 1 });
    expect(d.end).toEqual({ y: 7, x: 5 });
    expect(d.cache.get('3,1')).toEqual(0);
    expect(d.cache.get('7,5')).toEqual(84);
    expect(d.cheats.length).toEqual(
      14 + 14 + 2 + 4 + 2 + 3 + 1 + 1 + 1 + 1 + 1,
    );
    const exactly = (n: number) => d.cheats.filter((c) => c.diff === n);
    expect(exactly(2).length).toEqual(14);
    expect(exactly(4).length).toEqual(14);
    expect(exactly(6).length).toEqual(2);
    expect(exactly(8).length).toEqual(4);
    expect(exactly(10).length).toEqual(2);
    for (let i = 0; i < 84; ++i) {
      const cheats = d.cheats.filter((c) => c.diff === i);
      if (cheats.length) {
        console.log(
          `There are ${cheats.length} cheats that save ${i} picoseconds`,
        );
      }
    }
  });

  it('should solve part 1', () => {
    expect(solvePart1(maze, 20)).toEqual(5);
    expect(solvePart1(maze, 40)).toEqual(2);
    expect(solvePart1(maze, 64)).toEqual(1);
  });

  it('should solve part 2', () => {
    expect(solvePart2(maze, 76)).toEqual(3);
  });
});
