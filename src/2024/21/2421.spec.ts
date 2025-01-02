import { getScore, getShortestInput, NAVPAD, NUMPAD, solvePart1 } from './2421';

const e1 = `029A
980A
179A
456A
379A`;

describe('2024 Day 21', () => {
  it('should get shortest num input', () => {
    expect(getShortestInput('029A', NUMPAD)).toEqual('<A^A>^^AvvvA');
    expect(getShortestInput('<A^A>^^AvvvA', NAVPAD)).toEqual(
      '<<vA>>^A<A>AvA<^AA>A<vAAA>^A',
    );
    expect(getShortestInput('<A^A>^^AvvvA', NAVPAD)).toEqual(
      '<<vA>>^A<A>AvA<^AA>A<vAAA>^A',
    );
  });

  it('should get shortest input for 179A', () => {
    expect(getShortestInput('179A', NUMPAD)).toEqual('^<<A^^A>>AvvvA');
  });

  it('should get shortest inputs for directions', () => {
    expect(getShortestInput('>A', NAVPAD)).toEqual('vA^A');
    expect(getShortestInput('<A', NAVPAD)).toEqual('<<vA>>^A');
    expect(getShortestInput('vA', NAVPAD)).toEqual('<vA>^A');
    expect(getShortestInput('^A', NAVPAD)).toEqual('<A>A');

    expect(getShortestInput('>^A', NAVPAD)).toEqual('vA<^A>A');
    expect(getShortestInput('^>A', NAVPAD)).toEqual('<A>vA^A');

    expect(getShortestInput('>vA', NAVPAD)).toEqual('vA<A>^A');
    expect(getShortestInput('v>A', NAVPAD)).toEqual('<vA>A^A');
  });

  it('should get score', () => {
    expect(getScore('029A')).toEqual(29 * 68);
    expect(getScore('980A')).toEqual(60 * 980);
    expect(getScore('179A')).toEqual(68 * 179);
    expect(getScore('456A')).toEqual(64 * 456);
    expect(getScore('379A')).toEqual(64 * 379);
  });

  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual(126384);
  });
});
