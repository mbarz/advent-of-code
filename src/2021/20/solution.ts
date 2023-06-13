import { readFileSync } from 'fs';
import { Image, ImageEnhancer } from './image-enhancer';

const mode = 'p' as string;

const puzzleInput = readFileSync('res/puzzle-input-2021-20.txt', 'utf-8');
const puzzleLines = puzzleInput.split('\n');
const puzzleAlgorithm = puzzleLines[0];
const puzzleImage = puzzleLines.slice(2).join('\n');

const exampleAlgorithm =
  '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#';
const exampleImage = ['#..#.', '#....', '##..#', '..#..', '..###'].join('\n');

function countDark(image: Image) {
  return image.lines.flatMap((line) => line.split('')).filter((c) => c === '#')
    .length;
}

const algorithm = mode === 'p' ? puzzleAlgorithm : exampleAlgorithm;
let image = new Image(mode === 'p' ? puzzleImage : exampleImage);

const enhancer = new ImageEnhancer(algorithm);

console.log(ImageEnhancer.addImageBorder(image, 0).toString());
console.log(countDark(image));
console.log(image.fill);
console.log('');
console.time('part1');
for (let i = 0; i < 2; ++i) {
  image = enhancer.enhance(image);
  console.log(ImageEnhancer.addImageBorder(image, 0).toString());
  console.log(countDark(image));
  console.log('');
}
console.timeEnd('part1');
console.log('4964 should be correct for two times');
console.log('');
console.time('part2');
for (let i = 0; i < 48; ++i) {
  image = enhancer.enhance(image);
}
console.timeEnd('part2');
console.log(ImageEnhancer.addImageBorder(image, 2).toString());
console.log(countDark(image));
