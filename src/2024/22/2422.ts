export function mix(a: bigint, b: bigint): bigint {
  return a ^ b;
}

export function prune(n: bigint): bigint {
  return n % BigInt(16777216);
}

export function getNextSecret(secretNumber: bigint): bigint {
  const a = prune(mix(secretNumber, secretNumber * BigInt(64)));
  const b = prune(mix(a, a / BigInt(32)));
  return prune(mix(b, b * BigInt(2048)));
}

export function getNthSecret(secretNumber: bigint, n: bigint) {
  let s = secretNumber;
  for (let i = 0; i < n; i++) {
    s = getNextSecret(s);
  }
  return s;
}

export function solvePart1(input: string) {
  return parseInput(input)
    .map((n) => getNthSecret(n, BigInt(2000)))
    .reduce((a, b) => a + b, BigInt(0));
}

function parseInput(input: string) {
  return input
    .split('\n')
    .map((l) => l.trim())
    .map(BigInt);
}

export function solvePart2(input: string) {
  const buyers = parseInput(input);
  const seen = new Set<string>();
  const cache = new Map<string, number>();
  for (const buyer of buyers) {
    const digits: number[] = [Number(buyer % BigInt(10))];
    let currentSecret = buyer;
    for (let i = 1; i < 2000; i++) {
      currentSecret = getNextSecret(currentSecret);
      const digit = Number(currentSecret % BigInt(10));
      digits.push(digit);
      if (i >= 4) {
        const a = digits[i - 3] - digits[i - 4];
        const b = digits[i - 2] - digits[i - 3];
        const c = digits[i - 1] - digits[i - 2];
        const d = digits[i - 0] - digits[i - 1];
        if (!seen.has([buyer, a, b, c, d].join(','))) {
          const key = [a, b, c, d].join(',');
          cache.set(key, (cache.get(key) ?? 0) + digit);
        }
        seen.add([buyer, a, b, c, d].join(','));
      }
    }
  }
  return Math.max(...cache.values());
}
