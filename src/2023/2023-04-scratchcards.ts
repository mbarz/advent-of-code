import { calcSum } from './util';

type Card = {
  cardNumber: number;
  left: number[];
  right: number[];
};

export class AdventOfCode2023Day04 {
  originalCards: Card[] = [];

  constructor(lines: string[]) {
    this.originalCards = lines.map((line) => this.readCard(line));
  }

  run() {
    console.log('Welcome to Advent of Code 2023 - Day 4\n');
    console.log('Solving part 1...');
    console.time('Part1');
    const part1 = this.solvePart1();
    console.timeEnd('Part1');
    console.log(`Solution: ${part1}`);
    console.log('Solving part 2...');
    console.time('Part2');
    const part2 = this.solvePart2();
    console.timeEnd('Part2');
    console.log(`Solution: ${part2}`);
  }
  solvePart1() {
    return calcSum(this.originalCards.map((card) => this.getPoints(card)));
  }

  getMatchesOnCard({ left, right }: Card) {
    return right.filter((n) => left.includes(n));
  }

  getPoints(card: Card) {
    const matches = this.getMatchesOnCard(card).length;
    return matches ? Math.pow(2, matches - 1) : 0;
  }

  readCard(line: string): Card {
    const [n, content] = line.split(':');
    const [left, right] = content
      .split('|')
      .map((s) => s.trim())
      .map((s) => s.split(/\s+/).map((s) => Number(s)));
    return { cardNumber: +n.slice(4).trim(), left, right };
  }

  solvePart2() {
    const memory: Record<number, number> = {};

    const calculate: (card: Card) => number = (card: Card) => {
      const { cardNumber: n } = card;
      const stored = memory[n];
      if (stored != null) return stored;

      const matches = this.getMatchesOnCard(card).length;
      if (matches === 0) return 1;
      const children = this.originalCards.slice(n, n + matches);
      const count = calcSum(children.map((c) => calculate(c))) + 1;
      memory[n] = count;
      return count;
    };

    const values = this.originalCards.map((card) => calculate(card));
    return calcSum(values);
  }
}
