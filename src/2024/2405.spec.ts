import {
  getMiddleNumber,
  isValidUpdate,
  parseInput,
  solvePart1,
  solvePart2,
} from './2405';

const input = [
  '47|53',
  '97|13',
  '97|61',
  '97|47',
  '75|29',
  '61|13',
  '75|53',
  '29|13',
  '97|29',
  '53|29',
  '61|53',
  '97|53',
  '61|29',
  '47|13',
  '75|47',
  '97|75',
  '47|61',
  '75|61',
  '47|29',
  '75|13',
  '53|13',
  '',
  '75,47,61,53,29',
  '97,61,53,29,13',
  '75,29,13',
  '75,97,47,61,53',
  '61,13,29',
  '97,13,75,29,47',
].join('\n');

describe('2024 - Day 05', () => {
  it('should parse', () => {
    const { rules, updates } = parseInput(input);
    expect(rules.length).toEqual(21);
    expect(updates.length).toEqual(6);
  });

  it.each([
    [1, true],
    [2, true],
    [3, true],
    [4, false],
    [5, false],
    [6, false],
  ])('should check update %s', (n, expectedValidity) => {
    const { rules, updates } = parseInput(input);
    expect(isValidUpdate(updates[n - 1], rules)).toBe(expectedValidity);
  });

  it('should get middle number', () => {
    expect(getMiddleNumber([1, 2, 3, 4, 5])).toBe(3);
    expect(getMiddleNumber([1, 2, 3])).toBe(2);
  });

  it('should solve part 1', () => {
    expect(solvePart1(input)).toBe(143);
  });

  it('should solve part 1', () => {
    expect(solvePart2(input)).toBe(123);
  });
});
