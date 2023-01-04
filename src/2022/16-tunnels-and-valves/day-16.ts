import { readFileSync } from 'fs';
import { join } from 'path';
import { isDefinded } from '../../util/isDefined';
import { shortestPath } from '../12-climbing-graphs/day12';

type Room = {
  key: string;
  flowRate: number;
  tunnelKeys: string[];
};

type Graph = Record<string, string[]>;

type FlowRates = Record<string, number>;

export type ValvePuzzleInput = {
  rooms: Room[];
  graph: Graph;
  flowRates: FlowRates;
};

export type Move = {
  move: string;
  rating: number;
  then?: Move;
};

export class ValveSolver {
  graph: Graph;
  flowRates: FlowRates;

  pathCache: Record<string, string[]> = {};
  solutionCache: Record<string, { released: number; path: string[] }> = {};

  constructor(file: string) {
    const parsed = readValveInputFile(file);
    this.graph = parsed.graph;
    this.flowRates = parsed.flowRates;

    const keys = Object.keys(this.graph);
    keys.sort((a, b) => a.localeCompare(b));
  }

  solve(
    args: {
      current?: string;
      timeLeft?: number;
      open?: string[];
    } = {}
  ): { released: number; path: string[] } {
    const { current = 'AA', timeLeft = 30, open = [] } = args;

    open.sort((a, b) => a.localeCompare(b));
    const solutionKey = `${current};${timeLeft};${open.join(',')}`;

    if (this.solutionCache[solutionKey]) {
      return this.solutionCache[solutionKey];
    }

    const flowRate = this.flowRates[current];

    let result = { released: 0, path: [] as string[] };
    if (flowRate > 0 && !open.includes(current)) {
      const sub = this.solve({
        ...args,
        timeLeft: timeLeft - 1,
        open: [...open, current],
      });
      result = {
        released: flowRate * (timeLeft - 1) + sub.released,
        path: [`open ${current}`, ...sub.path],
      };
    }
    const options = this.getValveOptions({
      current,
      open: [...open, current],
    }).filter((o) => o.path.length < timeLeft);
    if (options.length < 1) {
      return result;
    }
    for (const next of options) {
      const sub = this.solve({
        ...args,
        current: next.key,
        timeLeft: timeLeft - next.path.length,
      });
      if (sub.released >= result.released) {
        result = { ...sub, path: [next.key, ...sub.path] };
      }
    }
    this.solutionCache[solutionKey] = result;
    return result;
  }

  cache: Map<string, { timeLeft: number; value: number }> = new Map();

  solveStepByStep(
    current: string,
    open: string[],
    timeLeft: number,
    helpers: number
  ): number {
    if (timeLeft < 1) {
      return helpers > 0
        ? this.solveStepByStep('AA', open, 26, helpers - 1)
        : 0;
    }

    const key = `${helpers};${current};${open.join(',')}`;

    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached != null) {
        if (cached.timeLeft === timeLeft) return cached.value;
        if (cached.timeLeft > timeLeft) return 0;
      }
    }

    const flowRate = this.flowRates[current];
    let result = 0;
    if (flowRate > 0 && !open.includes(current)) {
      const newOpen = [...open, current].sort((a, b) => a.localeCompare(b));
      const sub = this.solveStepByStep(current, newOpen, timeLeft - 1, helpers);
      result = flowRate * (timeLeft - 1) + sub;
    }
    const options = this.graph[current];
    for (const next of options) {
      const sub = this.solveStepByStep(next, open, timeLeft - 1, helpers);
      if (sub >= result) result = sub;
    }

    const cacheSize = this.cache.size;
    if (!this.cache.has(key) && cacheSize % 1000000 === 0 && cacheSize > 0) {
      console.log(`Cached ${cacheSize} states`);
    }
    this.cache.set(key, { timeLeft, value: result });

    return result;
  }

  getValveOptions(args: {
    current: string;
    open: string[];
  }): { key: string; flowRate: number; path: string[] }[] {
    return Object.keys(this.graph)
      .filter((v) => !args.open.includes(v))
      .filter((v) => this.flowRates[v] > 0)
      .map((v) => {
        const path = this.getPathToRoom(args.current, v);
        if (path == null) return undefined;
        return {
          key: v,
          flowRate: this.flowRates[v],
          path: path,
        };
      })
      .filter(isDefinded);
  }

  getPathToRoom(a: string, b: string): string[] | undefined {
    const key = `${a},${b}`;
    if (this.pathCache[key]) {
      return this.pathCache[key];
    }
    const path = shortestPath(a, b, this.graph).path;
    this.pathCache[key] = path;
    return path;
  }
}

export function readValveInputFile(file: string): ValvePuzzleInput {
  const input = readFileSync(
    join(__dirname, `day-16-${file}-input.txt`),
    'utf-8'
  );
  const rooms: Room[] = input
    .split('\n')
    .map((line) =>
      line.match(
        /Valve (.*) has flow rate=(\d+); tunnel[s]{0,1} lead[s]{0,1} to valve[s]{0,1} (.+)$/
      )
    )
    .filter((m): m is RegExpMatchArray => m != null)
    .map(([, key, flowRate, tunnels]) => ({
      key,
      flowRate: Number(flowRate),
      tunnelKeys: tunnels.split(', '),
      tunnelTargets: [],
    }));

  const flowRates = rooms.reduce((p, c) => ({ ...p, [c.key]: c.flowRate }), {});
  const graph = buildGraph(rooms);
  return { rooms, graph, flowRates };
}

export function buildGraph(rooms: Room[]): Record<string, string[]> {
  const graph: Record<string, string[]> = {};
  rooms.forEach((room) => (graph[room.key] = room.tunnelKeys));
  return graph;
}
