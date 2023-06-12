import { readFileSync } from 'fs';
import {
  allPairs,
  joinScans,
  manhattanDistance,
  parseBeaconScannerInput,
} from './beacon-scanner';

const input = readFileSync('res/puzzle-input-2021-19.txt', 'utf-8');
const scans = parseBeaconScannerInput(input);

console.time('resolve');
const result = joinScans(scans);
console.timeEnd('resolve');

result.beacons.sort((a, b) => a[0] - b[0]);
result.resolved.sort((a, b) => a.index - b.index);
console.log('');

console.log(result.resolved.map((r) => [r.index, r.scanner]));

const scanners = result.resolved.map((r) => r.scanner);
const maxManhattan = Math.max(
  ...allPairs(scanners).map(([a, b]) => manhattanDistance(a, b))
);

console.log(`${result.beacons.length} beacons`);
console.log(`max manhattan distance: ${maxManhattan}`);
