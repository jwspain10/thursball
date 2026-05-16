import React from "react";
import { Stack, TableTh, TableThead, TableTr } from "@mantine/core";
import { flexRender, Table } from "@tanstack/react-table";
import CustomIcon from "../CustomIcon";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { getPinningStyles } from "@/utils/getPinningStyles";

type Props<T> = { table: Table<T> };

export default function CustomTableHead<T>({ table }: Props<T>) {
  return (
    <TableThead
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "var(--mantine-color-body)",
        zIndex: 2,
      }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <TableTr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableTh
                key={header.id}
                style={{
                  ...getPinningStyles(header.column),
                  background: header.column.getIsPinned()
                    ? "var(--mantine-color-body)"
                    : undefined,
                  zIndex: header.column.getIsPinned() ? 3 : undefined,
                  width: header.column.getSize(),
                  boxShadow:
                    header.column.columnDef.meta &&
                    "border" in header.column.columnDef.meta &&
                    header.column.columnDef.meta.border &&
                    header.column.getIsPinned()
                      ? "2px 0 0 0 var(--mantine-color-gray-3)"
                      : undefined,
                  borderRight:
                    header.column.columnDef.meta &&
                    "border" in header.column.columnDef.meta &&
                    header.column.columnDef.meta.border &&
                    !header.column.getIsPinned()
                      ? "1px solid var(--mantine-color-gray-3)"
                      : undefined,
                }}
                ta={"center"}
              >
                <Stack
                  onClick={header.column.getToggleSortingHandler()}
                  align="center"
                  justify="center"
                  gap="xs"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: <CustomIcon icon={<FaSortUp />} color="pink" />,
                    desc: <CustomIcon icon={<FaSortDown />} color="teal" />,
                  }[header.column.getIsSorted() as string] ?? null}
                </Stack>
              </TableTh>
            );
          })}
        </TableTr>
      ))}
    </TableThead>
  );
}
