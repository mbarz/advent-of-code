import { sum } from '../../util/sum';

export function fromSnafu(snafu: string) {
  const digits = snafu.split('');
  const values = digits.map((d, i) => {
    const base = digits.length - i - 1;
    const a = Math.pow(5, base);
    return decodeDigit(d) * a;
  });
  return sum(values);
}

export function toSnafu(n: number) {
  const digits: string[] = [];
  const startBase = 20;
  let rest = n;

  for (let base = startBase; base >= 0; base--) {
    const c = Math.pow(5, base);
    const digit = Math.round(rest / c);
    digits.push(encodeDigit(digit));
    rest = rest - digit * c;
  }

  return digits.join('').replace(/^0+/, '');
}

const decodeDigit = (d: string) => {
  if (d === '-') return -1;
  if (d === '=') return -2;
  return Number(d);
};

const encodeDigit = (d: number) => {
  if (d === -1) return '-';
  if (d === -2) return '=';
  return String(d);
};
