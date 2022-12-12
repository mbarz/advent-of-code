export class CPU {
  public x = 1;
  private stack: ((x: number) => number)[] = [];

  tick(cycles = 1) {
    for (let i = 0; i < cycles; ++i) {
      const cmd = this.stack.shift();
      this.x = cmd ? cmd(this.x) : this.x;
    }
  }

  push(...commands: string[]) {
    for (const cmd of commands) {
      if (cmd === 'noop') this.pushNoop();
      if (cmd.startsWith('addx')) this.pushAddX(cmd);
    }
  }

  private pushNoop() {
    this.stack.push((n: number) => n);
  }

  private pushAddX(cmd: string) {
    const n = Number(cmd.substring(5));
    this.pushNoop();
    this.stack.push((x: number) => x + n);
  }
}

export function collectSignalStrengthAt(cpu: CPU, cycles: number[]) {
  const measurements = [];
  let current = 1;
  for (const cycle of cycles) {
    const ticks = cycle - current;
    cpu.tick(ticks);
    current += ticks;
    measurements.push(cycle * cpu.x);
  }
  return measurements;
}

export const interestingCycles = [20, 60, 100, 140, 180, 220];
