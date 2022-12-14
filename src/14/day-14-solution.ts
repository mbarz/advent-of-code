import { readFileSync } from 'fs';
import { join } from 'path';
import { drawCave, fillUntilAbyss, fillUntilEnd, scanCave } from './day-14';

const filePath = join(__dirname, '/day-14-puzzle-input.txt');
const fileContent = readFileSync(filePath, 'utf-8');
const cave = scanCave(fileContent);
const count = fillUntilAbyss(cave, 500);
drawCave(cave);
console.log(`Cave can hold ${count} units of sand before overflow`);

const cave2 = scanCave(fileContent);
const count2 = fillUntilEnd(cave2, 500);
drawCave(cave2);
console.log(`Cave can hold ${count2} units of sand before entry blocked`);
