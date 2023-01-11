import { resolve7Segment, resolveEntry } from './7-segment-resolver';

describe('2021 Day 8', () => {
  it('should resolve example', () => {
    const resolved = resolve7Segment(
      'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' ')
    );
    expect(resolved[0]).toEqual('cagedb');
    expect(resolved[1]).toEqual('ab');
    expect(resolved[2]).toEqual('gcdfa');
    expect(resolved[3]).toEqual('fbcad');
    expect(resolved[4]).toEqual('eafb');
    expect(resolved[5]).toEqual('cdfbe');
    expect(resolved[6]).toEqual('cdfgeb');
    expect(resolved[7]).toEqual('dab');
    expect(resolved[8]).toEqual('acedgfb');
    expect(resolved[9]).toEqual('cefabd');
  });

  it('should resolve special entries digits', () => {
    const resolved = resolve7Segment(
      'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf'.split(' ')
    );
    expect(resolved[1]).toEqual('gf');
    expect(resolved[3]).toEqual('dbcfg');
    expect(resolved[9]).toEqual('gdcebf');
    expect(resolved[5]).toEqual('fbedc');
  });

  it('should resolve entry', () => {
    expect(
      resolveEntry(
        'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
      )
    ).toEqual(5353);
  });

  it('should resolve special entry', () => {
    expect(
      resolveEntry(
        'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe'
      )
    ).toEqual(4548);
  });
});
