import { ReactNode } from "react";
import { Table, TableTbody, TableTd, TableThead, TableTr } from "@mantine/core";

type TableRow = Record<string, unknown>;
type Column = {
  key: string;
  label: string;
  width?: number;
  border?: boolean;
  getColor?: (value: unknown) => string | undefined;
};

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
            <th
              key={String(col.key)}
              style={{
                width: col.width,
                borderRight: col.border
                  ? "2px solid var(--mantine-color-default-border)"
                  : undefined,
              }}
            >
              {String(col.label)}
            </th>
          ))}
        </TableTr>
      </TableThead>
      <TableTbody>
        {rows.map((row, i) => (
          <TableTr key={i}>
            {columns.map((col) => {
              const isFirstCol = columns[0].key === col.key;
              const rawValue = row[col.key];
              const isBold = typeof rawValue === "number" && rawValue > 0;
              const customColor = col.getColor?.(rawValue);
              const dimColor =
                row._dim && !isFirstCol
                  ? "var(--mantine-color-dimmed)"
                  : undefined;

              return (
                <TableTd
                  key={String(col.key)}
                  ta={isFirstCol ? "left" : "center"}
                  style={{
                    width: col.width,
                    borderRight: col.border
                      ? "2px solid var(--mantine-color-default-border)"
                      : undefined,
                    fontWeight: isBold ? "bold" : undefined,
                    color: customColor ?? dimColor,
                  }}
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
