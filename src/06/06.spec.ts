import { readFileSync } from 'fs';

function getStartOfPacket(s: string): number {
  return getFirstDistinctIndex(s, 4);
}

function getStartOfMessage(s: string): number {
  return getFirstDistinctIndex(s, 14);
}

function getFirstDistinctIndex(s: string, length: number): number {
  let seq = '';
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    seq = seq.substring(seq.indexOf(char) + 1) + char;
    if (seq.length === length) return i + 1;
  }
  return 0;
}

describe('Day6', () => {
  it.each([
    { stream: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', start: 7 },
    { stream: 'bvwbjplbgvbhsrlpgdmjqwftvncz', start: 5 },
    { stream: 'nppdvjthqldpwncqszvftbrmjlhg', start: 6 },
    { stream: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', start: 10 },
    { stream: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', start: 11 },
    { stream: readFileSync(`${__dirname}/06.txt`, 'utf8'), start: 1658 },
  ])('should detect start of packet', ({ start, stream }) => {
    expect(getStartOfPacket(stream)).toEqual(start);
  });

  it.each([
    { stream: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', start: 19 },
    { stream: 'bvwbjplbgvbhsrlpgdmjqwftvncz', start: 23 },
    { stream: 'nppdvjthqldpwncqszvftbrmjlhg', start: 23 },
    { stream: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', start: 29 },
    { stream: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', start: 26 },
    { stream: readFileSync(`${__dirname}/06.txt`, 'utf8'), start: 2260 },
  ])('should detect start of message', ({ start, stream }) => {
    expect(getStartOfMessage(stream)).toEqual(start);
  });
});
