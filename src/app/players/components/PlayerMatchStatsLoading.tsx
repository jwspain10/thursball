"use client";

import CustomTable from "@/components/tables/CustomTable";
import TableSkeleton from "@/components/tables/TableSkeleton";

export default function PlayerMatchStatsLoading() {
  const rows = [
    {
      label: "Played",
      value: <TableSkeleton />,
      average: null,
    },
    {
      label: "Wins",
      value: <TableSkeleton />,
      average: <TableSkeleton />,
    },
    {
      label: "Draws",
      value: <TableSkeleton />,
      average: <TableSkeleton />,
    },
    {
      label: "Losses",
      value: <TableSkeleton />,
      average: <TableSkeleton />,
    },
  ];

  const columns = [
    { key: "label", label: "" },
    { key: "value", label: "Total" },
    { key: "average", label: "%" },
  ];

  return <CustomTable rows={rows} columns={columns} />;
}
