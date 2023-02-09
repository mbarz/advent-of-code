import {
  findNested,
  findNode,
  getMaxAdditionMagnitude,
  getNextLeave,
  getPrevLeave,
  magnitude,
  Snailfish,
  sumOfSnailfishs,
} from './snailfish';

describe('2021 - Day 18 - Snailfish', () => {
  it('should add snailfishs', () => {
    const s = new Snailfish('[1,2]');
    s.add('[[3,4],5]');
    expect(s.toString()).toEqual('[[1,2],[[3,4],5]]');
  });

  it('should calculate magnitude', () => {
    expect(new Snailfish('[9,1]').magnitude()).toEqual(29);
    expect(magnitude('[1,9]')).toEqual(21);
    expect(magnitude('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')).toEqual(1384);
  });

  it('should explode', () => {
    const s = new Snailfish('[[[[[9,8],1],2],3],4]');
    s.explode();
    expect(s.toString()).toEqual('[[[[0,9],2],3],4]');
    s.explode();
    expect(s.toString()).toEqual('[[[[0,9],2],3],4]');
  });

  it('should find nested', () => {
    expect(findNested('[1,2]', 1)).toEqual(undefined);
    expect(findNested('[1,2]', 2)).toEqual(undefined);
    expect(findNested('[1,[2,3]]', 1)).toEqual([1]);
    expect(findNested('[[[[[9, 8], 1], 2], 3], 4]', 4)).toEqual([0, 0, 0, 0]);
    expect(findNested('[7,[6,[5,[4,[3,2]]]]]', 4)).toEqual([1, 1, 1, 1]);
    expect(findNested('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', 4)).toEqual([
      0, 1, 1, 1,
    ]);
  });

  it('should reduce', () => {
    const s = new Snailfish('[[[[4,3],4],4],[7,[[8,4],9]]]');
    s.add('[1,1]');
    s.reduce();
    expect(s.toString()).toEqual('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
  });

  it('should reduce', () => {
    const s = new Snailfish('[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]');
    s.add('[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]');
    s.reduce();
    expect(s.toString()).toEqual(
      '[[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]'
    );
    expect(s.magnitude()).toEqual(3993);
  });

  it('should find nested', () => {
    const given = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
    const s = new Snailfish(given);
    const node = findNode(s.root, (n, level) => n.left != null && level === 4)!;
    expect(node).toBeDefined();
    expect(node.left?.value).toEqual(7);
    expect(node.right?.value).toEqual(3);
    expect(getNextLeave(node.right!)?.value).toEqual(6);
    expect(getPrevLeave(node.left!)?.value).toEqual(1);
  });

  it('should build tree', () => {
    const given = '[[[[[9,8],1],2],3],4]';
    const s = new Snailfish(given);
    const root = s.root;
    expect(root.parent).toEqual(undefined);
    expect(root.left?.left?.left?.left?.left?.value).toEqual(9);
    expect(root.left?.left?.left?.left?.right?.value).toEqual(8);
    expect(root.left?.left?.left?.right?.value).toEqual(1);
    expect(root.left?.left?.right?.value).toEqual(2);
    expect(root.left?.right?.value).toEqual(3);
    expect(root.right?.value).toEqual(4);
    expect(s.toString()).toEqual(given);
  });

  const exampleInput = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
  [[[5,[2,8]],4],[5,[[9,9],0]]]
  [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
  [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
  [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
  [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
  [[[[5,4],[7,7]],8],[[8,3],8]]
  [[9,3],[[9,9],[6,[4,9]]]]
  [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
  [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

  it('should solve part 1 for example input', () => {
    expect(sumOfSnailfishs(exampleInput.split('\n')).magnitude()).toEqual(4140);
  });

  it('should get max magnitude', () => {
    expect(getMaxAdditionMagnitude(exampleInput.split('\n'))).toEqual(3993);
  });
});
