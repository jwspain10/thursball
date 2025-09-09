import { ReactNode } from "react";
import { Table, TableTbody, TableTd, TableThead, TableTr } from "@mantine/core";

type TableRow = Record<string, unknown>;
type Column = { key: string; label: string };

interface Props<T extends TableRow> {
  rows: T[];
  columns: Column[];
}

export default function CustomTable<T extends TableRow>({
  rows,
  columns,
}: Props<T>) {
  const formatValue = (row: T, col: Column): number | ReactNode => {
    if (typeof row[col.key] === "object") {
      return row[col.key] as unknown as ReactNode;
    }
    if (!!row[col.key] || row[col.key] === 0) {
      return String(row[col.key]);
    }
    return "-";
  };

  return (
    <Table striped withColumnBorders>
      <TableThead>
        <TableTr ta="center">
          {columns.map((col) => (
            <th key={String(col.key)}>{String(col.label)}</th>
          ))}
        </TableTr>
      </TableThead>
      <TableTbody>
        {rows.map((row, i) => (
          <TableTr key={i}>
            {columns.map((col) => {
              const isFirstCol = columns[0].key === col.key;

              return (
                <TableTd
                  key={String(col.key)}
                  ta={isFirstCol ? "left" : "center"}
                >
                  {formatValue(row, col)}
                </TableTd>
              );
            })}
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
