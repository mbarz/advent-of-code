import {
  getNextSecret,
  getNthSecret,
  mix,
  prune,
  solvePart1,
  solvePart2,
} from './2422';

describe('2024 Day 22', () => {
  it('should mix', () => {
    expect(mix(BigInt(42), BigInt(15))).toEqual(BigInt(37));
  });

  it('should prune', () => {
    expect(prune(BigInt(100000000))).toEqual(16113920n);
  });

  it('should generate next secret number', () => {
    expect(getNextSecret(BigInt(123))).toEqual(BigInt(15887950));
    expect(getNextSecret(BigInt(15887950))).toEqual(BigInt(16495136));
  });

  it('should generate nth secret number', () => {
    expect(getNthSecret(BigInt(1), BigInt(2000))).toEqual(BigInt(8685429));
  });

  const e1 = ['1', '10', '100', '2024'].join('\n');
  const e2 = ['1', '2', '3', '2024'].join('\n');

  it('should solve part 1', () => {
    expect(solvePart1(e1)).toEqual(BigInt(37327623));
  });

  it('should solve part 2', () => {
    expect(solvePart2(e2)).toEqual(23);
  });
});
