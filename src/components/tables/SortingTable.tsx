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

type TableRow = Record<string, unknown>;
type IColumn = {
  key: string;
  label: string;
  size?: number;
  align?: string;
  border?: boolean;
  dimmed?: boolean;
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
  const [showFade, setShowFade] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () =>
      setShowFade(el.scrollHeight - el.scrollTop > el.clientHeight + 1);
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [data]);

  const mappedColumns = React.useMemo<ColumnDef<T>[]>(
    () => [
      ...columns.map((col) => ({
        accessorKey: col.key,
        header: () => <span>{col.label}</span>,
        size: col.size || 40,
        cell: (info: { getValue: () => void }) => info.getValue(),
        meta: {
          align: col.align || "center",
          border: col.border || false,
          dimmed: col.dimmed || false,
        },
      })),
    ],
    [columns],
  );

  const table = useReactTable({
    columns: mappedColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      columnPinning: {
        left: ["name", "played"],
      },
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <Table.ScrollContainer
        ref={scrollRef}
        type="native"
        minWidth={300}
        maw={"100vw"}
        maxHeight={450}
        style={{ overscrollBehaviorX: "contain" }}
      >
        <Table striped style={{ tableLayout: "fixed", width: "100%" }}>
          <CustomTableHead table={table} />
          <TableTbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableTr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const { column } = cell;

                    const align =
                      column.columnDef.meta && "align" in column.columnDef.meta
                        ? (column.columnDef.meta as { align: string }).align
                        : "center";

                    const border =
                      column.columnDef.meta && "border" in column.columnDef.meta
                        ? (column.columnDef.meta as { border: string }).border
                        : false;

                    const dimmed =
                      column.columnDef.meta && "dimmed" in column.columnDef.meta
                        ? (column.columnDef.meta as { dimmed: boolean }).dimmed
                        : false;

                    const sorted = cell.column.getIsSorted();
                    const value = cell.getValue();
                    const isBold = typeof value === "number" && value > 0;

                    return (
                      <TableTd
                        key={cell.id}
                        style={{
                          ...getPinningStyles(column),
                          background: sorted
                            ? "var(--mantine-color-teal-2)"
                            : column.getIsPinned()
                              ? "var(--mantine-color-body)"
                              : undefined,
                          boxShadow:
                            border && column.getIsPinned()
                              ? "2px 0 0 0 var(--mantine-color-gray-3)"
                              : undefined,
                          borderRight:
                            border && !column.getIsPinned()
                              ? "1px solid var(--mantine-color-gray-3)"
                              : undefined,
                          fontWeight: isBold ? 600 : undefined,
                        }}
                        ta={align as "left" | "center" | "right" | undefined}
                        c={
                          sorted
                            ? "var(--mantine-color-dark-9)"
                            : dimmed
                              ? "var(--mantine-color-gray-6)"
                              : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableTd>
                    );
                  })}
                </TableTr>
              );
            })}
          </TableTbody>
        </Table>
      </Table.ScrollContainer>
      {showFade && (
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
    </div>
  );
}
