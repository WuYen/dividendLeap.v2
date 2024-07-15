import { formatTimestampToString, toDateString } from '../utility/dateTime';

describe('toDateString function', () => {
  test('should return yyyymmdd format for valid date string', () => {
    const result = toDateString('2024-05-08');
    expect(result).toBe('20240508');
  });

  test('should return yyyymmdd format for valid Date object', () => {
    const result = toDateString(new Date(2024, 4, 8));
    expect(result).toBe('20240508');
  });

  test('should return yyyymmdd format with separator', () => {
    const result = toDateString(new Date(2024, 4, 8), '/');
    expect(result).toBe('2024/05/08');
  });

  test('given date should return yyyy-mm-dd', () => {
    const result = toDateString(new Date(2024, 4, 8), '-');
    expect(result).toBe('2024-05-08');
  });

  test('should return yyyymmdd format without separator if separator not provided', () => {
    const result = toDateString(new Date(2024, 4, 8));
    expect(result).toBe('20240508');
  });
});

describe('test formatTimestampToString function', () => {
  test('should return date and time format string base on given timestamp', () => {
    const timestamp = 1672531199000000;
    const expectedDate = '2023-01-01 07:59:59';
    expect(formatTimestampToString(timestamp)).toBe(expectedDate);
  });
});
