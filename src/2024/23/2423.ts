function parse(input: string): string[][] {
  return input.split('\n').map((l) => l.trim().split('-'));
}

export function solvePart1(input: string) {
  const connections = parse(input);

  const connectionsMap = new Map<string, Set<string>>();

  for (const c of connections) {
    const [a, b] = c;
    if (!connectionsMap.has(a)) connectionsMap.set(a, new Set());
    if (!connectionsMap.has(b)) connectionsMap.set(b, new Set());
    connectionsMap.get(a)?.add(b);
    connectionsMap.get(b)?.add(a);
  }

  const triples = new Set<string>();

  for (const [a, peers] of connectionsMap.entries()) {
    for (const b of peers) {
      const peerPeers = connectionsMap.get(b)!;
      const common = Array.from(peers).filter((p) => peerPeers.has(p));
      common.forEach((c) => {
        const triple = [a, b, c].sort((a, b) => a.localeCompare(b));
        triples.add(triple.join(','));
      });
    }
  }

  return [...triples].filter((t) => t.split(',').find((p) => p.startsWith('t')))
    .length;
}

export function solvePart2(input: string) {
  // 520 computers
  return input.length;
}
