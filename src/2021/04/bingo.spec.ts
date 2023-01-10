import {
  findBingoWinner,
  getFirstBingoWinner,
  getLastBingoWinner,
  parseBingoInput,
  removeNumberFromBoards,
} from './bingo';

const exampleInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

describe('2021: Day 4 - Bingo', () => {
  it('should parse input', () => {
    const parsed = parseBingoInput(exampleInput);
    expect(parsed).toBeTruthy();
    expect(parsed.numbers.slice(0, 4)).toEqual([7, 4, 9, 5]);
    expect(parsed.boards).toHaveLength(3);
    expect(parsed.boards[0][0]).toEqual([22, 13, 17, 11, 0]);
  });

  it('should mark fields', () => {
    const { boards } = parseBingoInput(exampleInput);
    removeNumberFromBoards(boards, 7);
    expect(boards[0][2]).toEqual([21, 9, 14, 16, -1]);
    expect(findBingoWinner(boards)).toEqual(-1);
    removeNumberFromBoards(boards, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21);
    expect(findBingoWinner(boards)).toEqual(-1);
    removeNumberFromBoards(boards, 24);
    expect(findBingoWinner(boards)).toEqual(2);
  });

  it('should find winner', () => {
    const input = parseBingoInput(exampleInput);
    const winner = getFirstBingoWinner(input);
    expect(winner.index).toEqual(2);
    expect(winner.score).toEqual(4512);
  });

  it('should find last winner', () => {
    const input = parseBingoInput(exampleInput);
    const winner = getLastBingoWinner(input);
    expect(winner.index).toEqual(1);
    expect(winner.score).toEqual(1924);
  });
});
