import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import prettier from 'prettier';

async function main() {
  const day = process.argv[2];
  const dayLabel = String(day).padStart(2, '0');

  const puzzleDescription = await fetch(
    'https://adventofcode.com/2023/day/12',
  ).then((res) => res.text());
  const name = puzzleDescription.match(/--- Day \d+: (.+) ---/)![1];
  const label = name
    .split(' ')
    .map((p) => p.toLowerCase())
    .join('-');
  console.log(name, label);

  const prettierConfig = JSON.parse(
    readFileSync(join(__dirname, '..', '..', '.prettierrc'), 'utf-8'),
  );
  const solution = await prettier.format(
    `
import { Solver } from '../util/solver';

export class AdventOfCode2023Day${dayLabel} implements Solver {
  constructor(private readonly input: string) {}

  solvePart1(): number { return 0; }

  solvePart2(): number { return 0; }
}
`,
    { ...prettierConfig, parser: 'typescript' },
  );

  const spec = await prettier.format(
    `
import { AdventOfCode2023Day${dayLabel} } from './2023-${dayLabel}-${label}';

describe('2023 - Day ${dayLabel} - ${name}', () => {
  it('should solve part 1', () => {
    expect(createSolver().solvePart1()).toEqual(0);
  });
  
  it('should solve part 2', () => {
    expect(createSolver().solvePart2()).toEqual(0);
  });
});

function createSolver() {
  return new AdventOfCode2023Day${dayLabel}(
    [].join('\\n')
  );
}
`,
    { ...prettierConfig, parser: 'typescript' },
  );

  const dirName = join(__dirname, `${dayLabel}-${label}`);
  if (!existsSync(dirName)) mkdirSync(dirName);

  console.log(solution);
  console.log(spec);

  console.log(resolve(join(dirName, `2023-${dayLabel}-${label}.ts`)));

  writeFileSync(
    join(dirName, `2023-${dayLabel}-${label}.ts`),
    solution,
    'utf-8',
  );
  writeFileSync(
    join(dirName, `2023-${dayLabel}-${label}.spec.ts`),
    spec,
    'utf-8',
  );
}

main();
