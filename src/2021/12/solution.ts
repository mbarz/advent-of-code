import { readFileSync } from 'fs';

const fileContent = readFileSync('res/puzzle-input-2021-12.txt', 'utf-8');
const inputs = fileContent.split('\n\n');

const isSmall = (cave: string) => cave.toUpperCase() !== cave;
function visistedSmallCaveTwice(visitedCaves: string[]) {
  const smallCaves = visitedCaves.filter((cave) => isSmall(cave));
  const visitedTwice = (cave: string) =>
    smallCaves.filter((c) => c === cave).length > 1;
  return smallCaves.find((cave) => visitedTwice(cave)) != null;
}

function findAllRoutes(input: string) {
  const map: Record<string, string[]> = {};
  const addRoute = (from: string, to: string) => {
    if (to === 'start') return;
    if (map[from] == null) map[from] = [to];
    if (map[from].includes(to)) return;
    else map[from] = [...map[from], to];
  };

  const lines = input.split('\n');
  const name = lines.shift();
  lines.forEach((line) => {
    const [a, b] = line.split('-');
    addRoute(a, b);
    addRoute(b, a);
  });

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

  return { name, routes };
}

inputs.forEach((input) => {
  const solution = findAllRoutes(input);
  console.log(solution.name);
  const solutionPart1 = solution.routes.filter(
    (caves) => !visistedSmallCaveTwice(caves)
  ).length;
  const solutionPart2 = solution.routes.length;
  console.log(`Part1: ${solutionPart1}`);
  console.log(`Part2: ${solutionPart2}`);
  console.log('');
});
