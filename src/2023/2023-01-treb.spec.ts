import { AdventOfCode2023Day01 } from './2023-01-trebuchet';

describe('2023-01 Trebuchet', () => {
  const solver = new AdventOfCode2023Day01();

  it.each([
    ['1', '1', 1],
    ['nine4pvtl', 'nine', 9],
    ['9mndn31msfprm1kpk', '9', 9],
    ['tmczplnmrsevenhmhprtllcktpr8eight9', 'seven', 7],
  ])('should find first number in %s', (target, word, value) => {
    const res = solver.findFirst(target);
    if (res == null) return fail('no match');
    const { n, s } = res;
    expect(s).toEqual(word);
    expect(n).toEqual(value);
  });

  it.each([
    ['1', '1', 1],
    ['3fiveone', 'one', 1],
    ['eightnineseventwo1seven', 'seven', 7],
    ['9h1xcrcggtwo38', '8', 8],
    ['nine4pvtl', '4', 4],
    ['seven7rsbqpgxtjzsgxssix', 'six', 6],
  ])('should find last number in %s', (target, word, value) => {
    const res = solver.findLast(target);
    if (res == null) return fail('no match');
    const { n, s } = res;
    expect(s).toEqual(word);
    expect(n).toEqual(value);
  });

  it.each([
    ['1', 11],
    ['3fiveone', 31],
    ['eightnineseventwo1seven', 87],
    ['9h1xcrcggtwo38', 98],
    ['nine4pvtl', 94],
    ['seven7rsbqpgxtjzsgxssix', 76],
    ['twofivethreepqgsvrszczrthree7', 27],
    ['44qcrkvr1two', 42],
    ['zstrmphtxdvdpsnhpnq4threenbjznsb', 43],
    ['bhgxhb41eight', 48],
    ['qhstsbxsspsrfourmtvtnfhxlj699one', 41],
    ['onekvhgkeighteight6two7ninelnfzbr', 19],
    ['xsixz5six3gfqrzmpnjgskd6', 66],
    ['qfrpksmzzvfkddtfh6838', 68],
    ['mztttgnxdqt4', 44],
  ])('should get values from %s', (target, num) => {
    const res = solver.getPart2CalibrationValueForLine(target);
    expect(res).toEqual(num);
  });
});
