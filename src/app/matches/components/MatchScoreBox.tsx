import { Box, Group, Text } from "@mantine/core";

interface Props {
  nameTeam1: string;
  nameTeam2: string;
  scoreTeam1: number;
  scoreTeam2: number;
}

export default function MatchScoreBox({
  nameTeam1,
  nameTeam2,
  scoreTeam1,
  scoreTeam2,
}: Props) {
  return (
    <Box>
      <Group justify="center" gap="xs">
        <Text>{nameTeam1}</Text>
        <Text>
          <Text span fw="700">
            {scoreTeam1}
          </Text>{" "}
          -{" "}
          <Text span fw="700">
            {scoreTeam2}
          </Text>
        </Text>
        <Text>{nameTeam2}</Text>
      </Group>
    </Box>
  );
}
