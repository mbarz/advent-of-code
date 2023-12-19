import { AdventOfCode2023Day12 } from './2023-12-hot-springs';

describe('2023 - Day 12 - Hot Springs', () => {
  it('should solve part 1', () => {
    expect(createSolver().solvePart1()).toEqual(21);
  });

  it('should count possible arrangements', () => {
    const solver = createSolver();
    expect(solver.getArrs('???.###', [1, 1, 3])).toEqual(1);
    expect(solver.getArrs('.??..??...?##.', [1, 1, 3])).toEqual(4);
    expect(
      solver.records.map((r) => solver.getArrs(r.record, r.groups)),
    ).toEqual([1, 4, 1, 1, 4, 10]);
  });

  it('should solve part 2', () => {
    expect(createSolver().solvePart2()).toEqual(525152);
  });
});

function createSolver() {
  return new AdventOfCode2023Day12(
    [
      '???.### 1,1,3',
      '.??..??...?##. 1,1,3',
      '?#?#?#?#?#?#?#? 1,3,1,6',
      '????.#...#... 4,1,1',
      '????.######..#####. 1,6,5',
      '?###???????? 3,2,1',
    ].join('\n'),
  );
}
