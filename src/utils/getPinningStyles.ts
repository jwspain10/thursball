import { CSSProperties } from "@mantine/core";
import { Column } from "@tanstack/react-table";

export const getPinningStyles = <T>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  };
};
