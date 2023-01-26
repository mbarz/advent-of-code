import { fold, parse, print } from './paper-fold';

const example = parse('puzzle');
const res = example.instructions.reduce((p, c) => fold(p, c), example.points);

print(res);
