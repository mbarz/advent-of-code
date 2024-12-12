import { Analyzer, solvePart1, solvePart2 } from './2412';

const inputA = ['AAAA', 'BBCD', 'BBCC', 'EEEC'].join('\n');
const inputB = ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'].join('\n');
const inputC = [
  'RRRRIICCFF',
  'RRRRIICCCF',
  'VVRRRCCFFF',
  'VVRCCCJFFF',
  'VVVVCJJCFE',
  'VVIVCCJJEE',
  'VVIIICJJEE',
  'MIIIIIJJEE',
  'MIIISIJEEE',
  'MMMISSJEEE',
].join('\n');
const inputD = ['EEEEE', 'EXXXX', 'EEEEE', 'EXXXX', 'EEEEE'].join('\n');
const inputE = [
  'AAAAAA',
  'AAABBA',
  'AAABBA',
  'ABBAAA',
  'ABBAAA',
  'AAAAAA',
].join('\n');

describe('2024 Day 12', () => {
  it('should solve part 1 for input A', () => {
    expect(solvePart1(inputA)).toEqual(140);
  });

  it('should solve part 1 for input B', () => {
    expect(solvePart1(inputB)).toEqual(772);
  });

  it('should solve part 1 for input C', () => {
    expect(solvePart1(inputC)).toEqual(1930);
  });

  it('should get sides for inputA', () => {
    const analyzer = new Analyzer(inputA);
    const areas = analyzer.getAllAreas();

    expect(areas.length).toEqual(5);

    expect(areas[0].type).toEqual('A');
    expect(areas[0].sides).toEqual(4);

    expect(areas[1].type).toEqual('B');
    expect(areas[1].sides).toEqual(4);

    expect(areas[2].type).toEqual('C');
    expect(areas[2].sides).toEqual(8);

    expect(areas[3].type).toEqual('D');
    expect(areas[3].sides).toEqual(4);

    expect(areas[4].type).toEqual('E');
    expect(areas[4].sides).toEqual(4);
  });

  it('should get sides for inputB', () => {
    const analyzer = new Analyzer(inputB);
    const areas = analyzer.getAllAreas();

    expect(areas.length).toEqual(5);

    expect(areas[0].type).toEqual('O');
    expect(areas[0].sides).toEqual(4 + 4 * 4);
    expect(areas[0].area).toEqual(21);

    expect(areas[1].type).toEqual('X');
    expect(areas[1].sides).toEqual(4);
    expect(areas[1].area).toEqual(1);

    expect(areas[2].type).toEqual('X');
    expect(areas[2].sides).toEqual(4);

    expect(areas[3].type).toEqual('X');
    expect(areas[3].sides).toEqual(4);

    expect(areas[4].type).toEqual('X');
    expect(areas[4].sides).toEqual(4);
  });

  it('should solve part 2 for input A', () => {
    expect(solvePart2(inputA)).toEqual(80);
  });

  it('should solve part 2 for input B', () => {
    expect(solvePart2(inputB)).toEqual((4 + 4 * 4) * 21 + 4 * 4);
  });

  it('should solve part 2 for input C', () => {
    expect(solvePart2(inputC)).toEqual(1206);
  });

  it('should solve part 2 for input D', () => {
    const analyzer = new Analyzer(inputD);
    const areas = analyzer.getAllAreas();
    expect(areas.length).toEqual(3);
    expect(areas[0]).toEqual({ type: 'E', perimeter: 36, sides: 12, area: 17 });
    expect(areas[1]).toEqual({ type: 'X', perimeter: 10, sides: 4, area: 4 });
    expect(areas[2]).toEqual({ type: 'X', perimeter: 10, sides: 4, area: 4 });
    expect(solvePart2(inputD)).toEqual(236);
  });

  it('should solve part 2 for input E', () => {
    const analyzer = new Analyzer(inputE);
    expect(inputE.match(/A/g)?.length).toEqual(28);
    const areas = analyzer.getAllAreas();
    expect(areas.length).toEqual(3);
    expect(areas[0]).toEqual({ type: 'A', perimeter: 40, sides: 12, area: 28 });
    expect(areas[1]).toEqual({ type: 'B', perimeter: 8, sides: 4, area: 4 });
    expect(areas[2]).toEqual({ type: 'B', perimeter: 8, sides: 4, area: 4 });
    expect(solvePart2(inputE)).toEqual(12 * 28 + 4 * 4 + 4 * 4);
    expect(solvePart2(inputE)).toEqual(368);
  });
});
