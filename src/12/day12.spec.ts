import { parse, shortestPath } from './day12';

const exampleInput = [
  'Sabqponm',
  'abcryxxl',
  'accszExk',
  'acctuvwj',
  'abdefghi',
].join('\n');

describe('Day12', () => {
  it('should parse', () => {
    const { graph } = parse(exampleInput);

    expect(Object.keys(graph).length).toEqual(8 * 5);
    expect(graph['0;0'].join(' ')).toEqual('1;0 0;1');
    expect(graph['0;1'].join(' ')).toEqual('1;1 0;0 0;2');
    expect(graph['0;2'].join(' ')).toEqual('1;2 0;1');
    expect(graph['0;3'].join(' ')).toEqual('1;3 0;2 0;4');
  });

  it('should find shortest path', () => {
    const { graph } = parse(exampleInput);
    const { shortestDistance } = shortestPath('0;0', '2;5', graph);
    expect(shortestDistance).toEqual(31);
  });
});
