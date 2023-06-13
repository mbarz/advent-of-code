export class Image {
  public lines: string[];
  public width;
  public height;
  public fill = '.';

  constructor(input: string, fill = '.') {
    this.fill = fill;
    this.lines = input.split('\n');
    this.width = this.lines[0].length;
    this.height = this.lines.length;
  }

  getRawPixel(y: number, x: number): string {
    if (y < 0 || y >= this.lines.length || x < 0 || x >= this.lines[0].length) {
      return this.fill;
    }
    return this.lines[y].charAt(x);
  }

  getPixel(y: number, x: number) {
    const coords = [-1, 0, 1].flatMap((oy) =>
      [-1, 0, 1].map((ox) => ({ y: oy + y, x: x + ox }))
    );
    return parseInt(
      coords
        .map(({ x, y }) => this.getRawPixel(y, x))
        .join('')
        .replace(/#/g, '1')
        .replace(/\./g, '0'),
      2
    );
  }

  toString() {
    return this.lines.join('\n');
  }
}

export class ImageEnhancer {
  static addImageBorder(input: Image, width = 1): Image {
    if (width < 1) return input;
    const lines = input.lines;
    const w = lines[0].length + 2;
    const f = input.fill;
    const empty = Array(w).fill(f).join('');
    const res = [
      empty,
      ...lines.map((line) => [f, line, f].join('')),
      empty,
    ].join('\n');
    return width > 1
      ? ImageEnhancer.addImageBorder(new Image(res, input.fill), width - 1)
      : new Image(res, input.fill);
  }

  static trim(image: Image): Image {
    const lines = image.lines;

    const emptyLine = Array(image.width).fill(image.fill).join('');

    let top = 0;
    for (let i = 0; i < lines.length; ++i) {
      if (lines[i] === emptyLine) top++;
      else break;
    }

    let bottom = lines.length;
    for (let i = lines.length - 1; i > 0; --i) {
      if (lines[i] === emptyLine) bottom--;
      else break;
    }

    const left = Math.min(
      ...lines.map((line) => line.indexOf('#')).filter((i) => i >= 0)
    );
    const right =
      Math.max(
        ...lines.map((line) => line.lastIndexOf('#')).filter((i) => i >= 0)
      ) + 1;

    return new Image(
      lines
        .slice(top, bottom)
        .map((line) => line.substring(left, right))
        .join('\n'),
      image.fill
    );
  }

  constructor(public algorithm: string) {}

  enhance(input: Image): Image {
    const image = ImageEnhancer.addImageBorder(input, 2);
    const lines = [];
    for (let y = 0; y < image.height; ++y) {
      let line = '';
      for (let x = 0; x < image.width; ++x) {
        line += this.algorithm.charAt(image.getPixel(y, x));
      }
      lines.push(line);
    }
    const result = new Image(lines.join('\n'));
    if (this.algorithm[0] === '#') {
      result.fill = image.fill === '#' ? '.' : '#';
    }
    return ImageEnhancer.trim(result);
  }
}
