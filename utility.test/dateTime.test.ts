import { toDateString } from '../utility/dateTime';

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
