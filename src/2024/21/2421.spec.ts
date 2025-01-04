import {
  getPossibleInputs,
  getScore,
  getShortestInput,
  iterate,
  NAVPAD,
  NUMPAD,
  solvePart1,
} from './2421';

const e1 = `029A
980A
179A
456A
379A`;

describe('2024 Day 21', () => {
  it('should get shortest num input', () => {
    expect(getShortestInput('029A', NUMPAD)).toEqual('<A^A>^^AvvvA');
    expect(getShortestInput('<A^A>^^AvvvA', NAVPAD)).toEqual(
      'v<<A>>^A<A>AvA<^AA>A<vAAA>^A',
    );
    expect(getShortestInput('<A^A>^^AvvvA', NAVPAD)).toEqual(
      'v<<A>>^A<A>AvA<^AA>A<vAAA>^A',
    );
  });

  it('should get shortest input for 179A', () => {
    expect(getShortestInput('179A', NUMPAD)).toEqual('^<<A^^A>>AvvvA');
  });

  it('should get possible inputs', () => {
    expect(getPossibleInputs('>A', NAVPAD)).toEqual(['vA^A']);
    expect(getPossibleInputs('>^A', NAVPAD)).toEqual(['vA^<A>A', 'vA<^A>A']);
  });

  it('should get shortest inputs for directions', () => {
    expect(getShortestInput('>A', NAVPAD)).toEqual('vA^A');
    expect(getShortestInput('<A', NAVPAD)).toEqual('v<<A>>^A');
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

  it('should solve more fast', () => {
    expect(iterate('<', 1)).toEqual(4);
    expect(iterate('<', 2)).toEqual(iterate('<<vA', 1));
    expect(iterate('<', 3)).toEqual(iterate('v<<A', 2));

    expect(iterate('<A', 1)).toEqual(8);
    expect(iterate('<A', 2)).toEqual(iterate('v<<A', 1) + iterate('>>^A', 1));
    expect(iterate('<A', 3)).toEqual(iterate('v<<A', 2) + iterate('>>^A', 2));

    expect(iterate('v<<A')).toEqual(10);
    expect(iterate('v<<A', 2)).toEqual(iterate('v<<A', 2));

    expect(iterate('<A^A>^^AvvvA')).toEqual(28);
    expect(iterate('<A^A>^^AvvvA', 2)).toEqual(68);

    expect(getScore('029A', 1)).toEqual(348);
    expect(getScore('029A', 2)).toEqual(812);
    expect(getScore('029A', 3)).toEqual(1972);
    expect(getScore('029A', 4)).toEqual(4756);
    expect(getScore('029A', 5)).toEqual(11716);
  });

  // it('should solve part 1', () => {
  //   // expect(solvePart2(e1)).toEqual(126384);
  // });
});
