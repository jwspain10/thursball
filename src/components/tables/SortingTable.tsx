"use client";

import React from "react";
import { Table, TableTbody, TableTd, TableTr } from "@mantine/core";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { getPinningStyles } from "@/utils/getPinningStyles";
import CustomTableHead from "./CustomTableHead";
import { useScrollFade } from "./useScrollFade";

type TableRow = Record<string, unknown>;

type IColumn = {
  key: string;
  label: string;
  size?: number;
  align?: string;
  border?: boolean;
  dimmed?: boolean;
};

type CellMeta = {
  align: string;
  border: boolean;
  dimmed: boolean;
};

interface Props<T extends TableRow> {
  data: T[];
  columns: IColumn[];
}

export default function CustomSortingTable<T extends TableRow>({
  data,
  columns,
}: Props<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const fades = useScrollFade(scrollRef, [data]);

  const mappedColumns = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((col) => ({
        accessorKey: col.key,
        header: () => <span>{col.label}</span>,
        size: col.size ?? 40,
        cell: (info) => info.getValue(),
        meta: {
          align: col.align ?? "center",
          border: col.border ?? false,
          dimmed: col.dimmed ?? false,
        } satisfies CellMeta,
      })),
    [columns],
  );

  const table = useReactTable({
    columns: mappedColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: { columnPinning: { left: ["name", "played"] } },
  });

  const pinnedWidth = table
    .getLeftLeafColumns()
    .reduce((sum, col) => sum + col.getSize(), 0);

  React.useLayoutEffect(() => {
    const thead = scrollRef.current?.querySelector("thead");
    if (thead) setHeaderHeight((thead as HTMLElement).offsetHeight);
  }, [data]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Table.ScrollContainer
        ref={scrollRef}
        type="native"
        minWidth={300}
        maw="100vw"
        maxHeight={450}
        style={{ overscrollBehaviorX: "none", touchAction: "pan-x pan-y" }}
      >
        <Table striped style={{ tableLayout: "fixed", width: "100%" }}>
          <CustomTableHead table={table} />
          <TableTbody>
            {table.getRowModel().rows.map((row) => (
              <TableTr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const meta = column.columnDef.meta as CellMeta;
                  const isPinned = column.getIsPinned();
                  const sorted = column.getIsSorted();
                  const value = cell.getValue();
                  const isBold = typeof value === "number" && value > 0;

                  return (
                    <TableTd
                      key={cell.id}
                      ta={meta.align as "left" | "center" | "right"}
                      c={
                        sorted
                          ? "var(--mantine-color-dark-9)"
                          : meta.dimmed
                            ? "var(--mantine-color-gray-6)"
                            : undefined
                      }
                      style={{
                        ...getPinningStyles(column),
                        background: sorted
                          ? "var(--mantine-color-teal-2)"
                          : isPinned && column.id !== "played"
                            ? "var(--mantine-color-dark-9)"
                            : isPinned
                              ? "var(--mantine-color-body)"
                              : undefined,
                        boxShadow:
                          meta.border && isPinned
                            ? "2px 0 0 0 var(--mantine-color-gray-3)"
                            : undefined,
                        borderRight:
                          meta.border && !isPinned
                            ? "1px solid var(--mantine-color-gray-3)"
                            : undefined,
                        fontWeight: isBold ? 600 : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableTd>
                  );
                })}
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Table.ScrollContainer>
      {fades.top && (
        <div
          style={{
            position: "absolute",
            top: headerHeight,
            left: 0,
            right: 0,
            height: 80,
            background:
              "linear-gradient(to top, transparent, var(--mantine-color-body))",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      {fades.bottom && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background:
              "linear-gradient(to bottom, transparent, var(--mantine-color-body))",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      {fades.left && (
        <div
          style={{
            position: "absolute",
            top: headerHeight,
            bottom: 0,
            left: pinnedWidth,
            width: 40,
            background:
              "linear-gradient(to left, transparent, var(--mantine-color-body))",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      {fades.right && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 40,
            background:
              "linear-gradient(to right, transparent, var(--mantine-color-body))",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
