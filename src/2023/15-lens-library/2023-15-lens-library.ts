import { sum } from '../../util/sum';
import { Solver } from '../util/solver';

export class AdventOfCode2023Day15 implements Solver {
  constructor(public readonly input: string) {}

  get steps() {
    return this.input.replace(/\s/g, '').split(',');
  }

  hash(s: string) {
    let value = 0;
    for (let i = 0; i < s.length; ++i) {
      const code = s.charCodeAt(i);
      value = ((value + code) * 17) % 256;
    }
    return value;
  }

  get boxes() {
    const boxes: Record<number, { label: string; focalLength: number }[]> = {};

    for (const step of this.steps) {
      if (step.includes('=')) {
        const parts = step.split('=');
        const label = parts[0];
        const focalLength = Number(parts[1]);
        const boxNumber = this.hash(label);
        const current = boxes[boxNumber] ?? [];
        boxes[boxNumber] = current.find((l) => l.label === label)
          ? current.map((l) => (l.label === label ? { label, focalLength } : l))
          : [...current, { label, focalLength }];
      }
      if (step.includes('-')) {
        const [label] = step.split('-');
        const boxNumber = this.hash(label);
        boxes[boxNumber] = [
          ...(boxes[boxNumber] ?? []).filter((l) => l.label !== label),
        ];
        if (!boxes[boxNumber].length) delete boxes[boxNumber];
      }
    }
    return boxes;
  }

  solvePart1(): number {
    return sum(this.steps.map((s) => this.hash(s)));
  }

  solvePart2(): number {
    return sum(
      Object.entries(this.boxes).map(([key, value]) => {
        const boxNumber = Number(key) + 1;
        return sum(
          value.map(({ focalLength }, i) => {
            const slot = i + 1;
            return boxNumber * slot * focalLength;
          }),
        );
      }),
    );
  }
}
