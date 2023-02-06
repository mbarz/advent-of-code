import {
  calcLength,
  calcPacketVersionSum,
  decodePacketFromBinary,
  decodePacketFromHex,
  resolvePackets,
} from './packet-decoder';

describe('2021 - Day 16 - Packet Decoder', () => {
  {
    it('should decode version and type', () => {
      const decoded = decodePacketFromHex('D2FE28');
      expect(decoded.version).toEqual(0b110);
      expect(decoded.type).toEqual(0b100);
      expect(calcLength(decoded)).toEqual(21);
    });

    it('should decode binary', () => {
      const decoded = decodePacketFromBinary(
        '1101000101001010010001001000000000'
      );
      expect(decoded).toEqual({ version: 6, type: 4, value: 10 });
    });

    it('should decode literal value', () => {
      const decoded = decodePacketFromHex('D2FE28');
      expect(decoded).toEqual({ version: 6, type: 4, value: 2021 });
    });

    it('should decode with payload length for length type 0', () => {
      const decoded = decodePacketFromHex('38006F45291200');
      expect(decoded.version).toEqual(1);
      expect(decoded.lengthType).toEqual(0);
      expect(decoded.packets).toHaveLength(2);
      expect(decoded.packets?.map((p) => p.version)).toEqual([6, 2]);
      expect(decoded.packets?.map((p) => p.value)).toEqual([10, 20]);
      expect(calcLength(decoded)).toEqual(49);
    });

    it('should decode with packet count for length type 1', () => {
      const decoded = decodePacketFromHex('EE00D40C823060');
      expect(decoded.version).toEqual(7);
      expect(decoded.lengthType).toEqual(1);
      expect(decoded.packets).toHaveLength(3);
      expect(decoded.packets?.map((p) => p.version)).toEqual([2, 4, 1]);
      expect(decoded.packets?.map((p) => p.value)).toEqual([1, 2, 3]);
      expect(calcLength(decoded)).toEqual(51);
    });

    it('should decode', () => {
      const decoded = decodePacketFromHex('A0016C880162017C3686B18A3D4780');
      expect(decoded.packets?.[0].packets?.[0].packets).not.toEqual([]);
    });

    it('should decode nested packets', () => {
      const decoded = decodePacketFromHex('8A004A801A8002F478');
      expect(decoded).toEqual({
        version: 4,
        type: 2,
        lengthType: 1,
        packets: [
          {
            version: 1,
            type: 2,
            lengthType: 1,
            packets: [
              {
                version: 5,
                type: 2,
                lengthType: 0,
                packets: [{ version: 6, type: 4, value: 15 }],
              },
            ],
          },
        ],
      });
      expect(calcLength(decoded)).toEqual(69);
    });

    it.each([
      ['D2FE28', 6],
      ['38006F45291200', 9],
      ['EE00D40C823060', 14],
      ['8A004A801A8002F478', 16],
      ['620080001611562C8802118E34', 12],
      ['C0015000016115A2E0802F182340', 23],
      ['A0016C880162017C3686B18A3D4780', 31],
    ])('should calculate version sum', (given, expected) => {
      expect(calcPacketVersionSum(given)).toEqual(expected);
    });

    it.each([
      ['C200B40A82', 3],
      ['04005AC33890', 54],
      ['880086C3E88112', 7],
      ['CE00C43D881120', 9],
      ['D8005AC2A8F0', 1],
      ['F600BC2D8F', 0],
      ['9C005AC2F8F0', 0],
      ['9C0141080250320F1802104A08', 1],
    ])('should calculate using operations', (given, expected) => {
      expect(resolvePackets(decodePacketFromHex(given))).toEqual(expected);
    });
  }
});
