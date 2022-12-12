import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { levelOfMonkeyBusiness, parseMonkeys, run } from './day11';

describe('Day 11', () => {
  let exampleInput: string;
  let puzzleInput: string;

  beforeAll(() => {
    exampleInput = readFileSync(
      __dirname + '/day11-example-input.txt',
      'utf-8'
    );
    puzzleInput = readFileSync(__dirname + '/day11-puzzle-input.txt', 'utf-8');
  });

  it('should parse monkeys', () => {
    const monkeys = parseMonkeys(exampleInput);
    expect(monkeys).toHaveLength(4);
    expect(monkeys[0].name).toEqual('Monkey 0');
    expect(monkeys[0].items).toEqual([79, 98]);
    expect(monkeys[0].changeLevel(3)).toEqual(3 * 19);
    expect(monkeys[1].name).toEqual('Monkey 1');
    expect(monkeys[1].items).toEqual([54, 65, 75, 74]);
    expect(monkeys[1].changeLevel(2)).toEqual(2 + 6);
    expect(monkeys[2].name).toEqual('Monkey 2');
    expect(monkeys[2].items).toEqual([79, 60, 97]);
    expect(monkeys[2].changeLevel(3)).toEqual(9);
    expect(monkeys[3].name).toEqual('Monkey 3');
    expect(monkeys[3].items).toEqual([74]);
    expect(monkeys[3].changeLevel(3)).toEqual(3 + 3);
  });

  it('should do rounds', () => {
    const monkeys = parseMonkeys(exampleInput);
    const { inspections } = run(monkeys, 20);
    expect(monkeys.map((m) => m.items)).toEqual([
      [10, 12, 14, 26, 34],
      [245, 93, 53, 199, 115],
      [],
      [],
    ]);
    expect(inspections).toEqual([101, 95, 7, 105]);
  });

  it('should solve part 1 for example input', () => {
    const monkeys = parseMonkeys(exampleInput);
    const { inspections } = run(monkeys, 20);
    const [a, b] = inspections.sort((a, b) => b - a);
    expect(a * b).toEqual(10605);
  });

  it('should solve part 1 for puzzle input', () => {
    const monkeys = parseMonkeys(puzzleInput);
    const { inspections } = run(monkeys, 20);
    const [a, b] = inspections.sort((a, b) => b - a);
    expect(a * b).toEqual(64032);
  });

  it.each([
    [20, [99, 97, 8, 103]],
    [1000, [5204, 4792, 199, 5192]],
    // [10000, [52166, 47830, 1938, 52013]],
  ])('should apply new strategy for part 2 for %s rounds', (rounds, result) => {
    const monkeys = parseMonkeys(exampleInput);
    const divisors = monkeys.map((m) => m.divisor);
    const m = divisors.reduce((a, b) => a * b, 1);
    const strategy = (n: number): number => n % m;
    const { inspections } = run(monkeys, rounds, strategy);
    expect(inspections).toEqual(result);
  });

  it.skip('should give level of monkey business', () => {
    expect(levelOfMonkeyBusiness(exampleInput, 10000, 2)).toEqual(2713310158);
  });
});
