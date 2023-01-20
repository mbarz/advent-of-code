const isSmall = (cave: string) => cave.toUpperCase() !== cave;

function visistedSmallCaveTwice(visitedCaves: string[]) {
  const smallCaves = visitedCaves.filter((cave) => isSmall(cave));
  const visitedTwice = (cave: string) =>
    smallCaves.filter((c) => c === cave).length > 1;
  return smallCaves.find((cave) => visitedTwice(cave)) != null;
}

export class CaveExplorer {
  findAllRoutes(lines: string[]): {
    part1: string[][];
    part2: string[][];
  } {
    const map: Record<string, string[]> = this.createMap(lines);
    const routes: string[][] = [];
    const queue: { route: string[]; twiceUsed?: boolean }[] = [];
    let current: typeof queue[number] | undefined = { route: ['start'] };

    while (current != null) {
      const route = current.route;
      const twiceUsed = current.twiceUsed;
      const last = current.route[current.route.length - 1];
      if (last === 'end') {
        routes.push(current.route);
      } else {
        const candidates = map[last];
        candidates
          .filter((c) => {
            const alreadyVisited = route.includes(c);
            return !alreadyVisited || !twiceUsed || !isSmall(c);
          })
          .forEach((c) => {
            queue.push({
              route: [...route, c],
              twiceUsed: twiceUsed || (isSmall(c) && route.includes(c)),
            });
          });
      }
      current = queue.shift();
    }

    return {
      part1: routes.filter((caves) => !visistedSmallCaveTwice(caves)),
      part2: routes,
    };
  }

  private createMap(lines: string[]) {
    const map: Record<string, string[]> = {};
    const addRoute = (from: string, to: string) => {
      if (to === 'start') return;
      if (map[from] == null) map[from] = [to];
      if (map[from].includes(to)) return;
      else map[from] = [...map[from], to];
    };

    lines.forEach((line) => {
      const [a, b] = line.split('-');
      addRoute(a, b);
      addRoute(b, a);
    });
    return map;
  }
}
