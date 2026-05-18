import CustomTable from "@/components/tables/CustomTable";
import { fetchPlayerMatchStats } from "../api/fetchPlayerMatchStats";
import { fetchPlayerStats } from "../api/fetchPlayerStats";
import { getPercentage } from "@/utils/getPercentage";
import { getAverage } from "@/utils/getAverage";
import { matchColumns, playerColumns } from "./columns";
import { Stack } from "@mantine/core";

interface Props {
  playerId: string;
}

export default async function PlayerCombinedStats({ playerId }: Props) {
  const [matchStats, playerStats] = await Promise.all([
    fetchPlayerMatchStats(playerId),
    fetchPlayerStats(playerId),
  ]);

  const { played, wins, losses, draws, goalsFor, goalsAgainst } =
    matchStats || {};
  const { goals, assists } = playerStats?._sum || {};
  const matchCount = playerStats?._count?.matchId || 0;

  const goalDiffTotal = (goalsFor ?? 0) - (goalsAgainst ?? 0);

  const matchRows = [
    {
      label: "Total",
      played: played ?? 0,
      wins: wins ?? 0,
      draws: draws ?? 0,
      losses: losses ?? 0,
      goalsFor: goalsFor ?? 0,
      goalsAgainst: goalsAgainst ?? 0,
      goalDiff: goalDiffTotal,
    },
    {
      label: "Avg",
      _dim: true,
      played: null,
      wins: getPercentage(played || 0, wins || 0),
      draws: getPercentage(played || 0, draws || 0),
      losses: getPercentage(played || 0, losses || 0),
      goalsFor: getAverage(played || 0, goalsFor || 0),
      goalsAgainst: getAverage(played || 0, goalsAgainst || 0),
      goalDiff: getAverage(played || 0, goalDiffTotal),
    },
  ];

  const playerRows = [
    {
      label: "Total",
      goals: goals ?? 0,
      assists: assists ?? 0,
      combined: (goals ?? 0) + (assists ?? 0),
    },
    {
      label: "Per game",
      _dim: true,
      goals: getAverage(matchCount, goals || 0),
      assists: getAverage(matchCount, assists || 0),
      combined: getAverage(matchCount, (goals || 0) + (assists || 0)),
    },
  ];

  return (
    <Stack mt="md" gap="md">
      <CustomTable rows={matchRows} columns={matchColumns} />
      <CustomTable rows={playerRows} columns={playerColumns} />
    </Stack>
  );
}
