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

  const mappedColumns = React.useMemo<ColumnDef<T>[]>(
    () => [
      ...columns.map((col) => ({
        accessorKey: col.key,
        header: () => <span>{col.label}</span>,
        size: col.size || 40,
        cell: (info: { getValue: () => void }) => info.getValue(),
        meta: { align: col.align || "center", border: col.border || false },
      })),
    ],
    [columns]
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
        left: ["name"],
      },
    },
  });

  return (
    <Table.ScrollContainer minWidth={300} maw={"100vw"} maxHeight={450}>
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

                  const sorted = cell.column.getIsSorted();

                  return (
                    <TableTd
                      key={cell.id}
                      style={{
                        ...getPinningStyles(column),
                        borderRight: border
                          ? "2px solid var(--mantine-color-gray-3)"
                          : "none",
                      }}
                      ta={align as "left" | "center" | "right" | undefined}
                      bg={sorted ? "var(--mantine-color-teal-2)" : undefined}
                      c={sorted ? "var(--mantine-color-dark-9)" : undefined}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
  );
}
