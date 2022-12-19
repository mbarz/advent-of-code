// 30 minutes
// 1 minute to release valve
// 1 minute to follow tunnel

import { getBestMove, Move, readValveInputFile } from './day-16';

describe('Day 16', () => {
  it('should read input', () => {
    const rooms = readValveInputFile('example');
    expect(rooms).toBeTruthy();
    expect(rooms).toHaveLength(10);
    expect(rooms[0].key).toEqual('AA');
    expect(rooms[0].flowRate).toEqual(0);
    expect(rooms[0].tunnelKeys).toHaveLength(3);
    expect(rooms[0].tunnelKeys).toEqual(['DD', 'II', 'BB']);
    expect(rooms[3].key).toEqual('DD');
    expect(rooms[3].flowRate).toEqual(20);
    expect(rooms[3].tunnelKeys).toHaveLength(3);
    expect(rooms[3].tunnelKeys).toEqual(['CC', 'AA', 'EE']);
  });

  function route(move: Move): string {
    let current = move;
    const parts = [];
    do {
      parts.push(current.move);
    } while (current.then && (current = current.then));
    return parts.join(' => ');
  }

  it('should calc best move', () => {
    const rooms = readValveInputFile('example');
    // expect(getPotential(rooms, 'BB', 0)).toEqual(0);
    // expect(getPotential(rooms, 'BB', 1)).toEqual(13);
    expect(getBestMove(rooms, 'AA', 3)).toEqual({
      move: 'go to DD',
      rating: 40,
      then: { move: 'open', rating: 40, then: { move: 'noop', rating: 0 } },
    });
    expect(route(getBestMove(rooms, 'AA', 3))).toEqual(
      'go to DD => open => noop'
    );
    expect(route(getBestMove(rooms, 'AA', 4))).toEqual(
      'go to DD => open => go to EE => open => noop'
    );
    expect(route(getBestMove(rooms, 'AA', 5))).toEqual(
      'go to DD => open => go to CC => go to BB => open => noop'
    );
  });
});
