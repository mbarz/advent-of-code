export function solvePart1(
  input: string,
  { w, h }: { w: number; h: number } = { w: 101, h: 103 },
) {
  const robots = parse(input);

  const times = 100;
  const moved = moveRobots(robots, { w, h }, times);

  // print(moved, { w, h });

  const q = [0, 0, 0, 0];
  const mw = Math.floor(w / 2);
  const mh = Math.floor(h / 2);
  for (const robot of moved) {
    if (robot.x < mw && robot.y < mh) q[0]++;
    if (robot.x < mw && robot.y > mh) q[1]++;
    if (robot.x > mw && robot.y < mh) q[2]++;
    if (robot.x > mw && robot.y > mh) q[3]++;
  }
  return q.reduce((a, b) => a * b, 1);
}

export function moveRobots(
  given: Robot[],
  { w, h }: { w: number; h: number },
  times: number,
) {
  const robots = given.map((r) => ({ ...r }));

  for (const robot of robots) {
    robot.x = (robot.x + robot.vx * times) % w;
    robot.y = (robot.y + robot.vy * times) % h;

    if (robot.y < 0) robot.y = h + robot.y;
    if (robot.x < 0) robot.x = w + robot.x;
  }
  return robots;
}

type Robot = { x: number; y: number; vx: number; vy: number };

export function print(robots: Robot[], { w, h }: { w: number; h: number }) {
  const m: string[][] = [];
  for (let y = 0; y < h; y++) {
    m.push(Array(w).fill('.'));
  }
  for (const robot of robots) {
    m[robot.y][robot.x] = '#';
  }
  return m;
}

function parse(input: string): Robot[] {
  return input
    .split('\n')
    .filter((line) => line)
    .map((line) => line.match(/(-?\d+)/g)!.map(Number))
    .map(([x, y, vx, vy]) => ({ x, y, vx, vy }));
}

export function solvePart2(input: string) {
  let robots = parse(input);
  for (let i = 0; i < 10000; ++i) {
    robots = moveRobots(robots, { w: 101, h: 103 }, 1);
    const printed = print(robots, { w: 101, h: 103 })
      .map((l) => l.join(''))
      .join('\n');
    if (printed.includes('##########')) {
      console.log(i);
      console.log(printed);
      return i + 1;
    }
  }
  return -1;
}
