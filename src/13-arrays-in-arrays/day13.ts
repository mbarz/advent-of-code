export type Packet = (number | Packet)[];
export type Pair = { left: Packet; right: Packet };

export function parsePackets(input: string): Packet[] {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line));
}

export function buildPairs(packets: Packet[]): Pair[] {
  return packets
    .map((p, i, arr) => ({ left: p, right: arr[i + 1] }))
    .filter((_p, i) => i % 2 === 0);
}

export function checkPacket(left: Packet, right: Packet): boolean {
  const res = compare(left, right);
  return res < 1;
}

export function indicesOfCorrectPairs(input: Pair[]): number[] {
  return input
    .map((pair) => checkPacket(pair.left, pair.right))
    .map((correct, index) => ({ correct, index }))
    .filter(({ correct }) => correct)
    .map(({ index }) => index + 1);
}

export function compare(left: number | Packet, right: number | Packet): number {
  const lIsNumber = typeof left === 'number';
  const rIsNumber = typeof right === 'number';
  if (lIsNumber && rIsNumber) {
    return compareNumbers(left, right);
  } else if (!lIsNumber && !rIsNumber) {
    return compareLists(left, right);
  } else {
    return lIsNumber ? compare([left], right) : compare(left, [right]);
  }
}

function compareNumbers(left: number, right: number) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}
function compareLists(left: Packet, right: Packet) {
  for (let i = 0; i < Math.max(left.length, right.length); ++i) {
    const a = left[i];
    const b = right[i];
    if (a == null) return -1;
    if (b == null) return 1;
    const sub = compare(a, b);
    if (sub !== 0) return sub;
  }
  return 0;
}

export const DIVIDER_PACKETS = [[[2]], [[6]]];

export function getDecoderKey(packets: Packet[]) {
  const all = [...packets, ...DIVIDER_PACKETS];
  all.sort(compare);
  return DIVIDER_PACKETS.map((p) => all.indexOf(p) + 1).reduce(
    (a, b) => a * b,
    1
  );
}
