import { readFileSync } from 'fs';
import { join } from 'path';
import { isDefinded } from '../util/isDefined';
import { sum } from '../util/sum';

type Room = {
  key: string;
  flowRate: number;
  tunnelKeys: string[];
};

export function readValveInputFile(file: string): Room[] {
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

  return rooms;
}

type RoomDistances = Record<string, Record<string, number>>;

export function calcDistances(rooms: Room[]): RoomDistances {
  const d: RoomDistances = {};
  for (const room of rooms) {
    d[room.key] = {};
    for (const other of rooms) {
      d[room.key][other.key] = getRoomDistance(rooms, room.key, other.key);
    }
  }
  return d;
}

export function getRoomDistance(
  rooms: Room[],
  a: string,
  b: string,
  visited: string[] = []
): number {
  if (a === b) return 0;
  const ra = getRoom(rooms, a);
  if (ra.tunnelKeys.includes(b)) return 1;
  const other = ra.tunnelKeys.filter((key) => !visited.includes(key));
  if (other.length < 1) return Number.POSITIVE_INFINITY;
  const distances = other.map(
    (o) => getRoomDistance(rooms, o, b, [...visited, a]) + 1
  );
  return Math.min(...distances);
}

export function getPathToRoom(
  rooms: Room[],
  a: string,
  b: string,
  visited: string[] = []
): string[] | undefined {
  if (a === b) return [];
  const ra = getRoom(rooms, a);
  if (ra.tunnelKeys.includes(b)) return [b];

  const variants = ra.tunnelKeys
    .filter((key) => !visited.includes(key))
    .map((o) => {
      const path = getPathToRoom(rooms, o, b, [...visited, a]);
      if (path == null) return undefined;
      return [o, ...path];
    })
    .filter(isDefinded)
    .filter((o) => isDefinded(o));

  if (variants.length < 1) return undefined;

  variants.sort((v1, v2) => v1.length - v2.length);
  return variants[0];
}

function getRoom(rooms: Room[], key: string): Room {
  return rooms.find((r) => r.key === key) as Room;
}

export type Move = {
  move: string;
  rating: number;
  then?: Move;
};

export function getValveOptions(args: {
  rooms: Room[];
  current: string;
  open: string[];
}): { key: string; flowRate: number; path: string[] }[] {
  return args.rooms
    .filter((r) => !args.open.includes(r.key))
    .filter((r) => r.flowRate > 0)
    .map((r) => {
      const path = getPathToRoom(args.rooms, args.current, r.key);
      if (path == null) return undefined;
      return {
        key: r.key,
        flowRate: r.flowRate,
        path: path,
      };
    })
    .filter(isDefinded);
}

export function getBestValveOption(args: {
  rooms: Room[];
  current: string;
  open: string[];
}): { key: string; flowRate: number; path: string[] } {
  const options = getValveOptions(args);

  options.forEach((o) => {
    console.log(
      `${args.current} => ${o.key} with ${o.flowRate} via ${o.path.join(',')}`
    );
  });

  options.sort((a, b) => {
    const maxDist = Math.max(a.path.length, b.path.length);
    const [ad, bd] = [a, b].map(
      ({ path, flowRate }) => (1 + maxDist - path.length) * flowRate
    );
    return bd - ad;
  });
  return options[0] || { key: args.current, flowRate: 0 };
}

function log(s: string) {
  console.log(s);
}

const logMinute = (n: number) => log(`== Minute ${n} ==`);
const logRelease = (rooms: Room[], open: string[]) => {
  const sorted = [...open].sort((a, b) => a.localeCompare(b));
  const release = calcRelease(rooms, open);
  if (sorted.length < 1) {
    log('No valves are open.');
  } else if (sorted.length === 1) {
    log(`Valve ${sorted[0]} is open, releasing ${release}`);
  } else {
    log(
      `Valve ${sorted.slice(0, sorted.length - 1).join(', ')} and ${
        sorted[sorted.length - 1]
      } are open, releasing ${release}`
    );
  }
};
const logMove = (valve: string) => log(`You move to valve ${valve}.`);
const logOpen = (valve: string) => log(`You open valve ${valve}.`);

const calcRelease = (rooms: Room[], open: string[]) =>
  sum(open.map((key) => getRoom(rooms, key).flowRate));

export function openValves(args: {
  rooms: Room[];
  time: number;
  start: string;
}): { open: string[]; released: number } {
  const { rooms, time, start } = args;
  console.log(
    `There are ${
      rooms.filter((r) => r.flowRate > 0).length
    } valves with flow rate > 0`
  );
  let current = start;
  let released = 0;
  let moves: string[] = [];
  const open: string[] = [];
  for (let timeLeft = time; timeLeft > 0; timeLeft--) {
    logMinute(time - timeLeft + 1);
    released += calcRelease(rooms, open);
    logRelease(rooms, open);
    if (!moves.length) {
      const o = getBestValveOption({ rooms, current, open });
      if (o?.path != null) {
        console.log(`new target is ${o.key}`);
        moves = [...o.path];
      }
    }
    if (moves.length) logMove(moves[0]);
    if (moves.length < 1 && !open.includes(current)) {
      logOpen(current);
      open.push(current);
    }
    current = moves.shift() || current;
  }
  return { open, released };
}
