import {
  move,
  moveMultiple,
  paintState,
  paintVisitedByTail,
  parseInstructions,
  state,
} from './09';

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
    expect(s.knots[0]).toEqual(endPos);
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

  function parse(s: string) {
    const lines = (
      s.match(/\w\d+/g)?.map((p) => p.substring(0, 1) + ' ' + p.substring(1)) ||
      []
    ).join('\n');
    return parseInstructions(lines);
  }

  it('should move multiple', () => {
    const s = moveMultiple(state(), parse('R4U4L3D1R4D1L5R2'));
    expect(s.visitedByTail).toHaveLength(13);
  });

  it('should move multiple knots on first example', () => {
    const s = moveMultiple(state({ knotCount: 10 }), parse('R4U4L3D1R4D1L5R2'));
    expect(s.visitedByTail).toHaveLength(1);
  });

  it('should move multiple knots on bigger example', () => {
    const start = { x: 11, y: 21 - 16 };
    let s = state({ start, knotCount: 10 });
    s = moveMultiple(s, parse('R5U8L8D3R17D10L25U20'));
    paintState(s, [26, 21]);
    paintVisitedByTail(s);
    expect(s.visitedByTail).toHaveLength(36);
  });
});
