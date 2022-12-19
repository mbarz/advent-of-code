import { openValves, readValveInputFile } from './day-16';

const rooms = readValveInputFile('puzzle');
const res = openValves({ rooms, time: 30, start: 'AA' });
console.log(res.released);
