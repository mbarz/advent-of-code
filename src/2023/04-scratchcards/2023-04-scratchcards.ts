import { Solver } from '../util/solver';
import { calcSum } from '../util/util';

type Card = {
  cardNumber: number;
  left: number[];
  right: number[];
};

export class AdventOfCode2023Day04 implements Solver {
  cards: Card[] = [];

  constructor(input: string) {
    this.cards = input.split('\n').map((line) => this.readCard(line));
  }

  solvePart1() {
    return calcSum(this.cards.map((card) => this.getPoints(card)));
  }

  getMatchesOnCard({ left, right }: Card): number {
    return right.filter((n) => left.includes(n)).length;
  }

  getPoints(card: Card) {
    const matches = this.getMatchesOnCard(card);
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

      const matches = this.getMatchesOnCard(card);
      if (matches === 0) return 1;
      const children = this.cards.slice(n, n + matches);
      const count = calcSum(children.map((c) => calculate(c))) + 1;
      memory[n] = count;
      return count;
    };

    const values = this.cards.map((card) => calculate(card));
    return calcSum(values);
  }

  solvePart2Linear() {
    const counts = Array(this.cards.length).fill(1);
    for (const card of this.cards) {
      for (let i = 0; i < this.getMatchesOnCard(card); ++i) {
        counts[card.cardNumber + i] += counts[card.cardNumber - 1];
      }
    }
    return calcSum(counts);
  }
}
