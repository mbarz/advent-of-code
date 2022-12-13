import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../util/sum';
import { indicesOfCorrectPairs, parsePairs } from './day13';

const input = readFileSync(
  join(__dirname, '/day-13-puzzle-input.txt'),
  'utf-8'
);
const pairs = parsePairs(input);
// const packets = parsePackets(input);
const indices = indicesOfCorrectPairs(pairs);
console.log('Indices:', JSON.stringify(indices));
console.log('Sum:', sum(indices));
// const decoderKey = getDecoderKey(packets);
// console.log('Decoder Key:', decoderKey);
