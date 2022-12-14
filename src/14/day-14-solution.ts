import { readFileSync } from 'fs';
import { join } from 'path';
import { drawCave, fillUntilAbyss, scanCave } from './day-14';

const filePath = join(__dirname, '/day-14-puzzle-input.txt');
const fileContent = readFileSync(filePath, 'utf-8');
const cave = scanCave(fileContent);
const count = fillUntilAbyss(cave, { x: 500, y: 0 });
drawCave(cave);
console.log(`Cave can hold ${count} units of sand before overflow`);
