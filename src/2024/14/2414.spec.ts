import { moveRobots, solvePart1 } from './2414';

const input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe('2024 Day 14', () => {
  const dim = { w: 11, h: 7 };

  it('should move robot', () => {
    const r = { x: 2, y: 4, vx: 2, vy: -3 };

    const a = moveRobots([r], dim, 1)[0];
    expect(a).toEqual({ x: 4, y: 1, vx: 2, vy: -3 });

    const b = moveRobots([r], dim, 2)[0];
    expect(b).toEqual({ x: 6, y: 5, vx: 2, vy: -3 });

    const c = moveRobots([r], dim, 3)[0];
    expect(c).toEqual({ x: 8, y: 2, vx: 2, vy: -3 });

    const d = moveRobots([r], dim, 4)[0];
    expect(d).toEqual({ x: 10, y: 6, vx: 2, vy: -3 });

    const e = moveRobots([r], dim, 5)[0];
    expect(e).toEqual({ x: 1, y: 3, vx: 2, vy: -3 });
  });

  it('should solve part 1', () => {
    expect(solvePart1(input, dim)).toEqual(12);
  });
});
