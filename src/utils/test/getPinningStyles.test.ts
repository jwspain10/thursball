import { Column } from "@tanstack/react-table";
import { getPinningStyles } from "../getPinningStyles";

const createMockColumn = (isPinned: "left" | "right" | false, start = 0) =>
  ({
    getIsPinned: () => isPinned,
    getStart: () => start,
  }) as unknown as Column<unknown>;

describe("getPinningStyles", () => {
  it("returns sticky left position when pinned left", () => {
    expect(getPinningStyles(createMockColumn("left", 120))).toEqual({
      left: "120px",
      position: "sticky",
      zIndex: 1,
    });
  });

  it("returns left: undefined when pinned right", () => {
    expect(getPinningStyles(createMockColumn("right", 0))).toEqual({
      left: undefined,
      position: "sticky",
      zIndex: 1,
    });
  });

  it("returns relative position and zIndex 0 when not pinned", () => {
    expect(getPinningStyles(createMockColumn(false))).toEqual({
      left: undefined,
      position: "relative",
      zIndex: 0,
    });
  });

  it("reflects the correct pixel offset for the left pin start position", () => {
    expect(getPinningStyles(createMockColumn("left", 250))).toEqual({
      left: "250px",
      position: "sticky",
      zIndex: 1,
    });
  });
});
