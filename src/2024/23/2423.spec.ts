import {
  getConnectionMap,
  getPairs,
  grow,
  growAll,
  paulson,
  solvePart1,
  solvePart2,
  withStack,
} from './2423';

const e1 = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

describe('2024 Day 23', () => {
  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual(7);
  });

  it('should get connections', () => {
    const map = getConnectionMap(e1);
    expect(map.size).toEqual(16);
    expect(map.get('cg')).toEqual(['aq', 'de', 'tb', 'yn']);
    expect(map.get('aq')).toEqual(['cg', 'vc', 'wq', 'yn']);
  });

  it('should grow', () => {
    const map = getConnectionMap(e1);
    expect(grow(['co'], map)).toEqual([
      ['co', 'de'],
      ['co', 'ka'],
      ['co', 'ta'],
      ['co', 'tc'],
    ]);
    expect(grow(['co', 'de'], map)).toEqual([
      ['co', 'de', 'ka'],
      ['co', 'de', 'ta'],
    ]);
    expect(grow(['co', 'de', 'ka'], map)).toEqual([['co', 'de', 'ka', 'ta']]);
    expect(grow(['co', 'de', 'ka', 'ta'], map)).toEqual([]);
    expect(
      growAll(
        [
          ['co', 'de', 'ka'],
          ['co', 'de', 'ta'],
        ],
        map,
      ),
    ).toEqual([['co', 'de', 'ka', 'ta']]);
    expect(grow(['co', 'de', 'ka', 'ta'], map)).toEqual([]);
    expect(growAll(getPairs(e1), map).length).toEqual(12);
    expect(
      growAll(
        [
          ['co', 'de', 'ka'],
          ['ub', 'vc', 'wq'],
        ],
        map,
      ),
    ).toEqual([['co', 'de', 'ka', 'ta']]);
  });

  it('should solve part 2', () => {
    expect(solvePart2(e1)).toEqual('co,de,ka,ta');
  });

  it('should solve part 2 with stack', () => {
    expect(withStack(e1)).toEqual('co,de,ka,ta');
  });

  it('should solve part 2 with luck', () => {
    expect(paulson(e1)).toEqual('co,de,ka,ta');
  });
});
