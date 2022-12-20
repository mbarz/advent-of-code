// 30 minutes
// 1 minute to release valve
// 1 minute to follow tunnel

import { shortestPath } from '../12/day12';
import { readValveInputFile, traceTree, ValveSolver } from './day-16';

describe('Day 16', () => {
  it('should read input', () => {
    const s = new ValveSolver('example');

    expect(s.graph).toBeTruthy();
    expect(Object.keys(s.graph)).toHaveLength(10);
    expect(s.graph['AA']).toEqual(['DD', 'II', 'BB']);
    expect(s.flowRates['AA']).toEqual(0);

    expect(s.graph['DD']).toEqual(['CC', 'AA', 'EE']);
    expect(s.flowRates['DD']).toEqual(20);
  });

  it('should get path', () => {
    const g = readValveInputFile('example').graph;

    expect(shortestPath('AA', 'CC', g)).toEqual({
      shortestDistance: 2,
      path: ['DD', 'CC'],
    });

    expect(shortestPath('AA', 'HH', g)).toEqual({
      shortestDistance: 5,
      path: ['DD', 'EE', 'FF', 'GG', 'HH'],
    });
  });

  it('should calc path', () => {
    const s = new ValveSolver('example');
    expect(s.getPathToRoom('AA', 'HH')).toEqual(['DD', 'EE', 'FF', 'GG', 'HH']);
  });

  it('should get options', () => {
    const s = new ValveSolver('example');
    expect(s.getValveOptions({ current: 'AA', open: [] })).toEqual([
      { key: 'BB', flowRate: 13, path: ['BB'] },
      { key: 'CC', flowRate: 2, path: ['DD', 'CC'] },
      { key: 'DD', flowRate: 20, path: ['DD'] },
      { key: 'EE', flowRate: 3, path: ['DD', 'EE'] },
      { key: 'HH', flowRate: 22, path: ['DD', 'EE', 'FF', 'GG', 'HH'] },
      { key: 'JJ', flowRate: 21, path: ['II', 'JJ'] },
    ]);

    expect(s.getValveOptions({ current: 'DD', open: ['AA', 'DD'] })).toEqual([
      { flowRate: 13, key: 'BB', path: ['CC', 'BB'] },
      { flowRate: 2, key: 'CC', path: ['CC'] },
      { flowRate: 3, key: 'EE', path: ['EE'] },
      { flowRate: 22, key: 'HH', path: ['EE', 'FF', 'GG', 'HH'] },
      { flowRate: 21, key: 'JJ', path: ['AA', 'II', 'JJ'] },
    ]);

    expect(
      s.getValveOptions({ current: 'JJ', open: ['AA', 'DD', 'BB', 'JJ'] })
    ).toEqual([
      { key: 'CC', flowRate: 2, path: ['II', 'AA', 'DD', 'CC'] },
      { key: 'EE', flowRate: 3, path: ['II', 'AA', 'DD', 'EE'] },
      {
        key: 'HH',
        flowRate: 22,
        path: ['II', 'AA', 'DD', 'EE', 'FF', 'GG', 'HH'],
      },
    ]);
  });

  it('should get path to room', () => {
    const s = new ValveSolver('example');
    expect(s.getPathToRoom('AA', 'BB')).toEqual(['BB']);
    expect(s.getPathToRoom('AA', 'FF')).toEqual(['DD', 'EE', 'FF']);
  });

  it('should solve alone', () => {
    const s = new ValveSolver('example');
    expect(s.solve()).toEqual(1651);
  });

  it('should solve alone with short steps', () => {
    const s = new ValveSolver('example');
    expect(s).toBeTruthy();
    // expect(s.solve()).toEqual(1651);
    // expect(s.solve2().released).toEqual(1651);
  });
});
