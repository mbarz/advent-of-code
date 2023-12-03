import { calcSum, readTextFileLines } from './util';

type Color = 'red' | 'blue' | 'green';

export class AdventOfCode2023Day02 {
  run() {
    console.log('Welcome to Advent of Code 2023 - Day 2\n');

    this.solvePart1();
    this.solvePart2();
  }

  solvePart1() {
    console.log('Solving part 1...');
    const lines = readTextFileLines(2);
    const games = this.parseGames(lines);
    const gamesWithMaxCounts = this.getMaxCounts(games);
    const load = { red: 12, green: 13, blue: 14 };
    const invalidGames = gamesWithMaxCounts.filter((g) =>
      this.isGameValidWithLoad(g, load)
    );
    const solution = calcSum(invalidGames.map((g) => g.index));
    console.log(`Solution: ${solution}`);
  }

  solvePart2() {
    console.log('Solving part 2...');
    const lines = readTextFileLines(2);
    const games = this.parseGames(lines);
    const gamesWithMaxCounts = this.getMaxCounts(games);
    const powers = gamesWithMaxCounts.map(
      ({ maxCounts }) => maxCounts.red * maxCounts.green * maxCounts.blue
    );
    console.log(`Solution: ${calcSum(powers)}`);
  }

  private isGameValidWithLoad(
    g: { index: number; maxCounts: Record<Color, number> },
    load: { red: number; green: number; blue: number }
  ): unknown {
    return (
      g.maxCounts.red <= load.red &&
      g.maxCounts.blue <= load.blue &&
      g.maxCounts.green <= load.green
    );
  }

  private getMaxCounts(
    games: { index: number; counts: Record<Color, number>[] }[]
  ) {
    return games.map(({ index, counts }) => {
      const maxCounts = counts.reduce(
        (prev, curr) => ({
          red: Math.max(curr.red ?? 0, prev.red),
          blue: Math.max(curr.blue ?? 0, prev.blue),
          green: Math.max(curr.green ?? 0, prev.green),
        }),
        { red: 0, blue: 0, green: 0 } as Record<Color, number>
      );
      return { index, maxCounts };
    });
  }

  private parseGames(lines: string[]) {
    return lines.map((line) => {
      const [prefix, data] = line.split(': ');
      const index = +prefix.slice(5);
      const counts = data.split('; ').map((set) => {
        return set
          .split(', ')
          .map((p) => {
            return p.match(/^(\d+)\s(\w+)$/) as string[];
          })
          .reduce(
            (p, c) => ({ ...p, [c[2]]: +c[1] }),
            {} as Record<Color, number>
          );
      });

      return { index, counts };
    });
  }
}
