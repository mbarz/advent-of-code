import {
  countPolymerPairs,
  developPolymerPairs,
  parsePolymerPuzzleInput,
  solveAOC2021Day14,
  splitPolymer,
} from './polymer';

const exampleInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

describe('2021 - Day 14 - Polymers', () => {
  it('should split  polymer', () => {
    const pairs = splitPolymer('ABCD');
    expect(pairs).toEqual(['AB', 'BC', 'CD']);
  });

  it('should develop polymer pairs', () => {
    const { polymer, rules } = parsePolymerPuzzleInput(exampleInput);
    expect(developPolymerPairs({}, rules)).toEqual({});
    const pairs = countPolymerPairs(polymer);
    expect(pairs).toEqual({ NC: 1, CB: 1, NN: 1 });
    expect(developPolymerPairs(pairs, rules)).toEqual({
      BC: 1,
      CH: 1,
      CN: 1,
      HB: 1,
      NB: 1,
      NC: 1,
    });

    expect(developPolymerPairs(pairs, rules, 2)).toEqual({
      BB: 2,
      BC: 2,
      BH: 1,
      CB: 2,
      CC: 1,
      CN: 1,
      HC: 1,
      NB: 2,
    });
  });

  it.each([0, 1, 2, 3, 10])('should grow on base 2', (steps) => {
    const { polymer, rules } = parsePolymerPuzzleInput(exampleInput);
    const pairs = countPolymerPairs(polymer);
    const resultPairs = developPolymerPairs(pairs, rules, steps);
    const count = Object.values(resultPairs).reduce((a, b) => a + b, 0);
    expect(count).toEqual(3 * Math.pow(2, steps));
  });

  it('should calculate occurences', () => {
    const { polymer, rules } = parsePolymerPuzzleInput(exampleInput);
    expect(solveAOC2021Day14(polymer, rules, 10)).toEqual(1588);
    expect(solveAOC2021Day14(polymer, rules, 40)).toEqual(2188189693529);
  });
});
