import { readFileSync } from 'fs';
import {
  countOverlaps,
  filterSimpleLineSegments,
  parseVentLineSegments,
} from './2021-05';

const input = readFileSync('res/puzzle-input-2021-05.txt', 'utf-8');

const segments = parseVentLineSegments(input);
const simple = filterSimpleLineSegments(segments);
console.log(countOverlaps(simple));
console.log(countOverlaps(segments));
