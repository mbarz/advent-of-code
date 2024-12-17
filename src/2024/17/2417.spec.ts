import { Day17, solvePart1, solvePart2 } from './2417';

const e1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const e2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

describe('2024 Day 17', () => {
  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual('4,6,3,5,6,3,5,2,1,0');
  });

  it('should solve part 1', () => {
    expect(new Day17(e1).part1()).toEqual('4,6,3,5,6,3,5,2,1,0');
  });

  it('should solve part 2', () => {
    expect(new Day17(e2).part2()).toEqual(117440);
    expect(solvePart2(e2)).toEqual(117440);
  });

  it('should solve part 1', () => {
    const puzzle = `Register A: 47006051
  Register B: 0
  Register C: 0

  Program: 2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0`;
    expect(solvePart1(puzzle)).toEqual('6,2,7,2,3,1,6,0,5');
  });

  it('should solve part 1', () => {
    const d = new Day17(e2);
    d.a = BigInt(117440);
    expect(d.run().join(',')).toEqual(d.instructions.join(','));
  });
});
