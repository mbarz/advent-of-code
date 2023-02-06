type DecoderResult = {
  version: number;
  type: number;
  value?: number;
  packets?: DecoderResult[];
} & Record<string, unknown>;

export function decodePacketFromHex(hex: string): DecoderResult {
  const b = hex
    .split('')
    .map((h) => parseInt(h, 16).toString(2).padStart(4, '0'))
    .join('');
  return decodePacketFromBinary(b);
}
export function decodePacketFromBinary(b: string): DecoderResult {
  const result: Record<string, unknown> = {};
  result.version = parseInt(b.substring(0, 3), 2);
  result.type = parseInt(b.substring(3, 6), 2);

  if (result.type === 4) {
    let i = 6;
    let bValue = '';
    while (b.length - i > 4) {
      const part = b.substring(i + 1, i + 5);
      bValue += part;
      i += 5;
      if (b[i - 5] === '0') break;
    }
    result.value = parseInt(bValue, 2);
  } else {
    const packets: unknown[] = [];
    result.packets = packets;
    result.lengthType = parseInt(b.substring(6, 7), 2);
    if (result.lengthType === 0) {
      const payloadLength = parseInt(b.substring(7, 7 + 15), 2);
      let index = 6 + 1 + 15;
      while (index < 6 + 1 + 15 + payloadLength) {
        const packet = decodePacketFromBinary(b.substring(index));
        packets.push(packet);
        index += calcLength(packet);
      }
    } else {
      const packetCount = parseInt(b.substring(7, 7 + 11), 2);
      let index = 6 + 1 + 11;
      for (let n = 0; n < packetCount; ++n) {
        const packet = decodePacketFromBinary(b.substring(index));
        packets.push(packet);
        index += calcLength(packet);
      }
    }
  }

  return result as DecoderResult;
}

export function calcLength(obj: DecoderResult): number {
  if (obj.packets == null) {
    return 6 + (obj.value || 0).toString(16).length * 5;
  } else {
    const l = obj.lengthType === 0 ? 15 : 11;
    return (
      6 +
      1 +
      l +
      obj.packets.map((p) => calcLength(p)).reduce((a, b) => a + b, 0)
    );
  }
}

export function calcPacketVersionSum(hex: string) {
  const info = decodePacketFromHex(hex);
  return calcVersionSum(info);
}

function calcVersionSum(obj: DecoderResult): number {
  return (
    obj.version +
    (obj.packets || []).map((o) => calcVersionSum(o)).reduce((a, b) => a + b, 0)
  );
}

export function resolvePackets(obj: DecoderResult): number {
  if (obj.value) return obj.value;
  else if (obj.type === 0) {
    return obj
      .packets!.map((p) => resolvePackets(p))
      .reduce((a, b) => a + b, 0);
  } else if (obj.type === 1) {
    return obj
      .packets!.map((p) => resolvePackets(p))
      .reduce((a, b) => a * b, 1);
  } else if (obj.type === 2) {
    return Math.min(...obj.packets!.map((p) => resolvePackets(p)));
  } else if (obj.type === 3) {
    return Math.max(...obj.packets!.map((p) => resolvePackets(p)));
  } else if (obj.type === 5) {
    return resolvePackets(obj.packets![0]) > resolvePackets(obj.packets![1])
      ? 1
      : 0;
  } else if (obj.type === 6) {
    return resolvePackets(obj.packets![0]) < resolvePackets(obj.packets![1])
      ? 1
      : 0;
  } else if (obj.type === 7) {
    return resolvePackets(obj.packets![0]) === resolvePackets(obj.packets![1])
      ? 1
      : 0;
  }
  return 0;
}
