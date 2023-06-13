import { Image, ImageEnhancer } from './image-enhancer';

const input = ['#..#.', '#....', '##..#', '..#..', '..###'].join('\n');
const algorithm =
  '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#';

describe('2021 - Day 20 - Image Enhancer', () => {
  it('should build border', () => {
    const image = new Image('#');
    const res = ImageEnhancer.addImageBorder(image);
    expect(res.lines).toEqual(['...', '.#.', '...']);
  });

  it('should get binary value', () => {
    expect(new Image(input).getPixel(2, 2)).toEqual(0b000100010);
  });

  it('should enhance', () => {
    const enhancer = new ImageEnhancer(algorithm);
    enhancer.enhance(new Image(input));
  });
});
