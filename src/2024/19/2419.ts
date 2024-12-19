export class Day2419 {
  designs: string[];
  patterns: string[];

  constructor(input: string) {
    const { designs, patterns } = this.parseInput(input);
    this.designs = designs;
    this.patterns = patterns;
  }

  parseInput(input: string) {
    const lines = input.split('\n');
    const [l1, , ...designs] = lines;
    const patterns = l1.split(', ');
    return { designs, patterns };
  }

  getAllVariantsForAllDesigns() {
    return this.designs
      .map((d) => this.getDesignVariants(d))
      .reduce((a, b) => a + b, 0);
  }

  getPossibleDesigns() {
    return this.designs.filter((d) => this.isDesignPossible(d));
  }

  isDesignPossible(design: string) {
    if (this.patterns.includes(design)) return true;
    for (const pattern of this.patterns.filter((p) => design.startsWith(p))) {
      const rest = design.substring(pattern.length);
      if (this.isDesignPossible(rest)) {
        return true;
      }
    }
    return false;
  }

  variantCache = new Map<string, number>();

  getDesignVariants(design: string): number {
    if (this.variantCache.has(design)) return this.variantCache.get(design)!;
    let variants = 0;
    if (this.patterns.includes(design)) variants += 1;
    for (const pattern of this.patterns.filter((p) => design.startsWith(p))) {
      const rest = design.substring(pattern.length);
      const sub = this.getDesignVariants(rest);
      variants += sub;
    }
    this.variantCache.set(design, variants);
    return variants;
  }
}

export function solvePart1(input: string) {
  return new Day2419(input).getPossibleDesigns().length;
}

export function solvePart2(input: string) {
  return new Day2419(input).getAllVariantsForAllDesigns();
}
