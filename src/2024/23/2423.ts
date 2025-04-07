export function getPairs(input: string): string[][] {
  return input.split('\n').map((l) => l.trim().split('-'));
}

export function solvePart1(input: string) {
  const pairs = getPairs(input);
  const connectionsMap = getConnectionMap(input);
  const triples = growAll(pairs, connectionsMap);
  return [...triples].filter((t) => t.some((c) => c.startsWith('t'))).length;
}

export function getConnectionMap(input: string) {
  const connections = getPairs(input);
  const connectionsMap = new Map<string, string[]>();
  for (const c of connections) {
    const [a, b] = c;
    if (!connectionsMap.has(a)) connectionsMap.set(a, []);
    if (!connectionsMap.has(b)) connectionsMap.set(b, []);

    connectionsMap.set(a, (connectionsMap.get(a) ?? []).concat(b));
    connectionsMap.set(b, (connectionsMap.get(b) ?? []).concat(a));
  }
  connectionsMap.forEach((v) => {
    v.sort((a, b) => a.localeCompare(b));
  });
  return connectionsMap;
}

export function grow(current: string[], connections: Map<string, string[]>) {
  const next = Array.from(connections.entries())
    .filter(([key]) => !current.includes(key))
    .filter(([, value]) => value.length >= current.length)
    .filter(([, value]) => current.every((c) => value.includes(c)))
    .map(([key]) => key);
  const res = next.map((n) => {
    const arr = [...current, n];
    arr.sort((a, b) => a.localeCompare(b));
    return arr;
  });
  res.sort((a, b) => a.join(',').localeCompare(b.join(',')));
  return res;
}

export function growAll(
  current: string[][],
  connections: Map<string, string[]>,
) {
  const res: string[][] = [];
  const keys: string[] = [];
  for (const c of current) {
    for (const sub of grow(c, connections)) {
      const key = sub.join('_');
      if (!keys.includes(key)) {
        keys.push(key);
        res.push(sub);
      }
    }
  }
  return res;
}

export function solvePart2(input: string) {
  return withStack(input);
}

export function withStack(input: string) {
  const connectionsMap = getConnectionMap(input);
  const maxLength = Math.max(
    ...Array.from(connectionsMap.values()).map((v) => v.length),
  );
  const stack = growAll(getPairs(input), connectionsMap);
  stack.reverse();
  let best: string[] = [];
  const seen: string[] = [];
  while (stack.length) {
    const current = stack.pop()!;
    const pwc = current.join(',');
    if (seen.includes(pwc)) {
      continue;
    }
    seen.push(pwc);
    if (current.length > best.length) {
      best = [...current];
      console.log(current.length, best.join(','));
    }
    if (best.length === maxLength) break;
    const next = grow(current, connectionsMap);
    next.reverse();
    for (const n of next) {
      stack.push(n);
    }
  }
  return best.join(',');
}

export function paulson(input: string) {
  const connectionsMap = getConnectionMap(input);
  const keys = Array.from(connectionsMap.keys());
  let best = undefined;
  for (let i = 0; i < 100; ++i) {
    shuffle(keys);
    const clique = [];
    for (const x of keys) {
      let ok = true;
      for (const y of clique) {
        if (!connectionsMap.get(x)?.includes(y)) {
          ok = false;
        }
      }
      if (ok) clique.push(x);
    }
    if (best === undefined || clique.length > best.length) {
      best = clique;
    }
  }
  return best?.sort().join(',') ?? '';
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
