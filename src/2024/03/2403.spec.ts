import * as D03 from './2403';

describe('2024-12-03', () => {
  it('should solve 1', () => {
    expect(
      D03.solvePart1(
        'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
      ),
    ).toEqual(161);
  });

  it('should solve 2', () => {
    expect(
      D03.solvePart2(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ),
    ).toEqual(48);
  });
});
