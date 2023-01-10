import { sum } from '../../util/sum';

export type BingoBoard = number[][];

export type BingoInput = {
  numbers: number[];
  boards: BingoBoard[];
};

const dimensions = { w: 5, h: 5 };

export function parseBingoInput(input: string): BingoInput {
  const lines = input.split('\n');
  const numbers = (lines.shift() || '').split(',').map((n) => +n);
  const boards: BingoBoard[] = [];

  for (const line of lines) {
    if (line.trim() === '') {
      boards.push([]);
    } else {
      boards[boards.length - 1].push((line.match(/\d+/g) || []).map((s) => +s));
    }
  }
  if (boards.length) {
    dimensions.h = boards[0].length;
    dimensions.w = boards[0][0].length;
  }
  return { numbers, boards };
}

export function removeNumberFromBoards(
  boards: BingoBoard[],
  ...numbers: number[]
) {
  numbers.forEach((n) =>
    boards.forEach((board) => removeNumberFromBoard(board, n))
  );
}

export function removeNumberFromBoard(board: BingoBoard, a: number) {
  for (let x = 0; x < dimensions.w; ++x) {
    for (let y = 0; y < dimensions.h; ++y) {
      board[y][x] = board[y][x] === a ? -1 : board[y][x];
    }
  }
}

export function findBingoWinner(boards: BingoBoard[]): number {
  return boards.findIndex((b) => hasBoardWon(b));
}
function getWinners(boards: BingoBoard[]): number[] {
  return boards
    .map((b, i) => ({ b, i }))
    .filter(({ b }) => hasBoardWon(b))
    .map(({ i }) => i);
}

export function hasBoardWon(board: BingoBoard): boolean {
  for (let y = 0; y < dimensions.h; ++y) {
    const won = checkColumn(board, y);
    if (won) return true;
  }
  for (let x = 0; x < dimensions.w; ++x) {
    const won = checkRow(board, x);
    if (won) return true;
  }
  return false;
}

function checkColumn(board: BingoBoard, n: number): boolean {
  for (let y = 0; y < dimensions.h; ++y) {
    if (board[y][n] !== -1) return false;
  }
  return true;
}
function checkRow(board: BingoBoard, n: number): boolean {
  for (let x = 0; x < dimensions.w; ++x) {
    if (board[n][x] !== -1) return false;
  }
  return true;
}

export function getFirstBingoWinner({ boards, numbers }: BingoInput): {
  index: number;
  number: number;
  score: number;
} {
  for (const n of numbers) {
    removeNumberFromBoards(boards, n);
    const index = findBingoWinner(boards);
    if (index >= 0) {
      return {
        index,
        number: n,
        score: calcScore(boards[index], n),
      };
    }
  }
  throw new Error('No Winner');
}

function calcScore(board: BingoBoard, n: number): number {
  return n * sum(board.map((row) => sum(row.filter((a) => a > 0))));
}

export function getLastBingoWinner({ boards, numbers }: BingoInput): {
  index: number;
  number: number;
  score: number;
} {
  const winners: number[] = [];
  for (const n of numbers) {
    removeNumberFromBoards(boards, n);
    const roundWinners = getWinners(boards);
    roundWinners
      .filter((w) => !winners.includes(w))
      .forEach((w) => winners.push(w));
    if (roundWinners.length === boards.length) {
      const last = winners[winners.length - 1];
      return { index: last, number: n, score: calcScore(boards[last], n) };
    }
  }
  throw new Error('Not all boards win.');
}
