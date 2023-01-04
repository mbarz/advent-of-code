import { readFileSync } from 'fs';
import { join } from 'path';
import { sum } from '../../util/sum';
import {
  buildPairs,
  getDecoderKey,
  indicesOfCorrectPairs,
  parsePackets,
} from './day13';

const filePath = join(__dirname, '/day-13-puzzle-input.txt');
const input = readFileSync(filePath, 'utf-8');

const packets = parsePackets(input);
const pairs = buildPairs(packets);
const indices = indicesOfCorrectPairs(pairs);
console.log('Sum of correct indices:', sum(indices));
const decoderKey = getDecoderKey(packets);
console.log('Decoder Key:', decoderKey);
