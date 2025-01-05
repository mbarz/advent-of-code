import { solvePart1, solvePart2 } from './2423';

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

  it('should solve part 2', () => {
    expect(solvePart2('')).toEqual(0);
  });
});
