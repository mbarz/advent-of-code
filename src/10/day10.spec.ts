import { readFileSync } from 'fs';
import { sum } from '../util/sum';
import { CPU, collectSignalStrengthAt, interestingCycles } from './cpu';
import { CRT } from './crt';

describe('Day 10', () => {
  let exampleInput: string;
  let exampleInstructions: string[] = [];

  beforeAll(() => {
    exampleInput = readFileSync(__dirname + '/example.txt', 'utf-8');
    exampleInstructions = exampleInput.split('\n');
  });

  it('should add to stack', () => {
    const cpu = new CPU();
    cpu.push('noop', 'addx 3', 'addx -5');
    expect(cpu.x).toEqual(1);
    const expected = [1, 1, 4, 4, -1, -1, -1];
    for (const e of expected) {
      cpu.tick();
      expect(cpu.x).toEqual(e);
    }
  });

  it('should step through example', () => {
    const cpu = new CPU();
    cpu.push(...exampleInstructions);
    cpu.tick(19);
    expect(cpu.x).toEqual(21);
    cpu.tick(40);
    expect(cpu.x).toEqual(19);
    cpu.tick(40);
    expect(cpu.x).toEqual(18);
    cpu.tick(40);
    expect(cpu.x).toEqual(21);
    cpu.tick(40);
    expect(cpu.x).toEqual(16);
    cpu.tick(40);
    expect(cpu.x).toEqual(18);
  });

  it('should collect signal strength for example', () => {
    const cpu = new CPU();
    cpu.push(...exampleInstructions);
    const res = collectSignalStrengthAt(cpu, interestingCycles);
    expect(res).toEqual([420, 1140, 1800, 2940, 2880, 3960]);
    expect(sum(res)).toEqual(13140);
  });

  function draw(commands: string[], ticks?: number) {
    const cpu = new CPU();
    cpu.push(...commands);
    const crt = new CRT(cpu);
    return crt.draw(ticks);
  }

  it('should draw example', () => {
    expect(draw(exampleInstructions, 3)).toEqual('##.');
    expect(draw(exampleInstructions, 4)).toEqual('##..');
    expect(draw(exampleInstructions, 21)).toEqual('##..##..##..##..##..#');
    const full = draw(exampleInstructions);
    expect(full).toEqual(
      [
        '##..##..##..##..##..##..##..##..##..##..',
        '###...###...###...###...###...###...###.',
        '####....####....####....####....####....',
        '#####.....#####.....#####.....#####.....',
        '######......######......######......####',
        '#######.......#######.......#######.....',
      ].join('\n')
    );
  });
});
