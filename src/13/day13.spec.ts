import { readFileSync } from 'fs';
import { join } from 'path';
import {
  checkPacket,
  compare,
  buildPairs,
  getDecoderKey,
  indicesOfCorrectPairs,
  Packet,
  Pair,
  parsePackets,
} from './day13';

describe.only('Day 13', () => {
  let exampleInput = '';
  let examplePairs: Pair[] = [];
  let examplePackets: Packet[] = [];

  beforeEach(() => {
    exampleInput = readFileSync(
      join(__dirname, 'day13-example-input.txt'),
      'utf-8'
    );
    examplePackets = parsePackets(exampleInput);
    examplePairs = buildPairs(examplePackets);
  });

  it('should parse', () => {
    expect(examplePairs).toHaveLength(8);
    expect(examplePairs[0]).toEqual({
      left: [1, 1, 3, 1, 1],
      right: [1, 1, 5, 1, 1],
    });
  });

  it('should catch arrays with different length', () => {
    expect(checkPacket([1], [1])).toEqual(true);
    expect(checkPacket([1], [1, 1])).toEqual(true);
    expect(checkPacket([1, 1], [1])).toEqual(false);
  });

  it('should compare arrays element by element', () => {
    expect(checkPacket([1], [1])).toEqual(true);
    expect(checkPacket([1], [2])).toEqual(true);
    expect(checkPacket([2], [1])).toEqual(false);
    expect(checkPacket([1, 1], [1, 1])).toEqual(true);
    expect(checkPacket([1, 1], [1, 2])).toEqual(true);
    expect(checkPacket([1, 2], [1, 1])).toEqual(false);
  });

  it.each([
    [1, true],
    [2, true],
    [3, false],
    [4, true],
    [5, false],
    [6, true],
    [7, false],
    [8, false],
  ])('should check example %s', (n, result) => {
    const pair = examplePairs[n - 1];
    expect(checkPacket(pair.left, pair.right)).toEqual(result);
  });

  it('should return indeces of correct pairs', () => {
    const indices = indicesOfCorrectPairs(examplePairs);
    expect(indices).toHaveLength(4);
    expect(indices).toEqual([1, 2, 4, 6]);
  });

  it('should sort', () => {
    const arr = [
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
    ];
    const [a, b] = arr;
    expect(compare(a, b)).toEqual(-1);
    expect(compare(b, a)).toEqual(1);
    arr.sort(compare);
    expect(arr).toEqual([a, b]);
  });

  it('should sort packets', () => {
    const packets = [...examplePackets, [[2]], [[6]]];

    packets.sort((a, b) => compare(a, b));

    expect(packets.map((e) => JSON.stringify(e))).toEqual(
      [
        [],
        [[]],
        [[[]]],
        [1, 1, 3, 1, 1],
        [1, 1, 5, 1, 1],
        [[1], [2, 3, 4]],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [[1], 4],
        [[2]],
        [3],
        [[4, 4], 4, 4],
        [[4, 4], 4, 4, 4],
        [[6]],
        [7, 7, 7],
        [7, 7, 7, 7],
        [[8, 7, 6]],
        [9],
      ].map((e) => JSON.stringify(e))
    );
  });

  it('should get decoder key', () => {
    expect(getDecoderKey([...examplePackets])).toEqual(140);
  });

  it('should solve complicated', () => {
    const [a, b] = parsePackets(
      ['[[[1]],[[[],[],4]]]', '[[[]],[[[],[6,0,7,9,7]],5]]'].join('\n')
    );
    expect(compare(a, b)).toEqual(1);
    expect(compare(b, a)).toEqual(-1);
  });
});
