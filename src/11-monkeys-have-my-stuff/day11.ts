type Monkey = {
  name: string;
  items: number[];
  changeLevel: (level: number) => number;
  divisor: number;
  falseTarget: number;
  trueTarget: number;
};

export function parseMonkeys(s: string): Monkey[] {
  const lines = s.split('\n');
  const monkeys: Monkey[] = [];
  let current: Monkey | undefined;
  for (let ln = 0; ln < lines.length; ln += 7) {
    current = {
      items: [],
      changeLevel: (n) => n,
      divisor: 1,
      name: `Monkey ${ln / 7}`,
      trueTarget: 0,
      falseTarget: 0,
    };
    monkeys.push(current);
    const itemsLine = lines[ln + 1];
    current.items = itemsLine
      .split('Starting items: ')[1]
      .split(',')
      .map((i) => Number(i));
    const opLine = lines[ln + 2];
    const op = opLine.split('Operation: ')[1];
    const operand = op.includes('*') ? '*' : '+';
    const n = op.split(operand + ' ')[1];

    current.changeLevel = (old) => {
      const b = n === 'old' ? old : Number(n);
      return operand === '*' ? b * old : b + old;
    };
    current.divisor = Number(lines[ln + 3].split('divisible by ')[1]);
    current.trueTarget = Number(lines[ln + 4].split('monkey ')[1]);
    current.falseTarget = Number(lines[ln + 5].split('monkey ')[1]);
  }
  return monkeys;
}

export function run(
  monkeys: Monkey[],
  rounds = 1,
  strategy: (n: number) => number = (n: number) => Math.floor(n / 3)
) {
  const inspections: number[] = monkeys.map(() => 0);
  for (let i = 0; i < rounds; i++) {
    for (let i = 0; i < monkeys.length; i++) {
      inspections[i] += monkeys[i].items.length;
      handleMonkey(monkeys, monkeys[i], strategy);
    }
  }
  return { inspections };
}

const LOG_ENABLED = false;
const log = (s: string) => {
  if (LOG_ENABLED) console.log(s);
};

function handleMonkey(
  monkeys: Monkey[],
  monkey: Monkey,
  strategy: (n: number) => number
) {
  log(`${monkey.name}`);
  while (monkey.items.length) {
    const item = monkey.items.shift() as number;
    log(`  monkey inspects an item with a worry level of ${item}`);
    const raised = monkey.changeLevel(item);
    log(`    worry level increases by ${raised - item} to ${raised}`);
    const updated = strategy(raised);
    log(
      `    monkey gets bored with item. Worry level is reduced to ${updated}`
    );
    const divisible = updated % monkey.divisor === 0;
    log(
      `    Current worry level is${divisible ? '' : ' not'} divisible by ${
        monkey.divisor
      }.`
    );

    const target = divisible ? monkey.trueTarget : monkey.falseTarget;
    log(`    Item with worry level ${updated} is thrown to monkey ${target}`);
    monkeys[target].items.push(updated);
  }
}

export function levelOfMonkeyBusiness(input: string, rounds: number, part = 1) {
  const monkeys = parseMonkeys(input);
  const divisors = monkeys.map((m) => m.divisor);
  const m = divisors.reduce((a, b) => a * b, 1);
  const strategy =
    part === 1 ? (n: number) => Math.floor(n / 3) : (n: number) => n % m;
  const result = run(monkeys, rounds, strategy);
  const [a, b] = result.inspections.sort((a, b) => b - a);
  return a * b;
}
