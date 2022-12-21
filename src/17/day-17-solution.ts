import { readFileSync } from 'fs';
import { join } from 'path';
import { Game, TETRIS } from './day-17';

const solve = true;

const moveSet = readFileSync(
  join(__dirname, 'day-17-puzzle-input.txt'),
  'utf-8'
);

console.log(`Solution for ${solve ? 'Puzzle' : 'Example'}\n`);

const g = new Game(solve ? moveSet : TETRIS.examplePattern);

console.time('Part 1');
g.place(2022);
console.timeEnd('Part 1');
console.log('');
console.log(`Placed:       ${g.state.placedShapes}`);
console.log(`Ground:       ${g.state.ground}`);
console.log(`Field Height: ${g.state.field.length}`);
console.log(`Tower Height: ${g.state.field.length + g.state.ground - 1}`);
console.log('');
// console.log(drawGame(g.state).split('\n').slice(0, 30).join('\n'));
//3217

console.time('Part 2');
const wanted = 1000000000000;
g.place(wanted - 2022);
console.timeEnd('Part 2');
console.log('');
console.log(`Placed:       ${g.state.placedShapes}`);
console.log(`Ground:       ${g.state.ground}`);
console.log(`Field Height: ${g.state.field.length}`);
console.log(`Tower Height: ${g.state.field.length + g.state.ground - 1}`);
console.log('');
// console.log(drawGame(g.state).split('\n').slice(0, 30).join('\n'));
//1585673352422
