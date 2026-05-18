import React from "react";
import { Stack, TableTh, TableThead, TableTr } from "@mantine/core";
import { flexRender, Table } from "@tanstack/react-table";
import CustomIcon from "../CustomIcon";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { getPinningStyles } from "@/utils/getPinningStyles";

type Props<T> = { table: Table<T> };

const SORT_ICONS = {
  asc: <CustomIcon icon={<FaSortUp />} color="pink" />,
  desc: <CustomIcon icon={<FaSortDown />} color="teal" />,
};

export default function CustomTableHead<T>({ table }: Props<T>) {
  return (
    <TableThead
      style={{
        position: "sticky",
        top: 0,
        backgroundColor:
          "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))",
        zIndex: 2,
      }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <TableTr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const { column } = header;
            const isPinned = column.getIsPinned();
            const meta = column.columnDef.meta as
              | { border?: boolean }
              | undefined;
            const hasBorder = meta?.border ?? false;

            return (
              <TableTh
                key={header.id}
                ta="center"
                style={{
                  ...getPinningStyles(column),
                  background: isPinned
                    ? "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                    : undefined,
                  zIndex: isPinned ? 3 : undefined,
                  width: column.getSize(),
                  boxShadow:
                    hasBorder && isPinned
                      ? "2px 0 0 0 var(--mantine-color-gray-3)"
                      : undefined,
                  borderRight:
                    hasBorder && !isPinned
                      ? "1px solid var(--mantine-color-gray-3)"
                      : undefined,
                }}
              >
                <Stack
                  onClick={column.getToggleSortingHandler()}
                  align="center"
                  justify="center"
                  gap="xs"
                >
                  {flexRender(column.columnDef.header, header.getContext())}
                  {SORT_ICONS[
                    column.getIsSorted() as keyof typeof SORT_ICONS
                  ] ?? null}
                </Stack>
              </TableTh>
            );
          })}
        </TableTr>
      ))}
    </TableThead>
  );
}
