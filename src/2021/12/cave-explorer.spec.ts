import { CaveExplorer } from './cave-explorer';

const example = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];

describe('2021 - Day 12 - Cave Explorer', () => {
  it('should explore', () => {
    const explorer = new CaveExplorer();
    const solution = explorer.findAllRoutes(example);
    expect(solution.part1).toHaveLength(10);
    expect(solution.part2).toHaveLength(36);
  });
});
