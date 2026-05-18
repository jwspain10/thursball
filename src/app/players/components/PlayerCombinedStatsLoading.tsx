"use client";

import CustomTable from "@/components/tables/CustomTable";
import TableSkeleton from "@/components/tables/TableSkeleton";
import { matchColumns, playerColumns } from "./columns";
import { Stack } from "@mantine/core";

export default function PlayerCombinedStatsLoading() {
  const rows = [
    {
      label: "Total",
      played: <TableSkeleton />,
      wins: <TableSkeleton />,
      draws: <TableSkeleton />,
      losses: <TableSkeleton />,
      goals: <TableSkeleton />,
      assists: <TableSkeleton />,
    },
    {
      label: "Avg",
      played: null,
      wins: <TableSkeleton />,
      draws: <TableSkeleton />,
      losses: <TableSkeleton />,
      goals: <TableSkeleton />,
      assists: <TableSkeleton />,
    },
  ];

  return (
    <Stack mt="md" gap="md">
      <CustomTable rows={rows} columns={matchColumns} />
      <CustomTable rows={rows} columns={playerColumns} />
    </Stack>
  );
}
