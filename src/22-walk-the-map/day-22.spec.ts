import { exampleMapInput, MonkeyBoard } from './monkey-map';

function init() {
  const b = new MonkeyBoard();
  b.parse(exampleMapInput);
  return b;
}

describe('Day 22: Monkey Map', () => {
  it('should parse', () => {
    const b = init();
    expect(b.instructions).toEqual([
      10,
      'R',
      5,
      'L',
      5,
      'R',
      10,
      'L',
      4,
      'R',
      5,
      'L',
      5,
    ]);
    expect(b.position).toEqual([8, 0]);
    expect(b.board).toHaveLength(12);

    b.drawMap();

    const teleports = Array.from(b.teleports.entries()).map(
      ([key, value]) => `${key}=>${value.join(',')}`
    );
    expect(teleports.filter((t) => t.startsWith('L'))).toEqual([
      'L,7,0=>11,0',
      'L,7,1=>11,1',
      'L,7,2=>11,2',
      'L,7,3=>11,3',
      'L,-1,4=>11,4',
      'L,-1,5=>11,5',
      'L,-1,6=>11,6',
      'L,-1,7=>11,7',
      'L,7,8=>15,8',
      'L,7,9=>15,9',
      'L,7,10=>15,10',
      'L,7,11=>15,11',
    ]);

    expect(teleports.filter((t) => t.startsWith('R'))).toEqual([
      'R,12,0=>8,0',
      'R,12,1=>8,1',
      'R,12,2=>8,2',
      'R,12,3=>8,3',
      'R,12,4=>0,4',
      'R,12,5=>0,5',
      'R,12,6=>0,6',
      'R,12,7=>0,7',
      'R,16,8=>8,8',
      'R,16,9=>8,9',
      'R,16,10=>8,10',
      'R,16,11=>8,11',
    ]);

    expect(teleports.filter((t) => t.startsWith('U'))).toEqual([
      'U,0,3=>0,7',
      'U,1,3=>1,7',
      'U,2,3=>2,7',
      'U,3,3=>3,7',
      'U,4,3=>4,7',
      'U,5,3=>5,7',
      'U,6,3=>6,7',
      'U,7,3=>7,7',
      'U,8,-1=>8,11',
      'U,9,-1=>9,11',
      'U,10,-1=>10,11',
      'U,11,-1=>11,11',
      'U,12,7=>12,11',
      'U,13,7=>13,11',
      'U,14,7=>14,11',
      'U,15,7=>15,11',
    ]);
    expect(teleports.filter((t) => t.startsWith('D'))).toEqual([
      'D,0,8=>0,4',
      'D,1,8=>1,4',
      'D,2,8=>2,4',
      'D,3,8=>3,4',
      'D,4,8=>4,4',
      'D,5,8=>5,4',
      'D,6,8=>6,4',
      'D,7,8=>7,4',
      'D,8,12=>8,0',
      'D,9,12=>9,0',
      'D,10,12=>10,0',
      'D,11,12=>11,0',
      'D,12,12=>12,8',
      'D,13,12=>13,8',
      'D,14,12=>14,8',
      'D,15,12=>15,8',
    ]);
  });

  it('should move right', () => {
    const b = init();
    b.executeNextInstruction();
    expect(b.position).toEqual([10, 0]);
    b.executeNextInstruction();
    expect(b.direction).toEqual('D');
    b.executeNextInstruction();
    expect(b.position).toEqual([10, 5]);
    b.executeNextInstruction();
    expect(b.direction).toEqual('R');
    b.executeNextInstruction();
    expect(b.position).toEqual([3, 5]);
  });

  it('should walk all the way', () => {
    const b = init();
    expect(b.getPassword()).toEqual(6032);
  });
});
