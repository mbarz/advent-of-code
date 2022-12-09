import { readFileSync } from 'fs';
import { state, move, moveMultiple, parseInstructions } from './09';

describe('Day 9', () => {
  it('should move head', () => {
    let s = state({});
    s = move(s, 'U');
    expect(s.head).toEqual({ x: 0, y: 1 });
    s = move(s, 'R');
    expect(s.head).toEqual({ x: 1, y: 1 });
    s = move(s, 'D');
    expect(s.head).toEqual({ x: 1, y: 0 });
    s = move(s, 'L');
    expect(s.head).toEqual({ x: 0, y: 0 });
  });

  it.each([
    ['Up', 'UU', { x: 0, y: 1 }],
    ['Down', 'DD', { x: 0, y: -1 }],
    ['Left', 'LL', { x: -1, y: 0 }],
    ['Right', 'RR', { x: 1, y: 0 }],
    ['RUU', 'RUU', { x: 1, y: 1 }],
    ['LUU', 'LUU', { x: -1, y: 1 }],
    ['LUU', 'LUU', { x: -1, y: 1 }],
    ['RDD', 'RDD', { x: 1, y: -1 }],
    ['URR', 'URR', { x: 1, y: 1 }],
    ['DRR', 'DRR', { x: 1, y: -1 }],
  ])('should pull the tail %s', (_s, moves, endPos) => {
    let s = state({});
    moves.split('').forEach((direction) => (s = move(s, direction as any)));
    expect(s.tail).toEqual(endPos);
  });

  it('should track tail positions', () => {
    let s = state({});
    s = move(s, 'U');
    s = move(s, 'U');
    s = move(s, 'R');
    s = move(s, 'R');

    expect(s.visitedByTail).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 2 },
    ]);
  });

  const exampleInput = [
    'R 4',
    'U 4',
    'L 3',
    'D 1',
    'R 4',
    'D 1',
    'L 5',
    'R 2',
  ].join('\n');

  it('should move multiple', () => {
    const s = moveMultiple(state(), parseInstructions(exampleInput));
    expect(s.visitedByTail).toHaveLength(13);
  });
});
