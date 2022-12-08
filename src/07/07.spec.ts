import { readFileSync } from 'fs';

const exampleLines = [
  '$ cd /',
  '$ ls',
  'dir a',
  '14848514 b.txt',
  '8504156 c.dat',
  'dir d',
  '$ cd a',
  '$ ls',
  'dir e',
  '29116 f',
  '2557 g',
  '62596 h.lst',
  '$ cd e',
  '$ ls',
  '584 i',
  '$ cd ..',
  '$ cd ..',
  '$ cd d',
  '$ ls',
  '4060174 j',
  '8033020 d.log',
  '5626152 d.ext',
  '7214296 k',
];
const exampleInput = exampleLines.join('\n');
const input = readFileSync(__dirname + '/07.txt', 'utf-8');

type File = { name: string; size: number };

type Dir = {
  name: string;
  files: File[];
  dirs: Dir[];
  parent?: Dir;
};

type State = {
  current?: Dir;
  root: Dir;
};

function createDir(name: string, parent?: Dir): Dir {
  const dir = {
    name: name,
    dirs: [],
    files: [],
    parent,
  };
  if (parent != null) parent.dirs.push(dir);
  return dir;
}

function exec(state: State, command: string) {
  if (command.startsWith('$ cd')) {
    const target = command.substring(5);
    if (target === '/') {
      state.current = state.root;
    } else if (state.current != null && target === '..') {
      state.current = state.current?.parent || state.current;
    } else if (state.current != null) {
      let targetDir = state.current.dirs.find((d) => d.name === target);
      if (targetDir == null) {
        targetDir = createDir(target, state.current);
      }
      state.current = targetDir;
    }
  }

  const fileInfo = command.match(/^(\d+)\s(.+)$/);
  if (fileInfo && state.current != null) {
    const [, size, name] = fileInfo;
    if (!state.current.files.map((f) => f.name).includes(name)) {
      state.current.files.push({ name, size: Number(size) });
    }
  }
}

function flattenDirs(dir: Dir): Dir[] {
  return [
    dir,
    ...dir.dirs.map((d) => flattenDirs(d)).reduce((a, b) => [...a, ...b], []),
  ];
}

function pathOf(dir: Dir): string {
  if (!dir.parent) return dir.name;
  return [pathOf(dir.parent), dir.name].join('/').replace('//', '/');
}

function dirSize(dir: Dir): number {
  const files = dir.files.reduce((sum, file) => sum + file.size, 0);
  const dirs = dir.dirs.reduce((sum, d) => sum + dirSize(d), 0);
  return files + dirs;
}

describe('Day 7', () => {
  it('should navigate', () => {
    const state: State = { root: createDir('/') };
    exec(state, '$ cd /');
    expect(state.current).toEqual(state.root);
    exec(state, '$ cd abc');
    expect(state.root.dirs).toHaveLength(1);
    expect(state.root.dirs[0].name).toEqual('abc');
    expect(state.root.dirs[0].parent?.name).toEqual('/');
    expect(pathOf(state.root.dirs[0])).toEqual('/abc');
    expect(state.current).toEqual(state.root.dirs[0]);
    exec(state, '$ cd foo');
    exec(state, '$ cd ..');
    exec(state, '$ cd bar');
    expect(state.root.dirs[0].dirs.map((d) => d.name)).toEqual(['foo', 'bar']);
    expect(state.root.dirs[0].dirs[0].parent?.name).toEqual('abc');
    expect(pathOf(state.root.dirs[0].dirs[0])).toEqual('/abc/foo');
    exec(state, '$ cd /');
    expect(state.current).toEqual(state.root);
    expect(flattenDirs(state.root).map((d) => pathOf(d))).toEqual([
      '/',
      '/abc',
      '/abc/foo',
      '/abc/bar',
    ]);
  });

  it('should add files', () => {
    const state: State = { root: createDir('/') };
    exec(state, '$ cd /');
    exec(state, '$ cd foo');
    exec(state, '$ ls');
    exec(state, '123 j');
    exec(state, '456 k');
    expect(state.root.dirs[0].files).toEqual([
      { name: 'j', size: 123 },
      { name: 'k', size: 456 },
    ]);
    expect(dirSize(state.root)).toEqual(123 + 456);
    exec(state, '$ cd ..');
    exec(state, '$ ls');
    exec(state, '123 l');
    expect(dirSize(state.root)).toEqual(123 + 456 + 123);
    expect(dirSize(state.root)).toEqual(123 + 456 + 123);
  });

  function buildState(input: string) {
    const state: State = { root: createDir('/') };
    input.split('\n').forEach((line) => exec(state, line));
    return state;
  }

  it('should list sizes', () => {
    const state = buildState(exampleInput);
    const flat = flattenDirs(state.root);
    expect(flat.map((d) => d.name).join(' ')).toEqual('/ a e d');
    const res = flat.map((d) => ({
      name: pathOf(d),
      size: dirSize(d),
    }));
    res.sort((a, b) => b.size - a.size);
    expect(res).toEqual([
      { name: '/', size: 48381165 },
      { name: '/d', size: 24933642 },
      { name: '/a', size: 94853 },
      { name: '/a/e', size: 584 },
    ]);
  });

  it.each([
    [exampleInput, 95437],
    [input, 1611443],
  ])('should solve part 1', (input, expected) => {
    const state = buildState(input);
    const res = flattenDirs(state.root)
      .map((d) => dirSize(d))
      .filter((s) => s <= 100000)
      .reduce((a, b) => a + b, 0);
    expect(res).toEqual(expected);
  });

  it.each([
    [exampleInput, 24933642],
    [input, 2086088],
  ])('should solve part 2', (input, expected) => {
    // it seems not to be mzzpfnr
    const state = buildState(input);
    const total = 70000000;
    const needed = 30000000;
    const remaining = total - dirSize(state.root);
    const diff = needed - remaining;
    const deleteCandidates = flattenDirs(state.root)
      .map((d) => ({
        name: d.name,
        size: dirSize(d),
      }))
      .filter(({ size }) => size >= diff);

    deleteCandidates.sort((a, b) => a.size - b.size);
    expect(deleteCandidates[0].size).toEqual(expected);
  });
});
