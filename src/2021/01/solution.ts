import { readFileSync } from 'fs';
import {
  countIncreases,
  parseSonarSweepReport,
  sumMeasurements,
} from './sonar-sweep';

const input = readFileSync(
  __dirname + '/puzzle-sonar-sweep-report.txt',
  'utf-8'
);

const measurements = parseSonarSweepReport(input);
console.log(countIncreases(measurements));

console.log(countIncreases(sumMeasurements(measurements, 3)));
