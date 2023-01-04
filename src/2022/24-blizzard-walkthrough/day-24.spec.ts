import { moveBlizzards, parseBlizzardMap } from './blizzard';
import { getLooptime } from './day-24-solution';

const smallExampleInput = [
  '#.#####',
  '#.....#',
  '#.>...#',
  '#.....#',
  '#.....#',
  '#...v.#',
  '#####.#',
].join('\n');

describe('Day 24: Blizzard', () => {
  it('should parse', () => {
    const { blizzards, dimensions } = parseBlizzardMap(smallExampleInput);
    expect(blizzards).toEqual([
      { direction: { x: 1, y: 0 }, position: { x: 2, y: 2 } },
      { direction: { x: 0, y: 1 }, position: { x: 4, y: 5 } },
    ]);
    expect(dimensions.width).toEqual(7);
    expect(dimensions.height).toEqual(7);
  });

  it('should move blizzards', () => {
    const { blizzards, dimensions } = parseBlizzardMap(smallExampleInput);
    const moved = moveBlizzards(blizzards, dimensions);
    expect(moved).toEqual([
      { position: { x: 3, y: 2 }, direction: { x: 1, y: 0 } },
      { position: { x: 4, y: 1 }, direction: { x: 0, y: 1 } },
    ]);
  });

  it('should detect loops', () => {
    const { blizzards, dimensions } = parseBlizzardMap(smallExampleInput);
    const t = getLooptime(blizzards, dimensions);
    expect(t).toEqual(5);
  });
});
