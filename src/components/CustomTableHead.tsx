import React from "react";
import { Stack, TableTh, TableThead, TableTr } from "@mantine/core";
import { flexRender, Table } from "@tanstack/react-table";
import CustomIcon from "./CustomIcon";
import { FaSortDown, FaSortUp } from "react-icons/fa";

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
                style={{ width: header.column.getSize() }}
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
                    header.getContext()
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
