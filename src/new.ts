import { program } from 'commander';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as prettier from 'prettier';

const now = new Date();

program.option(
  '-y, --year <year>',
  'year',
  (y) => Number(y),
  now.getFullYear(),
);
program.option('-d, --day <day>', 'day', (d) => Number(d), now.getDate());
program.parse();
const options = program.opts<{ year: number; day: number }>();
const { year, day } = options;

const d = String(day).padStart(2, '0');
const fname = (year % 100) + d;

const dir = `src/${year}/${d}`;
const implFile = `${dir}/${fname}.ts`;
const specFile = `${dir}/${fname}.spec.ts`;
const textFile = `${dir}/${fname}-puzzle-input.txt`;

async function main() {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  if (existsSync(implFile)) {
    console.log(`${implFile} already exists`);
  } else {
    const code = await formatCode(`
      export function solvePart1(input: string) { return input.length; }
      
      export function solvePart2(input: string) { return input.length; }
    `);
    writeFileSync(implFile, code, 'utf-8');
  }

  if (existsSync(specFile)) {
    console.log(`${specFile} already exists`);
  } else {
    const code = await formatCode(
      `
      import { solvePart1, solvePart2 } from './${fname}';
      
      describe('${year} Day ${day}', () => {
        
        it('should solve part 1', () => {
          expect(solvePart1('')).toEqual(0);
        });

        it('should solve part 1', () => {
          expect(solvePart2('')).toEqual(0);
        });

      });`,
    );
    writeFileSync(specFile, code, 'utf-8');
  }

  if (existsSync(textFile)) {
    console.log(`${textFile} already exists`);
  } else {
    writeFileSync(textFile, '', 'utf-8');
  }
}

function formatCode(code: string): Promise<string> {
  return prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    tabWidth: 2,
  });
}

main();
