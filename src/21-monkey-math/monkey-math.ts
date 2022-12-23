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

type NumberMonkey = { name: string; value: number };
type OperationMonkey = { name: string; a: string; b: string; operator: string };

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
  parse(input: string) {
    this.monkeys = parseMathMonkeys(input);
  }
  getValueOf(name: string): number {
    const monkey = this.monkeys.find((m) => m.name === name);
    if (monkey == null) throw new Error(`Unknown Monkey "${name}"`);
    if (isNumberMonkey(monkey)) return monkey.value;
    const o = monkey.operator;
    const a = this.getValueOf(monkey.a);
    const b = this.getValueOf(monkey.b);
    if (o === '+') return a + b;
    if (o === '-') return a - b;
    if (o === '/') return a / b;
    if (o === '*') return a * b;
    throw new Error(`Unknown operator ${o} for monkey ${name}`);
  }
}

function isNumberMonkey(m: MathMonkey): m is NumberMonkey {
  return (m as OperationMonkey).operator == null;
}
