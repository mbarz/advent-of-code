import { readFileSync } from 'fs';
import { join } from 'path';

type Room = {
  key: string;
  open: boolean;
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
      open: false,
      flowRate: Number(flowRate),
      tunnelKeys: tunnels.split(', '),
      tunnelTargets: [],
    }));

  return rooms;
}

function getRoom(rooms: Room[], key: string): Room {
  return rooms.find((r) => r.key === key) as Room;
}

export type Move = {
  move: string;
  rating: number;
  then?: Move;
};

export function getBestMove(
  rooms: Room[],
  key: string,
  remaining: number
): Move {
  const room = getRoom(rooms, key);
  if (room == null) {
    throw new Error(`no room with key ${key}`);
  }
  if (remaining === 0) return { move: 'noop', rating: 0 };
  if (remaining === 1 && (room.open || room.flowRate === 0)) {
    return { move: 'noop', rating: 0 };
  }
  const moves: Move[] = [];
  if (!room.open) {
    const nextMove = getBestMove(open(rooms, key), key, remaining - 1);
    const rating = remaining * room.flowRate + nextMove.rating;
    moves.push({ move: 'open', rating, then: nextMove });
  }
  moves.push(
    ...room.tunnelKeys.map((nextKey) => {
      const nextMove = getBestMove(rooms, nextKey, remaining - 1);
      return {
        move: `go to ${nextKey}`,
        rating: nextMove.rating,
        then: nextMove,
      };
    })
  );
  moves.sort((a, b) => b.rating - a.rating);
  return moves[0];
}

function open(rooms: Room[], key: string): Room[] {
  return rooms.map((r) => (r.key === key ? { ...r, open: true } : r));
}
