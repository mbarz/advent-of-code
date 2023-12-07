import { AdventOfCode2023Day07 } from './2023-07-camel-cards';

describe('2023 - Day 7 - Camel Cards', () => {
  let solver: AdventOfCode2023Day07;

  beforeEach(() => (solver = new AdventOfCode2023Day07('test')));

  it('should solve part 1', () => {
    expect(solver.solvePart1()).toEqual(6440);
  });

  it('should solve part 2', () => {
    expect(solver.solvePart2()).toEqual(5905);
  });

  it('should parse hands', () => {
    expect(solver.hands).toEqual([
      { cards: '32T3K', bid: 765 },
      { cards: 'T55J5', bid: 684 },
      { cards: 'KK677', bid: 28 },
      { cards: 'KTJJT', bid: 220 },
      { cards: 'QQQJA', bid: 483 },
    ]);
  });

  it('should sort hands', () => {
    const sorted = solver.getRanked();
    expect(sorted).toEqual([
      { cards: '32T3K', bid: 765 },
      { cards: 'KTJJT', bid: 220 },
      { cards: 'KK677', bid: 28 },
      { cards: 'T55J5', bid: 684 },
      { cards: 'QQQJA', bid: 483 },
    ]);
  });

  it('should get type of card', () => {
    expect(solver.getType('32T38')).toEqual(6);
    expect(solver.getType('KTJJT')).toEqual(5);
    expect(solver.getType('KK677')).toEqual(5);
    expect(solver.getType('T55J5')).toEqual(4);
    expect(solver.getType('QQQJA')).toEqual(4);
  });

  it('should replace J', () => {
    expect(solver.replaceJ('KTJJT')).toEqual('KTTTT');
  });
});
