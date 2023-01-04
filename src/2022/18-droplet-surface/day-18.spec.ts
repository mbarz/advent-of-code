import { DropletScanner } from './droplet-scanner';

const exampleInput = [
  '2,2,2',
  '1,2,2',
  '3,2,2',
  '2,1,2',
  '2,3,2',
  '2,2,1',
  '2,2,3',
  '2,2,4',
  '2,2,6',
  '1,2,5',
  '3,2,5',
  '2,1,5',
  '2,3,5',
].join('\n');

describe('Day 18: Droplet Scanner', () => {
  it('should scan droplet data from input', () => {
    const s = new DropletScanner();
    s.scan(exampleInput);
    expect(s.droplets.length).toEqual(13);
    expect(s.droplets[0]).toEqual([2, 2, 2]);
    expect(s.isDropletAt([2, 2, 2])).toEqual(true);
    expect(s.isDropletAt([4, 2, 2])).toEqual(false);
  });

  it('should get surface of one block', () => {
    const s = new DropletScanner();
    s.scan('1,1,1');
    expect(s.getDropletSurface()).toEqual(6);
  });

  it('should get exterior surface of one block', () => {
    const s = new DropletScanner();
    s.scan('1,1,1');
    expect(s.getExteriorSurface()).toEqual(6);
  });

  it('should get surface of two sperate blocks', () => {
    const s = new DropletScanner();
    s.scan('1,1,1 3,3,3');
    expect(s.getDropletSurface()).toEqual(12);
  });

  it('should get exterior of two sperate blocks', () => {
    const s = new DropletScanner();
    s.scan('1,1,1 3,3,3');
    expect(s.getExteriorSurface()).toEqual(12);
  });

  it('should get surface of two touching blocks', () => {
    const s = new DropletScanner();
    s.scan('1,1,1 2,1,1');
    expect(s.getDropletSurface()).toEqual(10);
  });

  it('should get exterior surface of two touching blocks', () => {
    const s = new DropletScanner();
    s.scan('1,1,1 2,1,1');
    expect(s.getExteriorSurface()).toEqual(10);
  });

  it('should get surface of example', () => {
    const s = new DropletScanner();
    s.scan(exampleInput);
    expect(s.getDropletSurface()).toEqual(64);
  });

  it('should build block', () => {
    const s = new DropletScanner();
    s.scan('1,1,1');
    const b = s.build3DModel();
    expect(
      b.map((square) => square.map((line) => line.join('')).join('\n'))
    ).toEqual(['AAA\nAAA\nAAA', 'AAA\nASA\nAAA', 'AAA\nAAA\nAAA']);
    s.dunk3DModelInWater(b);
    expect(
      b.map((square) => square.map((line) => line.join('')).join('\n'))
    ).toEqual(['WWW\nWWW\nWWW', 'WWW\nWSW\nWWW', 'WWW\nWWW\nWWW']);
  });

  it('should get exteriour surface of example', () => {
    const s = new DropletScanner();
    s.scan(exampleInput);
    expect(s.getExteriorSurface()).toEqual(58);
  });
});
