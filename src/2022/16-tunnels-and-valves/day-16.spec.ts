// 30 minutes
// 1 minute to release valve
// 1 minute to follow tunnel

import { ValveSolver } from './day-16';

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

  it('should solve alone with short steps', () => {
    const s = new ValveSolver('example');
    expect(s).toBeTruthy();
    const res = s.solveStepByStep('AA', [], 30, 0);
    expect(res).toEqual(1651);
  });

  it('should solve with helper', () => {
    const s = new ValveSolver('example');
    expect(s).toBeTruthy();
    const res = s.solveStepByStep('AA', [], 26, 1);
    expect(res).toEqual(1707);
  });
});
