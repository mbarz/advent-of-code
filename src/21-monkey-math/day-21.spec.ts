import {
  mathMonkeyExampleInput,
  MonkeyMathLib,
  parseMathMonkeys,
} from './monkey-math';

describe('Day 21: Monkey Math', () => {
  it('should parse', () => {
    const monkeys = parseMathMonkeys(mathMonkeyExampleInput);
    expect(monkeys).toHaveLength(15);
    expect(monkeys[0]).toEqual({
      name: 'root',
      a: 'pppw',
      b: 'sjmn',
      operator: '+',
    });
    expect(monkeys[1]).toEqual({
      name: 'dbpl',
      value: 5,
    });
  });

  it('should get number monkeys value', () => {
    const lib = new MonkeyMathLib();
    lib.parse(mathMonkeyExampleInput);
    expect(lib.getValueOf('dbpl')).toEqual(5);
  });

  it('should calculate operation monkeys value', () => {
    const lib = new MonkeyMathLib();
    lib.parse(mathMonkeyExampleInput);
    expect(lib.getValueOf('ptdq')).toEqual(2);
    expect(lib.getValueOf('root')).toEqual(152);
  });
});
