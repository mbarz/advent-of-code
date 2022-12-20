import { ValveSolver } from './day-16';

const s = new ValveSolver('puzzle');

console.time('solve');
const res2 = s.solve({ current: 'AA', timeLeft: 30, open: [] });
console.timeEnd('solve');
console.log(res2);

//1716
