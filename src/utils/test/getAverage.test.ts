import { getAverage } from "../getAverage";

describe("getAverage", () => {
  it("returns 0 when total is 0", () => {
    expect(getAverage(0, 0)).toBe(0);
    expect(getAverage(0, 1)).toBe(0);
  });

  it("returns correct average for positive numbers", () => {
    expect(getAverage(4, 2)).toBe(0.5);
    expect(getAverage(10, 7)).toBe(0.7);
    expect(getAverage(3, 1)).toBe(0.33);
  });

  it("returns negative average when value is negative", () => {
    expect(getAverage(5, -2)).toBe(-0.4);
  });

  it("handles floating point values correctly", () => {
    expect(getAverage(3, 2)).toBe(0.67);
    expect(getAverage(7, 3)).toBe(0.43);
  });

  it("returns 0 when value is 0 and total is positive", () => {
    expect(getAverage(5, 0)).toBe(0);
  });
});
