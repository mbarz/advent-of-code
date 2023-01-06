import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'submarine-moves.txt'), 'utf-8');

const lines = input.split('\n');
const moves = lines
  .map((line) => line.split(' '))
  .map(([direction, amount]) => ({ direction, amount: Number(amount) }));

class Submarine {
  depth = 0;
  horizontalPosition = 0;
  move(direction: string, amount: number) {
    if (direction === 'up') this.depth -= amount;
    if (direction === 'down') this.depth += amount;
    if (direction === 'forward') this.horizontalPosition += amount;
  }
}
const sub = new Submarine();
moves.forEach(({ direction, amount }) => sub.move(direction, amount));

const part1Solution = sub.depth * sub.horizontalPosition;
console.log(`Part 1 Solution: ${part1Solution}`);

class AimedSubmarine {
  depth = 0;
  horizontalPosition = 0;
  aim = 0;
  move(direction: string, amount: number) {
    if (direction === 'up') this.aim -= amount;
    if (direction === 'down') this.aim += amount;
    if (direction === 'forward') {
      this.horizontalPosition += amount;
      this.depth += this.aim * amount;
    }
  }
}

const sub2 = new AimedSubmarine();
moves.forEach(({ direction, amount }) => sub2.move(direction, amount));
const part2Solution = sub2.depth * sub2.horizontalPosition;
console.log(`Part 2 Solution: ${part2Solution}`);
