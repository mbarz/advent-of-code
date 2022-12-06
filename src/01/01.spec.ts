import { readFileSync } from 'fs';
import { join } from 'path';
import { highestCalories, top } from './01';

const exampleInput = [
  [1000, 2000, 3000],
  [4000],
  [5000, 6000],
  [7000, 8000, 9000],
  [10000],
]
  .map((e) => e.join('\n'))
  .join('\n\n');

const puzzleInput = readFileSync(join(__dirname, 'input.txt'), 'utf8');

describe('Day one', () => {
  it('should return the highest', () => {
    expect(highestCalories(exampleInput)).toEqual(7000 + 8000 + 9000);
  });

  it('should return the top3', () => {
    expect(top(exampleInput, 3)).toEqual(45000);
    expect(top(puzzleInput, 3)).toEqual(212836);
  });

  it('should give result', async () => {
    expect(highestCalories(puzzleInput)).toEqual(74394);
  });
});
