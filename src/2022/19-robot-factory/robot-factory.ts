export class RobotFactory {
  blueprints: number[][][] = [];
  maxRobots: number[][] = [];
  maxRes: number[][] = [];

  parseBlueprints(input: string) {
    const parsed = input.split('\n').map((line) => {
      const blueprint: Record<string, Record<string, number>> = {};

      line.split('.').forEach((part) => {
        const m = part.match(/Each (\w+) robot costs (.+)/);
        if (m) {
          const robotType = m[1];
          blueprint[robotType] = {};
          m[2]
            .split(' and ')
            .map((res) => res.split(' '))
            .forEach(([n, res]) => (blueprint[robotType][res] = Number(n)));
        }
      });

      return blueprint;
    });
    const res = ['ore', 'clay', 'obsidian', 'geode'];
    this.blueprints = parsed.map((blueprint) =>
      res.map((robot) => res.map((r) => blueprint[robot][r] || 0))
    );
    this.maxRobots = this.blueprints.map((b) => this.getMaxRes(b));
    this.maxRes = this.maxRobots.map((r) => r.map((v) => v * 1.5));
  }

  cache = new Map<
    string,
    { timeLeft: number; current: number; gain: number }
  >();

  buildKey(blueprint: number, robots: number[], res: number[]): string {
    return [blueprint, robots.join(','), res.slice(0, 3).join(',')].join(';');
  }

  getMaxRes(blueprint: number[][]) {
    return blueprint.reduce((p, c) => p.map((v, i) => Math.max(v, c[i])), [
      0,
      0,
      0,
      Number.POSITIVE_INFINITY,
    ] as number[]);
  }

  truncate(a: number[], blueprintIndex: number): number[] {
    const max = this.maxRes[blueprintIndex];
    const truncated = a.map((v, i) => (i === 3 ? v : Math.min(v, max[i])));
    return truncated;
  }

  currentMax = 0;

  getMaxOutcome(
    blueprintIndex: number,
    robots: number[],
    res: number[],
    timeLeft: number
  ): number {
    if (timeLeft === 24) {
      this.cache.clear();
      this.currentMax = 0;
    }

    if (timeLeft === 0) return res[3];

    const maxPossible =
      (timeLeft * (timeLeft + 1)) / 2 + res[3] + timeLeft * robots[3];
    if (maxPossible < this.currentMax) {
      return 0;
    }

    const blueprint = this.blueprints[blueprintIndex];

    const key = this.buildKey(
      blueprintIndex,
      robots,
      this.truncate(res, blueprintIndex)
    );
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached != null) {
        if (timeLeft < cached.timeLeft && res[3] <= cached.current) return 0;
        if (cached.timeLeft === timeLeft) return res[3] + cached.gain;
      }
    }

    let result = this.getMaxOutcome(
      blueprintIndex,
      robots,
      add(res, robots),
      timeLeft - 1
    );
    for (let robotIndex = 0; robotIndex < blueprint.length; ++robotIndex) {
      const cost = blueprint[robotIndex];
      const affordable = Math.min(...sub(res, cost)) >= 0;
      const maxRobotsOfType = this.maxRobots[blueprintIndex][robotIndex];
      const enoughRobots =
        robotIndex < 3 && robots[robotIndex] >= maxRobotsOfType;
      if (affordable && !enoughRobots) {
        const updatedRobots = [...robots];
        updatedRobots[robotIndex]++;
        const withRobot = this.getMaxOutcome(
          blueprintIndex,
          updatedRobots,
          add(sub(res, cost), robots),
          timeLeft - 1
        );
        if (withRobot > result) result = withRobot;
      }
    }

    this.cache.set(key, { timeLeft, current: res[3], gain: result - res[3] });

    this.currentMax = Math.max(this.currentMax, result);
    return result;
  }
}

function add(a: number[], b: number[]): number[] {
  return a.map((n, i) => n + b[i]);
}
function sub(a: number[], b: number[]): number[] {
  return a.map((n, i) => n - b[i]);
}
