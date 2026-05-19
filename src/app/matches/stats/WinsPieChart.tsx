"use client";

import { SubHeader } from "@/components/navigation/SubHeader";
import { PieChart } from "@mantine/charts";
import { Center } from "@mantine/core";

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name = "",
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={
        name === "Darks"
          ? "#fff"
          : "var(--chart-label-color, var(--mantine-color-dimmed))"
      }
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="var(--mantine-font-family)"
      fontSize={12}
    >
      <tspan x={x}>{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

type TeamStat = {
  wins: number;
  played: number;
};

const TEAM_COLORS: Record<string, string> = {
  Darks: "dark.5",
  Lights: "gray.0",
};

function getColor(name: string, index: number): string {
  return (
    TEAM_COLORS[name] ??
    ["teal.5", "blue.5", "grape.5", "red.5", "orange.5"][index % 5]
  );
}

export function WinsPieChart({ stats }: { stats: Record<string, TeamStat> }) {
  const data = Object.entries(stats)
    .filter(([, stat]) => stat.wins > 0)
    .map(([name, stat], i) => ({
      name,
      value: stat.wins,
      color: getColor(name, i),
    }));

  if (data.length === 0) return null;

  return (
    <div style={{ marginTop: "2rem" }}>
      <SubHeader>Win %</SubHeader>
      <Center>
        <PieChart
          data={data}
          withTooltip
          tooltipDataSource="segment"
          size={200}
          strokeWidth={2}
          pieProps={{ label: renderLabel }}
        />
      </Center>
    </div>
  );
}
