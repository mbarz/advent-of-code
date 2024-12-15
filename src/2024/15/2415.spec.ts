import { expand, next, parse, solvePart1, solvePart2 } from './2415';

const smallExample = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

const bigExample = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const exampleC = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`;

describe('2024 Day 15', () => {
  it('should move', () => {
    const { map, instructions } = parse(smallExample);
    next(map, instructions.shift()!);
    next(map, instructions.shift()!);
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '########',
      '#.@O.O.#',
      '##..O..#',
      '#...O..#',
      '#.#.O..#',
      '#...O..#',
      '#......#',
      '########',
    ]);
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '########',
      '#..@OO.#',
      '##..O..#',
      '#...O..#',
      '#.#.O..#',
      '#...O..#',
      '#......#',
      '########',
    ]);
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '########',
      '#...@OO#',
      '##..O..#',
      '#...O..#',
      '#.#.O..#',
      '#...O..#',
      '#......#',
      '########',
    ]);
    while (instructions.length) {
      next(map, instructions.shift()!);
    }
    expect(map.map((l) => l.join(''))).toEqual([
      '########',
      '#....OO#',
      '##.....#',
      '#.....O#',
      '#.#O@..#',
      '#...O..#',
      '#...O..#',
      '########',
    ]);
  });

  it('should move 2', () => {
    const parsed = parse(exampleC);
    const map = expand(parsed.map);
    const instructions = parsed.instructions;

    expect(map.map((l) => l.join(''))).toEqual([
      '##############',
      '##......##..##',
      '##..........##',
      '##....[][]@.##',
      '##....[]....##',
      '##..........##',
      '##############',
    ]);
    expect(instructions.join('')).toEqual('<vv<<^^<<^^');
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '##############',
      '##......##..##',
      '##..........##',
      '##...[][]@..##',
      '##....[]....##',
      '##..........##',
      '##############',
    ]);
    next(map, instructions.shift()!);
    next(map, instructions.shift()!);
    next(map, instructions.shift()!);
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '##############',
      '##......##..##',
      '##..........##',
      '##...[][]...##',
      '##....[]....##',
      '##.....@....##',
      '##############',
    ]);
    next(map, instructions.shift()!);
    expect(map.map((l) => l.join(''))).toEqual([
      '##############',
      '##......##..##',
      '##...[][]...##',
      '##....[]....##',
      '##.....@....##',
      '##..........##',
      '##############',
    ]);
  });

  it('should solve part 1 for small example', () => {
    expect(solvePart1(smallExample)).toEqual(2028);
  });

  it('should solve part 1 for big example', () => {
    expect(solvePart1(bigExample)).toEqual(10092);
  });

  it('should solve part 2', () => {
    expect(solvePart2('')).toEqual(0);
  });
});
