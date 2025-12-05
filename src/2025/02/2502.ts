/**
 * 44854383294
 */
export function solvePart1(input: string) {
  return getAllNumbers(input)
    .filter((n) => isDoubleSequence(n))
    .reduce((sum, n) => sum + n, 0);
}

/**
 * 55647141923
 */
export function solvePart2(input: string) {
  return getAllNumbers(input)
    .filter((n) => isRepeatingPattern(n))
    .reduce((sum, n) => sum + n, 0);
}

function range(a: number, b: number, step = 1): number[] {
  const length = Math.floor((b - a + 1) / step);
  if (length < 0) throw new Error(`Invalid range: ${a}-${b}`);
  return Array.from({ length: length }, (_, i) => a + i * step);
}

function getRanges(input: string) {
  const rangeRegex = new RegExp(/(\d+)-(\d+)/, 'g');
  return Array.from(input.matchAll(rangeRegex)).map(([, a, b]) => [+a, +b]);
}

function getAllNumbers(input: string) {
  return getRanges(input).flatMap(([a, b]) => range(a, b));
}

function isDoubleSequence(n: number) {
  const s = n.toString();
  if (s.length % 2) return false;
  const mid = s.length / 2;
  const left = s.slice(0, mid);
  const right = s.slice(mid);
  return left === right;
}

function splitIntoChunks(s: string, chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < s.length; i += chunkSize) {
    chunks.push(s.slice(i, i + chunkSize));
  }
  return chunks;
}

export function isRepeatingPattern(n: number) {
  const s = n.toString();
  for (let i = 0; i < Math.floor(s.length / 2); ++i) {
    const parts = splitIntoChunks(s, i + 1);
    const first = parts.shift();
    if (!parts.some((p) => p !== first)) return true;
  }
  return false;
}
