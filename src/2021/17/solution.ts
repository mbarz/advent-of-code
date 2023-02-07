import {
  countUniqueHitVelocities,
  getTrickshotStartVelocity,
  parseInput,
} from './trick-shot';

const input = parseInput('target area: x=201..230, y=-99..-65');
const v = getTrickshotStartVelocity(input);
console.log(v);
//Part 1: 4851

const hits = countUniqueHitVelocities(input);
console.log(hits);
//Part 2: 1739
