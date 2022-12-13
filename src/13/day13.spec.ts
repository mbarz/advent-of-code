import { readFileSync } from 'fs';
import { join } from 'path';
import {
  checkPacket,
  comparePackets,
  getDecoderKey,
  indicesOfCorrectPairs,
  Packet,
  Pair,
  parsePackets,
  parsePairs,
} from './day13';

describe.only('Day 13', () => {
  let exampleInput = '';
  let examplePairs: Pair[] = [];
  let examplePackets: Packet[] = [];
  let puzzlePackets: Packet[] = [];

  beforeAll(() => {
    exampleInput = readFileSync(
      join(__dirname, 'day13-example-input.txt'),
      'utf-8'
    );
    examplePairs = parsePairs(exampleInput);
    examplePackets = parsePackets(exampleInput);
    const puzzleInput = readFileSync(
      join(__dirname, 'day13-puzzle-input.txt'),
      'utf-8'
    );
    puzzlePackets = parsePackets(puzzleInput);
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
    expect(indicesOfCorrectPairs(examplePairs)).toEqual([1, 2, 4, 6]);
  });

  it('should sort', () => {
    const elements = [[[4, 4], 4, 4, 4], [[4, 4], 4, 4], [], [[]]];
    expect(comparePackets(elements[0], elements[1])).toEqual(1);
    expect(comparePackets(elements[1], elements[0])).toEqual(-1);
    elements.sort(comparePackets);
    expect(elements).toEqual([[], [[]], [[4, 4], 4, 4], [[4, 4], 4, 4, 4]]);
  });

  it('should sort', () => {
    const arr = [
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
    ];
    const [a, b] = arr;
    expect(comparePackets(a, b)).toEqual(-1);
    expect(comparePackets(b, a)).toEqual(1);
    arr.sort(comparePackets);
    expect(arr).toEqual([a, b]);
  });

  it('should sort packets', () => {
    const packets = [...examplePackets, [[2]], [[6]]];
    packets.sort(comparePackets);
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
    expect(getDecoderKey(examplePackets)).toEqual(140);
  });

  it('should solve complicated', () => {
    const [a, b] = parsePackets(
      ['[[[1]],[[[],[],4]]]', '[[[]],[[[],[6,0,7,9,7]],5]]'].join('\n')
    );
    expect(comparePackets(a, b)).toEqual(-1);
    expect(comparePackets(b, a)).toEqual(1);
  });
});
