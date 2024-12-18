import { solvePart1, solvePart2 } from './2418';

const e1 = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe('2024 Day 18', () => {
  it('should solve part 1', () => {
    expect(solvePart1(e1, 7, 12)).toEqual(22);
  });

  it('should solve part 2', () => {
    expect(solvePart2(e1, 7)).toEqual('6,1');
  });
});
