export class Day17 {
  a: bigint;
  b: bigint;
  c: bigint;

  instructions: number[] = [];

  constructor(public input: string) {
    const { a, b, c, instructions } = parseInput(this.input);
    this.a = BigInt(a);
    this.b = BigInt(b);
    this.c = BigInt(c);
    this.instructions = instructions;
  }

  part1() {
    return this.run().join(',');
  }

  part2() {
    return this.check();
  }

  run(a?: bigint): number[] {
    if (a) this.a = a;
    const outs: number[] = [];
    const input = this.instructions;
    for (let i = 1; i <= input.length; i += 2) {
      const cmd = input[i - 1];
      const combo = this.combo(input[i]);

      if (cmd === 0) this.a >>= combo;
      else if (cmd === 1) this.b = this.b ^ BigInt(input[i]);
      else if (cmd === 2) this.b = combo % BigInt(8);
      else if (cmd === 3) {
        if (this.a !== BigInt(0)) i = input[i] - 1;
      } else if (cmd === 4) this.b = this.b ^ this.c;
      else if (cmd === 5) outs.push(Number(combo % BigInt(8)));
      else if (cmd === 6) this.b = this.a >> combo;
      else if (cmd === 7) this.c = this.a >> combo;
      else throw new Error(`Invalid opcode ${cmd}`);
    }
    return outs;
  }

  check(): number {
    const queue: { depth: number; score: number }[] = [{ depth: 0, score: 0 }];
    const instructions = this.instructions;
    while (queue.length) {
      const { depth, score } = queue.pop()!;
      if (depth === instructions.length) return score;
      for (let i = 0; i < 8; i++) {
        const newScore = i + 8 * score;
        const out = this.run(BigInt(newScore));
        const cmp = instructions[instructions.length - 1 - depth];
        if (out[0] === cmp) {
          queue.unshift({ depth: depth + 1, score: newScore });
        }
      }
    }
    return Number.POSITIVE_INFINITY;
  }

  combo(n: number): bigint {
    if (n <= 3) return BigInt(n);
    else if (n === 4) return this.a;
    else if (n === 5) return this.b;
    else if (n === 6) return this.c;
    else throw new Error('Invalid combo operator');
  }
}

export function parseInput(input: string) {
  const nums = input
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.match(/(\d+)/g)!.map(Number));

  return { a: nums[0][0], b: nums[1][0], c: nums[2][0], instructions: nums[3] };
}

export function solvePart1(input: string) {
  return new Day17(input).part1();
}

export function solvePart2(input: string) {
  return new Day17(input).part2();
}
