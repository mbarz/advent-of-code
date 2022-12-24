import { readFileSync } from 'fs';
import { join } from 'path';
import {
  Blizzard,
  MapDimensions,
  moveBlizzards,
  parseBlizzardMap,
  Point2D,
} from './blizzard';

const exampleInput = [
  '#.######',
  '#>>.<^<#',
  '#.<..<<#',
  '#>v.><>#',
  '#<^v^^>#',
  '######.#',
].join('\n');

const puzzleInput = readFileSync(
  join(__dirname, 'day-24-puzzle-input.txt'),
  'utf-8'
);

// 336 was already to high
// 226 it is

const solve = true;

const input = solve ? puzzleInput : exampleInput;

const { blizzards, dimensions } = parseBlizzardMap(input);

let SHORTEST = Number.POSITIVE_INFINITY;
const SEEN = new Map<string, number>();
const REMAINING = new Map<string, number>();
let SPOTS: Point2D[][] = [];

let LOOP_TIME = Number.POSITIVE_INFINITY;

function getBlizzardKey(blizzards: Blizzard[]): string {
  return blizzards
    .map(({ position, direction }) =>
      [position.x, position.y, direction.x, direction.y].join(',')
    )
    .sort((a, b) => a.localeCompare(b))
    .join(';');
}

export function getLooptime(
  blizzards: Blizzard[],
  dimensions: MapDimensions
): number {
  const startKey = getBlizzardKey(blizzards);
  for (let i = 1; i < 1000; i++) {
    blizzards = moveBlizzards(blizzards, dimensions);
    const key = getBlizzardKey(blizzards);
    if (key === startKey) return i;
  }
  return Number.POSITIVE_INFINITY;
}

function getFreeSpots(blizzards: Blizzard[], dimensions: MapDimensions) {
  const spots: Point2D[] = [{ x: 1, y: 0 }];
  for (let x = 1; x < dimensions.width - 1; x++) {
    for (let y = 1; y < dimensions.height - 1; y++) {
      const isBlizzard = blizzards.find(
        (b) => b.position.x === x && b.position.y === y
      );
      if (!isBlizzard) spots.push({ x, y });
    }
  }
  return spots;
}

function createFreeSpotCollection(
  blizzards: Blizzard[],
  dimensions: MapDimensions,
  count: number
) {
  const collection: Point2D[][] = [];
  for (let i = 0; i < count; i++) {
    collection.push(getFreeSpots(blizzards, dimensions));
    blizzards = moveBlizzards(blizzards, dimensions);
  }
  return collection;
}

function getShortestRoute(
  position: Point2D,
  blizzards: Blizzard[],
  dimensions: MapDimensions,
  t: number
): number {
  if (t === 0) {
    console.log(dimensions);
    SEEN.clear();
    REMAINING.clear();
    SHORTEST = Number.POSITIVE_INFINITY;
    LOOP_TIME = getLooptime(blizzards, dimensions);
    console.log({ loopTime: LOOP_TIME });
    if (LOOP_TIME > 100000) throw new Error('Unpredictable storms');
    SPOTS = createFreeSpotCollection(blizzards, dimensions, LOOP_TIME);
  }

  if (t > SHORTEST) return Number.POSITIVE_INFINITY;

  if (t >= 336) {
    return Number.POSITIVE_INFINITY;
  }

  if (
    position.x === dimensions.width - 2 &&
    position.y === dimensions.height - 2
  ) {
    return t + 1;
  }

  const key = [t % LOOP_TIME, position.x, position.y].join(';');

  if (REMAINING.has(key)) {
    const value = REMAINING.get(key);
    if (value != null) {
      return t + value;
    }
  }

  if (SEEN.has(key)) {
    const stored = SEEN.get(key);
    if (stored != null) {
      if (stored < t) {
        return Number.POSITIVE_INFINITY;
      }
    }
  }
  SEEN.set(key, t);

  const directions = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];
  const freeSpotsNextRound = SPOTS[(t + 1) % LOOP_TIME];
  const possibleNextPositions = directions
    .map(({ x, y }) => ({
      x: position.x + x,
      y: position.y + y,
    }))

    .filter(
      (p) =>
        freeSpotsNextRound.find(({ x, y }) => x === p.x && y === p.y) != null
    );
  let result = Number.POSITIVE_INFINITY;

  for (const pos of possibleNextPositions) {
    const variant = getShortestRoute(pos, blizzards, dimensions, t + 1);
    if (variant < result) result = variant;
  }

  REMAINING.set(key, result - t);
  SHORTEST = Math.min(result, SHORTEST);
  return result;
}

const shortest = getShortestRoute({ x: 1, y: 0 }, blizzards, dimensions, 0);
console.log(shortest);
