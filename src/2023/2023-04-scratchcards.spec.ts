import { AdventOfCode2023Day04 } from './2023-04-scratchcards';
import { readTextFileLines } from './util';

describe('2023 Day 04', () => {
  let lines: string[];
  let solver: AdventOfCode2023Day04;

  beforeEach(() => {
    lines = readTextFileLines(4, 'test');
    solver = new AdventOfCode2023Day04(lines);
  });

  it('should solve part 1 for test data', () => {
    expect(solver.solvePart1()).toEqual(13);
  });

  it('should get winning cards', () => {
    expect(solver.readCard(lines[0])).toEqual({
      cardNumber: 1,
      left: [41, 48, 83, 86, 17],
      right: [83, 86, 6, 31, 17, 9, 48, 53],
    });
    expect(solver.readCard(lines[1])).toEqual({
      cardNumber: 2,
      left: [13, 32, 20, 16, 61],
      right: [61, 30, 68, 82, 17, 32, 24, 19],
    });
  });

  it('should get points for each card', () => {
    expect(solver.originalCards.map((card) => solver.getPoints(card))).toEqual([
      8, 2, 2, 1, 0, 0,
    ]);
  });

  it('should solve part 2 for test data', () => {
    expect(solver.solvePart2()).toEqual(30);
  });
});
