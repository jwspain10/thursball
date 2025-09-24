import { Box, Group, Text } from "@mantine/core";
import { IMatchPlayerStatsInput } from "../types";

interface Props {
  teamScore: number;
  players?: IMatchPlayerStatsInput[];
}

export default function CurrentTotals({ players, teamScore }: Props) {
  const goals = players?.reduce((curr, acc) => curr + acc.goals, 0) || 0;
  const assists = players?.reduce((curr, acc) => curr + acc.assists, 0) || 0;

  const comp = (stat: number, label: string) => {
    const getBG = () => {
      let bg = "orange.2";
      const c = "gray.9";
      if (stat > teamScore) {
        bg = "red.4";
      }
      if (stat === teamScore) {
        bg = "green.4";
      }
      return { bg, c };
    };

    return (
      <>
        <Text size="sm">{label}</Text>
        <Box m={4} p={8} bg={getBG().bg} bdrs={8} w={60}>
          <Text size="sm" ta="center" c={getBG().c}>
            {stat}/{teamScore}
          </Text>
        </Box>
      </>
    );
  };

  return (
    <Group>
      {comp(goals, "Goals")}
      {comp(assists, "Assists")}
    </Group>
  );
}
