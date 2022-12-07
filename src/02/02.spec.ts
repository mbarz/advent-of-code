// A = Rock
// B = Paper
// C = Scissors

import { readFileSync } from 'fs';

function scorePick(pick: string) {
  return ['R', 'P', 'S'].indexOf(pick) + 1;
}

function translate(s: string) {
  return s
    .split('\n')
    .map((line) => {
      const [c1, c2] = line.split(' ');
      const index1 = ['A', 'B', 'C'].indexOf(c1);
      const index2 = ['X', 'Y', 'Z'].indexOf(c2);
      const A = ['R', 'P', 'S'][index1];
      const B = ['R', 'P', 'S'][index2];
      return `${A} ${B}`;
    })
    .join('\n');
}

function translate2(s: string) {
  return s
    .split('\n')
    .map((line) => {
      const [c1, c2] = line.split(' ');
      const index1 = ['A', 'B', 'C'].indexOf(c1);
      const index2 = (['Y', 'Z', 'X'].indexOf(c2) + index1) % 3;
      const A = ['R', 'P', 'S'][index1];
      const B = ['R', 'P', 'S'][index2];
      return `${A} ${B}`;
    })
    .join('\n');
}

function scoreOutcome(match: string) {
  const picks = match.split(' ');
  const [a, b] = picks.map((c) => ['R', 'P', 'S'].indexOf(c));
  const diff = a - b;
  if (diff === 0) return 3;
  if (diff === 1 || diff === -2) return 0;
  return 6;
}

function scoreRound(match: string) {
  return scoreOutcome(match) + scorePick(match.charAt(2));
}

function scoreStrategy(strategy: string) {
  return strategy
    .split('\n')
    .map(scoreRound)
    .reduce((a, b) => a + b, 0);
}

describe('Day 2', () => {
  it('should score pick', () => {
    expect(scorePick('R')).toEqual(1);
    expect(scorePick('P')).toEqual(2);
    expect(scorePick('S')).toEqual(3);
  });

  it('should score outcome', () => {
    expect(scoreOutcome('R P')).toEqual(6);
    expect(scoreOutcome('P R')).toEqual(0);
    expect(scoreOutcome('S S')).toEqual(3);
  });

  it('should score round', () => {
    expect(scoreRound('R P')).toEqual(8);
    expect(scoreRound('P R')).toEqual(1);
    expect(scoreRound('S S')).toEqual(6);
  });

  it('should score strategy', () => {
    const given = ['A Y', 'B X', 'C Z'].join('\n');
    const translated = translate(given);
    expect(scoreStrategy(translated)).toEqual(15);
  });

  it('should score strategy with updated translation', () => {
    const given = ['A Y', 'B X', 'C Z'].join('\n');
    const translated = translate2(given);
    expect(scoreStrategy(translated)).toEqual(12);
  });

  it('should score big strategy', () => {
    const given = readFileSync(__dirname + '/02-input.txt', 'utf-8');
    const translated = translate(given);
    const solution = scoreStrategy(translated);
    expect(solution).toEqual(8392);
  });

  it('should score big strategy with updated translation', () => {
    const given = readFileSync(__dirname + '/02-input.txt', 'utf-8');
    const translated = translate2(given);
    const solution = scoreStrategy(translated);
    expect(solution).toEqual(10116);
  });
});
