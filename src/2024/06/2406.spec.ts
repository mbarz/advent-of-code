import {
  addObstacle,
  findObstaclesForLoop,
  isLoop,
  solvePart1,
  solvePart2,
} from './2406';

const input = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
].join('\n');

describe('2024 Day 06', () => {
  it('should solve part 1', () => {
    expect(solvePart1(input)).toBe(41);
  }, 500);

  it('should add obstacle', () => {
    const bef = input.split('\n');
    const aft = addObstacle(bef, { x: 3, y: 6 });
    expect(bef[6]).toEqual('.#..^.....');
    expect(aft[6]).toEqual('.#.#^.....');
  });

  it('should detect loop', () => {
    const lines = addObstacle(input.split('\n'), { x: 3, y: 6 });
    expect(isLoop(lines, { x: 4, y: 6 }, 'up')).toBe(true);
  });

  it('should find obstacles for loops', () => {
    const obstacles = findObstaclesForLoop(input);
    expect(obstacles).toContain('3,6');
    expect(obstacles).toContain('6,7');
    expect(obstacles).toContain('7,7');
    expect(obstacles).toContain('1,8');
    expect(obstacles).toContain('3,8');
    expect(obstacles).toContain('7,9');
  }, 500);

  it('should solve part 2', () => {
    expect(solvePart2(input)).toBe(6);
  }, 500);
});
