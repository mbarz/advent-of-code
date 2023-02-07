import {
  countUniqueHitVelocities,
  getPossibleXHits,
  getPossibleYHits,
  getTrickshotStartVelocity,
  parseInput,
} from './trick-shot';

const exampleInput = 'target area: x=20..30, y=-10..-5';
const puzzleInput = 'target area: x=201..230, y=-99..-65';

describe('2021 - Day 17 - Trick Shot', () => {
  it('should parse', () => {
    expect(parseInput(exampleInput)).toEqual({
      minX: 20,
      maxX: 30,
      minY: -10,
      maxY: -5,
    });
  });

  it('should get all possible y velocities', () => {
    const input = parseInput(exampleInput);
    const hits = getPossibleYHits(input);

    const all = hits.map((h) => h.y);
    expect(all).toContain(-5);
    expect(all).toContain(-6);
    expect(all).toContain(-7);
    expect(all).toContain(-8);
    expect(all).toContain(-9);
    expect(all).toContain(-10);

    expect(hits.filter((h) => h.y === -10).map((h) => h.t)).toEqual([1]);
    expect(hits.filter((h) => h.y === -9).map((h) => h.t)).toEqual([1]);
    expect(hits.filter((h) => h.y === -1).map((h) => h.t)).toEqual([3, 4]);
  });

  it('should get all possible x velocities', () => {
    const input = parseInput(puzzleInput);
    const hits = getPossibleXHits(input);
    expect(hits.length).toEqual(286);
  });

  it('should get all possible y velocities', () => {
    const input = parseInput(puzzleInput);
    const hits = getPossibleYHits(input);
    expect(hits).toHaveLength(222);
  });

  it('should get hits', () => {
    const input = parseInput(exampleInput);
    expect(countUniqueHitVelocities(input)).toEqual(112);
  });

  it('should get trickshot', () => {
    const input = parseInput(exampleInput);
    const v = getTrickshotStartVelocity(input);
    expect(v).toEqual({ x: 6, y: 9, h: 45, t: 20 });
  });
});
