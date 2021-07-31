import { NAME_PATTERN, NUMERIC_PATTERN } from './regex-patterns';

describe('NAME_PATTERN', () => {
  let nameRegex = new RegExp(NAME_PATTERN);

  it('should match a valid name', () => {
    expect(nameRegex.test('Daniel Coto')).toBe(true);
    expect(nameRegex.test('Daniel')).toBe(true);
    expect(nameRegex.test("Dan'iel")).toBe(true);
    expect(nameRegex.test('Dan-iel')).toBe(true);
    expect(nameRegex.test("Dan-ie'l Coto")).toBe(true);
    expect(nameRegex.test('Daniél Cóto')).toBe(true);
  });

  it('should not match an invalid name', () => {
    expect(nameRegex.test('D@niel')).toBe(false);
    expect(nameRegex.test('')).toBe(false);
    expect(nameRegex.test('D4niel')).toBe(false);
    expect(nameRegex.test('234098')).toBe(false);
  });
});

describe('NUMERIC_PATTERN', () => {
  let numericRegex = new RegExp(NUMERIC_PATTERN);

  it('should match a valid number', () => {
    expect(numericRegex.test('1')).toBe(true);
    expect(numericRegex.test('123')).toBe(true);
  });

  it('should not match an invalid number', () => {
    expect(numericRegex.test('D@niel')).toBe(false);
    expect(numericRegex.test('D4niel')).toBe(false);
    expect(numericRegex.test('Daniel Coto')).toBe(false);
    expect(numericRegex.test('Daniel')).toBe(false);
    expect(numericRegex.test("Dan'iel")).toBe(false);
    expect(numericRegex.test('Dan-iel')).toBe(false);
    expect(numericRegex.test("Dan-ie'l Coto")).toBe(false);
    expect(numericRegex.test('Daniél Cóto')).toBe(false);
  });
});
