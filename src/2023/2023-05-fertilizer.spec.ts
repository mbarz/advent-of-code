import { AdventOfCode2023Day05 } from './2023-05-fertilizer';

describe('2023 - Day 5: If You Give A Seed A Fertilizer', () => {
  let solver: AdventOfCode2023Day05;

  beforeEach(() => {
    solver = new AdventOfCode2023Day05('test');
  });

  it('should solve part 1', () => {
    expect(solver.solvePart1()).toEqual(35);
  });

  it('should solve part 2', () => {
    expect(solver.solvePart2()).toEqual(46);
  });

  it('should read almanach', () => {
    const almanach = solver.almanach;
    expect(almanach.seeds).toEqual([79, 14, 55, 13]);
    expect(almanach.maps).toHaveLength(7);
    expect(almanach.maps[3].source).toEqual('water');
    expect(almanach.maps[3].destination).toEqual('light');
    expect(almanach.maps[3].ranges).toEqual([
      {
        destinationStart: 88,
        sourceStart: 18,
        range: 7,
      },
      {
        destinationStart: 18,
        sourceStart: 25,
        range: 70,
      },
    ]);
  });

  it('should map', () => {
    expect(solver.map('seed', 79, 'soil')).toEqual(81);
    expect(solver.map('seed', 14, 'soil')).toEqual(14);

    expect(solver.map('seed', 97, 'soil')).toEqual(99);
    expect(solver.map('seed', 98, 'soil')).toEqual(50);

    expect(solver.map('seed', 79, 'fertilizer')).toEqual(81);
    expect(solver.map('seed', 79, 'water')).toEqual(81);
    expect(solver.map('seed', 79, 'light')).toEqual(74);
    expect(solver.map('seed', 79, 'temperature')).toEqual(78);
    expect(solver.map('seed', 79, 'humidity')).toEqual(78);
    expect(solver.map('seed', 79, 'location')).toEqual(82);
  });

  it('should build missing ranges', () => {
    expect(solver.getAllRanges('seed')).toEqual({
      destination: 'soil',
      ranges: [
        { sourceStart: 0, destinationStart: 0, range: 50 },
        { sourceStart: 50, destinationStart: 52, range: 48 },
        { sourceStart: 98, destinationStart: 50, range: 2 },
        {
          sourceStart: 100,
          destinationStart: 100,
          range: Number.POSITIVE_INFINITY,
        },
      ],
    });
    expect(solver.getAllRanges('humidity')).toEqual({
      destination: 'location',
      ranges: [
        { sourceStart: 0, destinationStart: 0, range: 56 },
        { sourceStart: 56, destinationStart: 60, range: 37 },
        { sourceStart: 93, destinationStart: 56, range: 4 },
        {
          sourceStart: 97,
          destinationStart: 97,
          range: Number.POSITIVE_INFINITY,
        },
      ],
    });
  });

  it('should map range', () => {
    expect(solver.mapRange('seed', { start: 79, size: 100 }, 'soil')).toEqual([
      {
        start: 81,
        size: 19,
      },
      {
        start: 50,
        size: 2,
      },
      { start: 100, size: 79 },
    ]);
    expect(
      solver.mapRange('soil', { start: 81, size: 19 }, 'fertilizer')
    ).toEqual([{ start: 81, size: 19 }]);
    expect(
      solver.mapRange('soil', { start: 50, size: 2 }, 'fertilizer')
    ).toEqual([{ start: 35, size: 2 }]);
    expect(
      solver.mapRange('soil', { start: 100, size: 79 }, 'fertilizer')
    ).toEqual([{ start: 100, size: 79 }]);
    expect(
      solver.mapRange('seed', { start: 79, size: 100 }, 'fertilizer')
    ).toEqual([
      {
        start: 35,
        size: 2,
      },
      {
        start: 81,
        size: 98,
      },
    ]);
  });

  it('should map ranges', () => {
    expect(
      solver.mapRanges(
        'seed',
        [
          { start: 79, size: 14 },
          { start: 55, size: 13 },
        ],
        'location'
      )
    ).toEqual([
      { start: 46, size: 15 },
      { start: 82, size: 3 },
      { start: 86, size: 4 },
      { start: 94, size: 5 },
    ]);
  });
});
