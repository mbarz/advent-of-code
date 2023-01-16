import {
  checkLine,
  getTotalAutoCompleteScore,
  getTotalSyntaxErrorScore,
} from './bracket-checker';

describe('2021 - Day 10 - Bracket Syntax', () => {
  it('should check empty string', () => {
    expect(checkLine('')).toEqual({ type: 'fix', points: 0, characters: '' });
  });

  it.each([
    ['()', null],
    ['[]', null],
    ['[(]', 'Expected ), but found ] instead'],
    ['{([(<{}[<>[]}>{[]{[(<()>', 'Expected ], but found } instead'],
  ])('should return null for simple valid string', (line, result) => {
    const check = checkLine(line);
    if (result == null) expect(check.type !== 'error');
    else expect(check.type === 'error');
    if (check.type === 'error') expect(check.message).toEqual(result);
  });

  it('should autocomplete line', () => {
    expect(checkLine('[({(<(())[]>[[{[]{<()<>>')).toEqual({
      type: 'fix',
      points: 288957,
      characters: '}}]])})]',
    });
  });

  it('should get total error score', () => {
    expect(
      getTotalSyntaxErrorScore(`[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`)
    ).toEqual(26397);
  });

  it('should get total autocomplete score', () => {
    expect(
      getTotalAutoCompleteScore(`[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`)
    ).toEqual(288957);
  });
});
