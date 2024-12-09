import { swap } from '../util/array';

type Byte = number | null;
export type Segment = { pos: number; size: number };
export type File = Segment & { id: number };

type ParseResult = {
  bytes: Byte[];
  spaces: Segment[];
  files: File[];
};

export function solvePart1(input: string) {
  return calcChecksum(defrag(parseInput(input, { splitFiles: true })));
}

export function solvePart2(input: string) {
  return calcChecksum(defrag(parseInput(input)));
}

export function parseInput(
  input: string,
  options: { splitFiles: boolean } = { splitFiles: false },
): ParseResult {
  const digits = input.split('').map(Number);
  const files: File[] = [];
  const spaces: Segment[] = [];
  const bytes: Byte[] = [];
  let fileId = 0;
  for (let i = 0; i < digits.length; i++) {
    const size = digits[i];
    const even = i % 2 === 0;
    const pos = bytes.length;
    bytes.push(...Array(size).fill(even ? fileId : null));
    if (even) {
      if (options.splitFiles) {
        files.push(
          ...Array(size)
            .fill(0)
            .map((_, i) => ({ pos: pos + i, size: 1, id: fileId })),
        );
        fileId++;
      } else {
        files.push({ pos, size: size, id: fileId++ });
      }
    }
    if (!even) spaces.push({ pos, size: size });
  }
  return { bytes: bytes, spaces, files };
}

export function defrag(input: ParseResult) {
  const { spaces, bytes } = input;
  const files = input.files;

  for (const file of files.slice().reverse()) {
    const space = spaces.find(
      ({ pos, size }) => pos < file.pos && file.size <= size,
    );
    if (space == null) continue;
    for (let i = 0; i < file.size; ++i) {
      swap(bytes, file.pos + i, space.pos + i);
    }
    space.pos += file.size;
    space.size -= file.size;
  }
  return bytes;
}

export function calcChecksum(bytes: Byte[]) {
  return bytes.map((b, i) => (b ?? 0) * i).reduce((a, b) => a + b, 0);
}

export function print(bytes: (number | null)[]) {
  return bytes.map((b) => b ?? '.').join('');
}
