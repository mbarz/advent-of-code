import { RobotFactory } from './robot-factory';

const exampleInput = [
  'Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.',
  'Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.',
].join('\n');

describe('Day 19: Robot Factory', () => {
  it('should parse blueprints', () => {
    const f = new RobotFactory();
    f.parseBlueprints(exampleInput);
    expect(f.blueprints).toHaveLength(2);
    expect(f.blueprints).toEqual([
      [
        [4, 0, 0, 0],
        [2, 0, 0, 0],
        [3, 14, 0, 0],
        [2, 0, 7, 0],
      ],
      [
        [2, 0, 0, 0],
        [3, 0, 0, 0],
        [3, 8, 0, 0],
        [3, 0, 12, 0],
      ],
    ]);
  });

  it('should rate blueprint', () => {
    const f = new RobotFactory();
    f.parseBlueprints(exampleInput);
    expect(f.getMaxOutcome(0, [1, 0, 0, 0], [0, 0, 0, 0], 10)).toEqual(0);
  });

  it('should get max res', () => {
    const f = new RobotFactory();
    f.parseBlueprints(exampleInput);
    expect(f.getMaxRes(f.blueprints[0])).toEqual([
      4,
      14,
      7,
      Number.POSITIVE_INFINITY,
    ]);
  });
});
