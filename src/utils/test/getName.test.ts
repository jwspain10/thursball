import { getName } from "../getName";

describe("getName", () => {
  it("should return correct fullName, initials, and nameAndInitial for normal input", () => {
    const result = getName("John", "Doe");
    expect(result).toEqual({
      fullName: "John Doe",
      initials: "JD",
      nameAndInitial: "John D",
    });
  });

  it("should handle missing lastName (default to empty string)", () => {
    const result = getName("Alice");
    expect(result).toEqual({
      fullName: "Alice",
      initials: "A",
      nameAndInitial: "Alice",
    });
  });

  it("should handle lastName as empty string", () => {
    const result = getName("Bob", "");
    expect(result).toEqual({
      fullName: "Bob",
      initials: "B",
      nameAndInitial: "Bob",
    });
  });

  it("should handle lastName as null", () => {
    // @ts-expect-error testing null input
    const result = getName("Eve", null);
    expect(result).toEqual({
      fullName: "Eve",
      initials: "E",
      nameAndInitial: "Eve",
    });
  });

  it("should handle empty name and lastName", () => {
    const result = getName("", "");
    expect(result).toEqual({
      fullName: "",
      initials: "",
      nameAndInitial: "",
    });
  });

  it("should handle single character names", () => {
    const result = getName("A", "B");
    expect(result).toEqual({
      fullName: "A B",
      initials: "AB",
      nameAndInitial: "A B",
    });
  });
});
