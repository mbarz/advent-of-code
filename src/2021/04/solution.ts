import { readFileSync } from 'fs';
import {
  getFirstBingoWinner,
  getLastBingoWinner,
  parseBingoInput,
} from './bingo';

const input = readFileSync('res/puzzle-input-2021-04.txt', 'utf-8');
const bingo = parseBingoInput(input);
const first = getFirstBingoWinner(bingo);
const last = getLastBingoWinner(bingo);
console.log(first.score);
console.log(last.score);
