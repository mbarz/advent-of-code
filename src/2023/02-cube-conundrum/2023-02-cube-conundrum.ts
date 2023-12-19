import { Solver } from '../util/solver';
import { calcSum } from '../util/util';

type Color = 'red' | 'blue' | 'green';

export class AdventOfCode2023Day02 implements Solver {
  private lines: string[];

  constructor(input: string) {
    this.lines = input.split('\n');
  }

  solvePart1() {
    const games = this.parseGames(this.lines);
    const gamesWithMaxCounts = this.getMaxCounts(games);
    const load = { red: 12, green: 13, blue: 14 };
    const invalidGames = gamesWithMaxCounts.filter((g) =>
      this.isGameValidWithLoad(g, load)
    );
    return calcSum(invalidGames.map((g) => g.index));
  }

  solvePart2() {
    const games = this.parseGames(this.lines);
    const gamesWithMaxCounts = this.getMaxCounts(games);
    const powers = gamesWithMaxCounts.map(
      ({ maxCounts }) => maxCounts.red * maxCounts.green * maxCounts.blue
    );
    return calcSum(powers);
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
