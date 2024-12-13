import { parse, solveMachine, solvePart1, solvePart2 } from './2413';

const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

describe('2024 Day 13', () => {
  it('should parse input', () => {
    const machines = parse(input);

    expect(machines[0]).toEqual({
      a: [94, 34],
      b: [22, 67],
      p: [8400, 5400],
    });

    expect(machines[3]).toEqual({
      a: [69, 23],
      b: [27, 71],
      p: [18641, 10279],
    });
  });

  it('should solve machine with equal buttons', () => {
    expect(solveMachine({ a: [1, 1], b: [1, 1], p: [3, 3] })).toEqual(3);
    expect(solveMachine({ a: [1, 1], b: [1, 1], p: [3, 4] })).toEqual(null);
  });

  it('should solve machine', () => {
    const machines = parse(input);
    expect(solveMachine(machines[0])).toEqual(280);
    expect(solveMachine(machines[1])).toEqual(null);
    expect(solveMachine(machines[2])).toEqual(200);
    expect(solveMachine(machines[3])).toEqual(null);
  });

  it('should solve part 1', () => {
    expect(solvePart1(input)).toEqual(480);
  });

  it('should solve part 2', () => {
    // 1000000 => 100ms
    // 10000000 => 1s
    // 10000000000000
    expect(solvePart2(input)).toEqual(875318608908);
  });
});
