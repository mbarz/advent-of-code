export type SnailFishElement = number | [SnailFishElement, SnailFishElement];

type TreeNode = {
  parent?: TreeNode;
  left?: TreeNode;
  right?: TreeNode;
  value?: number;
};

export class Snailfish {
  public root: TreeNode;

  constructor(s: string) {
    this.root = buildTree(s);
  }

  add(s: string): void {
    this.root = wrapNodes(this.root, buildTree(s));
  }

  toString(): string {
    return treeToString(this.root);
  }

  magnitude(): number {
    return magnitude(this.root);
  }

  findExplosive(): TreeNode | undefined {
    return findNode(this.root, (n, l) => n.left != null && l === 4);
  }

  canExplode(): boolean {
    return this.findExplosive() != null;
  }

  explode(): boolean {
    const node = this.findExplosive();
    if (node == null) return false;
    const prev = getPrevLeave(node.left!);
    const next = getNextLeave(node.right!);
    if (prev) prev.value = Number(prev.value) + Number(node.left!.value);
    if (next) next.value = Number(next.value) + Number(node.right!.value);
    node.left = undefined;
    node.right = undefined;
    node.value = 0;
    return true;
  }

  findSplittable(): TreeNode | undefined {
    return findNode(this.root, (n) => Number(n.value) >= 10);
  }

  canSplit(): boolean {
    return this.findSplittable() == null;
  }

  split(): boolean {
    const node = this.findSplittable();
    if (node == null) return false;
    const v = node.value!;
    const a = Math.floor(v / 2);
    const b = Math.ceil(v / 2);
    delete node.value;
    node.left = { value: a, parent: node };
    node.right = { value: b, parent: node };
    return true;
  }

  reduce() {
    let changed = true;
    while (changed) {
      changed = this.explode() || this.split();
    }
  }
}

export function sumOfSnailfishs(fishs: string[]): Snailfish {
  const [first, ...rest] = fishs;
  const s = new Snailfish(first);
  while (rest.length) {
    const f = rest.shift()!;
    s.add(f);
    s.reduce();
  }
  return s;
}

function buildTree(s: string) {
  return buildTreeNode(JSON.parse(s));
}
function buildTreeNode(e: SnailFishElement): TreeNode {
  return typeof e === 'number'
    ? { value: e }
    : wrapNodes(buildTreeNode(e[0]), buildTreeNode(e[1]));
}
function wrapNodes(a: TreeNode, b: TreeNode) {
  const parent: TreeNode = { left: a, right: b };
  a.parent = parent;
  b.parent = parent;
  return parent;
}

function treeToString(node: TreeNode): string {
  if (node.value != null) return String(node.value);
  else {
    const nodes = [node.left!, node.right!].map((n) => treeToString(n));
    return `[${nodes.join(',')}]`;
  }
}

export function magnitude(node: TreeNode | string): number {
  if (typeof node === 'string') return magnitude(buildTree(node));
  return node.value != null
    ? node.value
    : magnitude(node.left!) * 3 + magnitude(node.right!) * 2;
}

export function findNested(
  e: string | SnailFishElement,
  level: number
): number[] | undefined {
  if (typeof e === 'string') {
    return findNested(JSON.parse(e), level);
  } else if (Array.isArray(e)) {
    if (level === 0) return [];
    const a = findNested(e[0], level - 1);
    if (a) return [0, ...a];
    const b = findNested(e[1], level - 1);
    if (b) return [1, ...b];
  }
  return undefined;
}

function getLeftMostNode(n: TreeNode) {
  while (n.left != null) n = n.left;
  return n;
}
function getRightMostNode(n: TreeNode) {
  while (n.right != null) n = n.right;
  return n;
}
export function getNextNode(n: TreeNode) {
  if (n.right != null) return getLeftMostNode(n.right);
  while (n.parent != null && n === n.parent.right) n = n.parent;
  return n.parent;
}
export function getPrevNode(n: TreeNode) {
  if (n.left != null) return getRightMostNode(n.left);
  while (n.parent != null && n === n.parent.left) n = n.parent;
  return n.parent;
}

export function getNextLeave(n: TreeNode) {
  let current = getNextNode(n);
  while (current && current.value == null) current = getNextNode(current);
  return current?.value != null ? current : undefined;
}
export function getPrevLeave(n: TreeNode) {
  let current = getPrevNode(n);
  while (current && current.value == null) current = getPrevNode(current);
  return current?.value != null ? current : undefined;
}

export function findNode(
  root: TreeNode,
  fn: (node: TreeNode, level: number, index: number) => boolean
): TreeNode | undefined {
  let current: TreeNode | undefined = getLeftMostNode(root);
  let i = 0;
  while (current) {
    if (fn(current, getLevel(current), i)) return current;
    current = getNextNode(current);
    i++;
  }
  return undefined;
}

function getLevel(node: TreeNode) {
  let level = 0;
  while (node.parent) {
    node = node.parent;
    level++;
  }
  return level;
}

export function getAllMagnitudes(input: string[]) {
  const all: number[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let i2 = i + 1; i2 < input.length; i2++) {
      all.push(sumOfSnailfishs([input[i], input[i2]]).magnitude());
      all.push(sumOfSnailfishs([input[i2], input[i]]).magnitude());
    }
  }
  return all;
}

export function getMaxAdditionMagnitude(input: string[]) {
  return Math.max(...getAllMagnitudes(input));
}
