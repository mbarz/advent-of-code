import { readFileSync } from 'fs';
import { join } from 'path';
import { shortestPath } from '../12/day12';
import { isDefinded } from '../util/isDefined';

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
  solutionCache: Record<string, number> = {};

  constructor(file: string) {
    const parsed = readValveInputFile(file);
    this.graph = parsed.graph;
    this.flowRates = parsed.flowRates;
  }

  solve(
    args: {
      current?: string;
      timeLeft?: number;
      open?: string[];
    } = {}
  ): number {
    const { current = 'AA', timeLeft = 30, open = [] } = args;

    open.sort((a, b) => a.localeCompare(b));
    const solutionKey = `${current};${timeLeft};${open.join(',')}`;

    if (this.solutionCache[solutionKey]) {
      return this.solutionCache[solutionKey];
    }

    const flowRate = this.flowRates[current];
    if (flowRate > 0 && !open.includes(current)) {
      return (
        flowRate * (timeLeft - 1) +
        this.solve({
          ...args,
          timeLeft: timeLeft - 1,
          open: [...open, current],
        })
      );
    }
    let result = 0;
    const options = this.getValveOptions({ current, open }).filter(
      (o) => o.path.length < timeLeft
    );
    if (options.length < 1) {
      return 0;
    }
    for (const next of options) {
      result = Math.max(
        result,
        this.solve({
          ...args,
          current: next.key,
          timeLeft: timeLeft - next.path.length,
        })
      );
    }
    this.solutionCache[solutionKey] = result;
    return result;
  }

  cache: Record<string, { released: number }> = {};

  solve2(
    args: {
      current?: string;
      timeLeft?: number;
      open?: string[];
    } = {}
  ): { released: number } {
    const { current = 'AA', timeLeft = 30, open = [] } = args;

    if (timeLeft === 0) {
      return { released: 0 };
    }

    open.sort((a, b) => a.localeCompare(b));
    const solutionKey = `${current};${timeLeft};${open.join(',')}`;

    if (this.solutionCache[solutionKey]) {
      return this.cache[solutionKey];
    }

    const flowRate = this.flowRates[current];
    if (flowRate > 0 && !open.includes(current)) {
      const sub = this.solve2({
        current,
        timeLeft: timeLeft - 1,
        open: [...open, current],
      });
      return { released: flowRate * (timeLeft - 1) + sub.released };
    }
    let result = { released: 0 };
    const options = this.graph[current];
    for (const next of options) {
      const sub = this.solve2({
        current: next,
        timeLeft: timeLeft - 1,
        open,
      });
      if (sub.released > result.released) {
        result = sub;
      }
    }
    this.cache[solutionKey] = result;
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
