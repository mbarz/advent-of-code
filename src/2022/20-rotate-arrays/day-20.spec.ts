import {
  mixArray,
  moveArrayItemRelative,
  solveDay20Part1,
  solveDay20Part2,
} from './day-20-decoder';

describe('Day 20: moving numbers', () => {
  const exampleArray = [1, 2, -3, 3, -2, 0, 4];

  it('should move in circles', () => {
    const given = [0, 1, 2, 3, 4];

    // rotate positive
    expect(moveArrayItemRelative(given, 2, 4)).toEqual([0, 1, 2, 3, 4]);
    expect(moveArrayItemRelative(given, 2, 8)).toEqual([0, 1, 2, 3, 4]);

    // move one positive
    expect(moveArrayItemRelative(given, 2, 1)).toEqual([0, 1, 3, 2, 4]);
    expect(moveArrayItemRelative(given, 2, 9)).toEqual([0, 1, 3, 2, 4]);
    expect(moveArrayItemRelative(given, 3, 1)).toEqual([0, 1, 2, 4, 3]);
    expect(moveArrayItemRelative(given, 3, 9)).toEqual([0, 1, 2, 4, 3]);

    // rotate negative
    expect(moveArrayItemRelative(given, 2, -4)).toEqual([0, 1, 2, 3, 4]);
    expect(moveArrayItemRelative(given, 2, -8)).toEqual([0, 1, 2, 3, 4]);

    // move one negative
    expect(moveArrayItemRelative(given, 2, -1)).toEqual([0, 2, 1, 3, 4]);
    expect(moveArrayItemRelative(given, 2, -9)).toEqual([0, 2, 1, 3, 4]);
    expect(moveArrayItemRelative(given, 1, -1)).toEqual([0, 2, 3, 4, 1]);
    expect(moveArrayItemRelative(given, 1, -9)).toEqual([0, 2, 3, 4, 1]);

    // move above border positive
    expect(moveArrayItemRelative(given, 4, 1)).toEqual([0, 4, 1, 2, 3]);
    expect(moveArrayItemRelative(given, 4, 9)).toEqual([0, 4, 1, 2, 3]);
    expect(moveArrayItemRelative(given, 4, 2)).toEqual([0, 1, 4, 2, 3]);
    expect(moveArrayItemRelative(given, 3, 2)).toEqual([0, 3, 1, 2, 4]);
    expect(moveArrayItemRelative(given, 3, 10)).toEqual([0, 3, 1, 2, 4]);

    // move above border negative
    expect(moveArrayItemRelative(given, 0, -1)).toEqual([1, 2, 3, 0, 4]);

    expect(moveArrayItemRelative(given, 3, 1)).toEqual([0, 1, 2, 4, 3]);
    expect(moveArrayItemRelative(given, 4, 1)).toEqual([0, 4, 1, 2, 3]);

    expect(moveArrayItemRelative([1, 2, -2, -3, 0, 3, 4], 2, -2)).toEqual([
      1, 2, -3, 0, 3, 4, -2,
    ]);
  });

  it('should mix array', () => {
    const given = [1, 2, -3, 3, -2, 0, 4];
    expect(mixArray(given)).toEqual([1, 2, -3, 4, 0, 3, -2]);
    // should not change original
    expect(given).toEqual([1, 2, -3, 3, -2, 0, 4]);
  });

  it('should mix multiple times', () => {
    const given = [1, 2, -3, 3, -2, 0, 4].map((n) => n * 811589153);

    expect(mixArray(given)).toEqual([
      0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306,
      811589153,
    ]);
    expect(mixArray(given, 2)).toEqual([
      0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306,
      811589153,
    ]);
    expect(mixArray(given, 6)).toEqual([
      0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306,
      2434767459,
    ]);
  });

  it('should solve part 1', () => {
    expect(solveDay20Part1(exampleArray)).toEqual(3);
  });

  it('should solve part 2', () => {
    expect(solveDay20Part2(exampleArray)).toEqual(1623178306);
  });
});
