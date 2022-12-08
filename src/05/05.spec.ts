import { readFileSync } from 'fs';

const exampleInput = [
  '    [D]           ',
  '[N] [C]           ',
  '[Z] [M] [P]       ',
  ' 1   2   3        ',
  '                  ',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2',
].join('\n');

type Instruction = readonly [number, number, number];
type Instructions = Instruction[];

type Stack = string[];
type Stacks = Stack[];

function parse(s: string): { instructions: Instructions; stacks: Stacks } {
  const lines = s.split('\n');
  const instructions = lines
    .map((l) => l.match(/move (\d+) from (\d+) to (\d+)/))
    .filter((res): res is string[] => res != null)
    .map(([, count, source, target]) => {
      return [Number(count), Number(source), Number(target)] as const;
    });
  const stacks: string[][] = [];
  lines
    .filter((line) => line.includes('['))
    .forEach((line) => {
      const crates = line.match(/.{1,4}/g);
      crates?.forEach((c, index) => {
        const char = c.match(/(\w)/)?.[1];
        if (char) {
          if (stacks[index] == null) stacks[index] = [];
          stacks[index].unshift(char);
        }
      });
    });
  return { instructions, stacks };
}

function executeInstruction(
  stacks: Stacks,
  [count, source, target]: Instruction,
  opts: { craneModel: '9000' | '9001' } = { craneModel: '9000' }
): Stacks {
  if (stacks[target - 1] == null) stacks[target - 1] = [];
  const sourceStack = stacks[source - 1];
  const targetStack = stacks[target - 1];
  const substack = sourceStack.splice(sourceStack.length - count);
  if (opts.craneModel !== '9001') substack.reverse();
  targetStack.push(...substack);
  return stacks;
}

function executeInstructions(
  stacks: Stacks,
  instructions: Instructions,
  opts: { craneModel: '9000' | '9001' } = { craneModel: '9000' }
): Stacks {
  return instructions.reduce((a, b) => executeInstruction(a, b, opts), stacks);
}

function getTops(stacks: Stacks) {
  return stacks.map((stack) => stack[stack.length - 1]).join('');
}

function solvePart1(input: string) {
  const { instructions, stacks } = parse(input);
  const result = executeInstructions(stacks, instructions);
  return getTops(result);
}
function solvePart2(input: string) {
  const { instructions, stacks } = parse(input);
  const result = executeInstructions(stacks, instructions, {
    craneModel: '9001',
  });
  return getTops(result);
}

describe('Day5', () => {
  it('should should parse', () => {
    const parsed = parse(exampleInput);
    expect(parsed.instructions).toHaveLength(4);
    expect(parsed.instructions).toEqual([
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ]);
    expect(parsed.stacks).toHaveLength(3);
    expect(parsed.stacks).toEqual([['Z', 'N'], ['M', 'C', 'D'], ['P']]);
  });

  it.each([
    {
      given: ['A'],
      instruction: [1, 1, 2] as const,
      expected: ['', 'A'],
    },
    {
      given: ['D', 'ABC'],
      instruction: [2, 2, 1] as const,
      expected: ['DCB', 'A'],
    },
    {
      given: ['ZND', 'MC', 'P'],
      instruction: [3, 1, 3] as const,
      expected: ['', 'MC', 'PDNZ'],
    },
  ])('should move boxes', ({ given, instruction, expected }) => {
    const givenStacks = given.map((s) => s.split(''));
    expect(
      executeInstruction(givenStacks, instruction)
        .map((s) => s.join(''))
        .join(';')
    ).toEqual(expected.join(';'));
  });

  it('should run instructions from example', () => {
    const { stacks, instructions } = parse(exampleInput);
    const result = executeInstructions(stacks, instructions);
    expect(result.map((s) => s.join('')).join(';')).toEqual('C;M;PDNZ');
  });

  it('should solve part 1', () => {
    expect(solvePart1(exampleInput)).toEqual('CMZ');
    expect(solvePart1(readFileSync(__dirname + '/05.txt', 'utf-8'))).toEqual(
      'CFFHVVHNC'
    );
  });

  it('should run instructions from example with crane 9001', () => {
    const { stacks, instructions } = parse(exampleInput);
    const result = executeInstructions(stacks, instructions, {
      craneModel: '9001',
    });
    expect(result.map((s) => s.join('')).join(';')).toEqual('M;C;PZND');
  });

  it('should solve part 2', () => {
    expect(solvePart2(exampleInput)).toEqual('MCD');
    expect(solvePart2(readFileSync(__dirname + '/05.txt', 'utf-8'))).toEqual(
      'FSZWBPTBG'
    );
  });
});
