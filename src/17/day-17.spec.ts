import { nextTick } from 'process';
import {
  addShapeToGame,
  Game as TetrisGame,
  moveShapeLeft,
  moveShapeRight,
  TETRIS,
} from './tetris';

describe('Day 17: Tetris', () => {
  it('should place shape on empty field', () => {
    const g = new TetrisGame(TETRIS.shapes, '');
    expect(g.state.field).toEqual('-------');
    g.tick();
    expect(g.state.field).toEqual(
      ['..@@@@.', '.......', '.......', '.......', '-------'].join('\n')
    );
  });

  it('should move shape on field', () => {
    const g = new TetrisGame(TETRIS.shapes, '><<<');
    g.tick();
    g.tick();
    expect(g.state.field).toEqual(
      ['...@@@@', '.......', '.......', '-------'].join('\n')
    );
    g.tick();
    expect(g.state.field).toEqual(['..@@@@.', '.......', '-------'].join('\n'));
    g.tick();
    expect(g.state.field).toEqual(['.@@@@..', '-------'].join('\n'));
    g.tick();
    expect(g.state.field).toEqual(['####...', '-------'].join('\n'));
  });

  it('should not move when at boundary field', () => {
    const g = new TetrisGame(TETRIS.shapes, '>><<<<<<');
    let s = g.state;
    s = addShapeToGame(s, '@@@@');
    s = moveShapeRight(s);
    expect(s.field.split('\n')[0]).toEqual('...@@@@');
    s = moveShapeRight(s);
    expect(s.field.split('\n')[0]).toEqual('...@@@@');
    s = moveShapeLeft(s);
    expect(s.field.split('\n')[0]).toEqual('..@@@@.');
    s = moveShapeLeft(s);
    expect(s.field.split('\n')[0]).toEqual('.@@@@..');
    s = moveShapeLeft(s);
    expect(s.field.split('\n')[0]).toEqual('@@@@...');
    s = moveShapeLeft(s);
    expect(s.field.split('\n')[0]).toEqual('@@@@...');
  });

  it('should play a few rounds', () => {
    const g = new TetrisGame(TETRIS.shapes, TETRIS.examplePattern);
    g.tick(5);
    expect(g.state.field).toEqual(['..####.', '-------'].join('\n'));
    g.tick();
    expect(g.state.field).toEqual(
      [
        '...@...',
        '..@@@..',
        '...@...',
        '.......',
        '.......',
        '.......',
        '..####.',
        '-------',
      ].join('\n')
    );
    g.tick(4);
    expect(g.state.field).toEqual(
      ['...#...', '..###..', '...#...', '..####.', '-------'].join('\n')
    );
  });
});
