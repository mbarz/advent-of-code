import { readFileSync } from 'fs';

function compartments(s: string) {
  const n = s.length / 2;
  const head = s.slice(0, n);
  const tail = s.slice(n);
  return [head, tail];
}

function doubled(s: string) {
  const [a, b] = compartments(s);
  return a.split('').find((c) => b.split('').includes(c)) || '';
}

function common(packs: string[]) {
  const [a, ...rest] = packs.map((pack) => pack.split(''));
  return a.find((c) => !rest.find((b) => !b.includes(c)));
}

function prio(s: string) {
  const code = s.charCodeAt(0);
  return code > 96 ? code - 96 : code - 38;
}

function calcSumOfDoubled(input: string) {
  return input
    .split('\n')
    .map((line) => prio(doubled(line)))
    .reduce((a, b) => a + b, 0);
}

function calcSumOfBadgeItems(input: string) {
  return groups(input)
    .map((group) => common(group) || '')
    .map((item) => prio(item))
    .reduce((a, b) => a + b, 0);
}

function groups(s: string) {
  const ret = [];
  const lines = s.split('\n');
  while (lines.length) ret.push(lines.splice(0, 3));
  return ret;
}

describe('Day 3', () => {
  const exampleInput = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ].join('\n');

  it('should return compartments', () => {
    expect(compartments('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual([
      'vJrwpWtwJgWr',
      'hcsFMMfFFhFp',
    ]);
  });

  it('should find doubled item', () => {
    expect(doubled('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual('p');
    expect(doubled('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toEqual('L');
  });

  it('should give priority', () => {
    expect(prio('a')).toEqual(1);
    expect(prio('z')).toEqual(26);
    expect(prio('A')).toEqual(27);
    expect(prio('Z')).toEqual(52);
  });

  it('should give part1 example solution', () => {
    const input = exampleInput;
    const res = calcSumOfDoubled(input);
    expect(res).toEqual(157);
  });

  it('should give part1 solution', () => {
    const input = readFileSync(__dirname + '/backpacks.txt', 'utf-8');
    const res = calcSumOfDoubled(input);
    expect(res).toEqual(7597);
  });

  it('should get groups', () => {
    expect(groups(['a', 'b', 'c', 'd', 'e', 'f'].join('\n'))).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ]);
  });

  it('should get groups', () => {
    expect(groups(exampleInput).map((group) => common(group))).toEqual([
      'r',
      'Z',
    ]);
  });

  it('should give part2 example solution', () => {
    expect(calcSumOfBadgeItems(exampleInput)).toEqual(70);
  });

  it('should give part2 solution', () => {
    const input = readFileSync(__dirname + '/backpacks.txt', 'utf-8');
    expect(calcSumOfBadgeItems(input)).toEqual(2607);
  });
});
