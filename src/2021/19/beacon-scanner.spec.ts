import { parseScanReport } from './beacon-scanner';

describe('2021 - Beacon Scanner', () => {
  it('should parse scan report', () => {
    const report = parseScanReport();
    expect(report).toEqual({});
  });
});
