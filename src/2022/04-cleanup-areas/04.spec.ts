import { readFileSync } from 'fs';

const pairs = [
  '2-4,6-8',
  '2-3,4-5',
  '5-7,7-9',
  '2-8,3-7',
  '6-6,4-6',
  '2-6,4-8',
];
const exampleInput = pairs.join('\n');

const parseSection = (a: string) => a.split('-').map((n) => Number(n));
const contains = (a: string, b: string) => {
  const [s1, e1] = parseSection(a);
  const [s2, e2] = parseSection(b);
  return s1 <= s2 && e1 >= e2;
};

const isIn = (a: number, b: string) => {
  const [start, end] = parseSection(b);
  return a >= start && a <= end;
};
const overlaps = (a: string, b: string) => {
  const [s1, e1] = parseSection(a);
  const [s2, e2] = parseSection(b);
  return isIn(s1, b) || isIn(e1, b) || isIn(s2, a) || isIn(e2, a);
};
const oneContainsTheOther = (s: string) => {
  const [a, b] = s.split(',');
  return contains(a, b) || contains(b, a);
};
function solvePart1(input: string) {
  return input.split('\n').filter((line) => oneContainsTheOther(line)).length;
}

function solvePart2(input: string) {
  return input.split('\n').filter((line) => {
    const [a, b] = line.split(',');
    return overlaps(a, b);
  }).length;
}

describe('Day4', () => {
  it('should check contains', () => {
    expect(contains('6-8', '2-4')).toEqual(false);
    expect(contains('6-8', '6-8')).toEqual(true);
    expect(contains('6-8', '7-7')).toEqual(true);
    expect(contains('6-8', '6-9')).toEqual(false);
  });

  it('should solve part1 example', () => {
    const input = exampleInput;
    expect(solvePart1(input)).toEqual(2);
  });
  it('should solve part1 example', () => {
    const input = readFileSync(__dirname + '/04.txt', 'utf-8');
    expect(solvePart1(input)).toEqual(466);
  });

  it('should solve part2 example', () => {
    const input = exampleInput;
    expect(solvePart2(input)).toEqual(4);
  });
  it('should solve part1 example', () => {
    const input = readFileSync(__dirname + '/04.txt', 'utf-8');
    expect(solvePart2(input)).toEqual(865);
  });
});
