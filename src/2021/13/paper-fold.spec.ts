import { fold, parse } from './paper-fold';

describe('2021 - Day 13 - Transparent Origami', () => {
  it('should parse', () => {
    const example = parse('example');
    expect(example.points).toHaveLength(18);
    expect(example.instructions).toEqual([{ y: 7 }, { x: 5 }]);
  });

  it('should fold small examples', () => {
    expect(fold([], { y: 1 })).toEqual([]);
    expect(fold([{ x: 3, y: 3 }], { y: 4 })).toEqual([{ x: 3, y: 3 }]);
    expect(fold([{ x: 3, y: 3 }], { y: 2 })).toEqual([{ x: 3, y: 1 }]);
  });

  it('should fold parsed example', () => {
    const example = parse('example');
    const points = fold(example.points, example.instructions[0]);
    expect(points).toHaveLength(17);
  });

  it('should fold parsed puzzle', () => {
    const example = parse('puzzle');
    const points = fold(example.points, example.instructions[0]);
    expect(points).toHaveLength(731);
  });
});
