import { readFileSync } from 'fs';
import { AdventOfCode2023Day08 } from './2023-08-haunted-wasteland';

describe('2023 - Day 8 - Haunted Wasteland', () => {
  it('should solve part 1', () => {
    expect(createSolver('test1').solvePart1()).toEqual(2);
    expect(createSolver('test2').solvePart1()).toEqual(6);
  });

  it('should solve part 2', () => {
    expect(createSolver('test3').solvePart2()).toEqual(6);
  });

  it('should get next z for position', () => {
    const s = createSolver('test3');
    expect(s.getDistanceToZ('22A')).toEqual(3);
    expect(s.getDistanceToZ('22C')).toEqual(1);
    expect(s.getDistanceToZ('22B')).toEqual(2);
    expect(s.getDistanceToZ('11A')).toEqual(2);
    expect(s.getDistanceToZ('11Z')).toEqual(2);
    expect(s.getDistanceToZ('22Z')).toEqual(3);
  });
});

function createSolver(input: string) {
  return new AdventOfCode2023Day08(
    readFileSync(__dirname + `/input-08.${input}.txt`, 'utf-8')
  );
}
