import { sum } from '../../util/sum';
import { fillBasin, getLowpoints, parseHeightMapFile } from './lava-height-map';

const input = parseHeightMapFile('puzzle');
const lowpoints = getLowpoints(input);
const s = sum(lowpoints.map((p) => 1 + input[p.y][p.x]));
console.log(s);

const basins = lowpoints.map((p) => fillBasin(input, p));
const basinSizes = basins
  .map((b) => b.length)
  .sort((a, b) => b - a)
  .slice(0, 3);
const s2 = basinSizes.reduce((p, c) => p * c, 1);
console.log(s2);
