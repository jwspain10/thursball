import { getPercentage } from "../getPercentage";

describe("getPercentage", () => {
  it("returns 0 when total is 0", () => {
    expect(getPercentage(0, 50)).toBe(0);
    expect(getPercentage(0, 0)).toBe(0);
    expect(getPercentage(0, -10)).toBe(0);
  });

  it("calculates correct percentage for positive numbers", () => {
    expect(getPercentage(100, 50)).toBe(50);
    expect(getPercentage(200, 50)).toBe(25);
    expect(getPercentage(100, 0)).toBe(0);
    expect(getPercentage(100, 100)).toBe(100);
  });

  it("handles negative values", () => {
    expect(getPercentage(100, -50)).toBe(-50);
    expect(getPercentage(-100, 50)).toBe(-50);
    expect(getPercentage(-100, -50)).toBe(50);
  });

  it("returns value rounded to two decimal places", () => {
    expect(getPercentage(3, 1)).toBe(33.33);
    expect(getPercentage(3, 2)).toBe(66.67);
    expect(getPercentage(7, 1)).toBe(14.29);
  });
});
