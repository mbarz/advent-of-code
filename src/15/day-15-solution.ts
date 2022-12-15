import { findBeacon, getCoveredFieldsInRow, parseFile } from './day-15';

const sensors = parseFile('puzzle').sensors;
const fields = getCoveredFieldsInRow(sensors, 2000000);

console.log(fields);

const beacon = findBeacon(sensors, 0, 0, 4000000, 4000000);

console.log(beacon);
if (beacon) {
  console.log(beacon.x * 4000000 + beacon.y);
}
