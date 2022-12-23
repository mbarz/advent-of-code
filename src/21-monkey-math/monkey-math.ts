export const mathMonkeyExampleInput = [
  'root: pppw + sjmn',
  'dbpl: 5',
  'cczh: sllz + lgvd',
  'zczc: 2',
  'ptdq: humn - dvpt',
  'dvpt: 3',
  'lfqf: 4',
  'humn: 5',
  'ljgn: 2',
  'sjmn: drzm * dbpl',
  'sllz: 4',
  'pppw: cczh / lfqf',
  'lgvd: ljgn * ptdq',
  'drzm: hmdt - zczc',
  'hmdt: 32',
].join('\n');

export type NumberMonkey = { name: string; value: number };
export type OperationMonkey = {
  name: string;
  a: string;
  b: string;
  operator: string;
};

export type MathMonkey = NumberMonkey | OperationMonkey;

export function parseMathMonkeys(input: string): MathMonkey[] {
  return input.split('\n').map((line) => parseMathMonkey(line));
}
export function parseMathMonkey(input: string): MathMonkey {
  const [name, info] = input.split(': ');
  if (info.match(/\d+/)) {
    return { name, value: Number(info) };
  } else {
    const m = info.match(/(\w+)\s(.)\s(\w+)/);
    if (m == null) throw new Error(`Invalid line ${input}`);
    return { name, a: m[1], operator: m[2], b: m[3] };
  }
}

export class MonkeyMathLib {
  monkeys: MathMonkey[] = [];

  selfaware = false;

  parse(input: string) {
    this.monkeys = parseMathMonkeys(input);
  }

  getMonkey<T extends MathMonkey>(name: string): T {
    const monkey = this.monkeys.find((m) => m.name === name);
    if (monkey == null) throw new Error(`Unknown Monkey "${name}"`);
    return monkey as T;
  }

  getValueOf(name: string): number | null {
    const monkey = this.getMonkey(name);

    if (this.selfaware && itIsYou(monkey)) return null;

    if (isNumberMonkey(monkey)) return monkey.value;
    const o = monkey.operator;
    const a = this.getValueOf(monkey.a);
    const b = this.getValueOf(monkey.b);
    if (a == null || b == null) return null;
    if (o === '+') return a + b;
    if (o === '-') return a - b;
    if (o === '/') return a / b;
    if (o === '*') return a * b;
    throw new Error(`Unknown operator ${o} for monkey ${name}`);
  }

  realizeItsYou() {
    this.selfaware = true;
  }

  getYourNumber(): number {
    const root = this.getMonkey<OperationMonkey>('root');
    const a = this.getValueOf(root.a);
    const b = this.getValueOf(root.b);

    if (a == null && b != null) {
      return this.resolve(root.a, b);
    }
    if (a != null && b == null) {
      return this.resolve(root.b, a);
    }
    throw new Error('I think you are not self aware');
  }

  resolve(name: string, expected: number): number {
    const monkey = this.getMonkey(name);
    if (itIsYou(monkey)) return expected;
    if (isNumberMonkey(monkey)) {
      throw new Error(`Can not resolve fixed monkey ${monkey.name}`);
    }
    const a = this.getValueOf(monkey.a);
    const b = this.getValueOf(monkey.b);

    const o = monkey.operator;
    let e = 0;
    if (o === '+' && a != null) e = expected - a;
    if (o === '+' && b != null) e = expected - b;
    if (o === '-' && a != null) e = a - expected;
    if (o === '-' && b != null) e = b + expected;
    if (o === '/' && a != null) e = a / expected;
    if (o === '/' && b != null) e = b * expected;
    if (o === '*' && a != null) e = expected / a;
    if (o === '*' && b != null) e = expected / b;

    if (a == null) {
      return this.resolve(monkey.a, e);
    }
    if (b == null) {
      return this.resolve(monkey.b, e);
    }

    throw new Error(`${name} does not have a mising value`);
  }
}

function isNumberMonkey(m: MathMonkey): m is NumberMonkey {
  return (m as OperationMonkey).operator == null;
}
function itIsYou(m: MathMonkey): boolean {
  return m.name === 'humn';
}
