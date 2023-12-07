import { Solver } from './solver';

type Hand = {
  cards: string;
  bid: number;
};

const VALUES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

export class AdventOfCode2023Day07 extends Solver {
  hands: Hand[] = [];

  constructor(sub?: string) {
    super(7, sub);
    this.hands = this.lines
      .map((l) => l.split(' '))
      .map(([a, b]) => ({ cards: a, bid: +b }));
  }
  solvePart1(): number {
    const ranked = this.getRanked();

    return ranked.reduce((prev, curr, i) => {
      return prev + (i + 1) * curr.bid;
    }, 0);
  }

  solvePart2(): number {
    const ranked = this.getRanked2();
    return ranked.reduce((prev, curr, i) => {
      return prev + (i + 1) * curr.bid;
    }, 0);
  }

  getRanked(): Hand[] {
    const copy = [...this.hands];
    copy.sort((a, b) => this.compareHands(a, b));
    return copy;
  }

  getRanked2(): Hand[] {
    const copy = [...this.hands];
    copy.sort((a, b) => this.compareHands2(a, b));
    return copy;
  }

  compareHands(a: Hand, b: Hand): number {
    const typeA = this.getType(a.cards);
    const typeB = this.getType(b.cards);

    const c1 = typeB - typeA;
    if (c1 !== 0) return c1;

    const cmpString = (s: string) =>
      s
        .split('')
        .map((c) => String.fromCharCode(VALUES.indexOf(c) + 97))
        .join('');
    const sA = cmpString(a.cards);
    const sB = cmpString(b.cards);
    return sA.localeCompare(sB);
  }

  compareHands2(a: Hand, b: Hand): number {
    const typeA = this.getType(this.replaceJ(a.cards));
    const typeB = this.getType(this.replaceJ(b.cards));

    const c1 = typeB - typeA;
    if (c1 !== 0) return c1;

    const cmpString = (s: string) =>
      s
        .split('')
        .map((c) => String.fromCharCode(VALUES.indexOf(c) + 97))
        .join('');
    const sA = cmpString(this.replaceJWith(a.cards, '1'));
    const sB = cmpString(this.replaceJWith(b.cards, '1'));
    return sA.localeCompare(sB);
  }

  replaceJ(cards: string) {
    if (cards === 'JJJJJ') return 'AAAAA';
    const counts = this.countCards(cards);
    const target = Object.entries(counts)
      .map(([card, count]) => ({ card, count }))
      .filter((c) => c.card !== 'J')
      .sort((a, b) => b.count - a.count)[0].card;
    return this.replaceJWith(cards, target);
  }

  replaceJWith(cards: string, target: string) {
    return cards
      .split('')
      .map((c) => (c === 'J' ? target : c))
      .join('');
  }

  getType(cards: string): number {
    const count = this.countCards(cards);
    const counts = Object.values(count);
    counts.sort();
    if (counts.includes(5)) return 1;
    if (counts.includes(4)) return 2;
    if (counts.includes(3) && counts.includes(2)) return 3;
    if (counts.includes(3)) return 4;
    if (counts.join(',') === '1,2,2') return 5;
    if (counts.includes(2)) return 6;
    return 7;
  }

  countCards(cards: string): Record<string, number> {
    const record: Record<string, number> = {};
    cards.split('').forEach((c) => (record[c] = (record[c] || 0) + 1));
    return record;
  }
}
