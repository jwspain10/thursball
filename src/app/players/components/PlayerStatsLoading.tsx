"use client";

import CustomTable from "@/components/CustomTable";
import { Skeleton } from "@mantine/core";

export default function PlayerStatsLoading() {
  const StatSkeleton = () => <Skeleton height={18} width="20" />;

  const rows = [
    {
      label: "Played",
      value: StatSkeleton(),
      average: null,
    },
    {
      label: "Goals",
      value: StatSkeleton(),
      average: StatSkeleton(),
    },
    {
      label: "Assists",
      value: StatSkeleton(),
      average: StatSkeleton(),
    },
    {
      label: "Mvp",
      value: StatSkeleton(),
      average: StatSkeleton(),
    },
  ];

  const columns = [
    { key: "label", label: "" },
    { key: "value", label: "Total" },
    { key: "average", label: "Per game" },
  ];

  return <CustomTable rows={rows} columns={columns} />;
}
