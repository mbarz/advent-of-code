import { readFileSync } from 'fs';
import { AdventOfCode2023Day04 } from './2023-04-scratchcards';

describe('2023 Day 04', () => {
  let input: string;
  let solver: AdventOfCode2023Day04;

  beforeEach(() => {
    input = readFileSync(__dirname + '/input-04.test.txt', 'utf-8');
    solver = new AdventOfCode2023Day04(input);
  });

  it('should solve part 1 for test data', () => {
    expect(solver.solvePart1()).toEqual(13);
  });

  it('should get winning cards', () => {
    const lines = input.split('\n');
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
    expect(solver.cards.map((card) => solver.getPoints(card))).toEqual([
      8, 2, 2, 1, 0, 0,
    ]);
  });

  it('should solve part 2 for test data', () => {
    expect(solver.solvePart2()).toEqual(30);
    expect(solver.solvePart2Linear()).toEqual(30);
  });
});
