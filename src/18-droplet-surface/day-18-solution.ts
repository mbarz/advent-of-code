import { readFileSync } from 'fs';
import { join } from 'path';
import { DropletScanner } from './droplet-scanner';

const input = readFileSync(join(__dirname, 'day-18-puzzle-input.txt'), 'utf-8');

const s = new DropletScanner();
s.scan(input);

console.time('Part 1');
const surface = s.getDropletSurface();
console.log(`Surface: ${surface}`);
console.timeEnd('Part 1');

console.time('Part 2');
const extSurface = s.getExteriorSurface();
console.log(`Exterior Surface: ${extSurface}`);
console.timeEnd('Part 2');
