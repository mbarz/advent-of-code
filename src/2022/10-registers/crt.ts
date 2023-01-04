import { CPU } from './cpu';

export class CRT {
  char = '#';

  constructor(private readonly cpu: CPU) {}

  drawAt(n: number): string {
    const x = this.cpu.x;
    return Math.abs(x - n) <= 1 ? this.char : '.';
  }

  draw(ticks?: number) {
    let out = '';
    let i = 0;
    while (this.cpu.stack.length) {
      if (ticks != null && i >= ticks) break;
      out += this.drawAt(i % 40);
      this.cpu.tick();
      i++;
      const lineEnd = i % 40 === 0;
      if (lineEnd && this.cpu.stack.length) out += '\n';
    }
    return out;
  }
}
