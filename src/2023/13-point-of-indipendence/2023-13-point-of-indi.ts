import { Solver } from '../util/solver';
import { rotate2D } from '../util/util';

export class AdventOfCode2023Day13 implements Solver {
  patterns: string[][];

  constructor(input: string) {
    this.patterns = this.parsePatterns(input);
  }

  parsePatterns(puzzle: string) {
    const patterns: string[][] = [];
    const lines = puzzle.trim().split('\n');
    patterns.push([]);
    for (const line of lines) {
      const currentPattern = patterns[patterns.length - 1];
      if (!line && currentPattern.length) patterns.push([]);
      else currentPattern.push(line);
    }
    return patterns;
  }

  getReflectionValue(pattern: string[]) {
    return findHorizontalMirror(pattern) ?? 100 * findVerticalMirror(pattern)!;
  }

  getReflectionValues(pattern: string[]): number[] {
    return [
      ...findHorizontalMirrors(pattern),
      ...findVerticalMirrors(pattern).map((m) => 100 * m),
    ].filter((n) => n != null && !isNaN(n));
  }

  togglePixel(pattern: string[], pixel: number) {
    const copy = [...pattern];
    const width = pattern[0].length;
    2;
    const y = Math.floor(pixel / width);
    const x = pixel % width;
    const current = copy[y][x];
    const replacement = current === '.' ? '#' : '.';
    copy[y] = copy[y].substring(0, x) + replacement + copy[y].substring(x + 1);
    return copy;
  }

  getRealReflectionValue(pattern: string[]) {
    const pixels = pattern.length * pattern[0].length;
    const withSmudge = this.getReflectionValue(pattern);
    for (let i = 0; i < pixels; ++i) {
      const variant = this.togglePixel(pattern, i);
      const newMirror = this.getReflectionValues(variant).find(
        (v) => v != withSmudge,
      );
      if (newMirror) {
        return newMirror;
      }
    }
    throw new Error(
      `Did not find new mirror for ${this.patterns.indexOf(pattern)}`,
    );
  }

  solvePart1(): number {
    return this.patterns.reduce(
      (prev, curr) => prev + this.getReflectionValue(curr),
      0,
    );
  }
  solvePart2(): number {
    return this.patterns.reduce(
      (prev, curr) => prev + this.getRealReflectionValue(curr),
      0,
    );
  }
}

export function isLineMirroredAt(line: string, index: number): boolean {
  const a = line.substring(0, index);
  const b = line.substring(index);
  const bMirr = b.split('').reverse().join('');
  return a.endsWith(bMirr) || bMirr.endsWith(a);
}

export function isPatternHorizontallyMirroredAt(
  pattern: string[],
  index: number,
): boolean {
  return pattern.find((l) => !isLineMirroredAt(l, index)) == null;
}

export function findHorizontalMirrors(pattern: string[]): number[] {
  const mirros = [];
  for (let i = 1; i < pattern[0].length; i++) {
    if (isPatternHorizontallyMirroredAt(pattern, i)) mirros.push(i);
  }
  return mirros;
}

export function findHorizontalMirror(pattern: string[]): number | undefined {
  for (let i = 1; i < pattern[0].length; i++) {
    if (isPatternHorizontallyMirroredAt(pattern, i)) return i;
  }
  return undefined;
}

export function rotatePattern(pattern: string[]): string[] {
  return rotate2D(pattern.map((l) => l.split(''))).map((l) => l.join(''));
}

export function findVerticalMirror(pattern: string[]): number | undefined {
  return findHorizontalMirror(rotatePattern(pattern));
}
export function findVerticalMirrors(pattern: string[]): number[] {
  return findHorizontalMirrors(rotatePattern(pattern));
}
