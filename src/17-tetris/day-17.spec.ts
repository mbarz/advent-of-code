import {
  advanceGame,
  Game as TetrisGame,
  moveShapeLeft,
  moveShapeRight,
  TETRIS,
} from './day-17';

describe('Day 17: Tetris', () => {
  it('should place shape on empty field', () => {
    const g = new TetrisGame('>');
    expect(g.state.field).toEqual([127]);
    g.tick();
    expect(g.state.field).toEqual([0, 0, 0, 0b1111111]);
    expect(g.state.shape).toEqual([0b0001111, 0, 0, 0]);
  });

  it('should move shape on field', () => {
    const g = new TetrisGame(TETRIS.examplePattern);
    expect(g.state.shape).toEqual([0]);
    g.tick(); // appear and >
    expect(g.state.shape).toEqual([0b0001111, 0, 0, 0]);
    g.tick(); // >
    expect(g.state.shape).toEqual([0b0001111, 0, 0]);
    g.tick(); // >
    expect(g.state.shape).toEqual([0b0001111, 0]);
    g.tick(); // <
    expect(g.state.field).toEqual([0b0011110, 0b1111111]);
    expect(g.state.shape).toEqual([0, 0]);
  });

  it('should not move when at boundary field', () => {
    const g = new TetrisGame('>><<<<<<');
    let s = g.state;
    s = advanceGame(s, 1);
    expect(s.shape[0]).toEqual(0b0001111);
    s = moveShapeRight(s);
    expect(s.shape[0]).toEqual(0b0001111);
    s = moveShapeLeft(s);
    expect(s.shape[0]).toEqual(0b0011110);
    s = moveShapeLeft(s);
    expect(s.shape[0]).toEqual(0b0111100);
    s = moveShapeLeft(s);
    expect(s.shape[0]).toEqual(0b1111000);
    s = moveShapeLeft(s);
    expect(s.shape[0]).toEqual(0b1111000);
  });

  it('should cut', () => {
    const g = new TetrisGame(TETRIS.examplePattern);
    g.tick(164);
    expect(g.state.ground).toEqual(0);
    g.tick(1);
    expect(g.state.ground).toEqual(46);
  });

  it('should play for a short while', () => {
    const g = new TetrisGame(TETRIS.examplePattern);
    while (g.state.placedShapes < 10) g.tick();
    g.tick();
    expect(g.state.ground).toEqual(0);
    expect(g.state.field.length).toEqual(21);
  });

  it('should play for a while', () => {
    const g = new TetrisGame(TETRIS.examplePattern);
    g.place(1000000000000);
    expect(g.getHeight()).toEqual(1514285714288);
  });
});
