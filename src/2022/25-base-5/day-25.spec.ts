import { fromSnafu, toSnafu } from './snafu';

const examples: [string, number][] = [
  ['1=-0-2', 1747],
  ['12111', 906],
  ['2=0=', 198],
  ['21', 11],
  ['2=01', 201],
  ['111', 31],
  ['20012', 1257],
  ['112', 32],
  ['1=-1=', 353],
  ['1-12', 107],
  ['12', 7],
  ['1=', 3],
  ['122', 37],

  ['1', 1],
  ['2', 2],
  ['1=', 3],
  ['1-', 4],
  ['10', 5],
  ['11', 6],
  ['12', 7],
  ['2=', 8],
  ['2-', 9],
  ['20', 10],
  ['1=0', 15],
  ['1-0', 20],
  ['1=11-2', 2022],
  ['1-0---0', 12345],
  ['1121-1110-1=0', 314159265],
];

describe('Day 25 - SNAFU', () => {
  it.each(examples)('should decode %s', (given, result) => {
    expect(fromSnafu(given)).toEqual(result);
  });

  it.each(examples)('should encode %s', (snafu, digital) => {
    expect(toSnafu(digital)).toEqual(snafu);
  });
});
