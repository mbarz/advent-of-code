export type Packet = (number | Packet)[];
export type Pair = { left: Packet; right: Packet };

export function parsePairs(input: string): Pair[] {
  return buildPairs(parsePackets(input));
}

function buildPairs(packets: Packet[]): Pair[] {
  return packets
    .map((p, i, arr) => ({ left: p, right: arr[i + 1] }))
    .filter((_p, i) => i % 2 === 0);
}

export function parsePackets(input: string): Packet[] {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line));
}

export function checkPacket(left: Packet, right: Packet): boolean {
  const res = compare(left, right);
  return res < 1;
}

export function indicesOfCorrectPairs(intput: Pair[]): number[] {
  return intput
    .map((pair) => checkPacket(pair.left, pair.right))
    .map((correct, index) => ({ correct, index }))
    .filter(({ correct }) => correct)
    .map(({ index }) => index + 1);
}

export function flattenPacket(list: Packet): number[] {
  const json = JSON.stringify(list);
  return json.match(/(\d+)/g)?.map((d) => Number(d)) || [];
}

const LOG_DISABLED = true;
function log(s: string, level: number) {
  if (LOG_DISABLED) return;
  const padding = Array(level * 2)
    .fill(' ')
    .join('');
  console.log(`${padding}- ${s}`);
}

export function compare(
  left: number | Packet,
  right: number | Packet,
  level = 0
): number {
  const ljson = JSON.stringify(left);
  const rjson = JSON.stringify(right);

  const lIsNumber = typeof left === 'number';
  const rIsNumber = typeof right === 'number';

  log(`Compare ${ljson} VS ${rjson}`, level);

  if (lIsNumber && rIsNumber) {
    if (left === right) return 0;
    if (left < right) {
      log('Left side is smaller, so inputs are in the right order', level + 1);
      return -1;
    } else {
      log(
        'Right side is smaller, so inputs are not in the right order',
        level + 1
      );
      return 1;
    }
  } else if (!lIsNumber && !rIsNumber) {
    for (let i = 0; i < left.length; i++) {
      if (i >= right.length) {
        log(
          'Right side ran out of items, so inputs are not in the right order',
          level + 1
        );
        return 1;
      }
      const sub = compare(left[i], right[i], level + 1);
      if (sub !== 0) return sub;
    }
    log(
      'Left side ran out of items, so inputs are in the right order',
      level + 1
    );
    return -1;
  } else {
    return lIsNumber
      ? compare([left], right, level + 1)
      : compare(left, [right], level + 1);
  }
}

export function comparePackets(left: Packet, right: Packet) {
  const [lflat, rflat] = [left, right].map((l) => flattenPacket(l));
  for (let i = 0; i < lflat.length; i++) {
    if (i >= rflat.length) return 1;
    if (lflat[i] < rflat[i]) return -1;
    if (lflat[i] > rflat[i]) return 1;
  }
  if (rflat.length > lflat.length) return -1;
  const [ljson, rjson] = [left, right].map((l) => JSON.stringify(l));
  return ljson.length - rjson.length;
}

export const DIVIDER_PACKETS = [[[2]], [[6]]];

export function getDecoderKey(packets: Packet[]) {
  const all = [...packets, ...DIVIDER_PACKETS];
  all.sort(comparePackets);
  return DIVIDER_PACKETS.map((p) => all.indexOf(p) + 1).reduce(
    (a, b) => a * b,
    1
  );
}
