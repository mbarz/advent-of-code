// 30 minutes
// 1 minute to release valve
// 1 minute to follow tunnel

import {
  calcDistances,
  getBestValveOption,
  getPathToRoom,
  getRoomDistance,
  getValveOptions,
  openValves,
  readValveInputFile,
} from './day-16';

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

  it('should calc distances', () => {
    const rooms = readValveInputFile('example');
    const distances = calcDistances(rooms);
    expect(distances['AA']).toEqual({
      AA: 0,
      BB: 1,
      CC: 2,
      DD: 1,
      EE: 2,
      FF: 3,
      GG: 4,
      HH: 5,
      II: 1,
      JJ: 2,
    });
  });

  it('should calc distance', () => {
    const rooms = readValveInputFile('example');
    expect(getRoomDistance(rooms, 'AA', 'BB')).toEqual(1);
    expect(getRoomDistance(rooms, 'AA', 'CC')).toEqual(2);
    expect(getRoomDistance(rooms, 'AA', 'HH')).toEqual(5);
  });

  it('should calc path', () => {
    const rooms = readValveInputFile('example');
    expect(getPathToRoom(rooms, 'AA', 'HH')).toEqual([
      'DD',
      'EE',
      'FF',
      'GG',
      'HH',
    ]);
  });

  it('should get options', () => {
    const rooms = readValveInputFile('example');
    expect(getValveOptions({ rooms, current: 'AA', open: [] })).toEqual([
      { key: 'BB', flowRate: 13, path: ['BB'] },
      { key: 'CC', flowRate: 2, path: ['DD', 'CC'] },
      { key: 'DD', flowRate: 20, path: ['DD'] },
      { key: 'EE', flowRate: 3, path: ['DD', 'EE'] },
      { key: 'HH', flowRate: 22, path: ['DD', 'EE', 'FF', 'GG', 'HH'] },
      { key: 'JJ', flowRate: 21, path: ['II', 'JJ'] },
    ]);

    expect(
      getValveOptions({ rooms, current: 'DD', open: ['AA', 'DD'] })
    ).toEqual([
      { flowRate: 13, key: 'BB', path: ['CC', 'BB'] },
      { flowRate: 2, key: 'CC', path: ['CC'] },
      { flowRate: 3, key: 'EE', path: ['EE'] },
      { flowRate: 22, key: 'HH', path: ['EE', 'FF', 'GG', 'HH'] },
      { flowRate: 21, key: 'JJ', path: ['AA', 'II', 'JJ'] },
    ]);

    expect(
      getValveOptions({ rooms, current: 'JJ', open: ['AA', 'DD', 'BB', 'JJ'] })
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
    const rooms = readValveInputFile('example');
    expect(getPathToRoom(rooms, 'AA', 'BB')).toEqual(['BB']);
    expect(getPathToRoom(rooms, 'AA', 'FF')).toEqual(['DD', 'EE', 'FF']);
  });

  it('should get best option', () => {
    const rooms = readValveInputFile('example');
    expect(getBestValveOption({ rooms, current: 'AA', open: [] })).toEqual({
      key: 'DD',
      flowRate: 20,
      path: ['DD'],
    });

    expect(
      getBestValveOption({
        rooms,
        current: 'JJ',
        open: ['AA', 'DD', 'BB', 'JJ'],
      })
    ).toEqual({
      key: 'HH',
      flowRate: 22,
      path: ['II', 'AA', 'DD', 'EE', 'FF', 'GG', 'HH'],
    });

    expect(
      getBestValveOption({
        rooms,
        current: 'DD',
        open: ['AA', 'DD'],
      })
    ).toEqual({ flowRate: 13, key: 'BB', path: ['CC', 'BB'] });
  });

  it('should open valves in best order', () => {
    const rooms = readValveInputFile('example');
    const res = openValves({ rooms, time: 30, start: 'AA' });
    expect(res.released).toEqual(1651);
    expect(res.open).toEqual(['DD', 'BB', 'JJ', 'HH', 'EE', 'CC']);
  });
});
